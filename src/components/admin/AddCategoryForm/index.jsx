import React, { useState, useEffect } from 'react'
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
    message, 
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './style.css'
import { schemaValidate } from '../../../validation/AddCategory'
import { converSchemaToAntdRule } from '../../../validation'
import { useNavigate } from 'react-router-dom'
import { LeftOutlined } from '@ant-design/icons'
import { MdDeleteOutline } from 'react-icons/md'
import { FiSave } from 'react-icons/fi'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_CATEGORY, GET_CATEGORY, UPDATE_CATEGORY } from './graphql'
import moment from 'moment'
import { DATE_TIME_FORMAT, EDIT } from '../../../constant'
import i18n from '../../../translation'

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
})

export const uploadButton = (
    <Row className="flex flex-col justify-center items-center">
      <PlusOutlined className="text-[1.6rem]" />
      <Row className="mt-5 text-[1.6rem]">{i18n.t('common.upload')}</Row>
    </Row>
)

const AddCategoryForm = ({action, id, setLoading}) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { Title } = Typography
  const { TextArea } = Input
  const [createCategory] = useMutation(CREATE_CATEGORY)
  const [updateCategory] = useMutation(UPDATE_CATEGORY)
  const yupSync = converSchemaToAntdRule(schemaValidate)
  const [fileList, setFileList] = useState([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')

  const { data } = useQuery (GET_CATEGORY, {
    variables: {
      categoryId: id
    },
    skip: id === null
  })

  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  }
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList)

  const resetFields = () => {
    form.resetFields()
    setFileList([])
  }
  
  const onFinish = async (values) => {
    setLoading(true)
    const customId = 'CA' + Math.floor(Math.random() * Date.now())
    const file = values.image.fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    await createCategory({
      variables: {
        categoryInput: {
          categoryId: customId,
          name: values.categoryName,
          imageKey: file.preview,
          description: values.description,
          createdAt: moment().format(DATE_TIME_FORMAT),
          updatedAt: moment().format(DATE_TIME_FORMAT),
        }
      },
      onCompleted: () => {
        message.success(i18n.t('addCategory.message.addSuccessful'))
        resetFields()
        setLoading(false)
      },
      onError: (error) => {
        message.error(`${error.message}`)
        setLoading(false)
      },
    })
  }
  const onUpdate = async (values) => {
    setLoading(true)
    if (values.image && fileList.length>0) {
      if (!values.image.fileList[0].url && !values.image.fileList[0].preview) {
        values.image.fileList[0].preview = await getBase64(values.image.fileList[0].originFileObj)
      }
    }
    await updateCategory({
      variables: {
        updateCategoryId: id,
        categoryUpdateInput: {
          name: values.categoryName,
          imageKey: values.image ? values.image.fileList[0].preview : data?.category?.imageKey,
          description: values.description,
          updatedAt: moment().format(DATE_TIME_FORMAT),
        }
      },
      onCompleted: () => {
        navigate("/admin/categoryManagement")
        message.success(i18n.t('addCategory.message.editingSuccessful'))
        setLoading(false)
      },
      onError: (error) => {
        message.error(`${error.message}`)
        setLoading(false)
      },
    })
  }
  useEffect (() => {
    if (data) {
      form.setFieldsValue({
        categoryName: data?.category?.name,
        description: data?.category?.description,
      })
      setFileList([{
        name: i18n.t('addCategory.image'),
        url: data?.category?.imageKey,
      }])
    }
  },[data, form])
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
                    {action === EDIT ? i18n.t('addCategory.title.edit') : i18n.t('addCategory.title.addNew')}
                </Title>
              }
          />
          <Breadcrumb className="text-[1.6rem] mb-5">
              <Breadcrumb.Item 
                onClick={() => navigate('/admin/dashboard')}
                className="hover:text-black cursor-pointer">
                {i18n.t('common.dashboard')}
              </Breadcrumb.Item>
              <Breadcrumb.Item 
                onClick={() => navigate('/admin/categoryManagement')}
                className="hover:text-black cursor-pointer">
                {i18n.t('addCategory.heading')}
              </Breadcrumb.Item>
              <Breadcrumb.Item className="font-semibold">
                 {action === EDIT ? i18n.t('addCategory.title.edit') : i18n.t('addCategory.title.addNew')}
              </Breadcrumb.Item>
          </Breadcrumb>
          <Row className="text-[1.6rem]">{i18n.t('common.enterInfo')}</Row>
          <Row className="mb-5 text-[1.6rem]">{i18n.t('common.subtitle')}</Row>
          <Form 
              form={form} 
              layout='vertical' 
              autoComplete='off' 
              onFinish={action === EDIT ? onUpdate : onFinish}>
              <Form.Item
                  name="categoryName"
                  className="w-full md:w-1/2 lg:w-1/3"
                  required={false}
                  rules={[yupSync]}
                  label={
                    <Row className="font-semibold text-[1.6rem]">
                      {i18n.t('addCategory.categoryName')}
                      <Row className="text-red-500 ml-3">*</Row>
                    </Row>
                  }>
                  <Input size="large" placeholder={i18n.t('addCategory.glasses')} className="rounded" />
              </Form.Item>
              <Form.Item
                  name="description"
                  className="w-full lg:w-[45%]"
                  required={false}
                  rules={[yupSync]}
                  label={
                    <Row className="font-semibold text-[1.6rem]">
                      {i18n.t('addCategory.description')}
                      <Row className="text-red-500 ml-3">*</Row>
                    </Row>
                  }>
                  <TextArea placeholder={i18n.t('addCategory.description')} className="resize-none text-[1.6rem] !h-[150px] rounded" />
              </Form.Item>
              <Form.Item
                  name="image"
                  className="w-full md:w-1/3"
                  required={false}
                  rules={fileList.length === 0 ? [yupSync] : false}
                  label={
                    <Row className="font-semibold text-[1.6rem]">
                      {i18n.t('addCategory.image')}
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
                        onClick={resetFields}
                        className="flex items-center justify-center md:mr-5 w-full md:w-[100px] !bg-white !text-colorTheme hover:bg-white hover:text-colorTheme hover:border-colorTheme !border-colorTheme hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                        <MdDeleteOutline className="mr-3 text-[2rem]" />
                        {i18n.t('common.reset')}
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button 
                        size="large" 
                        htmlType="submit"
                        className="flex items-center justify-center w-full md:min-w-[100px] !border-colorTheme !bg-colorTheme !text-white hover:bg-colorTheme hover:text-white hover:border-colorTheme hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                        <FiSave className="mr-3 text-[2rem]" />
                        {action === EDIT ? i18n.t('common.saveChange') : i18n.t('common.save')}
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