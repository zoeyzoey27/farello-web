import React from 'react'
import { 
    Space, 
    Typography, 
    Button, 
    Breadcrumb,
    Descriptions,
    Row, 
    Grid 
} from 'antd'
import { useNavigate } from 'react-router-dom'
import { FiEdit } from 'react-icons/fi'

const AdminInfo = () => {
  const navigate = useNavigate()
  const { Title } = Typography
  const { useBreakpoint } = Grid
  const screens = useBreakpoint()
  return (
    <Space 
        direction="vertical" 
        size="middle" 
        className="w-full h-full bg-white p-10">
        <Title level={4} className="whitespace-pre-wrap">
            Thông tin tài khoản
        </Title>
        <Breadcrumb className="text-[1.6rem] mb-5">
            <Breadcrumb.Item>Thông tin tài khoản</Breadcrumb.Item>
            <Breadcrumb.Item>
               Admin (ID: 12345)
            </Breadcrumb.Item>
        </Breadcrumb>
        <Row className="w-full flex justify-end mb-5">
            <Button 
                size="large" 
                onClick={() => navigate('/admin/addAdmin?action=edit')}
                className="flex items-center justify-center text-[1.6rem] text-white bg-[#154c79] rounded hover:opacity-90 hover:border-[#154c79] hover:bg-[#154c79] hover:text-white hover:shadow-md">
                <FiEdit className="mr-3 text-[2rem]" />
                 Chỉnh sửa
            </Button>
        </Row>
        <Descriptions title="Thông tin chi tiết" layout={screens.md ? 'horizontal' : 'vertical'} bordered>
            <Descriptions.Item 
               label={<Row className="font-semibold">Họ tên</Row>} 
               span={12} 
               className="text-[1.6rem] w-[200px]">
               Admin
            </Descriptions.Item>
            <Descriptions.Item 
               label={<Row className="font-semibold">Admin ID</Row>}  
               span={12} 
               className="text-[1.6rem]">
               ID: 12345
            </Descriptions.Item>
            <Descriptions.Item 
               label={<Row className="font-semibold">Email</Row>}
               span={12} 
               className="text-[1.6rem]">
               admin@gmail.com
            </Descriptions.Item>
            <Descriptions.Item 
               label={<Row className="font-semibold">Số điện thoại</Row>}
               span={12} 
               className="text-[1.6rem]">
               0366057503
            </Descriptions.Item>
            <Descriptions.Item 
               label={<Row className="font-semibold">Tỉnh/Thành Phố</Row>}
               span={12} 
               className="text-[1.6rem]">
               Thành phố Hà Nội
            </Descriptions.Item>
            <Descriptions.Item 
               label={<Row className="font-semibold">Quận/Huyện</Row>}
               span={12} 
               className="text-[1.6rem]">
               Quận Hà Đông
            </Descriptions.Item>
            <Descriptions.Item 
               label={<Row className="font-semibold">Xã/Phường</Row>}
               span={12} 
               className="text-[1.6rem]">
               Nguyễn Trãi
            </Descriptions.Item>
        </Descriptions>
        <Row className="flex justify-end">
            <Button 
               size="large"
               onClick={() => navigate('/admin/deleteAccount')}
               className="w-full md:w-fit bg-white text-black border-[#154c79] rounded hover:text-black hover:bg-white hover:border-[#154c79] hover:opacity-90 text-[1.6rem] hover:shadow-md">
               Xóa tài khoản
            </Button>
        </Row>
    </Space>
  )
}

export default AdminInfo