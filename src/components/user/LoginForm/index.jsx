import React from 'react'
import { Row, Button, Form, Input, Typography, Divider, message  } from 'antd'
import { schemaValidate } from '../../../validation/AdminLogin'
import { converSchemaToAntdRule } from '../../../validation'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from './graphql'

const LoginForm = ({setLoading}) => {
  const { Title } = Typography
  const yupSync = converSchemaToAntdRule(schemaValidate)
  const navigate= useNavigate()
  const [loginUser] = useMutation(LOGIN_USER)
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
    <Row className="w-full flex justify-center mb-20">
      <Row className="py-10 px-20 rounded bg-white w-full md:w-[60%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%] flex flex-col shadow-lg">
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
            className="mb-0"
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
          <Form.Item className="mt-2">
             <Row 
                onClick={() => navigate("/forgotPassword")}
                className="float-right text-blue-500 cursor-pointer hover:opacity-80">
                Quên mật khẩu?
             </Row>
          </Form.Item>
          <Form.Item>
            <Button 
              htmlType="submit" 
              size="large" 
              className="!bg-colorTheme !text-white !border-colorTheme hover:bg-colorTheme hover:text-white hover:border-colorTheme w-full mt-5 font-semibold !text-[1.6rem] hover:opacity-90 hover:shadow-lg rounded">
              Đăng nhập
            </Button>
          </Form.Item>
          <Divider><Row className="font-normal text-[1.3rem]">Bạn chưa có tài khoản?</Row></Divider>
          <Form.Item>
            <Button 
              size="large" 
              onClick={() => navigate('/signup')}
              className="border-colorTheme border-1 text-colorTheme hover:text-colorTheme hover:border-colorTheme w-full font-semibold !text-[1.6rem] hover:opacity-90 hover:shadow-lg rounded">
              Đăng ký tài khoản
            </Button>
          </Form.Item>
        </Form> 
      </Row>
    </Row>
  )
}

export default LoginForm