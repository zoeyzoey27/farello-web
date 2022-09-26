import React from 'react'
import { Row, Col } from 'antd'
import SingleProduct from '../SingleProduct'
import { useNavigate } from 'react-router-dom'

const ListProduct = ({products}) => {
    const navigate = useNavigate()
    return (
        <Row gutter={16} className="!my-[50px]">
             {products.map(item => (
                <Col 
                   className="gutter-row cursor-pointer" 
                   key={item.id} 
                   span={6} 
                   onClick={() => navigate(`/product?id=${item.id}`)}
                >
                   <SingleProduct productId={item.id} />
                </Col>
             ))}
        </Row>
    )
}

export default ListProduct