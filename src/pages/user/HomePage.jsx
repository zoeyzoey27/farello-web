import React, { useState } from 'react'
import { Layout, Row, BackTop, Spin } from 'antd'
import Topbar from '../../components/user/Topbar'
import VideoBanner from '../../components/user/VideoBanner'
import BannerImages from '../../components/user/BannerImages'
import ListProduct from '../../components/user/ListProduct'
import Showroom from '../../components/user/Showroom'
import CategoriesList from '../../components/user/CategoriesList'
import PolicyList from '../../components/user/PolicyList'
import Footer from '../../components/user/Footer'
import { useQuery } from '@apollo/client'
import { AiOutlineToTop } from 'react-icons/ai'
import { gql } from '@apollo/client'
import ListPostComponent from '../../components/user/ListPostComponent'

const { Content} = Layout
const GET_PRODUCTS = gql `
    query Products($productSearchInput: ProductSearchInput, $skip: Int, $take: Int, $orderBy: ProductOrderByInput) {
      products(productSearchInput: $productSearchInput, skip: $skip, take: $take, orderBy: $orderBy) {
        id
        productId
        name
        priceOut
        priceSale
        colours
        images
        status
      }
    }
  `

const Home = () => {
  const [loading, setLoading] = useState(true)
  const { data } = useQuery(GET_PRODUCTS, {
    variables: {
      productSearchInput: {
        status: "STOCKING"
      },
      skip: null,
      take: 4,
      orderBy: {
        updatedAt: "desc"
      }
    },
    onCompleted: () => {
      setLoading(false)
    }
  })
  return (
    <Spin spinning={loading} size="large">
      <Layout className="layout !max-w-screen min-h-screen !overflow-x-hidden">
       <Topbar />
       <VideoBanner />
       <Content className="px-[20px] md:px-[35px] lg:px-[50px] bg-white">
           <Row className="title-header">BEST SELLERS</Row>
           <ListProduct products={data?.products} />
           <BannerImages />
           <Showroom />
           <CategoriesList />
           <ListPostComponent />
           <PolicyList />
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

export default Home