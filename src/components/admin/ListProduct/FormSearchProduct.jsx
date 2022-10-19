import React from 'react'
import { Row, Col, Form, Input, Select } from 'antd'
import { FiSearch } from 'react-icons/fi'
import { GET_CATEGORIES } from './graphql'
import { useQuery } from '@apollo/client'
import { schemaValidate } from '../../../validation/FormSearchProduct'
import { converSchemaToAntdRule } from '../../../validation'
import FormButtonSearch from '../../common/FormButtonSearch'

const FormSearchProduct = ({form, resetFields, onSubmit}) => {
  const { Option } = Select
  const yupSync = converSchemaToAntdRule(schemaValidate)
  const { data } = useQuery(GET_CATEGORIES, {
    variables: {
      categorySearchInput: {},
      skip: null,
      take: null,
      orderBy: {
        createdAt: "desc"
      }
    }
  })
  return (
    <Row className="p-10 bg-[#F8F8F8] w-full rounded">
        <Form 
            form={form}
            onFinish={onSubmit}
            layout="vertical" 
            autoComplete="off" 
            className="w-full">
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
                        {
                            data?.categories.map((item) => (
                                <Option key={item.id} value={item.id} className="text-[1.6rem]">{item.name}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Col>
            <Col className="gutter-row" xs={24} md={8}>
                <Form.Item 
                    name="priceIn" 
                    required={false}
                    rules={[yupSync]}
                    label={<Row className="font-semibold text-[1.6rem]">Giá nhập</Row>}>
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
                <Form.Item 
                    name="priceOut" 
                    required={false}
                    rules={[yupSync]}
                    label={<Row className="font-semibold text-[1.6rem]">Giá bán</Row>}>
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
                <Form.Item 
                    name="priceSale" 
                    required={false}
                    rules={[yupSync]}
                    label={<Row className="font-semibold text-[1.6rem]">Giá khuyến mại</Row>}>
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
                <Form.Item 
                    name="quantity" 
                    required={false}
                    rules={[yupSync]}
                    label={<Row className="font-semibold text-[1.6rem]">Số lượng</Row>}>
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
                        <Option value="STOCKING" className="text-[1.6rem]">Còn hàng</Option>
                        <Option value="OUT_OF_STOCK" className="text-[1.6rem]">Hết hàng</Option>
                    </Select>
                </Form.Item>
            </Col>
            </Row>
            <FormButtonSearch resetFields={resetFields} />
        </Form>
    </Row>
  )
}

export default FormSearchProduct