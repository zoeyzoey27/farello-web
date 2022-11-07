import { useQuery } from '@apollo/client'
import { Card, Col, Row } from 'antd'
import React from 'react'
import { ASC } from '../../../constant'
import { GET_CATEGORIES } from './graphql'
import './style.css'
import i18n from '../../../translation'

const { Meta } = Card

const CategoriesList = () => {
    const { data } = useQuery(GET_CATEGORIES, {
        variables: {
            categorySearchInput: {},
            skip: null,
            take: null,
            orderBy: {
                createdAt: ASC
            }
        }
    })
    return (
    <>
        <Row className="title-header">{i18n.t('common.productCategory')}</Row>
        <Row gutter={16}>
            {
                data?.categories.map((item) => (
                    <Col xs={24} lg={6} key={item.id} className="mb-5">
                        <Card
                            hoverable
                            className="w-full"
                            cover={<img alt="" src={item.imageKey} className="h-[250px] md:h-[400px] lg:h-[250px] object-cover object-center" />}
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