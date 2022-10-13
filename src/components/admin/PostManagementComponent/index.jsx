import React, { useState, useEffect } from 'react'
import { 
  Space, 
  Typography, 
  Row, 
  Button, 
  Table, 
  Col, 
  Form, 
  Input, 
  Pagination, 
  Spin, 
  Breadcrumb,
  Select 
} from 'antd'
import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS, SKIP_DEFAULT } from '../../../constant'
import { FiSearch} from 'react-icons/fi'
import { useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { GET_CATEGORY_POST, GET_POSTS } from './graphql'

const PostManagementComponent = () => {
  const { Title } = Typography
  const { Option } = Select
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
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
        updatedAt: "asc"
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
        updatedAt: "asc"
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
        updatedAt: "asc"
      }
    }
  })
  useEffect(() => {
    if (data) {
      const items = data?.posts?.map((item) => {
          return {
            id: item.id,
            postId: item.postId,
            title: item.title,
            category: item.category.title,
            admin: item.createdBy.fullName,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          }
      })
      setDataTable(items)
    }
  }, [data, form])
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
       adminId: values.adminId,
       postId: values.postId,
       title: values.titlePost,
       categoryId: values.categoryId,
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
  const columns = [
    {
      title: 'Post ID',
      dataIndex: 'postId',
    },
    {
      title: 'Tiêu đề',
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
        title: 'Danh mục bài viết',
        dataIndex: 'category',
    },
    {
      title: 'Admin',
      dataIndex: 'admin'
    },
    {
      title: 'Ngày đăng',
      dataIndex: 'createdAt',
      width: '200px'
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedAt',
      width: '200px'
    },
  ]
  return (
    <Spin spinning={loading} size="large">
      <Space 
       direction="vertical" 
       size="middle" 
       className="w-full h-full bg-white p-10">
       <Title level={4} className="whitespace-pre-wrap">Quản lý bài viết</Title>
       <Breadcrumb className="text-[1.6rem] mb-5 px-10 py-2 bg-[#f8f8f8]">
          <Breadcrumb.Item 
            onClick={() => navigate('/admin/dashboard')}
            className="hover:text-black cursor-pointer">
            Bảng điều khiển
          </Breadcrumb.Item>
          <Breadcrumb.Item className="font-semibold">
            Quản lý bài viết
          </Breadcrumb.Item>
        </Breadcrumb>
       <Row className="p-10 bg-[#F8F8F8] w-full rounded">
          <Form form={form} layout="vertical" autoComplete="off" className="w-full" onFinish={onSubmit}>
            <Row gutter={{xs: 0, md: 20, xl: 50}}>
                <Col className="gutter-row" xs={24} md={6}>
                  <Form.Item name="adminId" label={<Row className="font-semibold text-[1.6rem]">Admin ID</Row>}>
                      <Input 
                         size="large" 
                         className="rounded"
                         placeholder="Tìm kiếm" 
                         suffix={
                           <FiSearch className="text-[2rem] text-[#c6c6c6]" />
                         } />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={6}>
                  <Form.Item name="postId" label={<Row className="font-semibold text-[1.6rem]">ID bài viết</Row>}>
                      <Input 
                         size="large" 
                         className="rounded"
                         placeholder="Tìm kiếm" 
                         suffix={
                           <FiSearch className="text-[2rem] text-[#c6c6c6]" />
                         } />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={6}>
                  <Form.Item name="titlePost" label={<Row className="font-semibold text-[1.6rem]">Tiêu đề</Row>}>
                      <Input 
                         size="large" 
                         className="rounded"
                         placeholder="Tìm kiếm" 
                         suffix={
                           <FiSearch className="text-[2rem] text-[#c6c6c6]" />
                         } />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={6}>
                  <Form.Item name="categoryId" label={<Row className="font-semibold text-[1.6rem]">Danh mục bài viết</Row>}>
                      <Select size="large" placeholder="Tìm kiếm" className="text-[1.6rem rounded">
                          {
                            dataCategory?.postCategories?.map((item) => (
                              <Option key={item.id} value={item.id} className="text-[1.6rem]">{item.title}</Option>
                            ))
                          }
                      </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row className="flex flex-col md:flex-row md:justify-end">
                 <Form.Item className="md:mb-0">
                    <Button 
                        size="large" 
                        onClick={resetFields}
                        className="md:mr-5 w-full md:w-[100px] !bg-inherit !text-black hover:bg-inherit hover:text-black hover:border-inherit !border-inherit hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                        Xóa
                    </Button>
                 </Form.Item>
                 <Form.Item className="mb-0">
                    <Button 
                      size="large"
                      htmlType="submit"
                      className="w-full md:w-[100px] !bg-[#154c79] !text-white !border-[#154c79] hover:bg-[#154c79] hover:text-white hover:border-[#154c79] hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                      Tìm kiếm
                    </Button>
                 </Form.Item>
              </Row>
          </Form>
       </Row>
       <Row className="text-[1.6rem] mt-5 md:mt-0">
            Tổng số 
            <Row className="font-semibold text-red-500 mx-2">{dataInit?.posts?.length}</Row> 
            kết quả
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
          locale={{items_per_page: 'kết quả / trang'}}
          className="mt-10 w-full flex justify-center" />
    </Space>
    </Spin>
  )
}

export default PostManagementComponent