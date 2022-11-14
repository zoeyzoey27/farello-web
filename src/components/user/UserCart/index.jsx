import React, {useState} from 'react'
import { Space, Breadcrumb, List, Row, InputNumber, Button, Form, message  } from 'antd'
import { ShoppingOutlined } from '@ant-design/icons'
import { MdOutlineDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_PRODUCT, GET_USER_CART, UPDATE_CART } from './graphql'
import numberWithCommas from '../../../utils/NumberWithCommas'
import moment from 'moment'
import { DATE_TIME_FORMAT } from '../../../constant'
import NoData from '../../common/NoData'
import i18n from '../../../translation'

const UserCart = ({setLoading}) => {
  const navigate = useNavigate()
  const [totalCart, setTotalCart] = useState(0)
  const [transferFee, setTransferFee] = useState(0)
  const id = localStorage.getItem("id_token")
  const [updateCart] = useMutation(UPDATE_CART)
  const [deleteProduct] = useMutation(DELETE_PRODUCT)
  const { data } = useQuery(GET_USER_CART, {
    variables: {
      userId: id,
    },
    onCompleted: (resData) => {
      setLoading(false)
      for (let i=0; i<resData?.getProductsAddedToCart?.length; i++) {
        setTotalCart((pre) => pre + resData.getProductsAddedToCart[i].totalPayment)
      }
      resData?.getProductsAddedToCart[0]?.addedBy?.provinceCode === "01" ? setTransferFee(30000) : setTransferFee(45000)
    }
  })
  const onChange =  (value, currentId, currentPrice) => {
    setLoading(true)
    setTotalCart(0)
    updateCart({
      variables: {
        updateCartId: currentId,
        quantity: parseInt(value),
        totalPayment: value*currentPrice,
        updatedAt: moment().format(DATE_TIME_FORMAT)
      },
      onCompleted: () => {
        setLoading(false)
      },
      onError: () => {
        setLoading(false)
      }
    })
  }
  const handleDelete = async (id) => {
     setLoading(true)
     await deleteProduct({
       variables: {
        deleteProductFromCartId: id,
       },
       onCompleted: () => {
         setLoading(false)
         message.success(i18n.t('userCart.deleteSuccessful'))
         window.location.reload()
       },
       onError: (err) => {
         setLoading(false)
         message.error(`${err.message}`)
       },
     })
  }
  return (
    <Space 
      direction="vertical" 
      size="middle" 
      className="w-full h-full mb-10">
      <Breadcrumb className="my-10 px-10 py-2 bg-[#f8f8f8]">
          <Breadcrumb.Item href="/" className="text-[1.6rem]">{i18n.t('common.home')}</Breadcrumb.Item>
          <Breadcrumb.Item className="text-[1.6rem] font-semibold">
             {i18n.t('userCart.title')}
          </Breadcrumb.Item>
      </Breadcrumb> 
      { data?.getProductsAddedToCart?.length > 0 ? (
        <Row className="flex flex-col lg:flex-row lg:justify-between">
        <List
          header={
            <Row className="text-[1.6rem] font-semibold flex items-center">
              <ShoppingOutlined className="text-[2rem] mr-3" />
              {`${i18n.t('userCart.totalCart')}: ${data?.getProductsAddedToCart?.length || 0}`}
            </Row>
          }
          className="w-full lg:w-[60%] lg:mr-10"
          footer={false}
          bordered>
          {
            data?.getProductsAddedToCart?.map((item) => (
              <List.Item key={item.id} className="flex flex-col md:flex-row items-start justify-start">
                  <img 
                    src={item.imageKey}
                    alt="" 
                    className="w-full md:w-[200px] mb-3 md:mb-0 md:mr-10" />
                  <Row className="flex flex-col text-[1.6rem] w-full md:flex-1">
                      <Row>{item.name}</Row>
                      {item.color && <Row>{`${i18n.t('userCart.color')}: ${item.color}`}</Row>}
                      <Row>{`${i18n.t('userCart.price')}:`} <b className="ml-1">{item.price && numberWithCommas(item.price)}</b></Row>
                      <Form initialValues={{ quantity: item.quantity }}>
                         <Form.Item name="quantity" className="w-fit mb-0">
                            <InputNumber 
                              min={1} 
                              id={item.id}
                              onChange={(value, currentId = item.id, currentPrice = item.price) => onChange(value, currentId, currentPrice)} 
                              className="rounded my-3 text-black" />
                         </Form.Item>
                      </Form>
                      <Button 
                        size="small"
                        onClick={() => handleDelete(item.id)}
                        className="rounded self-end !border-red-500 !text-red-500 hover:border-red-500 hover:text-red-500 hover:opacity-90 hover:shadow-lg flex items-center justify-center">
                        <MdOutlineDelete className="text-[1.7rem] mr-2" />
                        {i18n.t('userCart.buttonDelete')}
                      </Button>
                  </Row>
              </List.Item>
            ))
          }
        </List> 
        <List
           header={
            <Row className="text-[1.6rem] font-semibold">
              {i18n.t('orderDetailAdmin.order')}
            </Row>
          }
          footer={false}
          className="mt-5 lg:mt-0 flex-1 h-fit"
          bordered>
          <List.Item className="flex items-start justify-between">
              <Row className="text-[1.6rem]">{`${i18n.t('orderDetailAdmin.order')}:`}</Row>
              <Row className="text-[1.6rem]">{numberWithCommas(totalCart)}</Row>
          </List.Item>
          <List.Item className="flex items-start justify-between">
              <Row className="text-[1.6rem]">{`${i18n.t('orderDetailAdmin.ship')}:`}</Row>
              <Row className="text-[1.6rem]">{numberWithCommas(transferFee)}</Row>
          </List.Item>
          <List.Item className="flex items-start justify-between">
              <Row className="text-[2rem] font-semibold uppercase">{`${i18n.t('orderDetailAdmin.total')}:`}</Row>
              <Row className="text-[2rem] font-semibold">{numberWithCommas(totalCart+transferFee)}</Row>
          </List.Item>
          <Button 
            size="large" 
            onClick={() => navigate(`/userOrderProduct?id=${id}`)}
            className="mt-20 w-full border-b-0 border-x-0 text-white bg-colorTheme text-[1.6rem] font-semibold hover:opacity-90 hover:bg-colorTheme hover:text-white hover:border-colorTheme">
            {i18n.t('userOrderPage.buttonOrder')}
          </Button>
      </List>
      </Row>
      ) : (
        <NoData />
      )}
    </Space>
  )
}

export default UserCart