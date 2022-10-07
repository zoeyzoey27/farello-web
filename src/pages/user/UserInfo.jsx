import React, { useState } from 'react'
import { Layout, BackTop, Row, Spin } from 'antd'
import Topbar from '../../components/user/Topbar'
import Footer from '../../components/user/Footer'
import { AiOutlineToTop } from 'react-icons/ai'
import UserInformation from '../../components/user/UserInformation'
import { gql, useQuery } from '@apollo/client'

const { Content } = Layout
const GET_USER_INFO = gql`
   query User($userId: ID!) {
      user(id: $userId) {
      id
      userId
      fullName
      email
      phoneNumber
      address
      idCard
      birthday
      }
   }
`

const UserInfo = () => {
  const [loading, setLoading] = useState(true)
  const id = localStorage.getItem("id_token")
  const { data } = useQuery(GET_USER_INFO, {
    variables: {
      userId: id
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
          <UserInformation userInfo = {data?.user} />
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

export default UserInfo