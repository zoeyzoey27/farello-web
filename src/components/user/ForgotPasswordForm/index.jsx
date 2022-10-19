import React from 'react'
import { Row, Button, Form, Input, Typography, message } from 'antd'
import { schemaValidate } from '../../../validation/AdminLogin'
import { converSchemaToAntdRule } from '../../../validation'
import emailjs from '@emailjs/browser'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_USER } from './graphql'

const ForgotPasswordForm = ({setLoading}) => {
  const { Title } = Typography
  const yupSync = converSchemaToAntdRule(schemaValidate)
  const navigate = useNavigate()
  const { fetchMore } = useQuery(GET_USER, {
    variables: {
        userInput: {},
        skip: null,
        take: 1,
        orderBy: {
            createdAt: "desc"
        }
    },
    onCompleted: () => {
        setLoading(false)
    }
  })
  const onFinish = async (values) => {
    setLoading(true)
    const userRes = await fetchMore({
        variables: {
            userInput: {
                email: values.email
            },
        },
    })
    if (userRes?.data?.users[0]) {
        const templateParams = {
            email: values.email,
            message: Math.floor(Math.random() * Date.now()).toString().slice(0,5)
        };
        emailjs.send('service_3j0uyuv', 'template_32ytcha', templateParams, 'kRmmE_FN69-XkGUuX')
          .then(() => {
              navigate("/resetPassword", {
                state: {
                    code: templateParams.message,
                    idUser: userRes?.data?.users[0]?.id,
                }
              })
          }, (error) => {
            message.error(`${error.text}`)
          });
    }
    else {
        setLoading(false)
        message.error('Địa chỉ email không khớp với tài khoản nào!')
    }
  }
  return (
    <Row className="w-full flex justify-center mb-20">
      <Row className="py-10 px-20 rounded bg-white w-full md:w-[60%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%] flex flex-col shadow-lg">
        <Title level={3} className="block !mb-10 !text-[#343a40]">Quên mật khẩu?</Title>
        <Row className="text-[1.6rem] mb-5">Hãy nhập địa chỉ email vào ô dưới đây. Chúng tôi sẽ gửi cho bạn một mã xác nhận.</Row>
        <Form
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          className="w-full">
          <Form.Item
            name="email"
            label={
              <Row className="font-semibold text-[1.6rem]">
                  Nhập địa chỉ Email của bạn
                  <Row className="text-red-500 ml-3">*</Row>
              </Row>
            }
            required={false}
            rules={[yupSync]}>
            <Input size="large" placeholder="user@gmail.com" className="rounded"  name="email" />
          </Form.Item>
          <Form.Item>
            <Button 
              htmlType="submit" 
              size="large" 
              className="!bg-colorTheme !text-white !border-colorTheme hover:bg-colorTheme hover:text-white hover:border-colorTheme w-full mt-5 font-semibold !text-[1.6rem] hover:opacity-90 hover:shadow-lg rounded">
              Tiếp tục
            </Button>
          </Form.Item>
        </Form> 
      </Row>
    </Row>
  )
}

export default ForgotPasswordForm