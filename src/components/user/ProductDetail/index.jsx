import React, { useState, useEffect } from 'react'
import { Breadcrumb, Col, Row, Radio, Button, Image, InputNumber, Spin, message, Rate  } from 'antd'
import './style.css'
import ProductImageSlider from '../../admin/ProductDetailAdmin/ProductImageSlider'
import bst from '../../../assets/images/bst.png'
import PurchasePrivileges from '../PurchasePrivileges'
import numberWithCommas from '../../../utils/NumberWithCommas'
import { useMutation } from '@apollo/client'
import { ADD_PRODUCTS_TO_CART } from './graphql'
import moment from 'moment'
import { DATE_TIME_FORMAT } from '../../../constant'

const ProductDetail = ({product}) => {
    const [loading, setLoading] = useState(false)
    const [valueColor, setValueColor] = useState([])
    const [quantityValue, setQuantityValue] = useState(1)
    const [ratePoint, setRatePoint] = useState(0)
    const [open, setOpen] = useState(false)
    const [addProductToCart] = useMutation(ADD_PRODUCTS_TO_CART)
    const id = localStorage.getItem('id_token')
    const onChange = ({ target: { value } }) => {
        setValueColor(value)
    }
    const showDrawer = () => {
        setOpen(true);
    }
    
    const onClose = () => {
        setOpen(false);
    }
    const onChangeQuantity = (value) => {
        setQuantityValue(value)
    }
    const handleClick = () => {
       setLoading(true)
       const priceProduct = product?.priceSale ? product?.priceSale : product?.priceOut
       addProductToCart({
         variables: {
            productsAddedToCartInput: {
                productId: product?.productId,
                name: product?.name,
                color: valueColor,
                quantity: quantityValue,
                price: priceProduct,
                imageKey: product?.images[0],
                userId: id,
                totalPayment: priceProduct * quantityValue,
                createdAt: moment().format(DATE_TIME_FORMAT),
                updatedAt: moment().format(DATE_TIME_FORMAT),
            }
         },
         onCompleted: () => {
            setLoading(false)
            message.success('Đã thêm sản phẩm vào giỏ hàng!')
         },
         onError: (err) => {
            setLoading(false)
            message.error(`${err.message}`)
         }
       })
    }
    useEffect(() => {
        setValueColor(product?.colours[0])
        if (product?.comments?.length > 0){
            let sum = 0;
            product?.comments?.map((item) => {
                sum+=item.ratePoint
                return null
            })
            setRatePoint(parseInt(sum/product?.comments?.length))
         }
         else setRatePoint(0)
    },[product])
    return (
       <Spin spinning={loading} size="large">
          <Col className="flex flex-col w-full">
          <Breadcrumb className="my-10 px-10 py-2 bg-[#f8f8f8]">
            <Breadcrumb.Item href="/" className="text-[1.6rem]">Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item 
               href={`/products?id=${product?.category?.id}`} 
               className="text-[1.6rem]">
               {product?.category?.name}
            </Breadcrumb.Item>
            <Breadcrumb.Item className="text-[1.6rem] font-semibold">{product?.name}</Breadcrumb.Item>
         </Breadcrumb>
         <Row className="flex">
            <Row className="w-full mb-10 lg:mb-0 lg:w-[50%] !mr-32">
                <ProductImageSlider images={product?.images} />
            </Row>
            <Col className="flex-1">
                <Row className="flex items-center">
                    <Row className="text-[2rem] font-semibold">{product?.name}</Row>
                    <Row className="text-[1.4rem] italic ml-5 text-[#AFAAAA]">
                       {`(Tình trạng: ${product?.status === 'STOCKING' ? 'Còn hàng' : 'Hết hàng'})`}
                    </Row>
                </Row>
                <Rate disabled value={ratePoint} />
                <Row className="text-[1.6rem] my-5">Mã sản phẩm: {product?.productId}</Row>
                <Row className="text-[1.6rem] my-5">Còn lại: {product?.quantity}</Row>
                {product?.priceSale > 0 ? (
                    <>
                    <Row className="text-[1.4rem] line-through text-[#AFAAAA]">
                       {product?.priceOut ? `${numberWithCommas(product?.priceOut)} VND` : ''}
                    </Row>
                    <Row className="text-[2rem] font-semibold">
                       {product?.priceSale ? `${numberWithCommas(product?.priceSale)} VND` : ''}
                    </Row>
                    </>
                ): (
                    <Row className="text-[2rem] font-semibold">
                       {product?.priceOut ? `${numberWithCommas(product?.priceOut)} VND` : ''}
                    </Row>
                )}
                <Row className="mt-10 mb-5 text-[1.6rem]">Chi tiết sản phẩm:</Row>
                <Row className="text-[1.6rem] my-5 flex flex-col bg-[#f8f8f8] rounded py-5 px-10 whitespace-pre-wrap">
                     {product?.description}
                </Row>
                <Row className="flex items-end">
                    <Row className="text-[1.6rem] mr-10">Màu sắc:</Row>
                    <Radio.Group
                        options={product?.colours}
                        onChange={onChange}
                        value={valueColor}
                        optionType="button"
                        buttonStyle="solid"
                    />
                </Row>
                <Row className="flex items-end mt-5">
                    <Row className="text-[1.6rem] mr-10">Số lượng:</Row>
                    <InputNumber min={1} max={product?.quantity} value={quantityValue} onChange={onChangeQuantity} className="rounded" />
                </Row>
                <Button 
                  size="large"
                  onClick={handleClick}
                  className="mt-20 w-full !bg-[#154c79] !border-[#154c79] !text-white hover:bg-[#154c79] hover:text-white hover:border-[#154c79] hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                  Thêm vào giỏ hàng
                </Button>
                <Button 
                  size="large"
                  onClick={showDrawer}
                  className="my-5 w-full h-fit whitespace-pre-wrap border-1 !border-[#154c79] !text-[#154c79] hover:text-[#154c79] hover:border-[#154c79] hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
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
       </Spin>
    )
}

export default ProductDetail