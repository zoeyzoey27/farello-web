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
  Image,
  Popconfirm,
  message,
  Spin
} from 'antd'
import { FolderAddOutlined } from '@ant-design/icons'
import './style.css'
import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS, SKIP_DEFAULT } from '../../../constant'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiEdit } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_CATEGORY, GET_CATEGORIES } from './graphql'
import { QuestionCircleOutlined } from '@ant-design/icons'

const ListCategory = () => {
  const { Title } = Typography
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [deleteCategory] = useMutation(DELETE_CATEGORY)
  const [loading, setLoading] = useState(true)
  const [dataTable, setDataTable] = useState([])
  const [searchCondition, setSearchCondition] = useState({
    items: {},
    pageIndex: PAGE_DEFAULT,
    pageSize: PAGE_SIZE_DEFAULT,
  })
  const { data: dataInit } = useQuery(GET_CATEGORIES, {
    variables: {
      categorySearchInput: {},
      skip: null,
      take: null,
      orderBy: {
        createdAt: "asc"
      }
    }
  })
  const { data } = useQuery(GET_CATEGORIES, {
    variables: {
      categorySearchInput: searchCondition.items,
      skip: searchCondition?.pageSize
      ? searchCondition.pageSize * (searchCondition.pageIndex - 1)
      : SKIP_DEFAULT,
      take: searchCondition?.pageSize || PAGE_SIZE_DEFAULT,
      orderBy: {
        createdAt: "asc"
      }
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
       categoryId: values.categoryId,
       name: values.categoryName,
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
      const items = data?.categories?.map((item) => {
          return {
            id: item.id,
            categoryId: item.categoryId,
            name: item.name,
            description: item.description,
            image: item.imageKey,
            totalProduct: item.products.length,
          }
      })
      setDataTable(items)
      setLoading(false)
    }
  },[data])
  const confirm = async (id) => {
    await deleteCategory({
      variables: {
        deleteCategoryId: id
      },
      onCompleted: () => {
        message.success('Xóa dữ liệu thành công!')
      },
      onError: (err) => {
        message.success(`${err.message}`)
      },
      refetchQueries: () => [
      {
        query: GET_CATEGORIES,
        variables: {
          categorySearchInput: searchCondition.items,
          skip: searchCondition?.pageSize
          ? searchCondition.pageSize * (searchCondition.pageIndex - 1)
          : SKIP_DEFAULT,
          take: searchCondition?.pageSize || PAGE_SIZE_DEFAULT,
          orderBy: {
            createdAt: "desc"
          }
        }
      },
      {
        query: GET_CATEGORIES,
        variables: {
          categorySearchInput: {},
          skip: null,
          take: null,
          orderBy: {
            createdAt: "desc"
          }
        }
      },
    ],
    })
  }
  const columns = [
    {
      title: 'Mã danh mục',
      dataIndex: 'categoryId',
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
    },
    {
      title: 'Mô tả danh mục',
      dataIndex: 'description',
      width: '550px'
    },
    {
      title: 'Ảnh minh họa',
      dataIndex: 'image',
      render: (value) => <Image src={value} alt='' width={150} />,
    },
    {
      title: 'Tổng sản phẩm',
      dataIndex: 'totalProduct',
    },
    {
      title: null,
      dataIndex: 'edit',
      render: (_, _record) => (
        <FiEdit 
           className="text-[2rem] cursor-pointer hover:opacity-80 text-[#154c79]" 
           onClick={() => navigate(`/admin/addCategory?action=edit&id=${_record.id}`)} />
      ),
      width: '50px',
    },
    {
      title: null,
      dataIndex: 'delete',
      render: (_, _record) => (
        <Popconfirm 
          title={<Row className="text-[1.6rem] ml-5">Bạn có chắc muốn xóa dữ liệu này không？</Row>}
          okText="Xóa"
          cancelText="Hủy"
          onConfirm={() => confirm(_record.id)}
          icon={<QuestionCircleOutlined className="!text-[2rem] !text-red-500" />}>
          <MdDeleteOutline className="text-[2rem] cursor-pointer hover:opacity-80 !text-red-500" />
        </Popconfirm>
      ),
      width: '50px',
    },
  ]
  return (
    <Spin spinning={loading} size="large">
      <Space 
        direction="vertical" 
        size="middle" 
        className="w-full h-full bg-white p-10">
        <Title level={4} className="whitespace-pre-wrap">Danh sách danh mục sản phẩm</Title>
        <Row className="p-10 bg-[#F8F8F8] w-full rounded">
            <Form 
              form={form} 
              onFinish={onSubmit}
              layout="vertical" 
              autoComplete="off" 
              className="w-full">
              <Row gutter={{xs: 0, md: 20, xl: 50}}>
                  <Col className="gutter-row" xs={24} md={8}>
                    <Form.Item name="categoryId" label={<Row className="font-semibold text-[1.6rem]">Mã danh mục</Row>}>
                        <Input 
                          size="large" 
                          className="rounded"
                          placeholder="Tìm kiếm" 
                          suffix={
                            <FiSearch className="text-[2rem] text-[#c6c6c6]" />
                          } />
                    </Form.Item>
                  </Col>
                  <Col className="gutter-row" xs={24} md={8}>
                    <Form.Item name="categoryName" label={<Row className="font-semibold text-[1.6rem]">Tên danh mục</Row>}>
                        <Input 
                          size="large" 
                          className="rounded"
                          placeholder="Tìm kiếm" 
                          suffix={
                            <FiSearch className="text-[2rem] text-[#c6c6c6]" />
                          } />
                    </Form.Item>
                  </Col>
                </Row>
                <Row className="flex flex-col md:flex-row md:justify-end">
                  <Form.Item className="md:mb-0">
                      <Button 
                          size="large" 
                          onClick={resetFields}
                          className="md:mr-5 w-full md:w-[100px] bg-inherit text-black hover:bg-inherit hover:text-black hover:border-inherit border-inherit hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                          Xóa
                      </Button>
                  </Form.Item>
                  <Form.Item className="mb-0">
                      <Button 
                        size="large"
                        htmlType="submit"
                        className="w-full md:w-[100px] bg-[#154c79] text-white hover:bg-[#154c79] hover:text-white hover:border-[#154c79] hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                        Tìm kiếm
                      </Button>
                  </Form.Item>
                </Row>
            </Form>
        </Row>
        <Row className="flex flex-col-reverse md:flex-row md:justify-between my-5">
            <Row className="text-[1.6rem] mt-5 md:mt-0">
              Tổng số 
              <Row className="font-semibold text-red-500 mx-2">{dataInit?.categories?.length}</Row> 
              kết quả
            </Row>
            <Button   
              size="large" 
              htmlType="submit" 
              onClick={() => navigate('/admin/addCategory')}
              className="w-fit bg-white text-black border-[#154c79] rounded hover:text-black hover:bg-white hover:border-[#154c79] hover:opacity-90 text-[1.6rem] hover:shadow-md flex items-center">
              <FolderAddOutlined className="mr-1 text-[2rem] text-[#154c79]" />
              Thêm mới danh mục
            </Button>
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
            total={dataInit?.categories?.length} 
            pageSizeOptions={PAGE_SIZE_OPTIONS}
            showSizeChanger
            onChange={onChangePagination}
            locale={{items_per_page: 'kết quả / trang'}}
            className="mt-10 w-full flex justify-center" />
      </Space>
    </Spin>
  )
}

export default ListCategory