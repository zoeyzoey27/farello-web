import React from 'react'
import { Space, Row, Col, Statistic, Card  } from 'antd'
import { RiFileList2Line } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_ORDERS } from './graphql'
import { DESC } from '../../../constant'
import i18n from '../../../translation'

const OrdersComponent = () => {
  const navigate = useNavigate()
  const { data } = useQuery(GET_ORDERS, {
    variables: {
        orderSearchInput: {},
        skip: null,
        take: null,
        orderBy: {
            updatedAt: DESC
        }
    },
  })
  const countFunc = (status) => {
    let count = 0
    if (data?.orders) {
        for (let i=0; i<data?.orders?.length; i++) {
            if (data?.orders[i]?.status === status) count ++
        }
    }
    return count
  }
  
  return (
    <Space direction="vertical" size="middle" className="bg-white shadow-md p-10 w-full mt-5 rounded">
        <Row className="text-[1.6rem] font-semibold">{i18n.t('dashboard.orderStatus')}</Row>
        <hr className="mb-5" />
        <Row 
            onClick={() => navigate("/admin/orderManagement")}
            className="flex items-center justify-end text-[1.6rem] cursor-pointer hover:opacity-80 text-blue-500">
            <RiFileList2Line className="text-[2.3rem] mr-3" />
            {i18n.t('dashboard.listOrder')}
        </Row>
        <Row gutter={16}>
            <Col xs={24} md={12} xl={6}>
                <Card className="rounded border-2 mb-5 xl:mb-0 w-full border-l-4 border-l-colorTheme">
                    <Statistic
                        title={i18n.t('dashboard.order')}
                        value={data?.orders?.length}
                        valueStyle={{ color: '#154c79' }}
                        prefix={i18n.t('dashboard.total')}
                    />
                </Card>
            </Col>
            <Col xs={24} md={12} xl={6}>
                <Card className="rounded border-2 mb-5 xl:mb-0 border-l-4 border-l-colorTheme">
                    <Statistic
                        title={i18n.t('dashboard.status1')}
                        value={countFunc("WAITING_FOR_CONFIRMATION")}
                        valueStyle={{ color: '#154c79' }}
                        prefix={i18n.t('dashboard.total')}
                    />
                </Card>
            </Col>
            <Col xs={24} md={12} xl={6}>
                <Card className="rounded border-2 mb-5 md:mb-0 border-l-4 border-l-[#3f8600]">
                    <Statistic
                        title={i18n.t('dashboard.status2')}
                        value={countFunc("SUCCESSFUL_DELIVERY")}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={i18n.t('dashboard.total')}
                    />
                </Card>
            </Col>
            <Col xs={24} md={12} xl={6}>
                <Card className="rounded border-2 mb-5 border-l-4 border-l-[#cf1322]">
                    <Statistic
                        title={i18n.t('dashboard.status3')}
                        value={countFunc("CANCEL")}
                        valueStyle={{ color: '#cf1322' }}
                        prefix={i18n.t('dashboard.total')}
                    />
                </Card>
            </Col>
        </Row>
    </Space>
  )
}

export default OrdersComponent