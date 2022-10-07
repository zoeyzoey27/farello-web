import React, { useState } from 'react'
import { Header } from 'antd/lib/layout/layout'
import { useQuery } from '@apollo/client'
import { Row, Input, Badge, Menu, Grid, Drawer, Dropdown } from 'antd'
import { UserOutlined, ShoppingOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import { AiOutlineMenuFold } from 'react-icons/ai'
import { menu } from './menu'
import { GET_CATEGORIES, GET_TOTAL_CART } from './graphql'

const Topbar = () => {
  const { Search } = Input
  const { useBreakpoint } = Grid
  const navigate = useNavigate()
  const screens = useBreakpoint()
  const [ visible, setVisible ] = useState(false)
  const onOpen = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }
  const onSearch = (value) => console.log(value)
  const { data } = useQuery(GET_CATEGORIES, {
    variables: {
      categorySearchInput: {},
      skip: null,
      take: null,
      orderBy: {
          createdAt: "asc"
      }
    }
  })

  const { data: dataCart } = useQuery(GET_TOTAL_CART, {
    variables: {
      userId: localStorage.getItem("id_token")
    },
    skip: localStorage.getItem("id_token") === null || undefined
  })

  const itmainNavems = [
    {
      label: (
        <Link to="/" className="link mx-3 text-[1.6rem] font-medium">
          Trang chủ
        </Link>
      ),
      key: '/',
    },
    {
      label: (
        <Link to="/aboutus" className="link mx-3 text-[1.6rem] font-medium">
          Giới thiệu
        </Link>
      ),
      key: '/aboutus',
    },
    {
      label: (
        <Row className="link mx-3 text-[1.6rem] font-medium">
          Sản phẩm
        </Row>
      ),
      key: '/products',
      children: [
        {
          type: 'group',
          label: 'Danh mục sản phẩm',
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
        <Link to="/service" className="link mx-3 text-[1.6rem] font-medium">
          Dịch vụ
        </Link>
      ),
      key: '/service',
    },
  ];
  return (
    <Header className="flex items-center justify-between bg-white px-[20px] md:px-[35px] lg:px-[50px]">
      <Row className="flex items-center justify-between">
        <Link to ="/" className="h-full flex items-center md:mr-10 hover:text-black">
          <Row className="text-[2.8rem] md:text-[3.5rem] logo hover:text-black">Farello</Row>
        </Link>
        {screens.lg && (
          <Menu mode="horizontal" items={itmainNavems} />
        )}
        {!screens.lg && (
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
          placeholder="Tìm kiếm" 
          onSearch={onSearch} 
          style={{ width: 200 }}
          className="hidden md:block" 
        />
        <Dropdown overlay={menu}>
          <UserOutlined className="text-[1.8rem] cursor-pointer md:border-l-2 md:pl-3" />
        </Dropdown>
        <Badge 
          count={dataCart?.getProductsAddedToCart?.length || 0} 
          size="default" 
          showZero
          overflowCount={99} 
          offset={[6, 0]}
          className="text-black"
          style={{ backgroundColor: '#F3F3F7', color: '#000' }}
        >
          <ShoppingOutlined className="text-[1.8rem] cursor-pointer" onClick={() => navigate('/cart')}  />
        </Badge>
        <AiOutlineMenuFold className="text-[2.5rem] ml-5 md:ml-10 cursor-pointer block lg:hidden" onClick={onOpen} />
      </Row>
    </Header>
  )
}

export default Topbar