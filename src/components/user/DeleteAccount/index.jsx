import React, { useState } from 'react'
import { 
    Space,  
    Button, 
    Select,
    Breadcrumb,
    Row, 
    Modal, 
    Spin,
    message
} from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import './style.css'
import { useMutation } from '@apollo/client'
import { USER_DELETE_ACCOUNT } from './graphql'

const DeleteAccount = () => {
  const { Option } = Select
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const [loading, setLoading] = useState(false)
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
      title: 'Bạn có chắc muốn xóa tài khoản?',
      icon: <ExclamationCircleOutlined />,
      content: 'Sau khi xóa tài khoản, bạn sẽ không thể truy cập bằng tài khoản này nữa.',
      okText: 'Xóa',
      cancelText: 'Hủy',
      centered: true,
      onOk: onConfirm,
    });
  }
  return (
    <Spin spinning={loading} size="large">
      <Space 
        direction="vertical" 
        size="middle" 
        className="w-full h-full">
        <Breadcrumb className="my-10 px-10 py-2 bg-[#f8f8f8]">
          <Breadcrumb.Item href="/" className="text-[1.6rem]">Trang chủ</Breadcrumb.Item>
          <Breadcrumb.Item href="/userInfo" className="text-[1.6rem]">Thông tin tài khoản</Breadcrumb.Item>
          <Breadcrumb.Item className="text-[1.6rem] font-semibold">Xóa tài khoản</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="bg-[#f8f8f8] pt-10 pb-[50px] px-10 flex flex-col">
            <Row className="text-[1.6rem] mb-10 font-semibold">Vui lòng chọn 1 lý do xóa tài khoản</Row>
            <Row className="text-[1.6rem] mb-10">
               Chúng tôi rất tiếc khi bạn rời đi và rất muốn biết lý do bạn xóa tài khoản để có thể hỗ trợ bạn về một số vấn đề thường gặp.
            </Row>
            <Select size="large" className="w-full md:w-1/2 lg:w-1/3 text-[1.6rem]" defaultValue={1}>
                <Option value={1} className="text-[1.6rem]">Tôi không sử dụng tài khoản này nữa</Option>
                <Option value={2} className="text-[1.6rem]">Tôi lo ngại về quyền riêng tư</Option>
                <Option value={3} className="text-[1.6rem]">Tôi gặp vấn đề với tài khoản này</Option>
                <Option value={4} className="text-[1.6rem]">Tôi lo ngại dành quá nhiều thời gian cho website</Option>
                <Option value={5} className="text-[1.6rem]">Tôi không thấy website hữu ích nữa</Option>
                <Option value={6} className="text-[1.6rem]">Lý do khác</Option>
            </Select>
        </Row>
        <Row className="my-10">
           <Button 
              size="large"
              onClick={() => navigate('/userInfo')}
              className="md:mr-5 w-full md:w-[150px] !bg-white !text-black !border-[#154c79] rounded hover:text-black hover:bg-white hover:border-[#154c79] hover:opacity-90 text-[1.6rem] hover:shadow-md">
              Quay lại
            </Button>
           <Button 
              size="large"
              onClick={confirm}
              className="w-full md:w-fit !bg-[#154c79] !border-[#154c79] !text-white hover:bg-[#154c79] hover:text-white hover:border-[#154c79] hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
              Tiếp tục xóa tài khoản
            </Button>
        </Row>
        
    </Space>
    </Spin>
  )
}

export default DeleteAccount