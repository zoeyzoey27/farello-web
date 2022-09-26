import React from 'react'
import { Header } from 'antd/lib/layout/layout'
import { useQuery } from '@apollo/client'
import { Image, Row, Input, Badge, Menu } from 'antd'
import { UserOutlined, ShoppingOutlined } from '@ant-design/icons'
import logo from '../../../assets/images/logo.png'
import { Link} from 'react-router-dom'
import { getCategories } from '../../../graphqlClient/queries'
import './style.css'

const { Search } = Input;

const Topbar = () => {
  const onSearch = (value) => console.log(value)
  const { loading, error, data } = useQuery(getCategories)
  if (loading) return <p>Loading....</p>
  if (error) return <p>Error!</p>

  const itmainNavems = [
    {
      label: (
        <Link to="/" className="link mx-3 text-[1.6rem] font-medium">
          Trang chủ
        </Link>
      ),
      key: 'homepage',
    },
    {
      label: (
        <Link to="/" className="link mx-3 text-[1.6rem] font-medium">
          Sản phẩm
        </Link>
      ),
      key: 'products',
      children: [
        {
          type: 'group',
          label: 'Danh mục sản phẩm',
          children: 
            data.categories.map((item) => (
              {
                label: (
                  <Link to={`/products?id=${item.id}`} key={item.id} className="link mx-3 text-[1.5rem]">
                    {item.name}
                  </Link>
                ),
                key: `cate${item.id}`,
              }
            ))
          ,
        }
      ],
    },
    {
      label: (
        <Link to="/" className="link mx-3 text-[1.6rem] font-medium">
          Dịch vụ
        </Link>
      ),
      key: 'service',
    },
    {
      label: (
        <Link to="/" className="link mx-3 text-[1.6rem] font-medium">
          Tin tức
        </Link>
      ),
      key: 'news',
    },
  ];
  return (
    <Header className="flex items-center justify-between bg-white">
      <Row className="flex items-center justify-between">
        <Link to ="/" className="h-full flex items-center mr-10">
          <Image
            width={160}
            src={logo}
            className="block cursor-pointer"
            preview={false}
          />
        </Link>
        <Menu mode="horizontal" items={itmainNavems} />
      </Row>
      <Row className="flex items-center justify-between gap-5">
        <Search 
          placeholder="Tìm kiếm" 
          onSearch={onSearch} 
          style={{ width: 200 }} 
        />
        <UserOutlined className="text-[1.8rem] cursor-pointer border-l-2 pl-3" />
        <Badge 
          count={0} 
          size="default" 
          showZero
          overflowCount={99} 
          offset={[6, 0]}
          className="text-black"
          style={{ backgroundColor: '#F3F3F7', color: '#000' }}
        >
          <ShoppingOutlined className="text-[1.8rem] cursor-pointer" />
        </Badge>
      </Row>
    </Header>
  )
}

export default Topbar