import React from 'react'
import { Layout } from 'antd'
import Topbar from '../../components/user/Topbar';
import Footer from '../../components/user/Footer';
import CategoryDetail from '../../components/user/CategoryDetail';
import { useQuery } from '@apollo/client';
import { getProducts } from '../../graphqlClient/queries';
import ListProduct from '../../components/user/ListProduct';
import { useSearchParams } from 'react-router-dom';
import NoData from '../../components/common/NoData';

const { Content} = Layout;

const Products = () => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const { loading, error, data  } = useQuery(getProducts)
  const products = data?.products.filter((item) => item.category.id === id);
	if (loading) return <p>Loading....</p>
	if (error) return <p>Error!</p>
  return (
    <Layout className="layout max-w-screen min-h-screen">
       <Topbar />
       <Content className="main-container bg-white">
          <CategoryDetail />
          {
            products.length > 0 ? <ListProduct products={products} /> : <NoData />
          }
       </Content>
       <Footer />
    </Layout>
  )
}

export default Products