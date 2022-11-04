import React from 'react'
import { Row, Space, Button, Form, Input, Typography, message  } from 'antd'
import { schemaValidate } from '../../../validation/AdminLogin'
import { converSchemaToAntdRule } from '../../../validation'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { ADMIN_LOGIN } from './graphql'
import i18n from '../../../translation'

const LoginForm = ({setLoading}) => {
  const { Title } = Typography
  const yupSync = converSchemaToAntdRule(schemaValidate)
  const navigate= useNavigate()
  const [login] = useMutation(ADMIN_LOGIN)
  const onFinish = (values) => {
    setLoading(true)
    login({
      variables: {
        loginInput: {
          email: values.email,
          password: values.password
        }
      },
      onCompleted: (data) => {
        setLoading(false)
        localStorage.setItem('token_admin', data?.loginAdmin?.token)
        localStorage.setItem('id_token_admin', data?.loginAdmin?.id)
        navigate('/admin/dashboard')
        message.success(i18n.t('login.messageSuccess'))
      },
      onError: (err) => {
        setLoading(false)
        message.error(`${err.message}`)
      }
    })
  }
  return (
    <Space direction="vertical" size="middle" className="w-full h-full">
       <Row className="bg-white h-[65px] flex items-center justify-center mb-10 ">
          <Row className="logo text-[3.5rem]">Farello</Row>
       </Row>
       <Row className="w-full flex justify-center">
          <Row className="py-10 px-20 rounded bg-white w-full md:w-[60%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%] flex flex-col shadow-lg">
            <Title level={3} className="block self-center !mb-10 !text-[#343a40]">{i18n.t('login.title')}</Title>
            <Form
              layout="vertical"
              autoComplete="off"
              onFinish={onFinish}
              className="w-full">
              <Form.Item
                name="email"
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     {i18n.t('login.email')}
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
                     {i18n.t('login.password')}
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
                  className="!bg-colorTheme !text-white !border-colorTheme hover:bg-colorTheme hover:text-white hover:border-colorTheme w-full mt-5 font-semibold !text-[1.6rem] hover:opacity-90 hover:shadow-lg rounded">
                  {i18n.t('login.title')}
                </Button>
              </Form.Item>
            </Form> 
          </Row>
       </Row>
    </Space>
  )
}

export default LoginForm