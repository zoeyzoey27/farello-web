import React, { useState, useEffect } from 'react'
import { Space, Breadcrumb, Typography, Row, Col, Form, Input, Select, List, Button, Radio } from 'antd'
import { schemaValidate } from '../../../validation/UserOrderProduct'
import { converSchemaToAntdRule } from '../../../validation'
import axiosClient from '../../../api/axiosClient'
import { useNavigate } from 'react-router-dom'

const OrderPage = () => {
  const { Title } = Typography
  const { Option } = Select
  const { TextArea } = Input
  const navigate = useNavigate()
  const yupSync = converSchemaToAntdRule(schemaValidate)
  const [provinceList, setProvinceList] = useState([])
  const [districtList, setDistrictList] = useState([])
  const [communeList, setCommuneList] = useState([])
  const [value, setValue] = useState(1)

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
 const onSubmit = (values) => {
    console.log(values)
    navigate("/paymentCompleted")
 } 
 
  return (
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
                            <Radio value={1} className="!text-[1.6rem]">Thanh toán trực tiếp khi nhận hàng</Radio>
                            <Radio value={2} className="!text-[1.6rem]">Thanh toán bằng thẻ ATM nội địa/Internet Banking</Radio>
                            <Radio value={3} className="!text-[1.6rem]">Thanh toán bằng thẻ quốc tế Visa/Master/JCP</Radio>
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
                        <Row className="text-[1.6rem]">1.750.000</Row>
                    </List.Item>
                    <List.Item className="flex items-start justify-between">
                        <Row className="text-[1.6rem]">Ship:</Row>
                        <Row className="text-[1.6rem]">30.000</Row>
                    </List.Item>
                    <List.Item className="flex items-start justify-between">
                        <Row className="text-[2rem] font-semibold uppercase">Tổng đơn:</Row>
                        <Row className="text-[2rem] font-semibold">1.750.000</Row>
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
  )
}

export default OrderPage