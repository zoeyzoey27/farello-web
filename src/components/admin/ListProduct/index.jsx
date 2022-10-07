import React, { useState, useEffect } from 'react'
import { Space, Typography, Row, Button, Table, Pagination, Image, Form, Spin, Popconfirm, message } from 'antd'
import { FolderAddOutlined } from '@ant-design/icons'
import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS, SKIP_DEFAULT } from '../../../constant'
import { useNavigate } from 'react-router-dom'
import FormSearchProduct from './FormSearchProduct'
import { FiEdit } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_PRODUCT, GET_PRODUCTS } from './graphql'
import numberWithCommas from '../../../utils/NumberWithCommas'
import { QuestionCircleOutlined } from '@ant-design/icons'

const ListProduct = () => {
  const { Title } = Typography
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [deleteProduct] = useMutation(DELETE_PRODUCT)
  const [loading, setLoading] = useState(true)
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
           className="text-[2rem] cursor-pointer hover:opacity-80 text-[#154c79]"  />
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
            priceIn: item.priceIn,
            priceOut: item.priceOut,
            priceSale: item.priceSale,
            status: item.quantity > 0 ? 'Còn hàng' : 'Hết hàng',
          }
      })
      setDataTable(items)
      setLoading(false)
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
    <Spin spinning={loading} size="large">
       <Space 
       direction="vertical" 
       size="middle" 
       className="w-full h-full bg-white p-10">
       <Title level={4} className="whitespace-pre-wrap">Danh sách sản phẩm</Title>
       <FormSearchProduct form={form} resetFields={resetFields} onSubmit={onSubmit} />
       <Row className="flex flex-col-reverse md:flex-row md:justify-between my-5">
          <Row className="text-[1.6rem] mt-5 md:mt-0">
            Tổng số 
            <Row className="font-semibold text-red-500 mx-2">{dataInit?.products?.length}</Row> 
            kết quả
          </Row>
          <Button   
            size="large" 
            htmlType="submit" 
            onClick={() => navigate('/admin/addProduct')}
            className="w-fit bg-white text-black border-[#154c79] rounded hover:text-black hover:bg-white hover:border-[#154c79] hover:opacity-90 text-[1.6rem] hover:shadow-md flex items-center">
            <FolderAddOutlined className="mr-1 text-[2rem] text-[#154c79]" />
            Thêm mới sản phẩm
          </Button>
       </Row>
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
    </Spin>
  )
}

export default ListProduct