import React, { useState, useEffect } from 'react'
import { Space, Typography, Row, Table } from 'antd'
import OrdersComponent from './OrdersComponent'
import ProductsComponent from './ProductsComponent'
import { useQuery } from '@apollo/client'
import { GET_USERS } from './graphql'
import i18n from '../../../translation'
import { DESC } from '../../../constant'

const DashboardComponent = ({setLoading}) => {
  const { Title } = Typography
  const [dataTable, setDataTable] = useState([])
  const { data } = useQuery(GET_USERS, {
    variables: {
        userInput: {},
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
      title: i18n.t('common.id'),
      dataIndex: 'userId',
    },
    {
      title: i18n.t('common.fullName'),
      dataIndex: 'name',
    },
    {
        title: i18n.t('common.birthday'),
        dataIndex: 'birthday',
    },
    {
      title: i18n.t('common.email'),
      dataIndex: 'email'
    },
    {
      title: i18n.t('common.phone'),
      dataIndex: 'phone'
    },
    {
      title: i18n.t('common.idCard'),
      dataIndex: 'idcard',
    },
    {
      title: i18n.t('common.address'),
      dataIndex: 'address',
    }
  ]
  return (
    <Space 
       direction="vertical" 
       size="middle" 
       className="w-full h-full">
       <Title level={4} className="whitespace-pre-wrap w-full bg-white p-10 shadow-md rounded">{i18n.t('common.dashboard')}</Title>
       <OrdersComponent setLoading={setLoading} />
       <ProductsComponent setLoading={setLoading} />
       <Space direction="vertical" size="middle" className="bg-white shadow-md p-10 w-full mt-5 rounded">
          <Row className="text-[1.6rem] font-semibold">{i18n.t('common.dashboard')}</Row>
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