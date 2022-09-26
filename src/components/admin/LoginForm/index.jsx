import React from 'react'
import { Row, Space, Image, Button, Form, Input, Typography  } from 'antd'
import logo from '../../../assets/images/logo.png'
import { schemaValidate } from '../../../validation/AdminLogin'
import { converSchemaToAntdRule } from '../../../validation'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const { Title } = Typography
  const yupSync = converSchemaToAntdRule(schemaValidate)
  const navigate= useNavigate()
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
    navigate('/admin/dashboard')
  }
  return (
    <Space direction="vertical" size="middle" className="w-full h-full">
       <Row className="!bg-white h-[65px] flex items-center justify-center mb-10 ">
          <Image
            width={160}
            src={logo}
            className="block cursor-pointer"
            preview={false}
          /> 
       </Row>
       <Row className="w-full flex justify-center">
          <Row className="py-10 px-20 rounded bg-white w-full md:w-[60%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%] flex flex-col shadow-lg">
            <Title level={3} className="block self-center !mb-10 !text-[#343a40]">Đăng nhập</Title>
            <Form
              layout="vertical"
              autoComplete="off"
              onFinish={onFinish}
              className="w-full">
              <Form.Item
                name="email"
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     Email
                     <Row className="text-red-500 ml-3">*</Row>
                  </Row>
                }
                required={false}
                rules={[yupSync]}>
                <Input size="large" placeholder="admin@gmail.com" className="rounded" />
              </Form.Item>
              <Form.Item
                name="password"
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     Mật khẩu
                     <Row className="text-red-500 ml-3">*</Row>
                  </Row>
                }
                required={false}
                rules={[yupSync]}>
                <Input.Password size="large" placeholder="admin@123" className="rounded" />
              </Form.Item>
              <Form.Item>
                <Button 
                  htmlType="submit" 
                  size="large" 
                  className="bg-[#154c79] text-white hover:bg-[#154c79] hover:text-white hover:border-[#154c79] w-full mt-5 font-semibold !text-[1.6rem] hover:opacity-90 hover:shadow-lg rounded">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form> 
          </Row>
       </Row>
    </Space>
  )
}

export default LoginForm