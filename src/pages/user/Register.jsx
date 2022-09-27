import React from 'react'
import { Layout } from 'antd'
import Topbar from '../../components/user/Topbar'
import Footer from '../../components/user/Footer'
import RegisterForm from '../../components/user/RegisterForm'

const { Content} = Layout

const Register = () => {
  return (
    <Layout className="layout !max-w-screen min-h-screen !overflow-x-hidden">
       <Topbar />
       <Content className="bg-white">
           <RegisterForm />
       </Content>
       <Footer />
    </Layout>
  )
}

export default Register