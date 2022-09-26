import React from 'react'
import { Breadcrumb, Col  } from 'antd'
import { useQuery } from '@apollo/client'
import { getSingleProduct } from '../../../graphqlClient/queries'
import { useSearchParams } from 'react-router-dom'
import './style.css'

const ProductDetail = () => {
    const [searchParams] = useSearchParams();
    const productId = searchParams.get('id'); 
    const { loading, error, data } = useQuery(getSingleProduct, {
        variables: {
            id: productId
        },
        skip: productId === null
    })
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>
    return (
       <Col className="flex flex-col w-full">
          <Breadcrumb className="my-10 px-10 py-2 bg-[#f8f8f8]">
            <Breadcrumb.Item href="/" className="text-[1.6rem]">Trang chủ</Breadcrumb.Item>
            <Breadcrumb.Item 
               href={`/products?id=${data?.product?.category?.id}`} 
               className="text-[1.6rem]">
               {data?.product?.category?.name}
            </Breadcrumb.Item>
            <Breadcrumb.Item className="text-[1.6rem] text-semibold">{data?.product?.name}</Breadcrumb.Item>
        </Breadcrumb>
       </Col>
    )
}

export default ProductDetail