import React, { useState, useEffect } from 'react'
import { Space, Row, Col, Statistic, Card, Table, Image  } from 'antd'
import { RiFileList2Line } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from './graphql'
import numberWithCommas from '../../../utils/NumberWithCommas'

const ProductsComponent = ({setLoading}) => {
  const navigate = useNavigate()
  const [dataTable, setDataTable] = useState([])
  const { data } = useQuery(GET_PRODUCTS, {
    variables: {
        productSearchInput: {},
        skip: null,
        take: null,
        orderBy: {
            updatedAt: "desc"
        }
    },
    onCompleted: () => {
        setLoading(false)
    }
  })
  const countFuncByStatus = (status) => {
    let count = 0
    if (data?.products) {
        for (let i=0; i<data?.products?.length; i++) {
            if (data?.products[i]?.status === status) count ++
        }
    }
    return count
  }
  const countFuncByQuantity = () => {
    let count = 0
    if (data?.products) {
        for (let i=0; i<data?.products?.length; i++) {
            if (data?.products[i]?.quantity <= 5 ) count ++
        }
    }
    return count
  }
  useEffect(() => {
    if (data?.products) {
      const items = data?.products?.slice(0,5).map((item) => {
          return {
            id: item.id,
            productId: item.productId,
            category: item.category.name,
            name: item.name,
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
  ]
  return (
    <Space direction="vertical" size="middle" className="bg-white shadow-md p-10 w-full mt-5 rounded">
        <Row className="text-[1.6rem] font-semibold">Tình trạng sản phẩm</Row>
        <hr className="mb-5" />
        <Row 
            onClick={() => navigate("/admin/productManagement")}
            className="flex items-center justify-end text-[1.6rem] cursor-pointer hover:opacity-80 text-blue-500">
            <RiFileList2Line className="text-[2.3rem] mr-3" />
            Tất cả sản phẩm
        </Row>
        <Row gutter={16}>
            <Col xs={24} md={12} xl={6}>
                <Card className="rounded border-2 mb-5 xl:mb-0 border-l-4 border-l-colorTheme">
                    <Statistic
                        title="Tất cả sản phẩm"
                        value={data?.products?.length}
                        valueStyle={{ color: '#154c79' }}
                        prefix="Tổng số: "
                    />
                </Card>
            </Col>
            <Col xs={24} md={12} xl={6}>
                <Card className="rounded border-2 mb-5 xl:mb-0 border-l-4 border-l-[#3f8600]">
                    <Statistic
                        title="Đang bán"
                        value={countFuncByStatus("STOCKING")}
                        valueStyle={{ color: '#3f8600' }}
                        prefix="Tổng số: "
                    />
                </Card>
            </Col>
            <Col xs={24} md={12} xl={6}>
                <Card className="rounded border-2 mb-5 md:mb-0 border-l-4 border-l-[#cf1322]">
                    <Statistic
                        title="Sắp hết hàng"
                        value={countFuncByQuantity()}
                        valueStyle={{ color: '#cf1322' }}
                        prefix="Tổng số: "
                    />
                </Card>
            </Col>
            <Col xs={24} md={12} xl={6}>
                <Card className="border-2 rounded border-l-4 border-l-[#cf1322]">
                    <Statistic
                        title="Hết hàng"
                        value={countFuncByStatus("OUT_OF_STOCK")}
                        valueStyle={{ color: '#cf1322' }}
                        prefix="Tổng số: "
                    />
                </Card>
            </Col>
        </Row>
        <Row className="text-[1.6rem]">Sản phẩm mới cập nhật</Row>
        <Table 
          columns={columns} 
          dataSource={dataTable} 
          bordered 
          pagination={false}
          rowKey="id"
          scroll={{ x: 'max-content' }} />
    </Space>
  )
}

export default ProductsComponent