import React, { useState } from 'react'
import { Layout, Spin } from 'antd'
import Topbar from '../../components/user/Topbar'
import Footer from '../../components/user/Footer'
import RegisterForm from '../../components/user/RegisterForm'

const { Content} = Layout

const Register = () => {
  const [loading, setLoading] = useState(false)
  return (
    <Spin spinning={loading} size="large">
      <Layout className="layout !max-w-screen min-h-screen !overflow-x-hidden">
       <Topbar />
       <Content className="bg-white">
           <RegisterForm setLoading={setLoading} />
       </Content>
       <Footer />
    </Layout><Layout className="layout !max-w-screen min-h-screen !overflow-x-hidden">
       <Topbar />
       <Content className="bg-white">
           <RegisterForm />
       </Content>
       <Footer />
    </Layout>
    </Spin>
  )
}

export default Register