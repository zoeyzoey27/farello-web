import React from 'react'
import { Breadcrumb, Col, Row, Typography  } from 'antd'
import parse from 'html-react-parser'

const PostDetailComponent = ({post}) => {
  const { Title } = Typography
  return (
    <Col className="flex flex-col w-full">
      <Breadcrumb className="my-10 px-10 py-2 bg-[#f8f8f8]">
        <Breadcrumb.Item href="/" className="text-[1.6rem]">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item 
          href={`/posts?id=${post?.category?.id}&title=${post?.category?.title}`} 
          className="text-[1.6rem]">
          {post?.category?.title}
        </Breadcrumb.Item>
        <Breadcrumb.Item className="text-[1.6rem] font-semibold">{`Bài viết: ${post?.postId}`}</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="flex flex-col">
          <Title level={4}>{post?.title}</Title>
          <Row className="text-[1.5rem] italic text-[#AFAAAA]">{`Danh mục bài viết: ${post?.category?.title}`}</Row>
             <Col className="content mt-10 whitespace-pre-wrap text-[1.6rem]">
                <img src={post?.imageKey} alt="" className="mb-10 mx-auto" />
                {post?.content && parse(post?.content)}
          </Col>
      </Row>
      <Row className="mb-5 text-[1.6rem] flex flex-col w-full">
           <Row className="italic self-end">{`Thời gian cập nhật: ${post?.updatedAt}`}</Row>
           <Row className="italic font-semibold self-end">{`Tác giả: ${post?.createdBy?.fullName}`}</Row>
      </Row>
    </Col>
  )
}

export default PostDetailComponent