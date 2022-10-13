import React, { useState, useEffect } from 'react'
import { 
  Space, 
  Typography, 
  Row, 
  Button, 
  Table, 
  Form, 
  Input, 
  Pagination, 
  Spin, 
  Breadcrumb, 
  Modal, 
  message,
  Popconfirm 
} from 'antd'
import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS, SKIP_DEFAULT } from '../../../constant'
import { useMutation, useQuery } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { FiEdit } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'
import { schemaValidate } from '../../../validation/AddPostCategory'
import { converSchemaToAntdRule } from '../../../validation'
import { 
  CREATE_POST_CATEGORY, 
  DELETE_POST_CATEGORY, 
  GET_POST_CATEGORY, 
  GET_POST_CATEGORY_BY_ID, 
  UPDATE_POST_CATEGORY 
} from './graphql'
import moment from 'moment'
import { DATE_TIME_FORMAT } from '../../../constant'
import { QuestionCircleOutlined } from '@ant-design/icons'

const ListPostCategory = () => {
  const yupSync = converSchemaToAntdRule(schemaValidate)
  const { Title } = Typography
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [createPostCategory] = useMutation(CREATE_POST_CATEGORY)
  const [updatePostCategory] = useMutation(UPDATE_POST_CATEGORY)
  const [deletePostCategory] = useMutation(DELETE_POST_CATEGORY)
  const [loading, setLoading] = useState(false)
  const [currentId, setCurrentId] = useState()
  const [isEdit, setIsEdit] = useState(false)
  const [dataTable, setDataTable] = useState([])
  const [searchCondition, setSearchCondition] = useState({
    pageIndex: PAGE_DEFAULT,
    pageSize: PAGE_SIZE_DEFAULT,
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: dataInit } = useQuery(GET_POST_CATEGORY, {
    variables: {
      skip: null,
      take: null,
      orderBy: {
        updatedAt: "desc"
      }
    }
  })
  const { data } = useQuery(GET_POST_CATEGORY, {
    variables: {
      skip: searchCondition?.pageSize
      ? searchCondition.pageSize * (searchCondition.pageIndex - 1)
      : SKIP_DEFAULT,
      take: searchCondition?.pageSize || PAGE_SIZE_DEFAULT,
      orderBy: {
        updatedAt: "desc"
      }
    }
  })
  const { data: singleData } = useQuery(GET_POST_CATEGORY_BY_ID, {
    variables: {
      postCategoryId: currentId,
    },
    skip: currentId === null
  })
  useEffect(() => {
    if (data) {
       const items = data?.postCategories?.map((item) => {
           return {
             id: item.id,
             postCategoryId: item.categoryId,
             title: item.title,
             createdAt: item.createdAt,
           }
       })
       setDataTable(items)
    }
 },[data])
  useEffect(() => {
    if (singleData) {
      form.setFieldsValue({
        categoryName: singleData?.postCategory?.title
      })
    }
  },[singleData, form])
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
    setIsEdit(false)
    setCurrentId(null)
  }


  const onChangePagination = (page, limit) => {
    setSearchCondition({
      pageIndex: page,
      pageSize: limit,
    })
  }

  const onFinish = async (values) => {
     setLoading(true)
     const customId = 'PA' + Math.floor(Math.random() * Date.now())
     await createPostCategory({
        variables: {
          postCategoryInput: {
            categoryId: customId,
            title: values.categoryName,
            createdAt: moment().format(DATE_TIME_FORMAT),
            updatedAt: moment().format(DATE_TIME_FORMAT)
          }
        },
        onCompleted: () => {
          setLoading(false)
          message.success("Thêm danh mục bài viết thành công!")
          window.location.reload()
        },
        onError: (err) => {
          setLoading(false)
          message.error(`${err.message}`)
        }
     })
  }

  const onUpdate = async (values) => {
     setLoading(true)
     await updatePostCategory({
       variables: {
         updatePostCategoryId: currentId,
         postCategoryUpdateInput: {
           title: values.categoryName,
           updatedAt: moment().format(DATE_TIME_FORMAT)
         }
       },
       onCompleted: () => {
         setLoading(false)
         message.success("Cập nhật thành công!")
         window.location.reload()
       },
       onError: (err) => {
         setLoading(false)
         message.error(`${err.message}`)
       }
     })
  }

  const confirm = async (id) => {
    setLoading(true)
    await deletePostCategory({
      variables: {
        deletePostCategoryId: id,
      },
      onCompleted: () => {
        setLoading(false)
        message.success("Xóa dữ liệu thành công!")
        window.location.reload()
      },
      onError: (err) => {
        setLoading(false)
        message.error(`${err.message}`)
      }
    })
  }

  const columns = [
    {
      title: 'Mã danh mục',
      dataIndex: 'postCategoryId',
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'title',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      width: '200px'
    },
    {
      title: null,
      dataIndex: 'edit',
      render: (_, _record) => (
        <FiEdit 
           className="text-[2rem] cursor-pointer hover:opacity-80 text-[#154c79]" 
           onClick={() => {
              setCurrentId(_record.id)
              setIsEdit(true)
              showModal()
           }} />
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
       <Title level={4} className="whitespace-pre-wrap">Danh mục bài viết</Title>
       <Breadcrumb className="text-[1.6rem] mb-5 px-10 py-2 bg-[#f8f8f8]">
          <Breadcrumb.Item 
            onClick={() => navigate('/admin/dashboard')}
            className="hover:text-black cursor-pointer">
            Bảng điều khiển
          </Breadcrumb.Item>
          <Breadcrumb.Item className="font-semibold">
            Danh mục bài viết
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row className="flex justify-end">
          <Button 
            size="large"
            onClick={showModal}
            className="w-full md:w-[100px] !bg-[#154c79] !text-white !border-[#154c79] hover:bg-[#154c79] hover:text-white hover:border-[#154c79] hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
            Thêm mới
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
          total={dataInit?.postCategories?.length} 
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          showSizeChanger
          onChange={onChangePagination}
          locale={{items_per_page: 'kết quả / trang'}}
          className="mt-10 w-full flex justify-center" />
        <Modal 
           title={isEdit ? 'Chỉnh sửa danh mục bài viết' : 'Tạo danh mục bài viết'}
           centered 
           visible={isModalOpen} 
           onCancel={handleCancel} 
           footer={false}>
          <Form 
            form={form}
            layout='vertical' 
            autoComplete='off' 
            onFinish={isEdit ? onUpdate : onFinish}>
            <Form.Item
                name="categoryName"
                className="w-full"
                required={false}
                rules={[yupSync]}
                label={
                  <Row className="font-semibold text-[1.6rem]">
                    Tên danh mục
                    <Row className="text-red-500 ml-3">*</Row>
                  </Row>
                }>
                <Input size="large" placeholder="Bảo vệ mắt" className="rounded" />
            </Form.Item>
            <Row className="w-full flex justify-center">
              <Form.Item>
                  <Button 
                      size="large" 
                      htmlType="submit"
                      className="mt-5 w-full md:min-w-[150px] !border-[#154c79] !bg-[#154c79] !text-white hover:bg-[#154c79] hover:text-white hover:border-[#154c79] hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                      {isEdit ? 'Lưu thay đổi' : 'Lưu'}
                  </Button>
              </Form.Item>
            </Row>
          </Form>
        </Modal>
    </Space>
    </Spin>
  )
}

export default ListPostCategory