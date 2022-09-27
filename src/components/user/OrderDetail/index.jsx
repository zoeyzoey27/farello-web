import React from 'react'
import { 
    Space, 
    Row, 
    Breadcrumb,
    Descriptions,
    Grid,
    List,
    Button
} from 'antd'
import { useSearchParams } from 'react-router-dom'

const OrderDetail = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const { useBreakpoint } = Grid
  const screens = useBreakpoint()
  return (
    <Space 
        direction="vertical" 
        size="middle" 
        className="w-full h-full mb-10">
        <Breadcrumb className="my-10 px-10 py-2 bg-[#f8f8f8]">
          <Breadcrumb.Item href="/" className="text-[1.6rem]">Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item href="/listOrderUser" className="text-[1.6rem]">Danh sách đơn hàng</Breadcrumb.Item>
          <Breadcrumb.Item className="text-[1.6rem] font-semibold">
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
            <Row className="text-[1.6rem] self-end mb-10 text-red-500">Trạng thái: Chờ xác nhận</Row>
            <Row className="flex flex-col">
            <List
                header={<Row className="text-[1.6rem]">1 sản phẩm</Row>}
                footer={false}
                bordered>
                <List.Item className="flex flex-col md:flex-row items-start md:justify-between">
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
        <Row className="flex w-full justify-end">
           <Button danger size="large" className="rounded self-end w-full md:w-fit">Hủy đơn hàng</Button>
        </Row>
    </Space>
  )
}

export default OrderDetail