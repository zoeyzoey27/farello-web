import React, { useState } from 'react'
import { Breadcrumb, Col, Row, Radio, Button, Image } from 'antd'
import { useQuery } from '@apollo/client'
import { getSingleProduct } from '../../../graphqlClient/queries'
import { useSearchParams } from 'react-router-dom'
import './style.css'
import ProductImageSlider from '../../admin/ProductDetailAdmin/ProductImageSlider'
import bst from '../../../assets/images/bst.png'
import PurchasePrivileges from '../PurchasePrivileges'

const ProductDetail = () => {
    const [value, setValue] = useState('black')
    const [open, setOpen] = useState(false)
    const [searchParams] = useSearchParams()
    const productId = searchParams.get('id')
    const { loading, error, data } = useQuery(getSingleProduct, {
        variables: {
            id: productId
        },
        skip: productId === null
    })
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>
    const options = [
        { label: 'Đen', value: 'black' },
        { label: 'Xám', value: 'gray' },
      ]
    const onChange = ({ target: { value } }) => {
        console.log('radio4 checked', value)
        setValue(value)
    }
    const showDrawer = () => {
        setOpen(true);
    }
    
    const onClose = () => {
        setOpen(false);
    }
    return (
       <Col className="flex flex-col w-full">
          <Breadcrumb className="my-10 px-10 py-2 bg-[#f8f8f8]">
            <Breadcrumb.Item href="/" className="text-[1.6rem]">Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item 
               href={`/products?id=${data?.product?.category?.id}`} 
               className="text-[1.6rem]">
               {data?.product?.category?.name}
            </Breadcrumb.Item>
            <Breadcrumb.Item className="text-[1.6rem] font-semibold">{data?.product?.name}</Breadcrumb.Item>
         </Breadcrumb>
         <Row className="flex">
            <Row className="w-full mb-10 lg:mb-0 lg:w-[50%] !mr-32">
                <ProductImageSlider images={data?.product?.images} />
            </Row>
            <Col className="flex-1">
                <Row className="text-[2rem] font-semibold">{data?.product?.name}</Row>
                <Row className="text-[1.6rem] my-5">Mã sản phẩm: {data?.product?.id}</Row>
                <Row className="text-[1.4rem] line-through text-[#AFAAAA]">{data?.product?.priceOrigin} VND</Row>
                <Row className="text-[2rem] font-semibold">{data?.product?.priceSale} VND</Row>
                <Row className="font-semibold mt-10 mb-5 text-[1.6rem]">Chi tiết sản phẩm</Row>
                <Row className="text-[1.6rem] my-5 flex flex-col bg-[#f8f8f8] rounded py-5 px-10">
                     {data?.product?.description}
                </Row>
                <Row className="flex items-end">
                    <Row className="text-[1.6rem] mr-10">Màu sắc:</Row>
                    <Radio.Group
                        options={options}
                        onChange={onChange}
                        value={value}
                        optionType="button"
                        buttonStyle="solid"
                    />
                </Row>
                <Button 
                  size="large"
                  className="mt-20 w-full bg-[#154c79] text-white hover:bg-[#154c79] hover:text-white hover:border-[#154c79] hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                  Thêm vào giỏ hàng
                </Button>
                <Button 
                  size="large"
                  onClick={showDrawer}
                  className="my-5 w-full h-fit whitespace-pre-wrap border-1 border-[#154c79] text-[#154c79] hover:text-[#154c79] hover:border-[#154c79] hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                  Đặc quyền mua sản phẩm tại Farello
                </Button>
            </Col>
         </Row>
         <Row className="flex flex-col items-center justify-center my-10 text-[1.6rem] text-center">
             <Image src={bst} alt="" />
             <Row className="font-semibold uppercase my-5">BỘ SẢN PHẨM KHI MUA KÍNH TẠI FARELLO</Row>
             <Row className="w-full md:w-1/2">Khi mua hàng tại Farello bạn sẽ nhận được các phụ kiện như: Kính mắt, túi tote, bao da đựng kính, thẻ bảo hành, set nước lau kính, hộp đựng kính</Row> 
         </Row>
         <PurchasePrivileges onClose={onClose} visible={open} />
       </Col>
    )
}

export default ProductDetail