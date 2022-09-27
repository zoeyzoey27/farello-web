import React, { useEffect, useState } from 'react'
import { 
    Space, 
    Form, 
    Input, 
    Row, 
    Typography, 
    Button, 
    Select,
    Col,
    message,
    DatePicker
} from 'antd'
import { schemaValidate } from '../../../validation/AddAdmin'
import { converSchemaToAntdRule } from '../../../validation'
import { useSearchParams } from 'react-router-dom'
import { MdDeleteOutline } from 'react-icons/md'
import { FiSave } from 'react-icons/fi'
import axiosClient from '../../../api/axiosClient'

const AddAdminForm = () => {
  const { Option } = Select
  const [form] = Form.useForm()
  const [searchParams] = useSearchParams()
  const action = searchParams.get('action')
  const [provinceList, setProvinceList] = useState([])
  const [districtList, setDistrictList] = useState([])
  const [communeList, setCommuneList] = useState([])
  const { Title } = Typography
  const yupSync = converSchemaToAntdRule(schemaValidate)

  const onFinish = (values) => {
    if (values.password !== values.rePassword) {
      message.error('Mật khẩu không khớp!');
    }
    else {
      const province = provinceList.find((item) => item.code === form.getFieldsValue().province).name
      const district = districtList.find((item) => item.code === form.getFieldsValue().district).name
      const commune = communeList.find((item) => item.code === form.getFieldsValue().commune).name
      const adminAddress = `${commune} - ${district} - ${province}`
      console.log(adminAddress)
      console.log('Received values of form: ', values)
    }
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
  return (
    <Space 
        direction="vertical" 
        size="middle" 
        className="w-full h-full bg-white p-10">
        <Title level={4} className="whitespace-pre-wrap">
          {action === 'edit' ? 'Chỉnh sửa thông tin cá nhân' : 'Tạo tài khoản Admin'}
        </Title>
        <Row className="text-[1.6rem]">Vui lòng nhập thông tin vào các trường bên dưới.</Row>
        <Row className="mb-5 text-[1.6rem]">(*) là thông tin bắt buộc.</Row>
        <Form layout='vertical' autoComplete='off' onFinish={onFinish} form={form}>
            <Form.Item
                name="fullName"
                className="w-full md:w-1/2 lg:w-1/3"
                required={false}
                rules={[yupSync]}
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     Họ tên
                     <Row className="text-red-500 ml-3">*</Row>
                  </Row>
                }>
                <Input size="large" placeholder="Admin" className="rounded" />
            </Form.Item>
            <Form.Item
                name="birthday"
                className="w-full md:w-1/2 lg:w-1/3"
                required={false}
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     Ngày sinh
                  </Row>
                }>
                <DatePicker size="large" format="DD/MM/YYYY" placeholder="01/01/1990" className="w-full" />
            </Form.Item>
            <Form.Item 
              className="mb-0 w-full xl:w-[60%]"
              label={
                  <Row className="font-semibold text-[1.6rem]">
                     Địa chỉ
                     <Row className="text-red-500 ml-3">*</Row>
                  </Row>
                }>
              <Row gutter={{xs: 0, md: 16}}>
                <Col xs={24} md={8}>
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
                <Col xs={24} md={8}>
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
                <Col xs={24} md={8}>
                  <Form.Item
                    name="commune"
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
                name="phone"
                className="w-full md:w-1/2 lg:w-1/3"
                required={false}
                rules={[yupSync]}
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     Số điện thoại
                     <Row className="text-red-500 ml-3">*</Row>
                  </Row>
                }>
                <Input size="large" placeholder="0366057503" className="rounded" />
            </Form.Item>
           <Form.Item
                name="email"
                className="w-full md:w-1/2 lg:w-1/3"
                required={false}
                rules={[yupSync]}
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     Email đăng nhập
                     <Row className="text-red-500 ml-3">*</Row>
                  </Row>
                }>
                <Input size="large" placeholder="admin@gmail.com" className="rounded" />
            </Form.Item>
            <Form.Item
                name="password"
                className="w-full md:w-1/2 lg:w-1/3"
                required={false}
                rules={[yupSync]}
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     Mật khẩu
                     <Row className="text-red-500 ml-3">*</Row>
                  </Row>
                }>
                <Input.Password size="large" placeholder="admin@123" className="rounded" />
            </Form.Item>
            <Form.Item
                name="rePassword"
                className="w-full md:w-1/2 lg:w-1/3"
                required={false}
                rules={[yupSync]}
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     Nhập lại mật khẩu
                     <Row className="text-red-500 ml-3">*</Row>
                  </Row>
                }>
                <Input.Password size="large" placeholder="admin@123" className="rounded" />
            </Form.Item>
            <Row className="flex flex-col md:flex-row !mt-10">
              <Form.Item>
                  <Button 
                      size="large" 
                      className="flex items-center justify-center md:mr-5 w-full md:w-[100px] bg-inherit text-black hover:bg-inherit hover:text-black hover:border-inherit border-inherit hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                      <MdDeleteOutline className="mr-3 text-[2rem]" />
                      Xóa
                  </Button>
              </Form.Item>
              <Form.Item>
                  <Button 
                      size="large" 
                      htmlType="submit"
                      className="flex items-center justify-center w-full md:min-w-[100px] bg-[#154c79] text-white hover:bg-[#154c79] hover:text-white hover:border-[#154c79] hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                      <FiSave className="mr-3 text-[2rem]" />
                      {action === 'edit' ? 'Lưu thay đổi' : 'Tạo tài khoản'}
                  </Button>
              </Form.Item>
            </Row>
        </Form>
    </Space>
  )
}

export default AddAdminForm