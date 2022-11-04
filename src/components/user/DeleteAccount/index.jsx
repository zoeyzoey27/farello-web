import React from 'react'
import { 
    Space,  
    Button, 
    Select,
    Breadcrumb,
    Row, 
    Modal,
    message
} from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import './style.css'
import { useMutation } from '@apollo/client'
import { USER_DELETE_ACCOUNT } from './graphql'
import i18n from '../../../translation'

const DeleteAccount = ({setLoading}) => {
  const { Option } = Select
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const [deleteAccount] = useMutation(USER_DELETE_ACCOUNT)

  const onConfirm = () => {
     setLoading(true)
     deleteAccount({
       variables: {
         deleteUserAccountId: id,
       },
       onCompleted: () => {
         setLoading(false)
         navigate('/userDeleteAccountCompleted')
         localStorage.removeItem("token")
         localStorage.removeItem("id_token")
       },
       onError: (err) => {
          message.error(`${err.message}`)
       }
     })
  }

  const confirm = () => {
    Modal.confirm({
      title: i18n.t('userDeleteAccount.modalTitle'),
      icon: <ExclamationCircleOutlined />,
      content: i18n.t('userDeleteAccount.modalContent'),
      okText: i18n.t('common.reset'),
      cancelText: i18n.t('common.cancel'),
      centered: true,
      onOk: onConfirm,
    });
  }
  return (
    <Space 
        direction="vertical" 
        size="middle" 
        className="w-full h-full">
        <Breadcrumb className="my-10 px-10 py-2 bg-[#f8f8f8]">
          <Breadcrumb.Item href="/" className="text-[1.6rem]">{i18n.t('common.home')}</Breadcrumb.Item>
          <Breadcrumb.Item href="/userInfo" className="text-[1.6rem]">{i18n.t('userDeleteAccount.accountInfo')}</Breadcrumb.Item>
          <Breadcrumb.Item className="text-[1.6rem] font-semibold">{i18n.t('userDeleteAccount.title')}</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="bg-[#f8f8f8] pt-10 pb-[50px] px-10 flex flex-col">
            <Row className="text-[1.6rem] mb-10 font-semibold">{i18n.t('userDeleteAccount.subtitle')}</Row>
            <Row className="text-[1.6rem] mb-10">
               {i18n.t('userDeleteAccount.subtitle1')}
            </Row>
            <Select size="large" className="w-full md:w-1/2 lg:w-1/3 text-[1.6rem]" defaultValue={1}>
                <Option value={1} className="text-[1.6rem]">{i18n.t('userDeleteAccount.option1')}</Option>
                <Option value={2} className="text-[1.6rem]">{i18n.t('userDeleteAccount.option2')}</Option>
                <Option value={3} className="text-[1.6rem]">{i18n.t('userDeleteAccount.option3')}</Option>
                <Option value={4} className="text-[1.6rem]">{i18n.t('userDeleteAccount.option4')}</Option>
                <Option value={5} className="text-[1.6rem]">{i18n.t('userDeleteAccount.option5')}</Option>
                <Option value={6} className="text-[1.6rem]">{i18n.t('userDeleteAccount.option6')}</Option>
            </Select>
        </Row>
        <Row className="my-10">
           <Button 
              size="large"
              onClick={() => navigate('/userInfo')}
              className="md:mr-5 w-full md:w-[150px] !bg-white !text-black !border-colorTheme rounded hover:text-black hover:bg-white hover:border-colorTheme hover:opacity-90 text-[1.6rem] hover:shadow-md">
              {i18n.t('userDeleteAccount.buttonBack')}
            </Button>
           <Button 
              size="large"
              onClick={confirm}
              className="w-full md:w-fit !bg-colorTheme !border-colorTheme !text-white hover:bg-colorTheme hover:text-white hover:border-colorTheme hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
              {i18n.t('userDeleteAccount.buttonNext')}
            </Button>
        </Row>
        
    </Space>
  )
}

export default DeleteAccount