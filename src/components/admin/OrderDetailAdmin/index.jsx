import React, { useState } from 'react'
import { 
    Space, 
    Row, 
    Typography, 
    PageHeader,
    Breadcrumb,
    Descriptions,
    Grid, 
    Select,
    List, 
    Modal,
    message
} from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ORDER_DETAIL, UPDATE_ORDER_STATUS } from './graphql'
import numberWithCommas from '../../../utils/NumberWithCommas'
import { OrderStatus } from '../../../constant/statusOrder'
import { CancelReasonAdmin, CancelReasonUser } from '../../../constant/cancelReason'
import CancelOrderReason from '../CancelOrderReason'
import moment from 'moment'
import { DATE_TIME_FORMAT } from '../../../constant'
import i18n from '../../../translation'

const OrderDetailAdmin = ({setLoading}) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const { Title } = Typography
  const { Option } = Select
  const { useBreakpoint } = Grid
  const screens = useBreakpoint()
  const [updateOrder] = useMutation(UPDATE_ORDER_STATUS)
  const [valueSelected, setValueSelected] = useState("WAITING_FOR_CONFIRMATION")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [valueChecked, setValueChecked] = useState("USER_REQUESTED_TO_CANCEL")
  const [valueTextarea, setValueTextarea] = useState("")
  const onChangeRadio = (e) => {
    setValueChecked(e.target.value)
  }
  const onChangeTextarea = (e) => {
    setValueTextarea(e.target.value)
  }
  const { data } = useQuery(GET_ORDER_DETAIL, {
    variables: {
        orderId: id,
    },
    onCompleted: (resData) => {
        setLoading(false)
        setValueSelected(resData?.order?.status)
    }
  })
  const onChangeSelect = (value) => {
    if (value === "CANCEL") {
        showModal()
    }
    else {
        setLoading(true)
        setValueSelected(value)
        updateOrder({
            variables: {
                updateOrderStatusId: id,
                orderUpdateInput: {
                    status: value,
                    updatedAt: moment().format(DATE_TIME_FORMAT)
                }
            },
            onCompleted: () => {
                setLoading(false)
                message.success(i18n.t('orderDetailAdmin.messageSuccess'))
            },
            onError: (err) => {
                setLoading(false)
                message.error(`${err.message}`)
            }
        })
    }
  }
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
    setLoading(true)
    updateOrder({
        variables: {
            updateOrderStatusId: id,
            orderUpdateInput: {
                status: "CANCEL",
                cancelReason: valueTextarea === "" ? valueChecked : valueTextarea,
                cancelBy: "ADMIN",
                updatedAt: moment().format(DATE_TIME_FORMAT)
            }
        },
        onCompleted: () => {
            setLoading(false)
            message.success(i18n.t('orderDetailAdmin.cancelSuccess'))
            setValueSelected("CANCEL")
        },
        onError: (err) => {
            setLoading(false)
            message.error(`${err.message}`)
        }
    })
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  
  return (
    <Space 
            direction="vertical" 
            size="middle" 
            className="w-full h-full bg-white p-10">
            <PageHeader
                className="p-0"
                backIcon={<LeftOutlined className="mb-3" />}
                onBack={() => navigate('/admin/orderManagement')}
                title={
                <Title level={4} className="whitespace-pre-wrap">
                    {i18n.t('orderDetailAdmin.title')}
                </Title>
                }
            />
            <Breadcrumb className="text-[1.6rem] mb-5">
                <Breadcrumb.Item 
                    onClick={() => navigate('/admin/dashboard')}
                    className="hover:text-black cursor-pointer">
                    {i18n.t('common.dashboard')}
                </Breadcrumb.Item>
                <Breadcrumb.Item 
                    onClick={() => navigate('/admin/orderManagement')}
                    className="hover:text-black cursor-pointer">
                    {i18n.t('orderDetailAdmin.listOrder')}
                </Breadcrumb.Item>
                <Breadcrumb.Item className="font-semibold">
                   {`${i18n.t('orderDetailAdmin.order')} (ID: ${data?.order?.orderId})`}
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row className="font-semibold text-[1.8rem]">{i18n.t('orderDetailAdmin.userInfo')}</Row>
            <Descriptions layout={screens.lg ? 'horizontal' : 'vertical'}>
                <Descriptions.Item label={<Row className="font-semibold text-[1.6rem]">{i18n.t('common.fullName')}</Row>}>
                <Row className="text-[1.6rem]">{data?.order?.receiverName}</Row>
                </Descriptions.Item>
                <Descriptions.Item label={<Row className="font-semibold text-[1.6rem]">{i18n.t('common.phone')}</Row>}>
                <Row className="text-[1.6rem]">{data?.order?.phoneNumber}</Row>
                </Descriptions.Item>
                <Descriptions.Item label={<Row className="font-semibold text-[1.6rem]">{i18n.t('common.email')}</Row>}>
                <Row className="text-[1.6rem]">{data?.order?.email}</Row>
                </Descriptions.Item>
                <Descriptions.Item 
                label={<Row className="font-semibold text-[1.6rem]">{i18n.t('orderDetailAdmin.address')}</Row>}
                span={3}>
                <Row className="text-[1.6rem]">{data?.order?.address}</Row>
                </Descriptions.Item>
                {
                data?.order?.status === "CANCEL" && (
                    <>
                    <Descriptions.Item 
                        label={<Row className="font-semibold text-[1.6rem]">{i18n.t('orderDetailAdmin.canceledAt')}</Row>}
                        span={3}>
                        <Row className="text-[1.6rem]">
                            {data?.order?.updatedAt}
                        </Row>
                    </Descriptions.Item>
                    <Descriptions.Item 
                        label={<Row className="font-semibold text-[1.6rem]">{i18n.t('orderDetailAdmin.reasonCancel')}</Row>}
                        span={3}>
                        <Row className="text-[1.6rem]">
                            {data?.order?.cancelBy === "USER" ? (
                                data?.order?.cancelReason && 
                                CancelReasonUser.find(item => item.value ===data?.order?.cancelReason) ?
                                CancelReasonUser.find(item => item.value ===data?.order?.cancelReason).name : 
                                data?.order?.cancelReason
                            ) : (
                                data?.order?.cancelReason && 
                                CancelReasonAdmin.find(item => item.value ===data?.order?.cancelReason) ?
                                CancelReasonAdmin.find(item => item.value ===data?.order?.cancelReason).name : 
                                data?.order?.cancelReason
                            )}
                        </Row>
                    </Descriptions.Item>
                    </>
                )
            }
                <Descriptions.Item label={<Row className="font-semibold text-[1.6rem]">{i18n.t('orderDetailAdmin.note')}</Row>}>
                <Row className="text-[1.6rem]">{data?.order?.userNote || i18n.t('orderDetailAdmin.empty')}</Row>
                </Descriptions.Item>
            </Descriptions>
            <hr/>
            <Row className="font-semibold text-[1.8rem]">{i18n.t('orderDetailAdmin.orderInfo')}</Row>
            <Row className="flex flex-col w-full">
                <Select 
                    size="large" 
                    className="rounded w-[220px] self-end mb-10" 
                    onChange={onChangeSelect}
                    value={valueSelected}>
                    {
                        OrderStatus.map((item) => (
                            <Option key={item.value} value={item.value} className="text-[1.6rem]">
                               {item.name}
                            </Option>
                        ))
                    }
                </Select>
                <Row className="flex flex-col">
                <List
                    header={<Row className="text-[1.6rem]">{`Tổng số: ${data?.order?.products?.length}`}</Row>}
                    footer={false}
                    bordered>
                    {
                        data?.order?.products?.map((item) => (
                            <List.Item key={item.id} className="flex flex-col md:flex-row items-start md:justify-between">
                                <Row className="flex flex-col text-[1.6rem]">
                                    <Row>{`${i18n.t('orderDetailAdmin.product')}: ${item.name}`}</Row>
                                    <Row>{`${i18n.t('orderDetailAdmin.quantity')}: ${item.quantity}`}</Row>
                                    <Row>{`${i18n.t('orderDetailAdmin.color')}: ${item.color}`}</Row>
                                    <Row>{`${i18n.t('orderDetailAdmin.payment')}: ${item.price && numberWithCommas(item.price)}`}</Row>
                                </Row>
                                <img src={item.imageKey} alt="" className="w-[200px] mt-3 md:mt-0" />
                            </List.Item>
                        ))
                    }
                </List> 
                <List
                    header={false}
                    footer={false}
                    className="mt-5"
                    bordered>
                    <List.Item className="flex items-start justify-between">
                        <Row className="text-[1.6rem]">{`${i18n.t('orderDetailAdmin.order')}:`}</Row>
                        <Row className="text-[1.6rem]">
                          {data?.order?.totalPaymentWithoutShipment && numberWithCommas(data?.order?.totalPaymentWithoutShipment)}
                        </Row>
                    </List.Item>
                    <List.Item className="flex items-start justify-between">
                        <Row className="text-[1.6rem]">{`${i18n.t('orderDetailAdmin.ship')}:`}</Row>
                        <Row className="text-[1.6rem]">
                          {data?.order?.transferFee && numberWithCommas(data?.order?.transferFee)}
                       </Row>
                    </List.Item>
                    <List.Item className="flex items-start justify-between">
                        <Row className="text-[2rem] font-semibold uppercase">{`${i18n.t('orderDetailAdmin.total')}:`}</Row>
                        <Row className="text-[2rem] font-semibold">
                           {data?.order?.totalPayment && numberWithCommas(data?.order?.totalPayment)}
                        </Row>
                    </List.Item>
                </List>       
                </Row>
            </Row>
            <Modal 
                title={i18n.t('orderDetailAdmin.cancelOrder')} 
                centered 
                visible={isModalOpen} 
                onOk={handleOk} 
                onCancel={handleCancel}>
                <CancelOrderReason  
                    valueChecked={valueChecked} 
                    onChange={onChangeRadio}
                    valueTextarea={valueTextarea}
                    onChangeTextarea={onChangeTextarea} />
            </Modal>
        </Space>
  )
}

export default OrderDetailAdmin