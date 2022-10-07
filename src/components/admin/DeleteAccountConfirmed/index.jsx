import React, { useState } from 'react'
import { 
    Space, 
    Typography, 
    Button,
    PageHeader,
    Row,
    message,
    Spin
} from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { ADMIN_DELETE_ACCOUNT } from './graphql'

const DeleteAccountConfirmed = () => {
  const { Title } = Typography
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const [loading, setLoading] = useState(false)
  const [deleteAccount] = useMutation(ADMIN_DELETE_ACCOUNT)
  const handleDelete = () => {
    setLoading(true)
    deleteAccount({
      variables: {
        deleteAdminAccountId: id
      },
      onCompleted: () => {
        setLoading(false)
        navigate("/admin/login")
        message.success('Đã xóa tài khoản!')
        localStorage.removeItem("token_admin")
        localStorage.removeItem("id_token_admin")
      },
      onError: (err) => {
        setLoading(false)
        message.error(`${err.message}`)
      }
    })
  }
  return (
    <Spin spinning={loading} size="large">
        <Space 
          direction="vertical" 
          size="middle" 
          className="w-full h-full bg-white p-10">
          <PageHeader
              className="p-0"
              backIcon={<LeftOutlined className="mb-3" />}
              onBack={() => navigate('/admin/deleteAccount')}
              title={
                <Title level={4} className="whitespace-pre-wrap">
                    Xóa tài khoản
                </Title>
              }
          />
          <Row className="bg-[#f8f8f8] pt-10 pb-[50px] px-10 flex flex-col">
              <Row className="text-[1.6rem] font-semibold mb-10">Bạn có chắc muốn xóa tài khoản?</Row>
              <Row className="text-[1.6rem] mb-10">
                Sau khi xóa tài khoản, bạn sẽ mất toàn bộ quyền Admin và không thể truy cập vào hệ thống?
                <br />
                Vẫn tiếp tục xóa tài khoản?
              </Row>
          </Row>
          <Row>
            <Button 
                size="large"
                onClick={() => navigate(`/admin/deleteAccount?id=${id}`)}
                className="md:mr-5 w-full md:w-[150px] !bg-white !text-black !border-[#154c79] rounded hover:text-black hover:bg-white hover:border-[#154c79] hover:opacity-90 text-[1.6rem] hover:shadow-md">
                Quay lại
              </Button>
            <Button 
                size="large"
                onClick={handleDelete}
                className="w-full md:w-[150px] !bg-[#154c79] !border-[#154c79] !text-white hover:bg-[#154c79] hover:text-white hover:border-[#154c79] hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                Xóa tài khoản
              </Button>
          </Row>
          
      </Space>
    </Spin>
  )
}

export default DeleteAccountConfirmed