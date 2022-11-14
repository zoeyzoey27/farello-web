import React, { useState, useEffect } from 'react'
import { Layout, Row, BackTop, Divider, Spin } from 'antd'
import Topbar from '../../components/user/Topbar'
import Footer from '../../components/user/Footer'
import { useQuery } from '@apollo/client'
import ListProduct from '../../components/user/ListProduct'
import { useSearchParams } from 'react-router-dom'
import ProductDetail from '../../components/user/ProductDetail'
import { AiOutlineToTop } from 'react-icons/ai'
import { gql } from '@apollo/client'
import ListRate from '../../components/user/ListRate'
import i18n from '../../translation'
import { DESC, STOCKING } from '../../constant'

const { Content } = Layout

const GET_PRODUCT = gql`
  query Product($productId: ID!) {
    product(id: $productId) {
      id
      productId
      name
      priceOut
      priceSale
      colours
      images
      description
      category {
        id
        name
      }
      status
      quantity
      comments {
        id
        content
        ratePoint
        rateDescription
        likes
        dislikes
        userLiked
        userDisLiked
        createdBy {
          id
          fullName
        }
        createdAt
      }
    }
  }
`

const GET_PRODUCTS = gql`
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

const ProductDetailPage = () => {
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const { data } = useQuery(GET_PRODUCT, {
      variables: {
        productId: id
      },
      skip: id === null,
      onCompleted: () => {
        setLoading(false)
      }
  })
  useEffect(() => {
    window.scrollTo(0, 0);
    data ? setLoading(false) : setLoading(true)
  },[id, data])
  const { data: dataProducts  } = useQuery(GET_PRODUCTS, {
    variables: {
      productSearchInput: {
        status: STOCKING,
        categoryId: data?.product?.category?.id
      },
      skip: null,
      take: 8,
      orderBy: {
        createdAt: DESC
      }
    },
    onCompleted: () => {
      setLoading(false)
    }
  })
  const products = dataProducts?.products.filter((item) => item.id !== id);
  return (
    <Spin spinning={loading} size="large">
      <Layout className="layout max-w-screen min-h-screen overflow-x-hidden">
       <Topbar />
       <Content className="px-[20px] md:px-[35px] lg:px-[50px] bg-white">
           <ProductDetail product={data?.product} />
           <Divider />
           <Row className="title-header">{i18n.t('reviewProduct')}</Row>
           <ListRate product={data?.product} setLoading={setLoading} />
           {products?.length > 0 && <>
            <Divider />
            <Row className="title-header">{i18n.t('similar')}</Row>
            <ListProduct products={products} />
           </>}
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

export default ProductDetailPage