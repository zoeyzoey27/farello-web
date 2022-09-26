import React from 'react'
import { 
    Space, 
    Row, 
    Typography, 
    PageHeader,
    Breadcrumb,
    Descriptions,
    Grid, 
    Select,
    List
} from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'

const OrderDetailAdmin = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const { Title } = Typography
  const { Option } = Select
  const { useBreakpoint } = Grid
  const screens = useBreakpoint()
  return (
    <Space 
        direction="vertical" 
        size="middle" 
        className="w-full h-full bg-white p-10">
        <PageHeader
            className="p-0"
            backIcon={<LeftOutlined className="mb-3" />}
            onBack={() => navigate('/admin/orderManagement')}
            title={
               <Title level={4} className="whitespace-pre-wrap">
                  Chi tiết đơn hàng
               </Title>
            }
        />
        <Breadcrumb className="text-[1.6rem] mb-5">
            <Breadcrumb.Item 
               onClick={() => navigate('/admin/orderManagement')}
               className="hover:text-black cursor-pointer">
               Danh sách đơn hàng
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              Đơn hàng (ID: {id})
            </Breadcrumb.Item>
        </Breadcrumb>
        <Row className="font-semibold text-[1.8rem]">Thông tin khách hàng</Row>
        <Descriptions layout={screens.lg ? 'horizontal' : 'vertical'}>
            <Descriptions.Item label={<Row className="font-semibold text-[1.6rem]">Họ tên</Row>}>
               <Row className="text-[1.6rem]">Hà Loan</Row>
            </Descriptions.Item>
            <Descriptions.Item label={<Row className="font-semibold text-[1.6rem]">Số điện thoại</Row>}>
               <Row className="text-[1.6rem]">0123456789</Row>
            </Descriptions.Item>
            <Descriptions.Item label={<Row className="font-semibold text-[1.6rem]">Email</Row>}>
              <Row className="text-[1.6rem]">haloan@gmail.com</Row>
            </Descriptions.Item>
            <Descriptions.Item 
               label={<Row className="font-semibold text-[1.6rem]">Địa chỉ nhận hàng</Row>}
               span={3}>
               <Row className="text-[1.6rem]">Hà Nội</Row>
            </Descriptions.Item>
            <Descriptions.Item label={<Row className="font-semibold text-[1.6rem]">Ghi chú</Row>}>
               <Row className="text-[1.6rem]">Không</Row>
            </Descriptions.Item>
        </Descriptions>
        <hr/>
        <Row className="font-semibold text-[1.8rem]">Thông tin đơn hàng</Row>
        <Row className="flex flex-col w-full">
            <Select size="large" className="rounded w-[220px] self-end mb-10" defaultValue={1}>
                <Option value={1} className="text-[1.6rem]">Chờ xác nhận</Option>
                <Option value={2} className="text-[1.6rem]">Đã xác nhận</Option>
                <Option value={3} className="text-[1.6rem]">Đã đóng gói</Option>
                <Option value={4} className="text-[1.6rem]">Đã giao cho ĐVVC</Option>
                <Option value={5} className="text-[1.6rem]">Giao hàng thành công</Option>
                <Option value={6} className="text-[1.6rem]">Hủy</Option>
            </Select>
            <Row className="flex flex-col">
            <List
                header={<Row className="text-[1.6rem]">1 sản phẩm</Row>}
                footer={false}
                bordered>
                <List.Item className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <Row className="flex flex-col text-[1.6rem]">
                        <Row>Tên sản phẩm: Agape - Lava Silver</Row>
                        <Row>Số lượng: 1</Row>
                        <Row>Phân loại: Đen</Row>
                        <Row>Giá tiền: 1.750.000</Row>
                    </Row>
                    <img src="https://cdn.kinhmatlily.com/farello01/2022/2/adagio_grey_mau_nu-1639216094000-1644634465000.png" alt="" className="w-[200px] mt-3 md:mt-0" />
                </List.Item>
            </List> 
            <List
                header={false}
                footer={false}
                className="mt-5"
                bordered>
                <List.Item className="flex items-start justify-between">
                    <Row className="text-[1.6rem]">Đơn hàng:</Row>
                    <Row className="text-[1.6rem]">1.750.000</Row>
                </List.Item>
                <List.Item className="flex items-start justify-between">
                    <Row className="text-[1.6rem]">Ship:</Row>
                    <Row className="text-[1.6rem]">30.000</Row>
                </List.Item>
                <List.Item className="flex items-start justify-between">
                    <Row className="text-[2rem] font-semibold uppercase">Tổng đơn:</Row>
                    <Row className="text-[2rem] font-semibold">1.750.000</Row>
                </List.Item>
            </List>       
            </Row>
            </Row>
    </Space>
  )
}

export default OrderDetailAdmin