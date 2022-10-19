import React, { useState, useEffect } from 'react'
import { Space, Typography, Row, Table, Col, Form, Input, Pagination, Breadcrumb, Select, Badge, Modal } from 'antd'
import { DATE_TIME_FORMAT, PAGE_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS, SKIP_DEFAULT } from '../../../constant'
import { FiSearch} from 'react-icons/fi'
import { useMutation, useQuery } from '@apollo/client'
import { GET_INQUIRIES, UPDATE_STATUS_INQUIRY } from './graphql'
import { useNavigate } from 'react-router-dom'
import FormButtonSearch from '../../common/FormButtonSearch'
import InquiryDetail from '../InquiryDetail'
import moment from 'moment'

const InquiryList = ({setLoading}) => {
  const { Title } = Typography
  const { Option } = Select
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [updateStatus] = useMutation(UPDATE_STATUS_INQUIRY)
  const [dataTable, setDataTable] = useState([])
  const [inquiryId, setInquiryId] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = (id, isRead) => {
    setIsModalOpen(true)
    setInquiryId(id)
    setLoading(true)
    if (isRead === false) {
        updateStatus({
            variables: {
                updateStatusInquiryId: id,
                isRead: true,
                updatedAt: moment().format(DATE_TIME_FORMAT),
            },
            onCompleted: () => {
                setLoading(false)
            }
        })
    }
    else setLoading(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const [searchCondition, setSearchCondition] = useState({
    items: {},
    pageIndex: PAGE_DEFAULT,
    pageSize: PAGE_SIZE_DEFAULT,
  })
  const { data: dataInit } = useQuery(GET_INQUIRIES, {
    variables: {
      inquirySearchInput: {},
      skip: null,
      take: null,
      orderBy: {
        createdAt: "desc"
      }
    }
  })
  const { data } = useQuery(GET_INQUIRIES, {
    variables: {
      inquirySearchInput: searchCondition.items,
      skip: searchCondition?.pageSize
      ? searchCondition.pageSize * (searchCondition.pageIndex - 1)
      : SKIP_DEFAULT,
      take: searchCondition?.pageSize || PAGE_SIZE_DEFAULT,
      orderBy: {
        createdAt: "desc"
      }
    },
    onCompleted: () => {
      setLoading(false)
    }
  })
  const resetFields = () => {
    form.resetFields()
    setSearchCondition({
      items: {},
      pageIndex: PAGE_DEFAULT,
      pageSize: PAGE_SIZE_DEFAULT,
    })
  }
  const onSubmit = (values) => {
     setSearchCondition((pre) => ({
      ...pre,
      items: {
        fullName: values.name,
        phoneNumber: values.phone,
        email: values.email,
        isRead: values.status
      }
     }))
  }
  const onChangePagination = (page, limit) => {
    setSearchCondition({
      ...searchCondition,
      pageIndex: page,
      pageSize: limit,
    })
  }
  useEffect(() => {
     if (data) {
        const items = data?.getInquiries?.map((item) => {
            return {
              id: item.id,
              fullName: item.fullName,
              email: item.email,
              phoneNumber: item.phoneNumber,
              content: item.content,
              isRead: item.isRead,
              createdAt: item.createdAt
            }
        })
        setDataTable(items)
     }
  },[data])
  const columns = [
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber'
    },
    {
      title: 'Nội dung',
      dataIndex: 'content',
      render: (_, record) => (
        <Badge dot={!record.isRead}>
            <Row 
                className={`text-blue-500 cursor-pointer text-[1.6rem] mr-5 ${!record.isRead && 'font-semibold'}`} 
                onClick={() => showModal(record.id, record.isRead)}>
                {record.content}
            </Row>
        </Badge>
      )
    },
    {
      title: 'Thời gian',
      dataIndex: 'createdAt',
    }
  ]  
  return (
    <Space 
       direction="vertical" 
       size="middle" 
       className="w-full h-full bg-white p-10">
       <Title level={4} className="whitespace-pre-wrap">Quản lý hộp thư</Title>
       <Breadcrumb className="text-[1.6rem] mb-5 px-10 py-2 bg-[#f8f8f8]">
          <Breadcrumb.Item 
            onClick={() => navigate('/admin/dashboard')}
            className="hover:text-black cursor-pointer">
            Bảng điều khiển
          </Breadcrumb.Item>
          <Breadcrumb.Item className="font-semibold">
            Quản lý hộp thư
          </Breadcrumb.Item>
        </Breadcrumb>
       <Row className="p-10 bg-[#F8F8F8] w-full rounded">
          <Form 
            layout="vertical" 
            form={form}
            autoComplete="off" 
            className="w-full" 
            onFinish={onSubmit}>
            <Row gutter={{xs: 0, md: 20, xl: 50}}>
                <Col className="gutter-row" xs={24} md={6}>
                  <Form.Item name="name" label={<Row className="font-semibold text-[1.6rem]">Họ tên</Row>}>
                      <Input 
                         size="large" 
                         className="rounded"
                         placeholder="Tìm kiếm" 
                         suffix={
                           <FiSearch className="text-[2rem] text-[#c6c6c6]" />
                         } />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={6}>
                  <Form.Item name="email" label={<Row className="font-semibold text-[1.6rem]">Email</Row>}>
                      <Input 
                         size="large" 
                         className="rounded"
                         placeholder="Tìm kiếm" 
                         suffix={
                           <FiSearch className="text-[2rem] text-[#c6c6c6]" />
                         } />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={6}>
                  <Form.Item name="phone" label={<Row className="font-semibold text-[1.6rem]">Số điện thoại</Row>}>
                      <Input 
                         size="large" 
                         className="rounded"
                         placeholder="Tìm kiếm" 
                         suffix={
                           <FiSearch className="text-[2rem] text-[#c6c6c6]" />
                         } />
                  </Form.Item>
                </Col>
                <Col className="gutter-row" xs={24} md={6}>
                  <Form.Item name="status" label={<Row className="font-semibold text-[1.6rem]">Trạng thái</Row>}>
                      <Select size="large" className="w-full text-[1.6rem]" placeholder="Tìm kiếm">
                          <Option className="text-[1.6rem]" value={true}>Đã đọc</Option>
                          <Option className="text-[1.6rem]" value={false}>Chưa đọc</Option>
                      </Select>
                  </Form.Item>
                </Col>
              </Row>
              <FormButtonSearch resetFields={resetFields} />
          </Form>
       </Row>
       <Row className="text-[1.6rem] mt-5 md:mt-0">
            Tổng số 
            <Row className="font-semibold text-colorTheme mx-2">{dataInit?.getInquiries?.length}</Row> 
            kết quả
        </Row>
       <Table 
          rowKey="id"
          columns={columns} 
          dataSource={dataTable} 
          bordered 
          pagination={false}
          className="!text-[1.6rem]"
          scroll={{ x: 'max-content' }} />
       <Pagination 
          current={searchCondition?.pageIndex} 
          pageSize={searchCondition?.pageSize} 
          total={dataInit?.getInquiries?.length} 
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          showSizeChanger
          onChange={onChangePagination}
          locale={{items_per_page: 'kết quả / trang'}}
          className="mt-10 w-full flex justify-center" />  
        <Modal title="Phản hồi của khách hàng" visible={isModalOpen} onCancel={handleCancel} footer={false} centered>
            <InquiryDetail inquiryId={inquiryId} setLoading={setLoading} />
        </Modal>
    </Space>
  )
}

export default InquiryList