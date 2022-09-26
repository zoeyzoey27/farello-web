import React, { useState } from 'react'
import { 
    Space, 
    Form, 
    Input, 
    Row, 
    Typography, 
    Button, 
    Upload, 
    Modal, 
    PageHeader,
    Breadcrumb,
    InputNumber 
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { schemaValidate } from '../../../validation/AddProduct'
import { converSchemaToAntdRule } from '../../../validation'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'
import { MdDeleteOutline } from 'react-icons/md'
import { FiSave } from 'react-icons/fi'

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
})

const uploadButton = (
    <Row className="flex flex-col justify-center items-center">
      <PlusOutlined className="text-[1.6rem]" />
      <Row className="mt-5 text-[1.6rem]">Tải ảnh lên</Row>
    </Row>
)

const AddProductForm = () => {
  const [searchParams] = useSearchParams()
  const action = searchParams.get('action')
  const navigate = useNavigate()
  const { Title } = Typography
  const { TextArea } = Input
  const yupSync = converSchemaToAntdRule(schemaValidate)
  const [fileList, setFileList] = useState([])
  const [fileListDes, setFileListDes] = useState([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')

  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setPreviewImage(file.url || file.preview)
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
  }
  const handleChangeImageMain = ({ fileList: newFileList }) => setFileList(newFileList)
  const handleChangeImagesDes = ({ fileList: newFileListDes }) => setFileListDes(newFileListDes)
  
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
  }
  return (
    <Space 
        direction="vertical" 
        size="middle" 
        className="w-full h-full bg-white p-10">
        <PageHeader
            className="p-0"
            backIcon={<LeftOutlined className="mb-3" />}
            onBack={() => navigate('/admin/productManagement')}
            title={
               <Title level={4} className="whitespace-pre-wrap">
                  {action === 'edit' ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}
               </Title>
            }
        />
        <Breadcrumb className="text-[1.6rem] mb-5">
            <Breadcrumb.Item 
               onClick={() => navigate('/admin/productManagement')}
               className="hover:text-black cursor-pointer">
               Danh sách sản phẩm
            </Breadcrumb.Item>
            <Breadcrumb.Item> {action === 'edit' ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}</Breadcrumb.Item>
        </Breadcrumb>
        <Row className="text-[1.6rem]">Vui lòng nhập thông tin vào các trường bên dưới.</Row>
        <Row className="mb-5 text-[1.6rem]">(*) là thông tin bắt buộc.</Row>
        <Form layout='vertical' autoComplete='off' onFinish={onFinish}>
            <Form.Item
                name="name"
                className="w-full md:w-1/2 lg:w-1/3"
                required={false}
                rules={[yupSync]}
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     Tên sản phẩm
                     <Row className="text-red-500 ml-3">*</Row>
                  </Row>
                }>
                <Input size="large" placeholder="Adagio" className="rounded" />
            </Form.Item>
            <Form.Item
                name="priceOrigin"
                className="w-full md:w-1/2 lg:w-1/3"
                required={false}
                rules={[yupSync]}
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     Giá nhập
                  </Row>
                }>
                <InputNumber size="large" placeholder="1750000" addonAfter="VND" className="w-full rounded" />
            </Form.Item>
            <Form.Item
                name="price"
                className="w-full md:w-1/2 lg:w-1/3"
                required={false}
                rules={[yupSync]}
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     Giá bán
                     <Row className="text-red-500 ml-3">*</Row>
                  </Row>
                }>
                <InputNumber size="large" placeholder="1750000" addonAfter="VND" className="w-full rounded" />
            </Form.Item>
            <Form.Item
                name="priceSale"
                className="w-full md:w-1/2 lg:w-1/3"
                required={false}
                rules={[yupSync]}
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     Giá khuyến mại
                  </Row>
                }>
                <InputNumber size="large" placeholder="1750000" addonAfter="VND" className="w-full rounded" />
            </Form.Item>
            <Form.Item
                name="quantity"
                className="w-full md:w-1/2 lg:w-1/3"
                required={false}
                rules={[yupSync]}
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     Số lượng
                     <Row className="text-red-500 ml-3">*</Row>
                  </Row>
                }>
                <InputNumber size="large" placeholder="10" className="w-full rounded" />
            </Form.Item>
            <Form.Item
                name="imageMain"
                className="w-full md:w-1/3"
                required={false}
                rules={[yupSync]}
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     Ảnh minh họa
                     <Row className="text-red-500 ml-3">*</Row>
                  </Row>
                }>
                 <Upload
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={() => false}
                    onPreview={handlePreview}
                    onChange={handleChangeImageMain}
                    maxCount={1}>
                    {fileList.length === 1 ? null : uploadButton}
                </Upload>
            </Form.Item>
            <Form.Item
                name="imagesDes"
                className="w-full"
                required={false}
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     Ảnh chi tiết
                  </Row>
                }>
                 <Upload
                    listType="picture-card"
                    fileList={fileListDes}
                    beforeUpload={() => false}
                    onPreview={handlePreview}
                    onChange={handleChangeImagesDes}>
                    {fileListDes.length >=4 ? null : uploadButton}
                </Upload>
            </Form.Item>
            <Form.Item
                name="description"
                className="w-full lg:w-[50%]"
                required={false}
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     Mô tả sản phẩm
                  </Row>
                }>
                <TextArea placeholder="Mô tả sản phẩm" className="resize-none text-[1.6rem] !h-[200px] rounded" />
            </Form.Item>
            <Row className="flex flex-col md:flex-row">
              <Form.Item>
                  <Button 
                      size="large" 
                      className="flex items-center justify-center md:mr-5 w-full md:w-[100px] bg-inherit text-black hover:bg-inherit hover:text-black hover:border-inherit border-inherit hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                      <MdDeleteOutline className="mr-3 text-[2rem]" />
                      Xóa
                  </Button>
              </Form.Item>
              <Form.Item>
                  <Button 
                      size="large" 
                      htmlType="submit"
                      className="flex items-center justify-center w-full md:min-w-[100px] bg-[#154c79] text-white hover:bg-[#154c79] hover:text-white hover:border-[#154c79] hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                      <FiSave className="mr-3 text-[2rem]" />
                      {action === 'edit' ? 'Lưu thay đổi' : 'Lưu'}
                  </Button>
              </Form.Item>
            </Row>
        </Form>
        <Modal centered visible={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel} width={1000}>
            <img src={previewImage} alt="" className="w-full h-full object-contain object-center"/>
        </Modal>
    </Space>
  )
}

export default AddProductForm