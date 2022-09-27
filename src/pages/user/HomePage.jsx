import React from 'react'
import { Layout, Row, BackTop } from 'antd'
import Topbar from '../../components/user/Topbar'
import VideoBanner from '../../components/user/VideoBanner'
import BannerImages from '../../components/user/BannerImages'
import ListProduct from '../../components/user/ListProduct'
import Showroom from '../../components/user/Showroom'
import CategoriesList from '../../components/user/CategoriesList'
import PolicyList from '../../components/user/PolicyList'
import Footer from '../../components/user/Footer'
import { useQuery } from '@apollo/client'
import { getProducts } from '../../graphqlClient/queries'
import { AiOutlineToTop } from 'react-icons/ai'

const { Content} = Layout

const Home = () => {
  const { loading, error, data } = useQuery(getProducts)

	if (loading) return <p>Loading....</p>
	if (error) return <p>Error!</p>
  const products = data.products.slice(0,4)
  return (
    <Layout className="layout !max-w-screen min-h-screen !overflow-x-hidden">
       <Topbar />
       <VideoBanner />
       <Content className="px-[20px] md:px-[35px] lg:px-[50px] bg-white">
           <Row className="title-header">BEST SELLERS</Row>
           <ListProduct products={products} />
           <BannerImages />
           <Showroom />
           <CategoriesList />
           <PolicyList />
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

export default Home