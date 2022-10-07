import React from 'react'
import { Typography,Row } from 'antd'
import { useQuery } from '@apollo/client'
import numberWithCommas from '../../../utils/NumberWithCommas'
import { GET_PRODUCT } from './graphql'

const { Title,Text } = Typography;

const SingleProduct = ({productId}) => {
    const { data } = useQuery(GET_PRODUCT, {
		variables: {
			productId: productId
		},
      skip: productId === null
	})
    return (
       <Row className="flex flex-col items-center justify-center">
            <img src={data?.product?.images[0]} alt="" className="mb-3" />
            <Title level={5} className="uppercase">{data?.product?.name}</Title>
            <Row className="flex items-center justify-center">
                <Text className="mr-3 text-[#606060] text-[1.6rem] font-semibold">
                   {data?.product?.priceSale ? `${numberWithCommas(Number(data?.product?.priceSale))} VND` : ''}
                </Text>
                <Text className="line-through text-[1.2rem] text-[#afaaaa]">
                   {data?.product?.priceOut ? `${numberWithCommas(Number(data?.product?.priceOut))} VND` : ''}
                </Text>
            </Row>
       </Row>
    )
}

export default SingleProduct