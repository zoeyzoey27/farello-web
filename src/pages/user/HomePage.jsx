import React from 'react'
import { Layout, Row } from 'antd'
import Topbar from '../../components/user/Topbar';
import VideoBanner from '../../components/user/VideoBanner';
import BannerImages from '../../components/user/BannerImages';
import ListProduct from '../../components/user/ListProduct';
import Showroom from '../../components/user/Showroom';
import CategoriesList from '../../components/user/CategoriesList';
import PolicyList from '../../components/user/PolicyList';
import Footer from '../../components/user/Footer';
import { useQuery } from '@apollo/client';
import { getProducts } from '../../graphqlClient/queries';

const { Content} = Layout;

const Home = () => {
  const { loading, error, data } = useQuery(getProducts)

	if (loading) return <p>Loading....</p>
	if (error) return <p>Error!</p>
  const products = data.products.slice(0,4)
  return (
    <Layout className="layout max-w-screen min-h-screen">
       <Topbar />
       <VideoBanner />
       <Content className="main-container bg-white">
           <Row className="title-header">BEST SELLERS</Row>
           <ListProduct products={products} />
           <BannerImages />
           <Showroom />
           <CategoriesList />
           <PolicyList />
       </Content>
       <Footer />
    </Layout>
  )
}

export default Home