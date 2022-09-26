import React from 'react'
import { Space, Typography, Row, Button, Table, Pagination, Image} from 'antd'
import { FolderAddOutlined } from '@ant-design/icons'
import { data } from './DataTable'
import { PAGE_DEFAULT, PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS, TOTAL_DEFAULT } from '../../../constant'
import { useNavigate } from 'react-router-dom'
import FormSearchProduct from './FormSearchProduct'
import { FiEdit } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'

const ListProduct = () => {
  const { Title } = Typography
  const navigate = useNavigate()
  const columns = [
    {
      title: 'Mã sản phẩm',
      dataIndex: 'id',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      render: (_,_record) => (
         <Row onClick={() => navigate(`/admin/productDetail?id=${_record.id}`)} className="text-sky-500 cursor-pointer">
           {_record.name}
         </Row>
      ),
    },
    {
      title: 'Mô tả sản phẩm',
      dataIndex: 'description',
      width: '550px'
    },
    {
      title: 'Ảnh sản phẩm',
      dataIndex: 'image',
      render: (value) => <Image src={value} alt='' width={200} />,
    },
    {
      title: 'Giá nhập',
      dataIndex: 'priceOrigin',
    },
    {
        title: 'Giá bán',
        dataIndex: 'price',
    },
    {
        title: 'Giá khuyến mại',
        dataIndex: 'priceSale',
    },
    {
        title: 'Danh mục sản phẩm',
        dataIndex: 'category',
    },
    {
        title: 'Trạng thái',
        dataIndex: 'status',
    },
    {
      title: null,
      dataIndex: 'edit',
      render: (_,_record) => (
        <FiEdit 
           onClick={() => navigate(`/admin/addProduct?action=edit&id=${_record.id}`)}
           className="text-[2rem] cursor-pointer hover:opacity-80" />
      ),
      width: '50px',
    },
    {
      title: null,
      dataIndex: 'delete',
      render: () => <MdDeleteOutline className="text-[2rem] cursor-pointer hover:opacity-80" />,
      width: '50px',
    },
  ]
  return (
    <Space 
       direction="vertical" 
       size="middle" 
       className="w-full h-full bg-white p-10">
       <Title level={4} className="whitespace-pre-wrap">Danh sách sản phẩm</Title>
       <FormSearchProduct />
       <Row className="flex flex-col-reverse md:flex-row md:justify-between my-5">
          <Row className="text-[1.6rem] mt-5 md:mt-0">
            Tổng số 
            <Row className="font-semibold text-red-500 mx-2">3</Row> 
            kết quả
          </Row>
          <Button   
            size="large" 
            htmlType="submit" 
            onClick={() => navigate('/admin/addProduct')}
            className="w-fit bg-white text-black border-[#154c79] rounded hover:text-black hover:bg-white hover:border-[#154c79] hover:opacity-90 text-[1.6rem] hover:shadow-md flex items-center">
            <FolderAddOutlined className="mr-1 text-[2rem] text-[#154c79]" />
            Thêm mới sản phẩm
          </Button>
       </Row>
       <Table 
          columns={columns} 
          dataSource={data} 
          bordered 
          pagination={false}
          rowKey="id"
          scroll={{ x: 'max-content' }} />
       <Pagination 
          current={PAGE_DEFAULT} 
          pageSize={PAGE_SIZE_DEFAULT} 
          total={TOTAL_DEFAULT} 
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          showSizeChanger
          locale={{items_per_page: 'Trang'}}
          className="mt-10 w-full flex justify-center" />
    </Space>
  )
}

export default ListProduct