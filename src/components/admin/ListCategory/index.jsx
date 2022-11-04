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
  Image,
  Popconfirm,
  message,
  Breadcrumb
} from 'antd'
import './style.css'
import { DESC, PAGE_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS, SKIP_DEFAULT } from '../../../constant'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiEdit } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_CATEGORY, GET_CATEGORIES } from './graphql'
import { QuestionCircleOutlined } from '@ant-design/icons'
import FormButtonSearch from '../../common/FormButtonSearch'
import BaseTitleHeader from '../../common/BaseTitleHeader'
import i18n from '../../../translation'

const ListCategory = ({setLoading}) => {
  const { Title } = Typography
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [deleteCategory] = useMutation(DELETE_CATEGORY)
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
        createdAt: DESC
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
    }
  },[data])
  const confirm = async (id) => {
    await deleteCategory({
      variables: {
        deleteCategoryId: id
      },
      onCompleted: () => {
        message.success(i18n.t('categoryList.message.deleteSuccessful'))
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
            createdAt: DESC
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
            createdAt: DESC
          }
        }
      },
    ],
    })
  }
  const columns = [
    {
      title: i18n.t('categoryList.id'),
      dataIndex: 'categoryId',
    },
    {
      title: i18n.t('categoryList.name'),
      dataIndex: 'name',
    },
    {
      title: i18n.t('categoryList.description'),
      dataIndex: 'description',
      width: '550px'
    },
    {
      title: i18n.t('categoryList.image'),
      dataIndex: 'image',
      render: (value) => <Image src={value} alt='' width={150} />,
    },
    {
      title: i18n.t('categoryList.products'),
      dataIndex: 'totalProduct',
    },
    {
      title: null,
      dataIndex: 'edit',
      render: (_, _record) => (
        <FiEdit 
           className="text-[2rem] cursor-pointer hover:opacity-80 text-colorTheme" 
           onClick={() => navigate(`/admin/addCategory?action=edit&id=${_record.id}`)} />
      ),
      width: '50px',
    },
    {
      title: null,
      dataIndex: 'delete',
      render: (_, _record) => (
        <Popconfirm 
          title={<Row className="text-[1.6rem] ml-5">{i18n.t('categoryList.deleteConfirm')}</Row>}
          okText={i18n.t('common.reset')}
          cancelText={i18n.t('common.cancel')}
          onConfirm={() => confirm(_record.id)}
          icon={<QuestionCircleOutlined className="!text-[2rem] !text-red-500" />}>
          <MdDeleteOutline className="text-[2rem] cursor-pointer hover:opacity-80 !text-red-500" />
        </Popconfirm>
      ),
      width: '50px',
    },
  ]
  return (
    <Space 
        direction="vertical" 
        size="middle" 
        className="w-full h-full bg-white p-10">
        <Title level={4} className="whitespace-pre-wrap">{i18n.t('categoryList.title')}</Title>
        <Breadcrumb className="text-[1.6rem] mb-5 px-10 py-2 bg-bgGray">
          <Breadcrumb.Item 
            onClick={() => navigate('/admin/dashboard')}
            className="hover:text-black cursor-pointer">
           {i18n.t('common.dashboard')}
          </Breadcrumb.Item>
          <Breadcrumb.Item className="font-semibold">
             {i18n.t('categoryList.title')}
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row className="p-10 bg-[#F8F8F8] w-full rounded">
            <Form 
              form={form} 
              onFinish={onSubmit}
              layout="vertical" 
              autoComplete="off" 
              className="w-full">
              <Row gutter={{xs: 0, md: 20, xl: 50}}>
                  <Col className="gutter-row" xs={24} md={8}>
                    <Form.Item name="categoryId" label={<Row className="font-semibold text-[1.6rem]">{i18n.t('categoryList.id')}</Row>}>
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
                    <Form.Item name="categoryName" label={<Row className="font-semibold text-[1.6rem]">{i18n.t('categoryList.name')}</Row>}>
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
        <BaseTitleHeader 
           totalCount={dataInit?.categories?.length} 
           handleClick={() => navigate('/admin/addCategory')} 
           buttonLabel={i18n.t('categoryList.buttonAdd')} />
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
            locale={{items_per_page: i18n.t('common.page')}}
            className="mt-10 w-full flex justify-center" />
      </Space>
  )
}

export default ListCategory