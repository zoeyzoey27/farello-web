import React from 'react'
import { Row, Button, Form } from 'antd'

const FormButtonSearch = ({resetFields}) => {
  return (
    <Row className="flex flex-col md:flex-row md:justify-end">
        <Form.Item className="md:mb-0">
            <Button 
                size="large" 
                onClick={resetFields}
                className="md:mr-5 w-full md:w-[100px] bg-white text-colorTheme border-colorTheme hover:text-black hover:bg-white hover:border-colorTheme hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                Xóa
            </Button>
        </Form.Item>
        <Form.Item className="mb-0">
            <Button 
                size="large"
                htmlType="submit"
                className="w-full md:w-[100px] !bg-colorTheme !text-white !border-colorTheme hover:bg-colorTheme hover:text-white hover:border-colorTheme hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                Tìm kiếm
            </Button>
        </Form.Item>
    </Row>
  )
}

export default FormButtonSearch