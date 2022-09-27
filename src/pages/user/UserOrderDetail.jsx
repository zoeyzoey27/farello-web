import React from 'react'
import { Layout, BackTop, Row } from 'antd'
import Topbar from '../../components/user/Topbar'
import Footer from '../../components/user/Footer'
import { AiOutlineToTop } from 'react-icons/ai'
import OrderDetail from '../../components/user/OrderDetail'

const { Content } = Layout;

const UserOrderDetail = () => {
  return (
    <Layout className="layout max-w-screen min-h-screen overflow-x-hidden">
       <Topbar />
       <Content className="px-[20px] md:px-[35px] lg:px-[50px] bg-white">
          <OrderDetail />
       </Content>
       <Footer />
       <BackTop>
          <Row className="w-[40px] h-[40px] rounded-full border-2 border-[#154c79] text-[#154c79] flex justify-center items-center hover:bg-[#154c79] hover:text-white hover:shadow-lg">
             <AiOutlineToTop className="text-[2rem] font-semibold" />
          </Row>
       </BackTop>
    </Layout>
  )
}

export default UserOrderDetail