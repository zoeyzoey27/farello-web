import React, { useState } from 'react'
import { Layout, Spin } from 'antd'
import Topbar from '../../components/user/Topbar'
import Footer from '../../components/user/Footer'
import LoginForm from '../../components/user/LoginForm'

const { Content} = Layout

const Login = () => {
  const [loading, setLoading] = useState(false)
  return (
    <Spin spinning={loading} size="large">
      <Layout className="layout !max-w-screen min-h-screen !overflow-x-hidden">
       <Topbar />
       <Content className="bg-white">
           <LoginForm setLoading={setLoading} />
       </Content>
       <Footer />
    </Layout>
    </Spin>
  )
}

export default Login