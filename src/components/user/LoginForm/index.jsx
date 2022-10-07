import React, { useState } from 'react'
import { Row, Button, Form, Input, Typography, Divider, message, Spin  } from 'antd'
import { schemaValidate } from '../../../validation/AdminLogin'
import { converSchemaToAntdRule } from '../../../validation'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from './graphql'

const LoginForm = () => {
  const { Title } = Typography
  const yupSync = converSchemaToAntdRule(schemaValidate)
  const navigate= useNavigate()
  const [loginUser] = useMutation(LOGIN_USER)
  const [loading, setLoading] = useState(false)
  const onFinish = async (values) => {
    setLoading(true)
    await loginUser({
      variables: {
        loginInput: {
          email: values.email,
          password: values.password
        }
      },
      onCompleted: (data) => {
          setLoading(false)
          navigate("/")
          message.success('Đăng nhập thành công!')
          localStorage.setItem("token", data?.loginUser?.token)
          localStorage.setItem("id_token", data?.loginUser?.id)
      },
      onError: (err) => {
        setLoading(false)
        message.error(`${err.message}`)
      }
    })
  }
  return (
    <Spin spinning={loading} size="large">
      <Row className="w-full flex justify-center mb-20">
      <Row className="py-10 px-20 rounded bg-white w-full md:w-[60%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%] flex flex-col border-2 border-[#154c79]">
        <Title level={3} className="block !mb-10 !text-[#343a40]">Đăng nhập</Title>
        <Row className="text-[1.6rem]">Vui lòng nhập thông tin vào các trường bên dưới.</Row>
        <Row className="mb-5 text-[1.6rem]">(*) là thông tin bắt buộc.</Row>
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
            <Input size="large" placeholder="user@gmail.com" className="rounded" />
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
            <Input.Password size="large" placeholder="user@123" className="rounded" />
          </Form.Item>
          <Form.Item>
            <Button 
              htmlType="submit" 
              size="large" 
              className="bg-[#154c79] text-white hover:bg-[#154c79] hover:text-white hover:border-[#154c79] w-full mt-5 font-semibold !text-[1.6rem] hover:opacity-90 hover:shadow-lg rounded">
              Đăng nhập
            </Button>
          </Form.Item>
          <Divider><Row className="font-normal text-[1.3rem]">Bạn chưa có tài khoản?</Row></Divider>
          <Form.Item>
            <Button 
              size="large" 
              onClick={() => navigate('/signup')}
              className="border-[#154c79] border-1 text-[#154c79] hover:text-[#154c79] hover:border-[#154c79] w-full font-semibold !text-[1.6rem] hover:opacity-90 hover:shadow-lg rounded">
              Đăng ký tài khoản
            </Button>
          </Form.Item>
        </Form> 
      </Row>
    </Row>
    </Spin>
  )
}

export default LoginForm