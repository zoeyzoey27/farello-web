import React from 'react'
import { Space, Typography, Row, Button, Breadcrumb } from 'antd'
import { useNavigate } from 'react-router-dom'
import ProductImageSlider from './ProductImageSlider'
import { FiEdit } from 'react-icons/fi'
import './style.css'

const ProductDetailAdmin = () => {
  const { Title } = Typography
  const navigate = useNavigate()
  const images = [
    "https://cdn.kinhmatlily.com/farello01/2022/2/adagio_grey_mau_nu-1639216094000-1644634465000.png",
    "https://cdn.kinhmatlily.com/farello01/2022/2/Adagio_black_mau_nam-1644634465000.jpeg",
    "https://cdn.kinhmatlily.com/farello01/2022/2/Adagio%20grey%201-1644295754000.jpeg",
    "https://cdn.kinhmatlily.com/farello01/2022/2/Adagio_grey_goc_nghieng-1639216094000-1644634442000.jpeg",
    "https://cdn.kinhmatlily.com/farello01/2022/2/Adagio_black_goc_nghieng-1644634442000.jpeg",
  ]
  const listColor = ['Đen', 'Xám']
  return (
    <Space 
       direction="vertical" 
       size="middle" 
       className="w-full h-full bg-white p-10">
       <Title level={4} className="whitespace-pre-wrap">Chi tiết sản phẩm</Title>
       <Breadcrumb className="text-[1.6rem] mb-5">
            <Breadcrumb.Item 
               onClick={() => navigate('/admin/productManagement')}
               className="hover:text-black cursor-pointer">
               Danh sách sản phẩm
            </Breadcrumb.Item>
            <Breadcrumb.Item>ADAGIO</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="flex">
            <Row className="w-1/2 !mr-32">
                <ProductImageSlider images={images} />
            </Row>
            <Row className="flex-1 flex flex-col">
                <Row className="text-[1.8rem] uppercase font-bold">ADAGIO</Row>
                <Row className="text-[1.6rem] text-[#222222] my-10">Mã sản phẩm: 62bd79b51328e231cc39f30c</Row>
                <Row className="text-[1.3rem] text-[#AFAAAA] line-through">1.750.000 VND</Row>
                <Row className="text-[1.8rem] font-bold">1.050.000 VND</Row>
                <Row className="text-[1.6rem] whitespace-pre-wrap bg-[#f8f8f8] rounded p-5 my-5">
                    <Row className="mb-5 font-semibold">Chi tiết sản phẩm:</Row>
                    Một bản nhạc nhẹ nhàng, trầm lắng nhưng đầy sâu sắc hay mở rộng hơn là lời nhắn nhủ sống chậm rãi để nhìn lại và trân quý những gì đang có.
                    Đây chính là thông điệp chính của những chiếc kính Adagio.
                    Sử dụng Acetate cho phần khung kính và càng kính, Stainless Steel cho phần cầu kính,
                    Farello mong muốn đem tới cho khách hàng những chiếc kính tối ưu nhất về cả kiểu dáng lẫn chất liệu.
                </Row>
                <Row className="text-[1.6rem] flex items-end">
                    <Row className="mr-8">Màu sắc:</Row>
                    {
                        listColor.map((color, index) => (
                            <Button 
                                key={index} 
                                size="small" 
                                className="border-1 border-[#154c79] rounded w-fit mt-5 hover:border-1 hover:border-[#154c79] hover:text-black mx-3">
                                {color}
                            </Button>
                        ))
                    }
                </Row>
                <Button 
                   size="large"
                   className="flex items-center justify-center mt-10 text-[1.6rem] text-white bg-[#154c79] rounded hover:opacity-90 hover:border-[#154c79] hover:bg-[#154c79] hover:text-white">
                   <FiEdit className="text-[2rem] mr-3"/>
                   Chỉnh sửa sản phẩm
                </Button>
            </Row>
        </Row>
    </Space>
  )
}

export default ProductDetailAdmin