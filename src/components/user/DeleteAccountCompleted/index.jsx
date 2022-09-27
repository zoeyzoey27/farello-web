import React from 'react'
import { Button, Result } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import './style.css'
import { useNavigate } from 'react-router-dom'

const DeleteAccountCompleted = () => {
  const navigate = useNavigate()
  return (
    <Result
        icon={<SmileOutlined />}
        title="Đã xóa tài khoản!"
        subTitle="Cảm ơn bạn đã sử dụng trang website của chúng tôi"
        extra={<Button size="large" type="primary" onClick={() => navigate('/')}>Quay lại Trang chủ</Button>}
    />
  )
}

export default DeleteAccountCompleted