import { useQuery } from '@apollo/client'
import { Card, Col, Row } from 'antd'
import React from 'react'
import { getCategories } from '../../../graphqlClient/queries'

const { Meta } = Card

const CategoriesList = () => {
    const { loading, error, data } = useQuery(getCategories)

    if (loading) return <p>Loading....</p>
    if (error) return <p>Error!</p>
    const categories = data.categories
    return (
    <>
        <Row className="title-header">Danh Mục Sản Phẩm</Row>
        <Row gutter={16}>
            {
                categories.map((item) => (
                    <Col span={8} key={item.id}>
                        <Card
                            hoverable
                            className="w-full"
                            cover={<img alt="" src={item.imageURL} className="h-[282px]" />}
                            >
                            <Meta 
                              title={<Row className="uppercase font-semibold text-[1.8rem]">{item.name}</Row>} 
                              description={<Row className="text-[1.6rem]">{item.description}</Row>}
                              className="min-h-[100px]" />
                        </Card>
                    </Col>
                ))
            }
        </Row>
    </>
    )
}

export default CategoriesList