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
  Breadcrumb,
  Select 
} from 'antd'
import { ASC, DESC, PAGE_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS, SKIP_DEFAULT } from '../../../constant'
import { FiSearch} from 'react-icons/fi'
import { useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { GET_CATEGORY_POST, GET_POSTS } from './graphql'
import FormButtonSearch from '../../common/FormButtonSearch'
import i18n from '../../../translation'

const PostManagementComponent = ({setLoading}) => {
  const { Title } = Typography
  const { Option } = Select
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [dataTable, setDataTable] = useState([])
  const [searchCondition, setSearchCondition] = useState({
    items: {},
    pageIndex: PAGE_DEFAULT,
    pageSize: PAGE_SIZE_DEFAULT,
  })
  const { data: dataInit } = useQuery(GET_POSTS, {
    variables: {
      postSearchInput: {},
      skip: null,
      take: null,
      orderBy: {
        createdAt: DESC
      }
    }
  })
  const { data } = useQuery(GET_POSTS, {
    variables: {
      postSearchInput: searchCondition.items,
      skip: searchCondition?.pageSize
      ? searchCondition.pageSize * (searchCondition.pageIndex - 1)
      : SKIP_DEFAULT,
      take: searchCondition?.pageSize || PAGE_SIZE_DEFAULT,
      orderBy: {
        updatedAt: DESC
      }
    },
    onCompleted: () => {
      setLoading(false)
    }
  })
  const { data: dataCategory } = useQuery(GET_CATEGORY_POST, {
    variables: {
      skip: null,
      take: null,
      orderBy: {
        updatedAt: ASC
      }
    }
  })
  useEffect(() => {
    if (data) {
      const items = data?.posts?.map((item) => {
          return {
            id: item?.id,
            postId: item?.postId,
            title: item?.title,
            category: item?.category?.title,
            admin: item?.createdBy?.fullName,
            createdAt: item?.createdAt,
            updatedAt: item?.updatedAt,
          }
      })
      setDataTable(items)
    }
  }, [data, form])
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
       postId: values.postId,
       title: values.titlePost,
       categoryId: values.categoryId,
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
  const columns = [
    {
      title: i18n.t('listPost.id'),
      dataIndex: 'postId',
    },
    {
      title: i18n.t('listPost.title'),
      dataIndex: 'title',
      render: (_, record) => (
        <Row 
          className="text-blue-500 cursor-pointer" 
          onClick={() => navigate(`/admin/postDetail?id=${record.id}`)}>
          {record.title}
        </Row>
      )
    },
    {
        title: i18n.t('listPost.postCategory'),
        dataIndex: 'category',
    },
    {
      title: i18n.t('listPost.admin'),
      dataIndex: 'admin'
    },
    {
      title: i18n.t('listPost.createdAt'),
      dataIndex: 'createdAt',
      width: '200px'
    },
    {
      title: i18n.t('listPost.updatedAt'),
      dataIndex: 'updatedAt',
      width: '200px'
    },
  ]
  return (
    <Space 
       direction="vertical" 
       size="middle" 
       className="w-full h-full bg-white p-10">
       <Title level={4} className="whitespace-pre-wrap">{i18n.t('listPost.heading')}</Title>
       <Breadcrumb className="text-[1.6rem] mb-5 px-10 py-2 bg-[#f8f8f8]">
          <Breadcrumb.Item 
            onClick={() => navigate('/admin/dashboard')}
            className="hover:text-black cursor-pointer">
            {i18n.t('common.dashboard')}
          </Breadcrumb.Item>
          <Breadcrumb.Item className="font-semibold">
             {i18n.t('listPost.heading')}
          </Breadcrumb.Item>
        </Breadcrumb>
       <Row className="p-10 bg-[#F8F8F8] w-full rounded">
          <Form form={form} layout="vertical" autoComplete="off" className="w-full" onFinish={onSubmit}>
            <Row gutter={{xs: 0, md: 20, xl: 50}}>
                <Col className="gutter-row" xs={24} md={6}>
                  <Form.Item name="adminId" label={<Row className="font-semibold text-[1.6rem]">{i18n.t('listPost.adminID')}</Row>}>
                      <Input 
                         size="large" 
                         className="rounded"
                         placeholder={i18n.t('common.search')} 
                         suffix={
                           <FiSearch className="text-[2rem] text-[#c6c6c6]" />
                         } />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={6}>
                  <Form.Item name="postId" label={<Row className="font-semibold text-[1.6rem]">{i18n.t('listPost.id')}</Row>}>
                      <Input 
                         size="large" 
                         className="rounded"
                         placeholder={i18n.t('common.search')}  
                         suffix={
                           <FiSearch className="text-[2rem] text-[#c6c6c6]" />
                         } />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={6}>
                  <Form.Item name="titlePost" label={<Row className="font-semibold text-[1.6rem]">{i18n.t('listPost.title')}</Row>}>
                      <Input 
                         size="large" 
                         className="rounded"
                         placeholder={i18n.t('common.search')}  
                         suffix={
                           <FiSearch className="text-[2rem] text-[#c6c6c6]" />
                         } />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={6}>
                  <Form.Item name="categoryId" label={<Row className="font-semibold text-[1.6rem]">{i18n.t('listPost.postCategory')}</Row>}>
                      <Select size="large" placeholder={i18n.t('common.search')} className="text-[1.6rem rounded">
                          {
                            dataCategory?.postCategories?.map((item) => (
                              <Option key={item.id} value={item.id} className="text-[1.6rem]">{item.title}</Option>
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
            <Row className="font-semibold text-colorTheme mx-2">{dataInit?.posts?.length}</Row> 
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
          total={dataInit?.posts?.length} 
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          showSizeChanger
          onChange={onChangePagination}
          locale={{items_per_page: i18n.t('common.page')}}
          className="mt-10 w-full flex justify-center" />
    </Space>
  )
}

export default PostManagementComponent