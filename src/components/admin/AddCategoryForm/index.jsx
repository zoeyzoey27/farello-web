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
    Breadcrumb 
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './style.css'
import { schemaValidate } from '../../../validation/AddCategory'
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

const AddCategoryForm = () => {
  const [searchParams] = useSearchParams()
  const action = searchParams.get('action')
  const navigate = useNavigate()
  const { Title } = Typography
  const { TextArea } = Input
  const yupSync = converSchemaToAntdRule(schemaValidate)
  const [fileList, setFileList] = useState([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')

  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    console.log('clicked')
  }
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList)
  
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
            onBack={() => navigate('/admin/categoryManagement')}
            title={
               <Title level={4} className="whitespace-pre-wrap">
                  {action === 'edit' ? 'Chỉnh sửa danh mục sản phẩm' : 'Thêm danh mục sản phẩm'}
               </Title>
            }
        />
        <Breadcrumb className="text-[1.6rem] mb-5">
            <Breadcrumb.Item 
               onClick={() => navigate('/admin/categoryManagement')}
               className="hover:text-black cursor-pointer">
               Danh sách danh mục sản phẩm
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              {action === 'edit' ? 'Chỉnh sửa danh mục sản phẩm' : 'Thêm danh mục sản phẩm'}
            </Breadcrumb.Item>
        </Breadcrumb>
        <Row className="text-[1.6rem]">Vui lòng nhập thông tin vào các trường bên dưới.</Row>
        <Row className="mb-5 text-[1.6rem]">(*) là thông tin bắt buộc.</Row>
        <Form layout='vertical' autoComplete='off' onFinish={onFinish}>
            <Form.Item
                name="categoryName"
                className="w-full md:w-1/2 lg:w-1/3"
                required={false}
                rules={[yupSync]}
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     Tên danh mục
                     <Row className="text-red-500 ml-3">*</Row>
                  </Row>
                }>
                <Input size="large" placeholder="Gọng kính" className="rounded" />
            </Form.Item>
            <Form.Item
                name="description"
                className="w-full lg:w-[45%]"
                required={false}
                rules={[yupSync]}
                label={
                  <Row className="font-semibold text-[1.6rem]">
                     Mô tả chi tiết
                     <Row className="text-red-500 ml-3">*</Row>
                  </Row>
                }>
                <TextArea placeholder="Mô tả chi tiết" className="resize-none text-[1.6rem] !h-[150px] rounded" />
            </Form.Item>
            <Form.Item
                name="image"
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
                    onChange={handleChange}
                    maxCount={1}>
                    {fileList.length === 1 ? null : uploadButton}
                </Upload>
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

export default AddCategoryForm