import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, trang bạn đã truy cập không tồn tại."
        extra={
           <Button type="primary" className="bg-[#1890ff]" onClick={()=> navigate("/")}>
              Trở lại trang chủ
           </Button>
        }
    />
  )
}

export default NotFound