import React, { useState } from 'react'
import { Layout, Spin } from 'antd'
import LoginForm from '../../components/admin/LoginForm';

const Home = () => {
  const [loading, setLoading] = useState(false)
  return (
    <Spin spinning={loading} size="large">
      <Layout className="layout bg-[rgb(247, 247, 247)] max-w-screen min-h-screen">
       <LoginForm setLoading={setLoading} />
      </Layout>
    </Spin>
  )
}

export default Home