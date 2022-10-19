import React from 'react'
import { Row, Button, Form, Input, Typography, message } from 'antd'
import { schemaValidate } from '../../../validation/ResetPassword'
import { converSchemaToAntdRule } from '../../../validation'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { RESET_PASSWORD } from './graphql'

const ResetPasswordForm = ({setLoading}) => {
  const { Title } = Typography
  const yupSync = converSchemaToAntdRule(schemaValidate)
  const location = useLocation()
  const state = location.state
  const navigate = useNavigate()
  const [resetPassword] = useMutation(RESET_PASSWORD)
  const onFinish = (values) => {
    if (values.password !== values.rePassword) {
        message.error('Mật khẩu không khớp!')
    }
    else {
        if (state) {
            if (values.code !== state.code) {
                message.error('Mã xác nhận không chính xác!')
            }
            else {
                setLoading(true)
                resetPassword({
                    variables: {
                        userResetPasswordId: state.idUser,
                        password: values.password
                    },
                    onCompleted: () => {
                        setLoading(false)
                        navigate('/login')
                        message.success('Cập nhật mật khẩu thành công!')
                    },
                    onError: (err) => {
                        setLoading(false)
                        message.error(`${err.message}`)
                    }
                })
            }
        }
    }
  }
  return (
    <Row className="w-full flex justify-center mb-20">
    <Row className="py-10 px-20 rounded bg-white w-full md:w-[60%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%] flex flex-col shadow-lg">
      <Title level={3} className="block !mb-10 !text-[#343a40]">Đặt lại mật khẩu</Title>
      <Form
        layout="vertical"
        autoComplete="off"
        onFinish={onFinish}
        className="w-full">
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
        <Form.Item
          name="rePassword"
          label={
            <Row className="font-semibold text-[1.6rem]">
                Nhập lại mật khẩu
                <Row className="text-red-500 ml-3">*</Row>
            </Row>
          }
          required={false}
          rules={[yupSync]}>
          <Input.Password size="large" placeholder="user@123" className="rounded" />
        </Form.Item>
        <Form.Item
          name="code"
          label={
            <Row className="font-semibold text-[1.6rem]">
                Mã xác nhận
                <Row className="text-red-500 ml-3">*</Row>
            </Row>
          }
          required={false}
          rules={[yupSync]}>
          <Input size="large" placeholder="12345" className="rounded" />
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

export default ResetPasswordForm