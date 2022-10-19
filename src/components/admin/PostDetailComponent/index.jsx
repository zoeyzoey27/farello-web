import React from 'react'
import { Space, Typography, Row, Button, Breadcrumb, Col, message, Modal } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { DELETE_POST, GET_POST_DETAIL } from './graphql'
import { MdDeleteOutline } from 'react-icons/md'
import { BiEditAlt } from 'react-icons/bi'
import parse from 'html-react-parser'
import './style.css'
import { ExclamationCircleOutlined } from '@ant-design/icons'

const PostDetailComponent = ({setLoading}) => {
  const { Title } = Typography
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get('id')
  const [deletePost] = useMutation(DELETE_POST)

  const confirmModal = () => {
    Modal.confirm({
      title: "Bạn có chắc muốn xóa bài viết này không?",
      okText: "Xóa",
      cancelText: "Hủy",
      icon: <ExclamationCircleOutlined />,
      onOk: handleDelete,
   }) 
  }

  const { data } = useQuery(GET_POST_DETAIL, {
    variables: {
        postId: id
    },
    onCompleted: () => {
        setLoading(false)
    }
  })
  const handleDelete = () => {
    setLoading(true)
    deletePost({
      variables: {
        deletePostId: id,
      },
      onCompleted: () => {
         setLoading(false)
         navigate("/admin/postManagement")
         message.success('Xóa bài viết thành công!')
      },
      onError: (err) => {
        setLoading(false)
        message.err(`${err.message}`)
      }
    })
  }
  return (
    <Space 
       direction="vertical" 
       size="middle" 
       className="w-full h-full bg-white p-10">
       <Title level={4} className="whitespace-pre-wrap">Chi tiết bài viết</Title>
       <Breadcrumb className="text-[1.6rem] mb-5 px-10 py-2 bg-bgGray">
          <Breadcrumb.Item 
            onClick={() => navigate('/admin/dashboard')}
            className="hover:text-black cursor-pointer">
            Bảng điều khiển
          </Breadcrumb.Item>
          <Breadcrumb.Item 
            onClick={() => navigate('/admin/postManagement')}
            className="hover:text-black cursor-pointer">
            Danh sách bài viết
          </Breadcrumb.Item>
          <Breadcrumb.Item className="font-semibold">
            {`Bài viết (ID: ${data?.post?.postId})`}
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row className="flex flex-col md:flex-row justify-end">
            <Button 
                size="large" 
                onClick={confirmModal}
                className="flex items-center justify-center md:mr-5 w-full md:w-[200px] !bg-inherit !text-black hover:bg-inherit hover:text-black hover:border-inherit !border-inherit hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                <MdDeleteOutline className="mr-3 text-[2rem]" />
                Xóa bài viết
            </Button>
            <Button 
                size="large" 
                onClick={() => navigate(`/admin/addPost?action=edit&id=${data?.post?.id}`)}
                className="mt-5 md:mt-0 flex items-center justify-center w-full md:w-[200px] !bg-colorTheme !border-colorTheme !text-white hover:bg-colorTheme hover:text-white hover:border-colorTheme hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                <BiEditAlt className="mr-3 text-[2rem]" />
                Chỉnh sửa bài viết
            </Button>
        </Row>
        <Row className="my-10 flex flex-col">
             <Title level={4}>{data?.post?.title}</Title>
             <Row className="text-[1.5rem] italic text-[#AFAAAA]">{`Danh mục bài viết: ${data?.post?.category?.title}`}</Row>
             <Col className="content mt-10 whitespace-pre-wrap text-[1.6rem]">
                <img src={data?.post?.imageKey} alt="" className="mb-10 mx-auto" />
                {data?.post?.content && parse(data?.post?.content)}
             </Col>
        </Row>
        <Row className="mb-5 text-[1.6rem] flex flex-col w-full">
           <Row className="italic self-end">{`Thời gian cập nhật: ${data?.post?.updatedAt}`}</Row>
           <Row className="italic font-semibold self-end">{`Người đăng bài: ${data?.post?.createdBy?.fullName}`}</Row>
        </Row>
    </Space>
  )
}

export default PostDetailComponent