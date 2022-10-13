import React, { useState } from 'react'
import { Layout, BackTop, Row, Spin } from 'antd'
import Topbar from '../../components/user/Topbar'
import Footer from '../../components/user/Footer'
import { useQuery } from '@apollo/client'
import { useSearchParams } from 'react-router-dom'
import { AiOutlineToTop } from 'react-icons/ai'
import { gql } from '@apollo/client'
import PostDetailComponent from '../../components/user/PostDetailComponent'

const { Content} = Layout
const GET_POST = gql`
  query Post($postId: ID!) {
    post(id: $postId) {
      id
      postId
      title
      category {
        id
        title
      }
      content
      imageKey
      createdBy {
        id
        fullName
      }
      updatedAt
      createdAt
    }
  }
`

const PostDetailUser = () => {
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const { data } = useQuery(GET_POST, {
    variables: {
        postId: id,
    },
    onCompleted: () => {
        setLoading(false)
    }
  })
  return (
    <Spin spinning={loading} size="large">
      <Layout className="layout max-w-screen min-h-screen overflow-x-hidden">
       <Topbar />
       <Content className="px-[20px] md:px-[35px] lg:px-[50px] bg-white">
          <PostDetailComponent post={data?.post} />
       </Content>
       <Footer />
       <BackTop>
          <Row className="w-[40px] h-[40px] rounded-full border-2 border-[#154c79] text-[#154c79] flex justify-center items-center hover:bg-[#154c79] hover:text-white hover:shadow-lg">
             <AiOutlineToTop className="text-[2rem] font-semibold" />
          </Row>
       </BackTop>
     </Layout>
    </Spin>
  )
}

export default PostDetailUser