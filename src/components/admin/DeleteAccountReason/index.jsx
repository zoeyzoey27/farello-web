import React from 'react'
import { 
    Space, 
    Typography, 
    Button, 
    Select,
    PageHeader,
    Row
} from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate, useSearchParams } from 'react-router-dom'

const DeleteAccountReason = () => {
  const { Option } = Select
  const { Title } = Typography
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  return (
    <Space 
        direction="vertical" 
        size="middle" 
        className="w-full h-full bg-white p-10">
        <PageHeader
            className="p-0"
            backIcon={<LeftOutlined className="mb-3" />}
            onBack={() => navigate('/admin/adminInfo')}
            title={
               <Title level={4} className="whitespace-pre-wrap">
                  Xóa tài khoản
               </Title>
            }
        />
        <Row className="bg-[#f8f8f8] pt-10 pb-[50px] px-10 flex flex-col">
            <Row className="text-[1.6rem] mb-10">Vui lòng chọn 1 lý do xóa tài khoản</Row>
            <Select size="large" className="w-full md:w-1/2 lg:w-1/3 text-[1.6rem]" defaultValue="NOT_USED">
                <Option value="NOT_USED" className="text-[1.6rem]">Tài khoản không được sử dụng</Option>
                <Option value="NOT_ALLOWED" className="text-[1.6rem]">Tài khoản đã hết quyền truy cập vào hệ thống</Option>
                <Option value="ORTHERS" className="text-[1.6rem]">Lý do khác</Option>
            </Select>
        </Row>
        <Row>
           <Button 
              size="large"
              onClick={() => navigate(`/admin/adminInfo?id=${id}`)}
              className="md:mr-5 w-full md:w-[150px] !bg-white !text-black !border-[#154c79] rounded hover:text-black hover:bg-white hover:border-[#154c79] hover:opacity-90 text-[1.6rem] hover:shadow-md">
              Quay lại
            </Button>
           <Button 
              size="large"
              onClick={() => navigate(`/admin/deleteAccountConfirm?id=${id}`)}
              className="w-full md:w-[150px] !bg-[#154c79] !border-[#154c79] !text-white hover:bg-[#154c79] hover:text-white hover:border-[#154c79] hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
              Tiếp tục
            </Button>
        </Row>
        
    </Space>
  )
}

export default DeleteAccountReason