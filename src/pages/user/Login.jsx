import React from 'react'
import { Layout } from 'antd'
import Topbar from '../../components/user/Topbar'
import Footer from '../../components/user/Footer'
import LoginForm from '../../components/user/LoginForm'

const { Content} = Layout

const Login = () => {
  return (
    <Layout className="layout !max-w-screen min-h-screen !overflow-x-hidden">
       <Topbar />
       <Content className="bg-white">
           <LoginForm />
       </Content>
       <Footer />
    </Layout>
  )
}

export default Login