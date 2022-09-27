import React from 'react'
import { Layout, Row, BackTop, Divider } from 'antd'
import Topbar from '../../components/user/Topbar'
import Footer from '../../components/user/Footer'
import { useQuery } from '@apollo/client'
import { getProducts, getSingleProduct } from '../../graphqlClient/queries'
import ListProduct from '../../components/user/ListProduct'
import { useSearchParams } from 'react-router-dom'
import ProductDetail from '../../components/user/ProductDetail'
import { AiOutlineToTop } from 'react-icons/ai'

const { Content } = Layout

const ProductDetailPage = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const { data: productData } = useQuery(getSingleProduct, {
      variables: {
          id: id
      },
      skip: id === null
  })
  const { loading, error, data  } = useQuery(getProducts)
  const products = data?.products.filter((item) => item.category.id === productData?.product?.category?.id && item.id !== id);
	if (loading) return <p>Loading....</p>
	if (error) return <p>Error!</p>
  return (
    <Layout className="layout max-w-screen min-h-screen overflow-x-hidden">
       <Topbar />
       <Content className="px-[20px] md:px-[35px] lg:px-[50px] bg-white">
           <ProductDetail />
           <Divider />
           <Row className="title-header">Có thể bạn quan tâm</Row>
           <ListProduct products={products} />
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

export default ProductDetailPage