import React, { useEffect, useState } from 'react'
import { Layout, BackTop, Row, Spin } from 'antd'
import Topbar from '../../components/user/Topbar'
import Footer from '../../components/user/Footer'
import CategoryDetail from '../../components/user/CategoryDetail'
import { useQuery } from '@apollo/client'
import ListProduct from '../../components/user/ListProduct'
import { useSearchParams } from 'react-router-dom'
import NoData from '../../components/common/NoData'
import { AiOutlineToTop } from 'react-icons/ai'
import { gql } from '@apollo/client'
import { DESC } from '../../constant'

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
        createdAt
      }
    }
`

const Products = () => {
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const { data  } = useQuery(GET_PRODUCTS, {
    variables: {
      productSearchInput: {
        status: "STOCKING",
        categoryId: id
      },
      skip: null,
      take: null,
      orderBy: {
        createdAt: DESC
      }
    },
    onCompleted: () => {
      setLoading(false)
    }
  })
  useEffect(() => {
    data?.products?.length > 0 ? setLoading(false) : setLoading(true)
  }, [id, data?.products?.length])
  return (
    <Spin spinning={loading} size="large">
      <Layout className="layout max-w-screen min-h-screen overflow-x-hidden">
       <Topbar />
       <Content className="px-[20px] md:px-[35px] lg:px-[50px] bg-white">
          <CategoryDetail />
          {
            data?.products?.length > 0 ? <ListProduct products={data?.products} /> : <NoData />
          }
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

export default Products