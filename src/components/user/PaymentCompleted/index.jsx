import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'

const PaymentCompleted = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  return (
    <Result
        status="success"
        title="Đặt hàng thành công!"
        subTitle="Cảm ơn bạn đã tin tưởng và đặt hàng tại Farello."
        extra={[
        <Button 
            size="large" 
            onClick={() => navigate(`/orderDetail?id=${id}`)}
            className="!bg-[#154c79] !border-[#154c79] rounded !text-white hover:bg-[#154c79] hover:text-white hover:border-[#154c79] hover:opacity-90">
            Xem lại đơn hàng
        </Button>,
        <Button 
            size="large" 
            onClick={() => navigate('/')}
            className="hover:text-[#154c79] hover:border-[#154c79] hover:opacity-90">
            Tiếp tục mua hàng
        </Button>,
        ]}
    />
  )
}

export default PaymentCompleted