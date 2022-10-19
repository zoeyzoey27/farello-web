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
import { useQuery } from '@apollo/client'
import { GET_ADMIN } from './graphql'

const AdminInfo = ({id, setLoading}) => {
  const navigate = useNavigate()
  const { Title } = Typography
  const { useBreakpoint } = Grid
  const screens = useBreakpoint()
  const { data } = useQuery(GET_ADMIN, {
   variables: {
      adminId: id
   },
   onCompleted: () => {
      setLoading(false)
   }
  })
  return (
    <Space 
        direction="vertical" 
        size="middle" 
        className="w-full h-full bg-white p-10">
        <Title level={4} className="whitespace-pre-wrap">
            Thông tin tài khoản
        </Title>
        <Breadcrumb className="text-[1.6rem] mb-5 px-10 py-2 bg-[#f8f8f8] ">
              <Breadcrumb.Item 
                onClick={() => navigate('/admin/dashboard')}
                className="hover:text-black cursor-pointer">
                Bảng điều khiển
              </Breadcrumb.Item>
            <Breadcrumb.Item>Thông tin tài khoản</Breadcrumb.Item>
            <Breadcrumb.Item className="font-semibold">
               {`${data?.admin?.fullName} (ID: ${data?.admin?.adminId})`}
            </Breadcrumb.Item>
        </Breadcrumb>
        <Row className="w-full flex justify-end mb-5">
            <Button 
                size="large" 
                onClick={() => navigate(`/admin/addAdmin?action=edit&id=${id}`)}
                className="flex items-center justify-center text-[1.6rem] text-white bg-colorTheme rounded hover:opacity-90 hover:border-colorTheme hover:bg-colorTheme hover:text-white hover:shadow-md">
                <FiEdit className="mr-3 text-[2rem]" />
                 Chỉnh sửa
            </Button>
        </Row>
        <Descriptions title="Thông tin chi tiết" layout={screens.md ? 'horizontal' : 'vertical'} bordered>
            <Descriptions.Item 
               label={<Row className="font-semibold">Họ tên</Row>} 
               span={12} 
               className="text-[1.6rem] w-[200px]">
               {data?.admin?.fullName}
            </Descriptions.Item>
            <Descriptions.Item 
               label={<Row className="font-semibold">Admin ID</Row>}  
               span={12} 
               className="text-[1.6rem]">
               {`ID: ${data?.admin?.adminId}`}
            </Descriptions.Item>
            <Descriptions.Item 
               label={<Row className="font-semibold">Email</Row>}
               span={12} 
               className="text-[1.6rem]">
               {data?.admin?.email}
            </Descriptions.Item>
            <Descriptions.Item 
               label={<Row className="font-semibold">Số điện thoại</Row>}
               span={12} 
               className="text-[1.6rem]">
               {data?.admin?.phoneNumber}
            </Descriptions.Item>
            <Descriptions.Item 
               label={<Row className="font-semibold">Số CMT/CCCD</Row>}
               span={12} 
               className="text-[1.6rem]">
               {data?.admin?.idCard}
            </Descriptions.Item>
            <Descriptions.Item 
               label={<Row className="font-semibold">Ngày sinh</Row>}
               span={12} 
               className="text-[1.6rem]">
               {data?.admin?.birthday}
            </Descriptions.Item>
            <Descriptions.Item 
               label={<Row className="font-semibold">Địa chỉ</Row>}
               span={12} 
               className="text-[1.6rem]">
               {data?.admin?.address}
            </Descriptions.Item>
        </Descriptions>
        <Row className="flex justify-end">
            <Button 
               size="large"
               onClick={() => navigate(`/admin/deleteAccount?id=${id}`)}
               className="w-full md:w-fit bg-white text-red-500 border-red-500 rounded hover:text-red-500 hover:bg-white hover:border-red-500 hover:opacity-90 text-[1.6rem] hover:shadow-md">
               Xóa tài khoản
            </Button>
        </Row>
    </Space>
  )
}

export default AdminInfo