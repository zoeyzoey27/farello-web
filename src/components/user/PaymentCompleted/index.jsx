import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import i18n from '../../../translation'

const PaymentCompleted = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  return (
    <Result
        status="success"
        title={i18n.t('userOrderPage.orderSuccess')}
        subTitle={i18n.t('userOrderPage.subtext')}
        extra={[
        <Button 
            size="large" 
            onClick={() => navigate(`/orderDetail?id=${id}`)}
            className="!bg-colorTheme !border-colorTheme rounded !text-white hover:bg-colorTheme hover:text-white hover:border-colorTheme hover:opacity-90">
            {i18n.t('userOrderPage.button1')}
        </Button>,
        <Button 
            size="large" 
            onClick={() => navigate('/')}
            className="hover:text-colorTheme hover:border-colorTheme hover:opacity-90">
            {i18n.t('userOrderPage.button2')}
        </Button>,
        ]}
    />
  )
}

export default PaymentCompleted