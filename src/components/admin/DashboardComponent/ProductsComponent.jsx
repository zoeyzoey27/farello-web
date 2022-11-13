import React, { useState, useEffect } from 'react'
import { Space, Row, Col, Statistic, Card, Table, Image  } from 'antd'
import { RiFileList2Line } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTS } from './graphql'
import numberWithCommas from '../../../utils/NumberWithCommas'
import i18n from '../../../translation'
import { DESC } from '../../../constant'
import Chart from './Chart'

const ProductsComponent = ({setLoading}) => {
  const navigate = useNavigate()
  const [dataTable, setDataTable] = useState([])
  const { data } = useQuery(GET_PRODUCTS, {
    variables: {
        productSearchInput: {},
        skip: null,
        take: null,
        orderBy: {
            updatedAt: DESC
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
            status: item.quantity > 0 ? i18n.t('dashboard.stock') : i18n.t('dashboard.outOfStock'),
          }
      })
      setDataTable(items)
    }
  },[data])
  const columns = [
    {
      title: i18n.t('common.productId'),
      dataIndex: 'productId',
    },
    {
      title: i18n.t('common.productName'),
      dataIndex: 'name',
      render: (_,_record) => (
         <Row onClick={() => navigate(`/admin/productDetail?id=${_record.id}`)} className="text-sky-500 cursor-pointer">
           {_record.name}
         </Row>
      ),
    },
    {
      title: i18n.t('common.productImage'),
      dataIndex: 'image',
      render: (value) => <Image src={value} alt='' width={200} />,
    },
    {
      title: i18n.t('common.quantity'),
      dataIndex: 'quantity',
    },
    {
      title: i18n.t('common.priceIn'),
      dataIndex: 'priceIn',
      render: (value) => <Row>
        {`${value ? `${numberWithCommas(value)} VND` : ''}`}
      </Row>,
    },
    {
      title: i18n.t('common.priceOut'),
      dataIndex: 'priceOut',
      render: (value) => <Row>
      {`${value ? `${numberWithCommas(value)} VND` : ''}`}
      </Row>,
    },
    {
      title: i18n.t('common.priceSale'),
      dataIndex: 'priceSale',
      render: (value) => <Row>
      {`${value ? `${numberWithCommas(value)} VND` : ''}`}
      </Row>,
    },
    {
      title: i18n.t('common.productCategory'),
      dataIndex: 'category',
    },
    {
      title: i18n.t('common.productStatus'),
      dataIndex: 'status',
    },
  ]
  return (
    <Space direction="vertical" size="middle" className="bg-white shadow-md p-10 w-full mt-5 rounded">
        <Row className="text-[1.6rem] font-semibold">{i18n.t('dashboard.productStatus')}</Row>
        <hr className="mb-5" />
        <Chart />
        <Row 
            onClick={() => navigate("/admin/productManagement")}
            className="flex items-center justify-end text-[1.6rem] cursor-pointer hover:opacity-80 text-blue-500">
            <RiFileList2Line className="text-[2.3rem] mr-3" />
            {i18n.t('dashboard.allProducts')}
        </Row>
        <Row gutter={16}>
            <Col xs={24} md={12} xl={6}>
                <Card className="rounded border-2 mb-5 xl:mb-0 border-l-4 border-l-colorTheme">
                    <Statistic
                        title={i18n.t('dashboard.allProducts')}
                        value={data?.products?.length}
                        valueStyle={{ color: '#154c79' }}
                        prefix={i18n.t('dashboard.total')}
                    />
                </Card>
            </Col>
            <Col xs={24} md={12} xl={6}>
                <Card className="rounded border-2 mb-5 xl:mb-0 border-l-4 border-l-[#3f8600]">
                    <Statistic
                        title={i18n.t('dashboard.onSale')}
                        value={countFuncByStatus("STOCKING")}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={i18n.t('dashboard.total')}
                    />
                </Card>
            </Col>
            <Col xs={24} md={12} xl={6}>
                <Card className="rounded border-2 mb-5 md:mb-0 border-l-4 border-l-[#cf1322]">
                    <Statistic
                        title={i18n.t('dashboard.outOfStockSoon')}
                        value={countFuncByQuantity()}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={i18n.t('dashboard.total')}
                    />
                </Card>
            </Col>
            <Col xs={24} md={12} xl={6}>
                <Card className="border-2 rounded border-l-4 border-l-[#cf1322]">
                    <Statistic
                        title={i18n.t('dashboard.outOfStock')}
                        value={countFuncByStatus("OUT_OF_STOCK")}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={i18n.t('dashboard.total')}
                    />
                </Card>
            </Col>
        </Row>
        <Row className="text-[1.6rem]">{i18n.t('dashboard.newProduct')}</Row>
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