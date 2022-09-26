import React from 'react'
import { Layout } from 'antd'
import LoginForm from '../../components/admin/LoginForm';

const Home = () => {
  return (
    <Layout className="layout bg-[rgb(247, 247, 247)] max-w-screen min-h-screen">
       <LoginForm />
    </Layout>
  )
}

export default Home