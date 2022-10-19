import React, { useState, useEffect } from 'react'
import { Space, Typography, Row, Table, Pagination, Image, Form, Popconfirm, message, Breadcrumb } from 'antd'
import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS, SKIP_DEFAULT } from '../../../constant'
import { useNavigate } from 'react-router-dom'
import FormSearchProduct from './FormSearchProduct'
import { FiEdit } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_PRODUCT, GET_PRODUCTS } from './graphql'
import numberWithCommas from '../../../utils/NumberWithCommas'
import { QuestionCircleOutlined } from '@ant-design/icons'
import BaseTitleHeader from '../../common/BaseTitleHeader'

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
      title: 'Mã sản phẩm',
      dataIndex: 'productId',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      render: (_,_record) => (
         <Row onClick={() => navigate(`/admin/productDetail?id=${_record.id}`)} className="text-sky-500 cursor-pointer">
           {_record.name}
         </Row>
      ),
    },
    {
      title: 'Mô tả sản phẩm',
      dataIndex: 'description',
      width: '550px'
    },
    {
      title: 'Ảnh sản phẩm',
      dataIndex: 'image',
      render: (value) => <Image src={value} alt='' width={200} />,
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
  },
    {
      title: 'Giá nhập',
      dataIndex: 'priceIn',
      render: (value) => <Row>
        {`${value ? `${numberWithCommas(value)} VND` : ''}`}
      </Row>,
    },
    {
        title: 'Giá bán',
        dataIndex: 'priceOut',
        render: (value) => <Row>
        {`${value ? `${numberWithCommas(value)} VND` : ''}`}
        </Row>,
    },
    {
        title: 'Giá khuyến mại',
        dataIndex: 'priceSale',
        render: (value) => <Row>
        {`${value ? `${numberWithCommas(value)} VND` : ''}`}
        </Row>,
    },
    {
        title: 'Danh mục sản phẩm',
        dataIndex: 'category',
    },
    {
        title: 'Trạng thái',
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
          title={<Row className="text-[1.6rem] ml-5">Bạn có chắc muốn xóa sản phẩm này không？</Row>}
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
  const { data: dataInit } = useQuery(GET_PRODUCTS, {
    variables: {
      productSearchInput: {},
      skip: null,
      take: null,
      orderBy: {
        createdAt: "desc"
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
        createdAt: "desc"
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
            status: item.quantity > 0 ? 'Còn hàng' : 'Hết hàng',
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
        message.success('Xóa sản phẩm thành công!')
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
            createdAt: "desc"
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
            createdAt: "desc"
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
       <Title level={4} className="whitespace-pre-wrap">Danh sách sản phẩm</Title>
       <Breadcrumb className="text-[1.6rem] mb-5 px-10 py-2 bg-[#f8f8f8]">
          <Breadcrumb.Item 
            onClick={() => navigate('/admin/dashboard')}
            className="hover:text-black cursor-pointer">
            Bảng điều khiển
          </Breadcrumb.Item>
          <Breadcrumb.Item className="font-semibold">
            Danh sách sản phẩm
          </Breadcrumb.Item>
        </Breadcrumb>
       <FormSearchProduct form={form} resetFields={resetFields} onSubmit={onSubmit} />
       <BaseTitleHeader totalCount={dataInit?.products?.length} handleClick={() => navigate('/admin/addProduct')} buttonLabel="Thêm mới sản phẩm" />
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
          locale={{items_per_page: 'kết quả / trang'}}
          className="mt-10 w-full flex justify-center" />
    </Space>
  )
}

export default ListProduct