import React from 'react'
import { Row, Col, Card } from 'antd'
import { useNavigate } from 'react-router-dom'
import i18n from '../../../translation'

const ListPostsByCategory = ({posts}) => {
  const { Meta } = Card
  const navigate = useNavigate()
  return (
    <Row gutter={16}>
        {
            posts.map((item) => (
                <Col xs={24} lg={6} key={item.id} className="mb-5">
                    <Card
                        hoverable
                        className="w-full"
                        cover={<img alt="" src={item.imageKey} className="h-[250px] md:h-[400px] lg:h-[300px] object-cover object-center" />}
                        >
                        <Meta 
                            title={<Row className="uppercase font-semibold text-[1.8rem] block-ellipsis-title">{item.title}</Row>} 
                            description={
                                <Row className="text-[1.4rem] flex flex-col">
                                    <Row className="italic">{`Danh mục: ${item.category.title}`}</Row>
                                    <Row className="italic">
                                        {`Ngày đăng: ${item.createdAt}`}
                                    </Row>
                                    <Row 
                                      onClick={() => navigate(`/postDetail?id=${item.id}`)}
                                      className="italic text-blue-500">
                                      {i18n.t('listPostUser.readMore')}
                                    </Row>
                                </Row>
                            }
                            className="h-[130px]" />
                    </Card>
                </Col>
        ))
        }
    </Row>
  )
}

export default ListPostsByCategory