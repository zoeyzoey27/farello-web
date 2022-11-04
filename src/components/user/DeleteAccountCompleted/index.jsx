import React from 'react'
import { Button, Result } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import './style.css'
import { useNavigate } from 'react-router-dom'
import i18n from '../../../translation'

const DeleteAccountCompleted = () => {
  const navigate = useNavigate()
  return (
    <Result
        icon={<SmileOutlined />}
        title={i18n.t('userDeleteAccount.deleteSuccessful')}
        subTitle={i18n.t('userDeleteAccount.subtext')}
        extra={<Button size="large" type="primary" onClick={() => navigate('/')}>{i18n.t('userDeleteAccount.returnHome')}</Button>}
    />
  )
}

export default DeleteAccountCompleted