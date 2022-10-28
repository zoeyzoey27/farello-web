import React from 'react'
import { 
    Space, 
    Typography, 
    Button,
    PageHeader,
    Row,
    message,
} from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { ADMIN_DELETE_ACCOUNT } from './graphql'
import i18n from '../../../translation'

const DeleteAccountConfirmed = ({setLoading}) => {
  const { Title } = Typography
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const [deleteAccount] = useMutation(ADMIN_DELETE_ACCOUNT)
  const handleDelete = () => {
    setLoading(true)
    deleteAccount({
      variables: {
        deleteAdminAccountId: id
      },
      onCompleted: () => {
        setLoading(false)
        navigate("/admin/login")
        message.success(i18n.t('deleteAccountConfirmed.messageSuccess'))
        localStorage.removeItem("token_admin")
        localStorage.removeItem("id_token_admin")
      },
      onError: (err) => {
        setLoading(false)
        message.error(`${err.message}`)
      }
    })
  }
  return (
    <Space 
          direction="vertical" 
          size="middle" 
          className="w-full h-full bg-white p-10">
          <PageHeader
              className="p-0"
              backIcon={<LeftOutlined className="mb-3" />}
              onBack={() => navigate('/admin/deleteAccount')}
              title={
                <Title level={4} className="whitespace-pre-wrap">
                    {i18n.t('deleteAccountConfirmed.title')}
                </Title>
              }
          />
          <Row className="bg-[#f8f8f8] pt-10 pb-[50px] px-10 flex flex-col">
              <Row className="text-[1.6rem] font-semibold mb-10">{i18n.t('deleteAccountConfirmed.subtitle')}</Row>
              <Row className="text-[1.6rem] mb-10">
                {i18n.t('deleteAccountConfirmed.subtitle1')}
                <br />
                {i18n.t('deleteAccountConfirmed.subtitle2')}
              </Row>
          </Row>
          <Row>
            <Button 
                size="large"
                onClick={() => navigate(`/admin/deleteAccount?id=${id}`)}
                className="md:mr-5 w-full md:w-[150px] !bg-white !text-black !border-colorTheme rounded hover:text-black hover:bg-white hover:border-colorTheme hover:opacity-90 text-[1.6rem] hover:shadow-md">
                {i18n.t('deleteAccountConfirmed.buttonBack')}
              </Button>
            <Button 
                size="large"
                onClick={handleDelete}
                className="w-full md:w-[150px] !bg-colorTheme !border-colorTheme !text-white hover:bg-colorTheme hover:text-white hover:border-colorTheme hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                {i18n.t('deleteAccountConfirmed.title')}
              </Button>
          </Row>
      </Space>
  )
}

export default DeleteAccountConfirmed