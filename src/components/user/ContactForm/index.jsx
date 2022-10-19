import React from 'react'
import { Space, Breadcrumb, Typography, Row, Form, Input, Button, message } from 'antd'
import { schemaValidate } from '../../../validation/CreateInquiry'
import { converSchemaToAntdRule } from '../../../validation'
import { AiOutlineMail } from 'react-icons/ai'
import { useMutation } from '@apollo/client'
import { CREATE_INQUIRY } from './graphql'
import moment from 'moment'
import { DATE_TIME_FORMAT } from '../../../constant'

const ContactForm = ({setLoading}) => {
  const { Title } = Typography
  const { TextArea } = Input
  const [form] = Form.useForm()
  const yupSync = converSchemaToAntdRule(schemaValidate)
  const [createInquiry] = useMutation(CREATE_INQUIRY)
  const onFinish = async (values) => {
     setLoading(true)
     await createInquiry({
        variables: {
            inquiryInput: {
                fullName: values.fullName,
                email: values.email,
                phoneNumber: values.phoneNumber,
                content: values.content,
                isRead: false,
                createdAt: moment().format(DATE_TIME_FORMAT),
                updatedAt: moment().format(DATE_TIME_FORMAT),
            }
        },
        onCompleted: () => {
            setLoading(false)
            form.resetFields()
            message.success('Đã gửi phản hồi!')
        },
        onError: (err) => {
            setLoading(false)
            message.success(`${err.message}`)
        }
     })
  }
  return (
    <Space direction="vertical" size="middle" className="w-full h-full mb-10">
        <Breadcrumb className="my-10 px-10 py-2 bg-[#f8f8f8]">
          <Breadcrumb.Item href="/" className="text-[1.6rem]">Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item className="text-[1.6rem] font-semibold">
              Liên hệ
          </Breadcrumb.Item>
        </Breadcrumb> 
        <Title level={3} className="block !text-[#343a40] text-center uppercase">Gửi phản hồi cho chúng tôi</Title>
        <Row className="justify-center items-center flex text-[1.6rem]">
           <Row className="w-full md:w-[60%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%] text-center">
               Bạn vẫn còn băn khoăn hoặc có ý kiến muốn đóng góp? Hãy để lại thông tin và gửi 
               phản hồi của bạn tại đây để chúng tôi có thể hỗ trợ bạn ngay khi Farello đã tiếp nhận được thông tin nhé!
           </Row>
        </Row>
        <Row className="my-10 mx-auto w-full md:w-[60%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%] flex flex-col">
            <Form
                layout="vertical"
                form={form}
                autoComplete="off"
                onFinish={onFinish}
                className="w-full">
                <Form.Item
                    name="fullName"
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
                    name="phoneNumber"
                    label={
                    <Row className="font-semibold text-[1.6rem]">
                        Số điện thoại
                        <Row className="text-red-500 ml-3">*</Row>
                    </Row>
                    }
                    required={false}
                    rules={[yupSync]}>
                    <Input size="large" placeholder="0123456789" className="rounded" />
                </Form.Item>
                <Form.Item
                  name="content"
                  required={false}
                  rules={[yupSync]}
                  label={
                    <Row className="font-semibold text-[1.6rem]">
                      Nội dung
                      <Row className="text-red-500 ml-3">*</Row>
                    </Row>
                  }>
                  <TextArea className="resize-none text-[1.6rem] !h-[150px] rounded" />
              </Form.Item>
                <Form.Item>
                    <Button 
                        htmlType="submit" 
                        size="large" 
                        className="flex items-center justify-center !bg-colorTheme !text-white !border-colorTheme hover:bg-colorTheme hover:text-white hover:border-colorTheme w-full mt-5 font-semibold !text-[1.6rem] hover:opacity-90 hover:shadow-lg rounded">
                        <AiOutlineMail className="mr-3 text-[2rem]" />
                        Gửi phản hồi
                    </Button>
                </Form.Item>
            </Form>
        </Row>
    </Space>
  )
}

export default ContactForm