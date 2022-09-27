import React from 'react'
import { Typography,Row } from 'antd'
import { useQuery } from '@apollo/client'
import { getSingleProduct } from '../../../graphqlClient/queries'
import numberWithCommas from '../../../utils/NumberWithCommas'

const { Title,Text } = Typography;

const SingleProduct = ({productId}) => {
    const { loading, error, data } = useQuery(getSingleProduct, {
		variables: {
			id: productId
		},
	})

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error!</p>

    const product = productId !== null ? data.product : null
    return (
       <Row className="flex flex-col items-center justify-center">
            <img src={product.imageMain} alt="" className="mb-3" />
            <Title level={5} className="uppercase">{product.name}</Title>
            <Row className="flex items-center justify-center">
                <Text className="mr-3 text-[#606060] text-[1.6rem] font-semibold">
                   {`${numberWithCommas(Number(product.priceSale))} VND`}
                </Text>
                <Text className="line-through text-[1.2rem] text-[#afaaaa]">
                   {`${numberWithCommas(Number(product.priceOrigin))} VND`}
                </Text>
            </Row>
       </Row>
    )
}

export default SingleProduct