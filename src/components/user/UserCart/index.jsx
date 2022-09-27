import React, {useState} from 'react'
import { Space, Breadcrumb, List, Row, InputNumber, Button  } from 'antd'
import { ShoppingOutlined } from '@ant-design/icons'
import { MdOutlineDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const UserCart = () => {
  const navigate = useNavigate()
  const [valueInput, setValueInput] = useState(1)
  const onChange = (value) => {
    console.log('changed', value)
    setValueInput(value)
  }
  return (
    <Space 
      direction="vertical" 
      size="middle" 
      className="w-full h-full mb-10">
      <Breadcrumb className="my-10 px-10 py-2 bg-[#f8f8f8]">
          <Breadcrumb.Item href="/" className="text-[1.6rem]">Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item className="text-[1.6rem] font-semibold">
              Giỏ hàng
          </Breadcrumb.Item>
      </Breadcrumb> 
      <Row className="flex flex-col lg:flex-row lg:justify-between">
        <List
          header={
            <Row className="text-[1.6rem] font-semibold flex items-center">
              <ShoppingOutlined className="text-[2rem] mr-3" />
              Tổng giỏ hàng: 2 sản phẩm
            </Row>
          }
          className="w-full lg:w-[60%] lg:mr-10"
          footer={false}
          bordered>
          <List.Item className="flex flex-col md:flex-row items-start justify-start">
              <img 
                src="https://cdn.kinhmatlily.com/farello01/2022/2/adagio_grey_mau_nu-1639216094000-1644634465000.png" 
                alt="" 
                className="w-full md:w-[200px] mb-3 md:mb-0 md:mr-10" />
              <Row className="flex flex-col text-[1.6rem] w-full md:flex-1">
                  <Row>Tên sản phẩm: Agape - Lava Silver</Row>
                  <Row>Phân loại: Đen</Row>
                  <Row>Giá tiền: <b className="ml-1">1.750.000</b></Row>
                  <InputNumber min={1} value={valueInput} onChange={onChange} className="rounded my-3 text-black" />
                  <Button 
                     size="small"
                     className="rounded self-end border-red-500 text-red-500 hover:border-red-500 hover:text-red-500 hover:opacity-90 hover:shadow-lg flex items-center justify-center">
                     <MdOutlineDelete className="text-[1.7rem] mr-2" />
                     Xóa
                  </Button>
              </Row>
          </List.Item>
          <List.Item className="flex flex-col md:flex-row items-start justify-start">
              <img 
                src="https://cdn.kinhmatlily.com/farello01/2022/2/adagio_grey_mau_nu-1639216094000-1644634465000.png" 
                alt="" 
                className="w-full md:w-[200px] mb-3 md:mb-0 md:mr-10" />
              <Row className="flex flex-col text-[1.6rem] w-full md:flex-1">
                  <Row>Tên sản phẩm: Agape - Lava Silver</Row>
                  <Row>Phân loại: Đen</Row>
                  <Row>Giá tiền: <b className="ml-1">1.750.000</b></Row>
                  <InputNumber min={1} value={valueInput} onChange={onChange} className="rounded my-3 text-black" />
                  <Button 
                     size="small"
                     className="rounded self-end border-red-500 text-red-500 hover:border-red-500 hover:text-red-500 hover:opacity-90 hover:shadow-lg flex items-center justify-center">
                     <MdOutlineDelete className="text-[1.7rem] mr-2" />
                     Xóa
                  </Button>
              </Row>
          </List.Item>
        </List> 
        <List
           header={
            <Row className="text-[1.6rem] font-semibold">
              Đơn hàng
            </Row>
          }
          footer={false}
          className="mt-5 lg:mt-0 flex-1 h-fit"
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
          <Button 
            size="large" 
            onClick={() => navigate('/userOrderProduct')}
            className="mt-20 w-full border-b-0 border-x-0 text-white bg-[#154c79] text-[1.6rem] font-semibold hover:opacity-90 hover:bg-[#154c79] hover:text-white hover:border-[#154c79]">
            Tiếp tục thanh toán
          </Button>
      </List>
      </Row>
    </Space>
  )
}

export default UserCart