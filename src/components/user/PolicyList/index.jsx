import React from 'react'
import { Row, Col, Typography } from 'antd'
import { FileProtectOutlined, SyncOutlined, EyeOutlined, ClearOutlined } from '@ant-design/icons'

const { Title, Text} = Typography

const PolicyList = () => {
  return (
    <Row gutter={[50,50]} className="my-[50px] lg:!mx-[50px] xl:!mx-[100px]">
        <Col xs={24} md={12} className="flex flex-col items-center justify-center md:items-start md:flex-row">
            <FileProtectOutlined className="mr-5 mt-2 text-[3rem]" />
            <Row className="flex flex-col md:flex-row">
                <Title level={5} className="text-[1.8rem] uppercase tracking-[1px] text-center block mt-5 md:mt-0 md:text-left">Chính sách bảo hành</Title>
                <Text className="text-[#828282] text-[1.6rem] text-justify">
                    Chúng tôi tự tin là đơn vị có chế độ hậu mãi tốt nhất 
                    Việt Nam khi áp dụng chính sách bảo hành hai năm và đổi 
                    trả sản phẩm không cần lí do trong 30 ngày. Hệ thống dữ 
                    liệu được cập nhật liên tục và chính xác để dễ dàng tra 
                    cứu thông tin.
                </Text>
            </Row>
        </Col>
        <Col xs={24} md={12} className="flex flex-col items-center justify-center md:items-start md:flex-row">
            <SyncOutlined  className="mr-5 mt-2 text-[3rem]" />
            <Row className="flex flex-col md:flex-row">
                <Title level={5} className="text-[1.8rem] uppercase tracking-[1px] text-center block mt-5 md:mt-0 md:text-left">Thả cũ - Đổi mới</Title>
                <Text className="text-[#828282] text-[1.6rem] text-justify">
                    Thay vì bỏ ra một số tiền lớn để mua kính mắt với dịch vụ 
                    “Thu Cũ Đổi Mới”- GIẢM 10%" đơn hàng kính mắt của Farello, 
                    quý khách hàng sẽ được hỗ trợ thu lại kính mắt và tròng cũ 
                    với giá cực kỳ ưu đãi, tiết kiệm chi phí nhất có thể.
                </Text>
            </Row>
        </Col>
        <Col xs={24} md={12} className="flex flex-col items-center justify-center md:items-start md:flex-row">
            <EyeOutlined className="mr-5 mt-2 text-[3rem]" />
            <Row className="flex flex-col md:flex-row">
                <Title level={5} className="text-[1.8rem] uppercase tracking-[1px] text-center block mt-5 md:mt-0 md:text-left">Khám mắt miễn phí</Title>
                <Text className="text-[#828282] text-[1.6rem] text-justify">
                   Farello thực hiện đo khám mắt miễn phí cho khách hàng khi đặt lịch 
                   trước 24 tiếng. Với các bác sĩ chuyên khoa, trình độ chuyên môn cao. 
                   Tư vấn kính mắt phù với từng loại bệnh về mắt cho khách hàng.
                </Text>
            </Row>
        </Col>
        <Col xs={24} md={12} className="flex flex-col items-center justify-center md:items-start md:flex-row">
            <ClearOutlined className="mr-5 mt-2 text-[3rem]" />
            <Row className="flex flex-col md:flex-row">
                <Title level={5} className="text-[1.8rem] uppercase tracking-[1px] text-center block mt-5 md:mt-0 md:text-left">Vệ sinh và bảo quản mắt kính</Title>
                <Text className="text-[#828282] text-[1.6rem] text-justify">
                    Farello đã nhận biết được vấn đề này của mọi người, vậy nên hôm nay Farello 
                    sẽ hướng dẫn bạn cách lau chùi, vệ sinh chiếc kính của bạn thật sạch sẽ mỗi 
                    ngày, để có một tầm mình thật sáng rõ và tươi mới.
                </Text>
            </Row>
        </Col>
    </Row>
  )
}

export default PolicyList