import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import i18n from '../../translation'

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <Result
        status="404"
        title="404"
        subTitle={i18n.t('notFound')}
        extra={
           <Button type="primary" className="bg-[#1890ff]" size="large" onClick={()=> navigate("/")}>
              {i18n.t('backHome')}
           </Button>
        }
    />
  )
}

export default NotFound