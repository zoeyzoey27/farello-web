import { useQuery } from '@apollo/client'
import { Card, Col, Row } from 'antd'
import React from 'react'
import { GET_CATEGORIES } from './graphql'
import './style.css'

const { Meta } = Card

const CategoriesList = () => {
    const { data } = useQuery(GET_CATEGORIES, {
        variables: {
            categorySearchInput: {},
            skip: null,
            take: null,
            orderBy: {
                createdAt: "asc"
            }
        }
    })
    return (
    <>
        <Row className="title-header">Danh Mục Sản Phẩm</Row>
        <Row gutter={16}>
            {
                data?.categories.map((item) => (
                    <Col xs={24} lg={8} key={item.id} className="mb-5 lg:mb-0">
                        <Card
                            hoverable
                            className="w-full"
                            cover={<img alt="" src={item.imageKey} className="h-[250px] md:h-[400px] lg:h-[300px]" />}
                            >
                            <Meta 
                              title={<Row className="uppercase font-semibold text-[1.8rem]">{item.name}</Row>} 
                              description={<Row className="text-[1.6rem] block-ellipsis">{item.description}</Row>}
                              className="h-[130px]" />
                        </Card>
                    </Col>
                ))
            }
        </Row>
    </>
    )
}

export default CategoriesList