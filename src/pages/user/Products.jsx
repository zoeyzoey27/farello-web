import React from 'react'
import { Layout, BackTop, Row } from 'antd'
import Topbar from '../../components/user/Topbar'
import Footer from '../../components/user/Footer'
import CategoryDetail from '../../components/user/CategoryDetail'
import { useQuery } from '@apollo/client'
import { getProducts } from '../../graphqlClient/queries'
import ListProduct from '../../components/user/ListProduct'
import { useSearchParams } from 'react-router-dom'
import NoData from '../../components/common/NoData'
import { AiOutlineToTop } from 'react-icons/ai'

const { Content} = Layout;

const Products = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const { loading, error, data  } = useQuery(getProducts)
  const products = data?.products.filter((item) => item.category.id === id);
	if (loading) return <p>Loading....</p>
	if (error) return <p>Error!</p>
  return (
    <Layout className="layout max-w-screen min-h-screen overflow-x-hidden">
       <Topbar />
       <Content className="px-[20px] md:px-[35px] lg:px-[50px] bg-white">
          <CategoryDetail />
          {
            products.length > 0 ? <ListProduct products={products} /> : <NoData />
          }
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

export default Products