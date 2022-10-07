import React from 'react'
import { Row, Col } from 'antd'
import SingleProduct from '../SingleProduct'
import { useNavigate } from 'react-router-dom'

const ListProduct = ({products}) => {
    const navigate = useNavigate()
    return (
        <Row gutter={16} className="!my-[50px]">
             {products?.map(item => (
                <Col 
                   className="gutter-row cursor-pointer mb-5 lg:mb-0" 
                   key={item.id} 
                   xs={24} md={12} lg={6}
                   onClick={() => navigate(`/product?id=${item.id}`)}
                >
                   <SingleProduct productId={item.id} />
                </Col>
             ))}
        </Row>
    )
}

export default ListProduct