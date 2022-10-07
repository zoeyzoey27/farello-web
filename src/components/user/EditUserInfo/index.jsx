import React, { useState, useEffect} from 'react'
import { Row, Button, Form, Input, DatePicker, Select, Col, message, Spin  } from 'antd'
import { schemaValidate } from '../../../validation/Register'
import { converSchemaToAntdRule } from '../../../validation'
import axiosClient from '../../../api/axiosClient'
import { GET_USER_INFO, UPDATE_USER_INFO } from './graphql'
import { useMutation, useQuery } from '@apollo/client'
import moment from 'moment'
import { convertTimeToString, DATE_TIME_FORMAT } from '../../../constant'

const EditUserInfo = () => {
  const { Option } = Select
  const [form] = Form.useForm()
  const id = localStorage.getItem("id_token")
  const [updateUserInfo] = useMutation(UPDATE_USER_INFO)
  const [loading, setLoading] = useState(true)
  const [provinceList, setProvinceList] = useState([])
  const [districtList, setDistrictList] = useState([])
  const [communeList, setCommuneList] = useState([])
  const yupSync = converSchemaToAntdRule(schemaValidate)

  const { data } = useQuery(GET_USER_INFO, {
    variables: {
      userId: id
    },
    onCompleted: () => {
      setLoading(false)
    }
  })

  const onFinish = async (values) => {
    setLoading(true)
    const province = provinceList.find((item) => item.code === form.getFieldsValue().province).name
    const district = districtList.find((item) => item.code === form.getFieldsValue().district).name
    const commune = communeList.find((item) => item.code === form.getFieldsValue().commune).name
    const userAddress = `${commune} - ${district} - ${province}`
    await updateUserInfo({
      variables: {
        updateUserInfoId: id,
        userUpdateInput: {
          fullName: values.name,
          email: values.email,
          phoneNumber: values.phone,
          address: userAddress,
          provinceCode: values.province,
          districtCode: values.district,
          communeCode: values.commune,
          idCard: values.idcard,
          birthday: convertTimeToString(values.birthday),
          status: 'AVAILABLE',
          updatedAt: moment().format(DATE_TIME_FORMAT)
        }
      },
      onCompleted: () => {
        setLoading(false)
        message.success("Chỉnh sửa thông tin thành công!")
        window.location.reload()
      },
      onError: (error) => {
        setLoading(false)
        message.error(`${error.message}`)
      },
    })
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
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data?.user?.fullName,
        phone: data?.user?.phoneNumber,
        email: data?.user?.email,
        idcard: data?.user?.idCard,
        province: data?.user?.provinceCode,
     })
     if (data?.user?.birthday) {
      form.setFieldsValue({
        birthday: moment(data?.user?.birthday, "DD/MM/YYYY"),
      })
     }
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
       <Row className="w-fullflex flex-col">
        <Row className="text-[1.6rem]">Vui lòng nhập thông tin vào các trường bên dưới.</Row>
        <Row className="mb-5 text-[1.6rem]">(*) là thông tin bắt buộc.</Row>
        <Form
          layout="vertical"
          form={form}
          autoComplete="off"
          onFinish={onFinish}
          className="w-full">
          <Form.Item
            name="name"
            label={
              <Row className="font-semibold text-[1.6rem]">
                  Họ tên
                  <Row className="text-red-500 ml-3">*</Row>
              </Row>
            }
            required={false}
            rules={[yupSync]}>
            <Input size="large" placeholder="User" className="rounded" />
          </Form.Item>
          <Form.Item
            name="birthday"
            label={
              <Row className="font-semibold text-[1.6rem]">
                  Ngày sinh
              </Row>
            }
            required={false}>
            <DatePicker size="large" placeholder="01/01/1990" className="rounded w-full" format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item 
              label={
                  <Row className="font-semibold text-[1.6rem]">
                     Địa chỉ
                     <Row className="text-red-500 ml-3">*</Row>
                  </Row>
                }>
              <Row gutter={{xs: 0, md: 16}}>
                <Col xs={24}>
                  <Form.Item
                      name="province"
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
                </Col>
                <Col xs={24}>
                  <Form.Item
                    name="district"
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
                </Col>
                <Col xs={24}>
                  <Form.Item
                    name="commune"
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
                </Col>
              </Row>
           </Form.Item>
          <Form.Item
            name="email"
            label={
              <Row className="font-semibold text-[1.6rem]">
                  Email đăng nhập
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
              <Row className="font-semibold text-[1.6rem]">
                  Số điện thoại
                  <Row className="text-red-500 ml-3">*</Row>
              </Row>
            }
            required={false}
            rules={[yupSync]}>
            <Input size="large" placeholder="0366057503" className="rounded" />
          </Form.Item>
          <Form.Item
            name="idcard"
            label={
              <Row className="font-semibold text-[1.6rem]">
                  Số CMT/CCCD
              </Row>
            }
            required={false}
            rules={[yupSync]}>
            <Input size="large" placeholder="123456789" className="rounded" />
          </Form.Item>
          <Form.Item>
            <Button 
              htmlType="submit" 
              size="large" 
              className="!bg-[#154c79] !text-white !border-[#154c79] hover:bg-[#154c79] hover:text-white hover:border-[#154c79] w-full mt-5 font-semibold !text-[1.6rem] hover:opacity-90 hover:shadow-lg rounded">
              Lưu thay đổi
            </Button>
          </Form.Item>
          <Form.Item>
            <Button 
              size="large" 
              onClick={() => form.resetFields()}
              className="!border-[#154c79] border-1 !text-[#154c79] hover:text-[#154c79] hover:border-[#154c79] w-full font-semibold !text-[1.6rem] hover:opacity-90 hover:shadow-lg rounded">
              Xóa thay đổi
            </Button>
          </Form.Item>
        </Form> 
      </Row>
    </Spin>
  )
}

export default EditUserInfo