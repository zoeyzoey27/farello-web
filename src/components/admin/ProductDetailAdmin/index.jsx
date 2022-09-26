import React from 'react'
import { Space, Typography, Row, Button, Breadcrumb, Descriptions, PageHeader, Grid  } from 'antd'
import { useNavigate } from 'react-router-dom'
import ProductImageSlider from './ProductImageSlider'
import { FiEdit } from 'react-icons/fi'
import { LeftOutlined } from '@ant-design/icons'

const ProductDetailAdmin = () => {
  const { Title } = Typography
  const { useBreakpoint } = Grid
  const screens = useBreakpoint()
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
       <PageHeader
            className="p-0"
            backIcon={<LeftOutlined className="mb-3" />}
            onBack={() => navigate('/admin/productManagement')}
            title={
              <Title level={4} className="whitespace-pre-wrap">Chi tiết sản phẩm</Title>
            }
        />
       <Breadcrumb className="text-[1.6rem] mb-5">
            <Breadcrumb.Item 
               onClick={() => navigate('/admin/productManagement')}
               className="hover:text-black cursor-pointer">
               Danh sách sản phẩm
            </Breadcrumb.Item>
            <Breadcrumb.Item>ADAGIO</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="flex">
            <Row className="w-full mb-10 xl:mb-0 xl:w-[40%] !mr-32">
                <ProductImageSlider images={images} />
            </Row>
            <Row className="flex-1 flex flex-col">
               <Row className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
                   <Row className="!text-[2rem]">Thông tin sản phẩm</Row>
                   <Button 
                        size="large"
                        className="mt-5 md:mt-0 flex items-center justify-center self-start text-[1.6rem] text-white bg-[#154c79] rounded hover:opacity-90 hover:border-[#154c79] hover:bg-[#154c79] hover:text-white">
                        <FiEdit className="text-[2rem] mr-3"/>
                        Chỉnh sửa
                </Button>
               </Row>
               <Descriptions layout={screens.md ? 'horizontal' : 'vertical'} bordered>
                    <Descriptions.Item 
                       label={<Row className="w-[150px] !font-normal !normal-case">Tên sản phẩm</Row>} 
                       span={3} 
                       className="!text-[1.6rem] font-semibold uppercase">
                       ADAGIO
                    </Descriptions.Item>
                    <Descriptions.Item label="Mã sản phẩm" span={3} className="!text-[1.6rem]">62bd79b51328e231cc39f30c</Descriptions.Item>
                    <Descriptions.Item label="Loại sản phẩm" span={3} className="!text-[1.6rem]">Gọng kính cận</Descriptions.Item>
                    <Descriptions.Item label="Số lượng" span={3} className="!text-[1.6rem]">10</Descriptions.Item>
                    <Descriptions.Item label="Giá nhập" span={3} className="!text-[1.6rem]"></Descriptions.Item>
                    <Descriptions.Item 
                       label={<Row className="!text-black">Giá bán</Row>}  
                       span={3} 
                       className="!text-[1.6rem] text-sky-500">
                       1.750.000 VND
                    </Descriptions.Item>
                    <Descriptions.Item 
                       label={<Row className="!text-black">Giá khuyến mại</Row>} 
                       span={3} 
                       className="!text-[1.6rem] text-red-500">
                       1.050.000 VND
                    </Descriptions.Item>
                    <Descriptions.Item label="Màu sắc" span={3} className="!text-[1.6rem]">
                        <Row className="whitespace-pre-wrap">
                            {
                                listColor.map((color, index) => (
                                   <Row key={index}>{`${color}${index===listColor.length-1 ? '' : ', '}`}</Row>
                                ))
                            }
                        </Row>
                    </Descriptions.Item>
                    <Descriptions.Item label="Mô tả sản phẩm" span={3} className="!text-[1.6rem]">
                        Một bản nhạc nhẹ nhàng, trầm lắng nhưng đầy sâu sắc hay mở rộng hơn là lời nhắn nhủ sống chậm rãi để nhìn lại và trân quý những gì đang có.
                        Đây chính là thông điệp chính của những chiếc kính Adagio.
                        Sử dụng Acetate cho phần khung kính và càng kính, Stainless Steel cho phần cầu kính,
                        Farello mong muốn đem tới cho khách hàng những chiếc kính tối ưu nhất về cả kiểu dáng lẫn chất liệu.
                    </Descriptions.Item>
                </Descriptions>
            </Row>
        </Row>
    </Space>
  )
}

export default ProductDetailAdmin