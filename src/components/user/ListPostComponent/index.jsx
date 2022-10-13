import { useQuery } from '@apollo/client'
import React from 'react'
import { Row, Col, Card } from 'antd'
import { GET_POSTS } from './graphql'
import { useNavigate } from 'react-router-dom'

const ListPostComponent = () => {
  const { Meta } = Card
  const navigate = useNavigate()
  const { data } = useQuery(GET_POSTS, {
    variables: {
      postSearchInput: {},
      skip: null,
      take: 4,
      orderBy: {
        updatedAt: "desc"
      }
    }
  })
  return (
    <Row className="my-[50px] lg:!mx-[50px] xl:!mx-[100px] flex flex-col">
        <Row className="title-header">Danh sách bài viết</Row>
        <Row gutter={16}>
            {
                 data?.posts?.map((item) => (
                    <Col xs={24} lg={12} key={item.id} className="mb-5">
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
                                      Xem thêm
                                    </Row>
                                 </Row>
                               }
                              className="h-[130px]" />
                        </Card>
                    </Col>
                ))
            }
        </Row>
    </Row>
  )
}

export default ListPostComponent