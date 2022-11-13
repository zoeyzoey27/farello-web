import React, { useState } from 'react'
import { 
    Space, 
    Row, 
    Breadcrumb,
    Descriptions,
    Grid,
    List,
    Button,
    Modal,
    message
} from 'antd'
import { useSearchParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { GET_ORDER_DETAIL, UPDATE_ORDER_STATUS } from './graphql'
import { OrderStatus, OrderStatusDisable } from '../../../constant/statusOrder'
import numberWithCommas from '../../../utils/NumberWithCommas'
import { PaymentMethod } from '../../../constant/paymentMethod'
import CancelOrderReason from '../CancelOrderReason'
import { CancelReasonAdmin, CancelReasonUser } from '../../../constant/cancelReason'
import moment from 'moment'
import { DATE_TIME_FORMAT } from '../../../constant'
import i18n from '../../../translation'

const OrderDetail = ({setLoading}) => {
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const { useBreakpoint } = Grid
  const screens = useBreakpoint()
  const [updateOrder] = useMutation(UPDATE_ORDER_STATUS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [valueChecked, setValueChecked] = useState("USER_DOES_NOT_WANT_TO_BUY")
  const [valueTextarea, setValueTextarea] = useState("")
  const onChangeRadio = (e) => {
    setValueChecked(e.target.value)
  }
  const onChangeTextarea = (e) => {
    setValueTextarea(e.target.value)
  }
  const { data } = useQuery(GET_ORDER_DETAIL,{
    variables: {
        orderId: id,
    },
    onCompleted: () => {
        setLoading(false)
    }
  })
  const showModal = () => {
    setIsModalOpen(true);
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
                cancelBy: "USER",
                updatedAt: moment().format(DATE_TIME_FORMAT)
            }
        },
        onCompleted: () => {
            setLoading(false)
            message.success(i18n.t('orderDetailAdmin.cancelSuccess'))
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
    className="w-full h-full mb-10">
    <Breadcrumb className="my-10 px-10 py-2 bg-[#f8f8f8]">
      <Breadcrumb.Item href="/" className="text-[1.6rem]">{i18n.t('common.home')}</Breadcrumb.Item>
      <Breadcrumb.Item href="/listOrderUser" className="text-[1.6rem]">{i18n.t('orderDetailAdmin.listOrder')}</Breadcrumb.Item>
      <Breadcrumb.Item className="text-[1.6rem] font-semibold">
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
        <Descriptions.Item 
           label={<Row className="font-semibold text-[1.6rem]">{i18n.t('orderDetailAdmin.paymentMethod')}</Row>}
           span={3}>
           <Row className="text-[1.6rem]">
             {data?.order?.paymentMethod && PaymentMethod.find(item => item.value === data?.order?.paymentMethod).name}
           </Row>
        </Descriptions.Item>
        <Descriptions.Item 
           label={<Row className="font-semibold text-[1.6rem]">{i18n.t('orderDetailAdmin.createdAt')}</Row>}
           span={3}>
           <Row className="text-[1.6rem]">
             {data?.order?.createdAt}
           </Row>
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
        <Row className={`text-[1.6rem] self-end mb-10 ${data?.order?.status === 'CANCEL' ? 'text-red-500' : 'text-green-500'}`}>
           {`${i18n.t('orderDetailAdmin.status')}: ${data?.order?.status && OrderStatus.find(item => item.value === data?.order?.status).name}`}
        </Row>
        <Row className="flex flex-col">
        <List
            header={<Row className="text-[1.6rem] font-semibold">{`${i18n.t('orderDetailAdmin.totalProducts')} ${data?.order?.products?.length}`}</Row>}
            footer={false}
            bordered>
            {
                data?.order?.products?.map((item) => (
                    <List.Item key={item.id} className="flex flex-col md:flex-row items-start md:justify-between">
                        <Row className="flex flex-col text-[1.6rem]">
                            <Row>{`${i18n.t('orderDetailAdmin.product')}: ${item.name}`}</Row>
                            <Row>{`${i18n.t('orderDetailAdmin.quantity')}: ${item.quantity}`}</Row>
                            {item.color && <Row>{`${i18n.t('orderDetailAdmin.color')}: ${item.color}`}</Row>}
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
    <Row className="flex w-full justify-end">
       <Button 
          danger 
          size="large" 
          onClick={showModal}
          disabled={OrderStatusDisable.includes(data?.order?.status)}
          className="rounded self-end w-full md:w-fit">
          {i18n.t('orderDetailAdmin.cancelOrder')}
      </Button>
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

export default OrderDetail