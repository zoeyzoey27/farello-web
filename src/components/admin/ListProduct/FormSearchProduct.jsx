import React from 'react'
import { Row, Button, Col, Form, Input, Select } from 'antd'
import { FiSearch } from 'react-icons/fi'

const FormSearchProduct = () => {
  const { Option } = Select
  return (
    <Row className="p-10 bg-[#F8F8F8] w-full rounded">
        <Form layout="vertical" autoComplete="off" className="w-full">
        <Row gutter={{xs: 0, md: 20, xl: 50}}>
            <Col className="gutter-row" xs={24} md={8}>
                <Form.Item name="productId" label={<Row className="font-semibold text-[1.6rem]">Mã sản phẩm</Row>}>
                    <Input 
                        size="large" 
                        placeholder="Tìm kiếm" 
                        className="rounded"
                        suffix={
                        <FiSearch className="text-[2rem] text-[#c6c6c6]" />
                        } />
                </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={8}>
                <Form.Item name="productName" label={<Row className="font-semibold text-[1.6rem]">Tên sản phẩm</Row>}>
                    <Input 
                        size="large" 
                        placeholder="Tìm kiếm" 
                        className="rounded"
                        suffix={
                        <FiSearch className="text-[2rem] text-[#c6c6c6]" />
                        } />
                </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={8}>
                <Form.Item name="category" label={<Row className="font-semibold text-[1.6rem]">Danh mục sản phẩm</Row>}>
                    <Select size="large" placeholder="Gọng kính cận" className="text-[1.6rem] rounded">
                        <Option value="62bd786b1328e231cc39f306" className="text-[1.6rem]">Gọng kính cận</Option>
                        <Option value="62bd78a61328e231cc39f308" className="text-[1.6rem]">Tròng kính</Option>
                        <Option value="62bd78af1328e231cc39f30a" className="text-[1.6rem]">Phụ kiện</Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={8}>
                <Form.Item name="priceOrigin" label={<Row className="font-semibold text-[1.6rem]">Giá nhập</Row>}>
                    <Input 
                        size="large" 
                        placeholder="Tìm kiếm" 
                        className="rounded"
                        suffix={
                        <FiSearch className="text-[2rem] text-[#c6c6c6]" />
                        } />
                </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={8}>
                <Form.Item name="price" label={<Row className="font-semibold text-[1.6rem]">Giá bán</Row>}>
                    <Input 
                        size="large" 
                        placeholder="Tìm kiếm" 
                        className="rounded"
                        suffix={
                        <FiSearch className="text-[2rem] text-[#c6c6c6]" />
                        } />
                </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={8}>
                <Form.Item name="productSale" label={<Row className="font-semibold text-[1.6rem]">Giá khuyến mại</Row>}>
                    <Input 
                        size="large" 
                        placeholder="Tìm kiếm" 
                        className="rounded"
                        suffix={
                        <FiSearch className="text-[2rem] text-[#c6c6c6]" />
                        } />
                </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={8}>
                <Form.Item name="quantity" label={<Row className="font-semibold text-[1.6rem]">Số lượng</Row>}>
                    <Input 
                        size="large" 
                        placeholder="Tìm kiếm" 
                        className="rounded"
                        suffix={
                        <FiSearch className="text-[2rem] text-[#c6c6c6]" />
                        } />
                </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={8}>
                <Form.Item name="status" label={<Row className="font-semibold text-[1.6rem]">Trạng thái</Row>}>
                    <Select size="large" placeholder="Còn hàng" className="text-[1.6rem] rounded">
                        <Option value="true" className="text-[1.6rem]">Còn hàng</Option>
                        <Option value="false" className="text-[1.6rem]">Hết hàng</Option>
                    </Select>
                </Form.Item>
            </Col>
            </Row>
            <Row className="flex flex-col md:flex-row md:justify-end">
                 <Form.Item className="md:mb-0">
                    <Button 
                        size="large" 
                        className="md:mr-5 w-full md:w-[100px] bg-inherit text-black hover:bg-inherit hover:text-black hover:border-inherit border-inherit hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                        Xóa
                    </Button>
                 </Form.Item>
                 <Form.Item className="mb-0">
                    <Button 
                      size="large"
                      htmlType="submit"
                      className="w-full md:w-[100px] bg-[#154c79] text-white hover:bg-[#154c79] hover:text-white hover:border-[#154c79] hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                      Tìm kiếm
                    </Button>
                 </Form.Item>
              </Row>
        </Form>
    </Row>
  )
}

export default FormSearchProduct