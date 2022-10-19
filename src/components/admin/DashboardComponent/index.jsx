import React, { useState, useEffect } from 'react'
import { Space, Typography, Row, Table } from 'antd'
import OrdersComponent from './OrdersComponent'
import ProductsComponent from './ProductsComponent'
import { useQuery } from '@apollo/client'
import { GET_USERS } from './graphql'

const DashboardComponent = ({setLoading}) => {
  const { Title } = Typography
  const [dataTable, setDataTable] = useState([])
  const { data } = useQuery(GET_USERS, {
    variables: {
        userInput: {},
        skip: null,
        take: null,
        orderBy: {
            createdAt: "desc"
        }
    },
    onCompleted: () => {
        setLoading(false)
    }
  })
  useEffect(() => {
    if (data) {
       const items = data?.users?.slice(0,5).map((item) => {
           return {
             userId: item.userId,
             name: item.fullName,
             email: item.email,
             birthday: item.birthday,
             phone: item.phoneNumber,
             idcard: item.idCard,
             address: item.address
           }
       })
       setDataTable(items)
    }
  },[data])
  const columns = [
    {
      title: 'User ID',
      dataIndex: 'userId',
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
    },
    {
        title: 'Ngày sinh',
        dataIndex: 'birthday',
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone'
    },
    {
      title: 'Số CMT/CCCD',
      dataIndex: 'idcard',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
    }
  ]
  return (
    <Space 
       direction="vertical" 
       size="middle" 
       className="w-full h-full">
       <Title level={4} className="whitespace-pre-wrap w-full bg-white p-10 shadow-md rounded">Bảng điều khiển</Title>
       <OrdersComponent setLoading={setLoading} />
       <ProductsComponent setLoading={setLoading} />
       <Space direction="vertical" size="middle" className="bg-white shadow-md p-10 w-full mt-5 rounded">
          <Row className="text-[1.6rem] font-semibold">Khách hàng mới</Row>
          <hr className="mb-5" />
          <Table 
            rowKey="id"
            columns={columns} 
            dataSource={dataTable} 
            bordered 
            pagination={false}
            className="!text-[1.6rem]"
            scroll={{ x: 'max-content' }} />
       </Space>
    </Space>
  )
}

export default DashboardComponent