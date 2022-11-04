import React, { useState } from 'react'
import { Space, Typography, Row, Button, Breadcrumb, Descriptions, PageHeader, Grid  } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ProductImageSlider from './ProductImageSlider'
import { FiEdit } from 'react-icons/fi'
import { LeftOutlined } from '@ant-design/icons'
import { useQuery } from '@apollo/client'
import { GET_PRODUCT } from './graphql'
import numberWithCommas from '../../../utils/NumberWithCommas'
import i18n from '../../../translation'

const ProductDetailAdmin = ({setLoading}) => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const { Title } = Typography
  const { useBreakpoint } = Grid
  const screens = useBreakpoint()
  const navigate = useNavigate()
  const [images, setImages] = useState([])
  const { data } = useQuery(GET_PRODUCT, {
    variables: {
        productId: id,
    },
    onCompleted: (resData) => {
        setImages(resData?.product?.images)
        setLoading(false)
    }
  })
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
              <Title level={4} className="whitespace-pre-wrap">{i18n.t('productDetailAdmin.title')}</Title>
            }
        />
       <Breadcrumb className="text-[1.6rem] mb-5">
            <Breadcrumb.Item 
                onClick={() => navigate('/admin/dashboard')}
                className="hover:text-black cursor-pointer">
                {i18n.t('common.dashboard')}
              </Breadcrumb.Item>
            <Breadcrumb.Item 
               onClick={() => navigate('/admin/productManagement')}
               className="hover:text-black cursor-pointer">
               {i18n.t('productDetailAdmin.listProduct')}
            </Breadcrumb.Item>
            <Breadcrumb.Item className="font-semibold">{data?.product?.name}</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="flex">
            <Row className="w-full mb-10 xl:mb-0 xl:w-[40%] !mr-32">
                <ProductImageSlider images={images} />
            </Row>
            <Row className="flex-1 flex flex-col">
               <Row className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
                   <Row className="!text-[2rem]">{i18n.t('productDetailAdmin.productInfo')}</Row>
                   <Button 
                        size="large"
                        className="mt-5 md:mt-0 flex items-center justify-center self-start text-[1.6rem] text-white bg-colorTheme rounded hover:opacity-90 hover:border-colorTheme hover:bg-colorTheme hover:text-white">
                        <FiEdit className="text-[2rem] mr-3"/>
                        {i18n.t('productDetailAdmin.editButton')}
                </Button>
               </Row>
               <Descriptions layout={screens.md ? 'horizontal' : 'vertical'} bordered>
                    <Descriptions.Item 
                       label={<Row className="w-[150px] !font-normal !normal-case">{i18n.t('product.name')}</Row>} 
                       span={3} 
                       className="!text-[1.6rem] font-semibold uppercase">
                       {data?.product?.name}
                    </Descriptions.Item>
                    <Descriptions.Item label={i18n.t('product.id')} span={3} className="!text-[1.6rem]">{data?.product?.productId}</Descriptions.Item>
                    <Descriptions.Item label={i18n.t('product.category')} span={3} className="!text-[1.6rem]">{data?.product?.category?.name}</Descriptions.Item>
                    <Descriptions.Item label={i18n.t('product.quantity')} span={3} className="!text-[1.6rem]">{data?.product?.quantity}</Descriptions.Item>
                    <Descriptions.Item label={i18n.t('product.priceIn')} span={3} className="!text-[1.6rem]">
                      {`${data?.product?.priceIn ? `${numberWithCommas(data?.product?.priceIn)} VND` : ''}`}
                    </Descriptions.Item>
                    <Descriptions.Item 
                       label={<Row className="!text-black">{i18n.t('product.priceOut')}</Row>}  
                       span={3} 
                       className="!text-[1.6rem] text-sky-500">
                       {`${data?.product?.priceOut ? `${numberWithCommas(data?.product?.priceOut)} VND` : ''}`}
                    </Descriptions.Item>
                    <Descriptions.Item 
                       label={<Row className="!text-black">{i18n.t('product.priceSale')}</Row>} 
                       span={3} 
                       className="!text-[1.6rem] text-red-500">
                       {`${data?.product?.priceSale ? `${numberWithCommas(data?.product?.priceSale)} VND` : ''}`}
                    </Descriptions.Item>
                    <Descriptions.Item label={i18n.t('product.color')} span={3} className="!text-[1.6rem]">
                        <Row className="whitespace-pre-wrap">
                            {
                                data?.product?.colours.map((color, index) => (
                                   <Row key={index}>{`${color}${index===data?.product?.colours.length-1 ? '' : ', '}`}</Row>
                                ))
                            }
                        </Row>
                    </Descriptions.Item>
                    <Descriptions.Item label={i18n.t('product.description')} span={3} className="!text-[1.6rem] whitespace-pre-wrap">
                        {data?.product?.description}
                    </Descriptions.Item>
                </Descriptions>
            </Row>
        </Row>
    </Space>
  )
}

export default ProductDetailAdmin