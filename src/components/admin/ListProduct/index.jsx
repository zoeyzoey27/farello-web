import React, { useState, useEffect } from 'react'
import { Space, Typography, Row, Table, Pagination, Image, Form, Popconfirm, message, Breadcrumb } from 'antd'
import { DESC, PAGE_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS, SKIP_DEFAULT } from '../../../constant'
import { useNavigate } from 'react-router-dom'
import FormSearchProduct from './FormSearchProduct'
import { FiEdit } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_PRODUCT, GET_PRODUCTS } from './graphql'
import numberWithCommas from '../../../utils/NumberWithCommas'
import { QuestionCircleOutlined } from '@ant-design/icons'
import BaseTitleHeader from '../../common/BaseTitleHeader'
import i18n from '../../../translation'

const ListProduct = ({setLoading}) => {
  const { Title } = Typography
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [deleteProduct] = useMutation(DELETE_PRODUCT)
  const [dataTable, setDataTable] = useState([])
  const [searchCondition, setSearchCondition] = useState({
    items: {},
    pageIndex: PAGE_DEFAULT,
    pageSize: PAGE_SIZE_DEFAULT,
  })
  const columns = [
    {
      title: i18n.t('product.id'),
      dataIndex: 'productId',
    },
    {
      title: i18n.t('product.name'),
      dataIndex: 'name',
      render: (_,_record) => (
         <Row onClick={() => navigate(`/admin/productDetail?id=${_record.id}`)} className="text-sky-500 cursor-pointer">
           {_record.name}
         </Row>
      ),
    },
    {
      title: i18n.t('product.description'),
      dataIndex: 'description',
      width: '550px'
    },
    {
      title: i18n.t('product.image'),
      dataIndex: 'image',
      render: (value) => <Image src={value} alt='' width={200} />,
    },
    {
      title: i18n.t('product.quantity'),
      dataIndex: 'quantity',
  },
    {
      title: i18n.t('product.priceIn'),
      dataIndex: 'priceIn',
      render: (value) => <Row>
        {`${value ? `${numberWithCommas(value)} VND` : ''}`}
      </Row>,
    },
    {
        title: i18n.t('product.priceOut'),
        dataIndex: 'priceOut',
        render: (value) => <Row>
        {`${value ? `${numberWithCommas(value)} VND` : ''}`}
        </Row>,
    },
    {
        title: i18n.t('product.priceSale'),
        dataIndex: 'priceSale',
        render: (value) => <Row>
        {`${value ? `${numberWithCommas(value)} VND` : ''}`}
        </Row>,
    },
    {
        title: i18n.t('product.category'),
        dataIndex: 'category',
    },
    {
        title: i18n.t('product.status'),
        dataIndex: 'status',
    },
    {
      title: null,
      dataIndex: 'edit',
      render: (_,_record) => (
        <FiEdit 
           onClick={() => navigate(`/admin/addProduct?action=edit&id=${_record.id}`)}
           className="text-[2rem] cursor-pointer hover:opacity-80 text-colorTheme"  />
      ),
      width: '50px',
    },
    {
      title: null,
      dataIndex: 'delete',
      render: (_, _record) => (
        <Popconfirm 
          title={<Row className="text-[1.6rem] ml-5">{i18n.t('listProduct.deleteConfirm')}</Row>}
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
  const { data: dataInit } = useQuery(GET_PRODUCTS, {
    variables: {
      productSearchInput: {},
      skip: null,
      take: null,
      orderBy: {
        createdAt: DESC
      }
    }
  })
  const { data } = useQuery(GET_PRODUCTS, {
    variables: {
      productSearchInput: searchCondition.items,
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
       productId: values.productId,
       name: values.productName,
       categoryId: values.category,
       priceIn: parseInt(values.priceIn),
       priceOut: parseInt(values.priceOut),
       priceSale: parseInt(values.priceSale),
       quantity: parseInt(values.quantity),
       status: values.status,
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
      const items = data?.products?.map((item) => {
          return {
            id: item.id,
            productId: item.productId,
            category: item.category.name,
            name: item.name,
            description: item.description,
            image: item.images[0],
            quantity: item.quantity,
            priceIn: item.priceIn,
            priceOut: item.priceOut,
            priceSale: item.priceSale,
            status: item.quantity > 0 ? i18n.t('product.stock') : i18n.t('product.outOfStock'),
          }
      })
      setDataTable(items)
    }
  },[data])
  const confirm = async (id) => {
    setLoading(true)
    await deleteProduct({
      variables: {
        deleteProductId: id
      },
      onCompleted: () => {
        message.success(i18n.t('listProduct.deleteSuccessful'))
      },
      onError: (err) => {
        message.success(`${err.message}`)
      },
      refetchQueries: () => [
      {
        query: GET_PRODUCTS,
        variables: {
          productSearchInput: searchCondition.items,
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
      },
      {
        query: GET_PRODUCTS,
        variables: {
          productSearchInput: {},
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
  return (
    <Space 
       direction="vertical" 
       size="middle" 
       className="w-full h-full bg-white p-10">
       <Title level={4} className="whitespace-pre-wrap">{i18n.t('listProduct.title')}</Title>
       <Breadcrumb className="text-[1.6rem] mb-5 px-10 py-2 bg-[#f8f8f8]">
          <Breadcrumb.Item 
            onClick={() => navigate('/admin/dashboard')}
            className="hover:text-black cursor-pointer">
            {i18n.t('common.dashboard')}
          </Breadcrumb.Item>
          <Breadcrumb.Item className="font-semibold">
            {i18n.t('listProduct.title')}
          </Breadcrumb.Item>
        </Breadcrumb>
       <FormSearchProduct form={form} resetFields={resetFields} onSubmit={onSubmit} />
       <BaseTitleHeader 
          totalCount={dataInit?.products?.length} 
          handleClick={() => navigate('/admin/addProduct')} 
          buttonLabel={i18n.t('listProduct.buttonAdd')} />
       <Table 
          columns={columns} 
          dataSource={dataTable} 
          bordered 
          pagination={false}
          rowKey="id"
          scroll={{ x: 'max-content' }} />
       <Pagination 
          current={searchCondition?.pageIndex} 
          pageSize={searchCondition?.pageSize} 
          total={dataInit?.products?.length} 
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          showSizeChanger
          onChange={onChangePagination}
          locale={{items_per_page: i18n.t('common.page')}}
          className="mt-10 w-full flex justify-center" />
    </Space>
  )
}

export default ListProduct