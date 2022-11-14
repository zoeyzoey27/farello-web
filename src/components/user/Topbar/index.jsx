import React, { useState, useEffect } from 'react'
import { Header } from 'antd/lib/layout/layout'
import { useQuery } from '@apollo/client'
import { Row, Input, Badge, Menu, Grid, Drawer, Dropdown, Space } from 'antd'
import { UserOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import { AiOutlineMenuFold } from 'react-icons/ai'
import { menu } from './menu'
import { GET_CATEGORIES, GET_POSTS, GET_TOTAL_CART } from './graphql'
import { ASC } from '../../../constant'
import i18n from '../../../translation'
import { GrLanguage } from 'react-icons/gr'
import { menuLanguage } from './menuLanguage'

const Topbar = () => {
  const { Search } = Input
  const { useBreakpoint } = Grid
  const navigate = useNavigate()
  const screens = useBreakpoint()
  const [ visible, setVisible ] = useState(false)
  const [totalCart, setTotalCart] = useState(0)
  const onOpen = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }
  const { data } = useQuery(GET_CATEGORIES, {
    variables: {
      categorySearchInput: {},
      skip: null,
      take: null,
      orderBy: {
          createdAt: ASC
      }
    }
  })

  const { data: dataCart } = useQuery(GET_TOTAL_CART, {
    variables: {
      userId: localStorage.getItem("id_token")
    },
    skip: localStorage.getItem("id_token") === null || undefined
  })

  const { data: dataCategoryPost } = useQuery(GET_POSTS, {
    variables: {
      skip: null,
      take: null,
      orderBy: {
        createdAt: ASC
      }
    }
  })
  useEffect(() => {
    if (dataCart) {
       setTotalCart(dataCart?.getProductsAddedToCart?.length)
    }
  },[dataCart])
  const onSearch = (value) => {
    navigate(`/listProduct?param=${value}`)
  }
  const itmainNavems = [
    {
      label: (
        <Link to="/" className="link mx-3 text-[1.6rem] font-medium">
          {i18n.t('common.home')}
        </Link>
      ),
      key: '/',
    },
    {
      label: (
        <Link to="/aboutus" className="link mx-3 text-[1.6rem] font-medium">
          {i18n.t('topbar.aboutus')}
        </Link>
      ),
      key: '/aboutus',
    },
    {
      label: (
        <Row className="link mx-3 text-[1.6rem] font-medium">
          {i18n.t('topbar.product')}
        </Row>
      ),
      key: '/products',
      children: [
        {
          type: 'group',
          label: i18n.t('topbar.productCategory'),
          children: 
            data?.categories.map((item) => (
              {
                label: (
                  <Link to={`/products?id=${item.id}`} key={item.id} className="link mx-3 text-[1.5rem]">
                    {item.name}
                  </Link>
                ),
                key: `/products?id=${item.id}`,
              }
            ))
          ,
        }
      ],
    },
    {
      label: (
        <Row className="link mx-3 text-[1.6rem] font-medium">
          {i18n.t('topbar.posts')}
        </Row>
      ),
      key: '/posts',
      children: [
        {
          type: 'group',
          label: i18n.t('topbar.postCategory'),
          children: 
            dataCategoryPost?.postCategories?.map((item) => (
              {
                label: (
                  <Link to={`/posts?id=${item.id}&title=${item.title}`} key={item.id} className="link mx-3 text-[1.5rem]">
                    {item.title}
                  </Link>
                ),
                key: `/posts?id=${item.id}`,
              }
            ))
          ,
        }
      ],
    },
    {
      label: (
        <Link to="/contact" className="link mx-3 text-[1.6rem] font-medium">
          {i18n.t('topbar.contact')}
        </Link>
      ),
      key: '/contact',
    },
  ];
  return (
    <Header className="flex items-center justify-between bg-white px-[20px] md:px-[35px] lg:px-[50px]">
      <Row className="flex items-center justify-between">
        <Link to ="/" className="h-full flex items-center md:mr-10 hover:text-black">
          <Row className="text-[2.8rem] md:text-[3.5rem] logo hover:text-black">Farello</Row>
        </Link>
        {screens.xl && (
          <Menu mode="horizontal" items={itmainNavems} />
        )}
        {!screens.xl && (
          <Drawer
            title="Menu"
            placement="right"
            width={320}
            onClose={onClose}
            visible={visible}>
            <Menu mode="inline" items={itmainNavems} />
          </Drawer>
        )}
      </Row>
      <Row className="flex items-center justify-between gap-5">
        <Search 
          placeholder={i18n.t('common.search')} 
          onSearch={onSearch} 
          style={{ width: 200 }}
          className="hidden md:block" 
        />
        <Dropdown overlay={menu}>
          <UserOutlined className="text-[1.8rem] cursor-pointer md:border-l-2 md:pl-3" />
        </Dropdown>
        <Badge 
          count={totalCart} 
          size="default" 
          showZero
          overflowCount={99} 
          offset={[6, 0]}
          className="text-black"
          style={{ backgroundColor: '#F3F3F7', color: '#000' }}>
          <ShoppingOutlined className="text-[1.8rem] cursor-pointer" onClick={() => navigate('/cart')}  />
        </Badge>
        <Dropdown overlay={menuLanguage} className="ml-3">
          <Space>
              <GrLanguage className="text-[2rem] cursor-pointer" />
              <span className="font-medium">LA</span>
          </Space>
        </Dropdown>
        <AiOutlineMenuFold className="text-[2.5rem] ml-5 md:ml-10 cursor-pointer block xl:hidden" onClick={onOpen} />
      </Row>
    </Header>
  )
}

export default Topbar