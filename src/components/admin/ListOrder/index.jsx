import React, { useState, useEffect } from 'react'
import { 
  Space, 
  Typography, 
  Row, 
  Table, 
  Col, 
  Form, 
  Input, 
  Pagination, 
  Select,
  Breadcrumb
} from 'antd'
import { DESC, PAGE_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS, SKIP_DEFAULT } from '../../../constant'
import { FiSearch } from 'react-icons/fi'
import { BiDetail } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_ORDERS } from './graphql'
import numberWithCommas from '../../../utils/NumberWithCommas'
import { OrderStatus } from '../../../constant/statusOrder'
import FormButtonSearch from '../../common/FormButtonSearch'
import i18n from '../../../translation'

const ListOrder = ({setLoading}) => {
  const { Title } = Typography
  const { Option } = Select
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [dataTable, setDataTable] = useState([])
  const [searchCondition, setSearchCondition] = useState({
    items: {},
    pageIndex: PAGE_DEFAULT,
    pageSize: PAGE_SIZE_DEFAULT,
  })
  const { data: dataInit } = useQuery(GET_ORDERS, {
    variables: {
     orderSearchInput: {},
     skip: null,
     take: null,
     orderBy: {
      createdAt: DESC
     }
    }
  })
  const { data } = useQuery(GET_ORDERS, {
    variables: {
      orderSearchInput: searchCondition.items,
      skip: searchCondition?.pageSize
      ? searchCondition.pageSize * (searchCondition.pageIndex - 1)
      : SKIP_DEFAULT,
      take: searchCondition?.pageSize || PAGE_SIZE_DEFAULT,
      orderBy: {
        createdAt: DESC
      }
    },
    onCompleted: () => {
      setLoading(false)
    }
  })
  const resetFields = () => {
    form.resetFields()
    setSearchCondition({
      items: {},
      pageIndex: PAGE_DEFAULT,
      pageSize: PAGE_SIZE_DEFAULT,
    })
  }
  const onSubmit = (values) => {
    setSearchCondition((pre) => ({
     ...pre,
     items: {
       orderId: values.orderId,
       receiverName: values.name,
       phoneNumber: values.phone,
       email: values.email,
       address: values.address,
       status: values.status
     }
    }))
 }
 const onChangePagination = (page, limit) => {
   setSearchCondition({
     ...searchCondition,
     pageIndex: page,
     pageSize: limit,
   })
 }
 useEffect(() => {
    if (data) {
       const items = data?.orders?.map((item) => {
           let quantity = 0
           for (let i=0; i<item.products.length; i++) {
             quantity += item.products[i].quantity
           }
           return {
             id: item.id,
             orderId: item.orderId,
             name: item.receiverName,
             email: item.email,
             phone: item.phoneNumber,
             address: item.address,
             totalProduct: quantity,
             totalFee: item.totalPayment,
             status: item.status,
             createdAt: item.createdAt
           }
       })
       setDataTable(items)
    }
 },[data])
  const columns = [
    {
      title: i18n.t('orderList.id'),
      dataIndex: 'orderId',
    },
    {
      title: i18n.t('orderList.fullName'),
      dataIndex: 'name',
    },
    {
      title: i18n.t('orderList.phone'),
      dataIndex: 'phone'
    },
    {
      title: i18n.t('orderList.address'),
      dataIndex: 'address',
    },
    {
        title: i18n.t('orderList.totalProducts'),
        dataIndex: 'totalProduct',
    },
    {
        title: i18n.t('orderList.payment'),
        dataIndex: 'totalFee',
        render: (value) => <Row>{`${numberWithCommas(value)} VND`}</Row>
    },
    {
        title: i18n.t('orderList.status'),
        dataIndex: 'status',
        render: (value) => {
          return (
            <Row className={`${value === 'CANCEL' ? 'text-red-500' : 'text-green-500' }`}>
               {OrderStatus.find(item => item.value === value).name}
            </Row>
          )
        },
    },
    {
      title: i18n.t('orderList.date'),
      dataIndex: 'createdAt',
    },
    {
        title: null,
        dataIndex: 'detail',
        render: (_, _record) => (
            <BiDetail 
               onClick={() => navigate(`/admin/orderDetail?id=${_record.id}`)}
               className="text-[2rem] cursor-pointer hover:opacity-80 !text-colorTheme" />
        ),
        width: '50px',
      },
  ]
  return (
    <Space 
       direction="vertical" 
       size="middle" 
       className="w-full h-full bg-white p-10">
       <Title level={4} className="whitespace-pre-wrap">{i18n.t('orderList.title')}</Title>
       <Breadcrumb className="text-[1.6rem] mb-5 px-10 py-2 bg-[#f8f8f8]">
          <Breadcrumb.Item 
            onClick={() => navigate('/admin/dashboard')}
            className="hover:text-black cursor-pointer">
            {i18n.t('common.dashboard')}
          </Breadcrumb.Item>
          <Breadcrumb.Item className="font-semibold">
             {i18n.t('orderList.title')}
          </Breadcrumb.Item>
        </Breadcrumb>
       <Row className="p-10 bg-[#F8F8F8] w-full rounded">
          <Form form={form} onFinish={onSubmit} layout="vertical" autoComplete="off" className="w-full">
            <Row gutter={{xs: 0, md: 20, xl: 50}}>
                <Col className="gutter-row" xs={24} md={8}>
                  <Form.Item name="orderId" label={<Row className="font-semibold text-[1.6rem]">{i18n.t('orderList.id')}</Row>}>
                      <Input 
                         size="large" 
                         className="rounded"
                         placeholder={i18n.t('common.search')} 
                         suffix={
                           <FiSearch className="text-[2rem] text-[#c6c6c6]" />
                         } />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={8}>
                  <Form.Item name="name" label={<Row className="font-semibold text-[1.6rem]">{i18n.t('orderList.fullName')}</Row>}>
                      <Input 
                         size="large" 
                         className="rounded"
                         placeholder={i18n.t('common.search')} 
                         suffix={
                           <FiSearch className="text-[2rem] text-[#c6c6c6]" />
                         } />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={8}>
                  <Form.Item name="phone" label={<Row className="font-semibold text-[1.6rem]">{i18n.t('orderList.phone')}</Row>}>
                      <Input 
                         size="large" 
                         className="rounded"
                         placeholder={i18n.t('common.search')}  
                         suffix={
                           <FiSearch className="text-[2rem] text-[#c6c6c6]" />
                         } />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={8}>
                  <Form.Item name="address" label={<Row className="font-semibold text-[1.6rem]">{i18n.t('orderList.address')}</Row>}>
                      <Input 
                         size="large" 
                         className="rounded"
                         placeholder={i18n.t('common.search')}  
                         suffix={
                           <FiSearch className="text-[2rem] text-[#c6c6c6]" />
                         } />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={8}>
                  <Form.Item name="email" label={<Row className="font-semibold text-[1.6rem]">{i18n.t('orderList.email')}</Row>}>
                      <Input 
                         size="large" 
                         className="rounded"
                         placeholder={i18n.t('common.search')}  
                         suffix={
                           <FiSearch className="text-[2rem] text-[#c6c6c6]" />
                         } />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={8}>
                  <Form.Item name="status" label={<Row className="font-semibold text-[1.6rem]">{i18n.t('orderList.status')}</Row>}>
                      <Select size="large" className="rounded w-[220px] self-end mb-10" placeholder={i18n.t('orderList.waitForConfirmation')}>
                          {
                            OrderStatus.map((item) => (
                               <Option key={item.value} value={item.value} className="text-[1.6rem]">
                                  {item.name}
                                </Option>
                            ))
                          }
                      </Select>
                  </Form.Item>
                </Col>
              </Row>
              <FormButtonSearch resetFields={resetFields} />
          </Form>
       </Row>
       <Row className="text-[1.6rem] mt-5 md:mt-0">
            {i18n.t('common.total')}
            <Row className="font-semibold text-colorTheme mx-2">{dataInit?.orders?.length}</Row> 
            {i18n.t('common.result')}
        </Row>
       <Table 
          rowKey="id"
          columns={columns} 
          dataSource={dataTable} 
          bordered 
          pagination={false}
          className="!text-[1.6rem]"
          scroll={{ x: 'max-content' }} />
       <Pagination 
          current={searchCondition?.pageIndex} 
          pageSize={searchCondition?.pageSize} 
          total={dataInit?.orders?.length} 
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          showSizeChanger
          onChange={onChangePagination}
          locale={{items_per_page: i18n.t('common.page')}}
          className="mt-10 w-full flex justify-center" />
    </Space>
  )
}

export default ListOrder