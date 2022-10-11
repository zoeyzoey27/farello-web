import React, { useState, useEffect } from 'react'
import { Space, Breadcrumb, Typography, Row, Col, Form, Input, Select, List, Button, Radio, Spin, message } from 'antd'
import { schemaValidate } from '../../../validation/UserOrderProduct'
import { converSchemaToAntdRule } from '../../../validation'
import axiosClient from '../../../api/axiosClient'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { GET_USER_INFO, GET_PRODUCT_ADDED, CREATE_ORDER } from './graphql'
import moment from 'moment'
import { DATE_TIME_FORMAT } from '../../../constant' 
import numberWithCommas from '../../../utils/NumberWithCommas'
import { PaymentMethod } from '../../../constant/paymentMethod'

const OrderPage = () => {
  const { Title } = Typography
  const { Option } = Select
  const { TextArea } = Input
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const [createOrder] = useMutation(CREATE_ORDER)
  const yupSync = converSchemaToAntdRule(schemaValidate)
  const [loading, setLoading] = useState(true)
  const [provinceList, setProvinceList] = useState([])
  const [districtList, setDistrictList] = useState([])
  const [communeList, setCommuneList] = useState([])
  const [totalPayment, setTotalPayment] = useState(0)
  const [transferFee, setTransferFee] = useState(0)
  const [totalPaymentWithoutShip, setTotalPaymentWithoutShip] = useState(0)
  const [value, setValue] = useState("PAYMENT_ON_DELIVERY")

  const { data } = useQuery(GET_USER_INFO,{
    variables: {
        userId: id,
    },
    onCompleted: () => {
       setLoading(false)
    }
  })
  const { data: dataProducts } = useQuery(GET_PRODUCT_ADDED, {
    variables: {
      userId: id,
    },
    onCompleted: (resData) => {
      for (let i=0; i<resData?.getProductsAddedToCart?.length; i++) {
        setTotalPaymentWithoutShip((pre) => pre + resData.getProductsAddedToCart[i].totalPayment)
      }
      resData?.getProductsAddedToCart[0]?.addedBy?.provinceCode === "01" ? setTransferFee(30000) : setTransferFee(45000)
    }
  })
  useEffect(() => {
    if (dataProducts) setTotalPayment(transferFee + totalPaymentWithoutShip)
  },[dataProducts, transferFee, totalPaymentWithoutShip])
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  }

  useEffect(() => {
    axiosClient.get('province').then((res) => {
     setProvinceList(res.data.results)
    })
  },[])
 const onChangeProvince = async (value) => {
   await axiosClient.get(`district?province=${value}`).then((res) => {
     setDistrictList(res.data.results)
   })
 }
 const onChangeDistrict = async (value) => {
   await axiosClient.get(`commune?district=${value}`).then((res) => {
     setCommuneList(res.data.results)
   })
 }
 const onSubmit = async (values) => {
    setLoading(true)
    const customId = 'DH' + Math.floor(Math.random() * Date.now())
    const province = provinceList.find((item) => item.code === form.getFieldsValue().province).name
    const district = districtList.find((item) => item.code === form.getFieldsValue().district).name
    const commune = communeList.find((item) => item.code === form.getFieldsValue().commune).name
    const userAddress = `${values.address} - ${commune} - ${district} - ${province}`
    await createOrder({
        variables: {
            orderInput: {
                orderId: customId,
                receiverName: values.name,
                address: userAddress,
                email: values.email,
                phoneNumber: values.phone,
                userId: id,
                status: "WAITING_FOR_CONFIRMATION",
                paymentMethod: value,
                userNote: values.note,
                transferFee: transferFee,
                totalPaymentWithoutShipment: totalPaymentWithoutShip,
                totalPayment: totalPayment,
                createdAt: moment().format(DATE_TIME_FORMAT),
                updatedAt: moment().format(DATE_TIME_FORMAT),
            }
        },
        onCompleted: async (data) => {
            setLoading(false)
            const id = data?.createOrder?.id
            await navigate(`/paymentCompleted?id=${id}`)
        },
        onError: (err) => {
            message.error(`${err.message}`)
        }
    })
 } 
 useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data?.user?.fullName,
        phone: data?.user?.phoneNumber,
        email: data?.user?.email,
        province: data?.user?.provinceCode,
     })
     onChangeProvince(data?.user?.provinceCode)
     form.setFieldsValue({
          district: data?.user?.districtCode,
     })
     onChangeDistrict(data?.user?.districtCode)
     form.setFieldsValue({
        commune: data?.user?.communeCode,
     })
    }
  },[data, form])
 
  return (
    <Spin spinning={loading} size="large">
        <Space 
        direction="vertical" 
        size="middle" 
        className="w-full h-full mb-10">
        <Breadcrumb className="my-10 px-10 py-2 bg-[#f8f8f8]">
          <Breadcrumb.Item href="/" className="text-[1.6rem]">Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item href="/cart" className="text-[1.6rem]">
              Giỏ hàng
          </Breadcrumb.Item>
          <Breadcrumb.Item className="text-[1.6rem] font-semibold">
              Thanh toán
          </Breadcrumb.Item>
        </Breadcrumb> 
        <Form
            layout="vertical"
            autoComplete="off"
            form = {form}
            onFinish={onSubmit}
            className="w-full flex flex-col lg:flex-row">
            <Row className="w-full lg:w-[55%] lg:mr-20">
                <Col className="w-full mb-10">
                   <Title level={4} className="!mb-10 block">Thông tin khách hàng</Title>
                    <Form.Item
                        name="name"
                        label={
                        <Row className="text-[1.6rem]">
                            Họ tên
                            <Row className="text-red-500 ml-3">*</Row>
                        </Row>
                        }
                        required={false}
                        rules={[yupSync]}>
                        <Input size="large" placeholder="User" className="rounded" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label={
                        <Row className="text-[1.6rem]">
                            Email
                            <Row className="text-red-500 ml-3">*</Row>
                        </Row>
                        }
                        required={false}
                        rules={[yupSync]}>
                        <Input size="large" placeholder="user@gmail.com" className="rounded" />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label={
                        <Row className="text-[1.6rem]">
                            Số điện thoại
                            <Row className="text-red-500 ml-3">*</Row>
                        </Row>
                        }
                        required={false}
                        rules={[yupSync]}>
                        <Input size="large" placeholder="0366057503" className="rounded" />
                    </Form.Item>
                </Col>
                <Col className="w-full mb-10">
                   <Title level={4} className="!mb-10 block">Địa chỉ giao hàng</Title>
                   <Form.Item
                      name="province"
                      label={
                        <Row className="text-[1.6rem]">
                            Tỉnh/Thành phố
                            <Row className="text-red-500 ml-3">*</Row>
                        </Row>
                        }
                      required={false}
                      rules={[yupSync]}>
                      <Select
                          showSearch
                          size="large"
                          className="w-full text-[1.6rem]"
                          placeholder="Tỉnh/Thành Phố"
                          optionFilterProp="children"
                          onChange={onChangeProvince}
                          filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                          filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                          }>
                          {
                            provinceList.map((item) => (
                              <Option key={item.code} value={item.code} className="text-[1.6rem]">{item.name}</Option>
                            ))
                          }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="district"
                        label={
                        <Row className="text-[1.6rem]">
                            Quận/Huyện
                            <Row className="text-red-500 ml-3">*</Row>
                        </Row>
                        }
                        required={false}
                        rules={[yupSync]}>
                        <Select
                            showSearch
                            size="large"
                            className="w-full text-[1.6rem]"
                            placeholder="Quận/Huyện"
                            optionFilterProp="children"
                            onChange={onChangeDistrict}
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }>
                            {
                            districtList.map((item) => (
                                <Option key={item.code} value={item.code} className="text-[1.6rem]">{item.name}</Option>
                            ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="commune"
                        label={
                        <Row className="text-[1.6rem]">
                            Phường/Xã
                            <Row className="text-red-500 ml-3">*</Row>
                        </Row>
                        }
                        className="mb-0"
                        required={false}
                        rules={[yupSync]}>
                        <Select
                            showSearch
                            size="large"
                            className="w-full text-[1.6rem]"
                            placeholder="Phường/Xã"
                            optionFilterProp="children"
                            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }>
                            {
                            communeList.map((item) => (
                                <Option key={item.code} value={item.code} className="text-[1.6rem]">{item.name}</Option>
                            ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label={
                        <Row className="text-[1.6rem]">
                            Địa chỉ cụ thể
                            <Row className="text-red-500 ml-3">*</Row>
                        </Row>
                        }
                        className="mb-0"
                        required={false}
                        rules={[yupSync]}>
                        <Input size="large" placeholder="Số nhà/khu/ngõ/ngách" className="rounded" />
                    </Form.Item>
                    <Form.Item
                        name="note"
                        label={
                        <Row className="text-[1.6rem]">
                            Ghi chú
                        </Row>
                        }
                        className="mb-0"
                        required={false}>
                        <TextArea className="resize-none text-[1.6rem] !h-[100px] rounded" />
                    </Form.Item>
                </Col>
                <Col className="w-full">
                   <Title level={4} className="!mb-10 block">Phương thức thanh toán</Title>
                   <Radio.Group onChange={onChange} value={value}>
                        <Space direction="vertical">
                            {
                               PaymentMethod.map((item) => (
                                 <Radio key={item.value} value={item.value} className="!text-[1.6rem]">
                                    {item.name}
                                  </Radio>
                               ))
                            }
                        </Space>
                    </Radio.Group>
                </Col>
            </Row>
            <Col className="mt-5 lg:mt-0 flex-1 h-fit">
                <Title level={4} className="!mb-10 block">Đơn hàng</Title>
                <List
                    header={false}
                    footer={false}
                    className="h-fit"
                    bordered>
                    <List.Item className="flex items-start justify-between">
                        <Row className="text-[1.6rem]">Đơn hàng:</Row>
                        <Row className="text-[1.6rem]">{numberWithCommas(totalPaymentWithoutShip)}</Row>
                    </List.Item>
                    <List.Item className="flex items-start justify-between">
                        <Row className="text-[1.6rem]">Ship:</Row>
                        <Row className="text-[1.6rem]">{numberWithCommas(transferFee)}</Row>
                    </List.Item>
                    <List.Item className="flex items-start justify-between">
                        <Row className="text-[2rem] font-semibold uppercase">Tổng đơn:</Row>
                        <Row className="text-[2rem] font-semibold">{numberWithCommas(totalPayment)}</Row>
                    </List.Item>
                    <Form.Item className="mb-0 mt-20">
                        <Button 
                            size="large" 
                            htmlType="submit" 
                            className="!text-white w-full border-0 !bg-[#154c79] text-[1.6rem] font-semibold hover:opacity-90 hover:bg-[#154c79] hover:text-white hover:border-[#154c79]">
                            Đặt hàng
                        </Button>
                    </Form.Item>
                </List>
            </Col>
        </Form> 
    </Space>
    </Spin>
  )
}

export default OrderPage