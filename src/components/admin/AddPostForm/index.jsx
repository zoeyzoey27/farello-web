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
    Breadcrumb,
    message, 
    Select 
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { schemaValidate } from '../../../validation/AddPost'
import { converSchemaToAntdRule } from '../../../validation'
import { useNavigate } from 'react-router-dom'
import { MdDeleteOutline } from 'react-icons/md'
import { FiSave } from 'react-icons/fi'
import { useMutation, useQuery } from '@apollo/client'
import moment from 'moment'
import { DATE_TIME_FORMAT } from '../../../constant'
import ReactQuill from 'react-quill'
import { modules } from './modules'
import './style.css'
import { CREATE_POST, GET_CATEGORIES_POST, GET_POST_DETAIL, UPDATE_POST } from './graphql'

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

const AddPostForm = ({setLoading, action, id}) => {
  const { Option } = Select
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { Title } = Typography
  const yupSync = converSchemaToAntdRule(schemaValidate)
  const [createPost] = useMutation(CREATE_POST)
  const [updatePost] = useMutation(UPDATE_POST)
  const [fileList, setFileList] = useState([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')

  const { data } = useQuery(GET_CATEGORIES_POST, {
    variables: {
        skip: null,
        take: null,
        orderBy: {
            createdAt: "desc"
        }
    }
  })

  const { data: dataPost } = useQuery(GET_POST_DETAIL, {
    variables: {
      postId: id,
    },
    skip: id === null,
    onCompleted: () => {
      setLoading(false)
    }
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
    const customId = 'BV' + Math.floor(Math.random() * Date.now())
    const file = values.image.fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    await createPost({
        variables: {
            postInput: {
                postId: customId,
                title: values.title,
                categoryId: values.categoryName,
                content: values.content,
                imageKey: file.preview,
                adminId: localStorage.getItem("id_token_admin"),
                createdAt: moment().format(DATE_TIME_FORMAT),
                updatedAt: moment().format(DATE_TIME_FORMAT),
            }
        },
        onCompleted: () => {
            setLoading(false)
            message.success("Tạo bài viết thành công!")
            resetFields()
        },
        onError: (err) => {
            setLoading(false)
            message.error(`${err.message}`)
        }
    })
  }
  const onUpdate = async (values) => {
    setLoading(true)
    if (values.image && fileList.length>0) {
      if (!values.image.fileList[0].url && !values.image.fileList[0].preview) {
        values.image.fileList[0].preview = await getBase64(values.image.fileList[0].originFileObj)
      }
    }
    await updatePost({
      variables: {
        updatePostId: id,
        postUpdateInput: {
          title: values.title,
          categoryId: values.categoryName,
          content: values.content,
          imageKey: values.image ? values.image.fileList[0].preview : dataPost?.post?.imageKey,
          updatedAt: moment().format(DATE_TIME_FORMAT),
        }
      },
      onCompleted: () => {
        setLoading(false)
        navigate(`/admin/postDetail?id=${id}`)
        message.success('Chỉnh sửa danh mục sản phẩm thành công!')
      },
      onError: (error) => {
        message.error(`${error.message}`)
        setLoading(false)
      },
    })
  }
  useEffect(() => {
      if (dataPost) {
        form.setFieldsValue({
           title: dataPost?.post?.title,
           categoryName: dataPost?.post?.category?.id,
           content: dataPost?.post?.content
        })
        setFileList([{
          name: 'Ảnh minh họa',
          url: dataPost?.post?.imageKey,
        }])
      }
  },[dataPost, form])
  return (
    <Space 
          direction="vertical" 
          size="middle" 
          className="w-full h-full bg-white p-10">
          <Title level={4} className="whitespace-pre-wrap">
                {action === 'edit' ? 'Chỉnh sửa bài viết' : 'Tạo bài viết'}
          </Title>
          <Breadcrumb className="text-[1.6rem] mb-5 px-10 py-2 bg-[#f8f8f8]">
              <Breadcrumb.Item 
                onClick={() => navigate('/admin/dashboard')}
                className="hover:text-black cursor-pointer">
                Bảng điều khiển
              </Breadcrumb.Item>
              <Breadcrumb.Item className="font-semibold">
                {action === 'edit' ? 'Chỉnh sửa bài viết' : 'Tạo bài viết'}
              </Breadcrumb.Item>
          </Breadcrumb>
          <Row className="text-[1.6rem]">Vui lòng nhập thông tin vào các trường bên dưới.</Row>
          <Row className="mb-5 text-[1.6rem]">(*) là thông tin bắt buộc.</Row>
          <Form 
              form={form} 
              layout='vertical' 
              autoComplete='off' 
              onFinish={action === 'edit' ? onUpdate : onFinish}>
              <Row className="flex flex-col justify-end md:flex-row">
                <Form.Item>
                    <Button 
                        size="large" 
                        onClick={resetFields}
                        className="flex items-center justify-center md:mr-5 w-full md:w-[100px] !bg-white !text-colorTheme hover:bg-colorTheme hover:text-white hover:border-colorTheme !border-colorTheme hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                        <MdDeleteOutline className="mr-3 text-[2rem]" />
                        Xóa
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button 
                        size="large" 
                        htmlType="submit"
                        className="flex items-center justify-center w-full md:min-w-[100px] !border-colorTheme !bg-colorTheme !text-white hover:bg-colorTheme hover:text-white hover:border-colorTheme hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                        <FiSave className="mr-3 text-[2rem]" />
                        {action === 'edit' ? 'Lưu thay đổi' : 'Lưu'}
                    </Button>
                </Form.Item>
              </Row>
              <Form.Item
                  name="title"
                  className="w-full"
                  required={false}
                  rules={[yupSync]}
                  label={
                    <Row className="font-semibold text-[1.6rem]">
                      Tiêu đề bài viết
                      <Row className="text-red-500 ml-3">*</Row>
                    </Row>
                  }>
                  <Input size="large" placeholder="Tiêu đề bài viết" className="rounded" />
              </Form.Item>
              <Form.Item
                  name="categoryName"
                  className="w-full"
                  required={false}
                  rules={[yupSync]}
                  label={
                    <Row className="font-semibold text-[1.6rem]">
                      Danh mục bài viết
                      <Row className="text-red-500 ml-3">*</Row>
                    </Row>
                  }>
                  <Select size="large" className="w-full rounded text-[1.6rem]" placeholder="Danh mục bài viết">
                     {
                        data?.postCategories?.map((item) => (
                            <Option key={item.id} value={item.id} className="text-[1.6rem]">{item.title}</Option>
                        ))
                     }
                  </Select>
              </Form.Item>
              <Form.Item
                  name="image"
                  className="w-full md:w-1/3"
                  required={false}
                  rules={fileList.length === 0 ? [yupSync] : false}
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
              <Form.Item
                  name="content"
                  className="w-full"
                  required={false}
                  rules={[yupSync]}
                  label={
                    <Row className="font-semibold text-[1.6rem]">
                      Nội dung bài viết
                      <Row className="text-red-500 ml-3">*</Row>
                    </Row>
                  }>
                  <ReactQuill theme="snow" modules={modules} placeholder="Nội dung bài viết ..." />
              </Form.Item>
          </Form>
          <Modal centered visible={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel} width={1000}>
              <img src={previewImage} alt="" className="w-full h-full object-contain object-center"/>
        </Modal>
      </Space>
  )
}

export default AddPostForm