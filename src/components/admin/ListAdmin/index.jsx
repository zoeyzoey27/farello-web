import React, { useState, useEffect } from 'react'
import { Space, Typography, Row, Table, Col, Form, Input, Pagination, Breadcrumb } from 'antd'
import { columns } from './DataTable'
import { DESC, PAGE_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS, SKIP_DEFAULT } from '../../../constant'
import { FiSearch} from 'react-icons/fi'
import { useQuery } from '@apollo/client'
import { GET_ADMIN_LIST } from './graphql'
import { useNavigate } from 'react-router-dom'
import FormButtonSearch from '../../common/FormButtonSearch'
import i18n from '../../../translation'

const ListAdmin = ({setLoading}) => {
  const { Title } = Typography
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [dataTable, setDataTable] = useState([])
  const [searchCondition, setSearchCondition] = useState({
    items: {},
    pageIndex: PAGE_DEFAULT,
    pageSize: PAGE_SIZE_DEFAULT,
  })
  const { data: dataInit } = useQuery(GET_ADMIN_LIST, {
    variables: {
      adminInput: {},
      skip: null,
      take: null,
      orderBy: {
        createdAt: DESC
      }
    }
  })
  const { data } = useQuery(GET_ADMIN_LIST, {
    variables: {
      adminInput: searchCondition.items,
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
    setLoading(true)
    setSearchCondition({
      items: {},
      pageIndex: PAGE_DEFAULT,
      pageSize: PAGE_SIZE_DEFAULT,
    })
  }
  const onSubmit = (values) => {
     setLoading(true)
     setSearchCondition((pre) => ({
      ...pre,
      items: {
        adminId: values.adminId,
        fullName: values.name,
        phoneNumber: values.phone,
        email: values.email,
        address: values.address,
        idCard: values.idcard
      }
     }))
  }
  const onChangePagination = (page, limit) => {
    setLoading(true)
    setSearchCondition({
      ...searchCondition,
      pageIndex: page,
      pageSize: limit,
    })
  }
  useEffect(() => {
     if (data) {
        const items = data?.admins?.map((item) => {
            return {
              adminId: item.adminId,
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
  return (
    <Space 
       direction="vertical" 
       size="middle" 
       className="w-full h-full bg-white p-10">
       <Title level={4} className="whitespace-pre-wrap">{i18n.t('adminList.title')}</Title>
       <Breadcrumb className="text-[1.6rem] mb-5 px-10 py-2 bg-[#f8f8f8]">
          <Breadcrumb.Item 
            onClick={() => navigate('/admin/dashboard')}
            className="hover:text-black cursor-pointer">
            {i18n.t('common.dashboard')}
          </Breadcrumb.Item>
          <Breadcrumb.Item className="font-semibold">
             {i18n.t('adminList.heading')}
          </Breadcrumb.Item>
        </Breadcrumb>
       <Row className="p-10 bg-[#F8F8F8] w-full rounded">
          <Form 
            layout="vertical" 
            form={form}
            autoComplete="off" 
            className="w-full" 
            onFinish={onSubmit}>
            <Row gutter={{xs: 0, md: 20, xl: 50}}>
                <Col className="gutter-row" xs={24} md={8}>
                  <Form.Item name="adminId" label={<Row className="font-semibold text-[1.6rem]">{i18n.t('common.id')}</Row>}>
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
                  <Form.Item name="name" label={<Row className="font-semibold text-[1.6rem]">{i18n.t('common.fullName')}</Row>}>
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
                  <Form.Item name="email" label={<Row className="font-semibold text-[1.6rem]">{i18n.t('common.email')}</Row>}>
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
                  <Form.Item name="phone" label={<Row className="font-semibold text-[1.6rem]">{i18n.t('common.phone')}</Row>}>
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
                  <Form.Item name="address" label={<Row className="font-semibold text-[1.6rem]">{i18n.t('common.address')}</Row>}>
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
                  <Form.Item name="idcard" label={<Row className="font-semibold text-[1.6rem]">{i18n.t('common.idCard')}</Row>}>
                      <Input 
                         size="large" 
                         className="rounded"
                         placeholder={i18n.t('common.search')} 
                         suffix={
                           <FiSearch className="text-[2rem] text-[#c6c6c6]" />
                         } />
                  </Form.Item>
                </Col>
              </Row>
              <FormButtonSearch resetFields={resetFields} />
          </Form>
       </Row>
       <Row className="text-[1.6rem] mt-5 md:mt-0">
            {i18n.t('common.total')}
            <Row className="font-semibold text-colorTheme mx-2">{dataInit?.admins?.length}</Row> 
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
          total={dataInit?.admins?.length} 
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          showSizeChanger
          onChange={onChangePagination}
          locale={{items_per_page: i18n.t('common.page')}}
          className="mt-10 w-full flex justify-center" />  
    </Space>
  )
}

export default ListAdmin