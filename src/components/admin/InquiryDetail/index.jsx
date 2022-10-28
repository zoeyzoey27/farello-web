import React from 'react'
import { Space, Comment, Tooltip, Row, Avatar, Button, Divider, Form, Input, Typography, message } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { ADMIN_REP_INQUIRY, GET_INQUIRY, UPDATE_STATUS_INQUIRY } from './graphql'
import { UserOutlined } from '@ant-design/icons'
import { TbPoint } from 'react-icons/tb'
import { DATE_TIME_FORMAT } from '../../../constant'
import moment from 'moment'
import emailjs from '@emailjs/browser'
import i18n from '../../../translation'

const InquiryDetail = ({inquiryId, setLoading}) => {
  const { TextArea } = Input
  const { Text } = Typography
  const [form] = Form.useForm()
  const [updateStatus] = useMutation(UPDATE_STATUS_INQUIRY)
  const [adminRepInquiry] = useMutation(ADMIN_REP_INQUIRY)
  const { data } = useQuery(GET_INQUIRY, {
    variables: {
        getInquiryId: inquiryId
    }
  })
  const onSubmit = async (values) => {
    setLoading(true)
    const templateParams = {
        email: data?.getInquiry?.email,
        content: values.content
    }
    emailjs.send('service_3j0uyuv', 'template_uovby0r', templateParams, 'kRmmE_FN69-XkGUuX')
    await adminRepInquiry({
        variables: {
            adminRepInquiryInput: {
                userInquiryId: inquiryId,
                content: values.content,
                adminId: localStorage.getItem("id_token_admin"),
                createdAt: moment().format(DATE_TIME_FORMAT),
                updatedAt: moment().format(DATE_TIME_FORMAT)
            }
        },
        onCompleted: () => {
            setLoading(false)
            form.resetFields()
            message.success(i18n.t('inquiryDetail.messageSuccess'))
        },
        onError: (err) => {
            setLoading(false)
            message.err(`${err.message}`)
        },
        refetchQueries: () => [
            {
              query: GET_INQUIRY,
              variables: {
                getInquiryId: inquiryId
              }
            },
          ],
    })
  }
  const handleClick = () => {
    setLoading(true)
    updateStatus({
        variables: {
            updateStatusInquiryId: inquiryId,
            isRead: false,
            updatedAt: moment().format(DATE_TIME_FORMAT)
        },
        onCompleted: () => {
            setLoading(false)
        }
    })
  }
  return (
    <Space direction="vertical" size="middle" className="w-full">
        <Row 
           onClick={handleClick}
           className="flex items-center justify-end text-[1.4rem] cursor-pointer text-blue-500 hover:opacity-80">
           <TbPoint className="mr-1 text-[1.8rem]" />
           {i18n.t('inquiryDetail.unread')}
        </Row>
        <Comment
            className="w-full"
            author={<Row className="text-[1.6rem]">{data?.getInquiry?.fullName}</Row>}
            avatar={<Avatar size={45} icon={<UserOutlined />} className="flex items-center justify-center" />}
            content={
                <Row className="whitespace-pre-wrap text-[1.6rem] mt-3">
                    {data?.getInquiry?.content}
                </Row>
            }
            datetime={
                <Tooltip>
                    <Row>{data?.getInquiry?.createdAt}</Row>
                </Tooltip>
            } />
        <Divider className="my-0" />    
        <Row className="font-semibold text-[1.6rem]">{i18n.t('inquiryDetail.adminRep')}</Row> 
        {
            data?.getInquiry?.adminRepInquiry?.length > 0 && (
                data?.getInquiry?.adminRepInquiry?.map((item) => (
                    <Comment
                        className="w-full"
                        key={item.id}
                        author={<Row className="text-[1.6rem]">{`${item?.createdBy?.fullName} (ID: ${item?.createdBy?.adminId})`}</Row>}
                        avatar={
                            <Avatar 
                                style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} 
                                className="w-[45px] h-[45px] flex items-center justify-center text-[1.8rem] font-semibold">
                                {item.createdBy?.fullName ? item.createdBy?.fullName.slice(0,2).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D") : 'Ad'}
                            </Avatar>
                        }
                        content={
                            <Row className="whitespace-pre-wrap text-[1.6rem] mt-3">
                                {item?.content}
                            </Row>
                        }
                        datetime={
                            <Tooltip>
                                <Row>{item?.createdAt}</Row>
                            </Tooltip>
                        } />
                ))
            )
        }
        <Form form={form} layout="vertical" autoComplete="off" onFinish={onSubmit}>
            <Form.Item name="content">
               <TextArea rows={5} className="resize-none" />
            </Form.Item>
            <Form.Item>
                <Button 
                    size="large" 
                    htmlType="submit"
                    className="!bg-colorTheme !text-white !border-colorTheme hover:bg-colorTheme hover:text-white hover:border-colorTheme mt-5 !text-[1.6rem] hover:opacity-90 hover:shadow-lg rounded">
                    {i18n.t('inquiryDetail.buttonSubmit')}
                </Button>
            </Form.Item>
            <Text italic>{i18n.t('inquiryDetail.subtext')}</Text>
        </Form>
    </Space>
  )
}

export default InquiryDetail