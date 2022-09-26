import React from 'react'
import { Row, Col, Typography } from 'antd'
import { FileProtectOutlined, SyncOutlined, EyeOutlined, ClearOutlined } from '@ant-design/icons'

const { Title, Text} = Typography

const PolicyList = () => {
  return (
    <Row gutter={[30,30]} className="my-[50px] !mx-[100px]">
        <Col span={12} className="flex">
            <FileProtectOutlined className="mr-5 mt-2 text-[3rem]" />
            <Row>
                <Title level={5} className="text-[1.8rem] uppercase tracking-[1px]">Chính sách bảo hành</Title>
                <Text className="text-[#828282] text-[1.6rem]">
                    Chúng tôi tự tin là đơn vị có chế độ hậu mãi tốt nhất 
                    Việt Nam khi áp dụng chính sách bảo hành hai năm và đổi 
                    trả sản phẩm không cần lí do trong 30 ngày. Hệ thống dữ 
                    liệu được cập nhật liên tục và chính xác để dễ dàng tra 
                    cứu thông tin.
                </Text>
            </Row>
        </Col>
        <Col span={12} className="flex">
            <SyncOutlined  className="mr-5 mt-2 text-[3rem]" />
            <Row>
                <Title level={5} className="text-[1.8rem] uppercase tracking-[1px]">Thả cũ - Đổi mới</Title>
                <Text className="text-[#828282] text-[1.6rem]">
                    Thay vì bỏ ra một số tiền lớn để mua kính mắt với dịch vụ 
                    “Thu Cũ Đổi Mới”- GIẢM 10%" đơn hàng kính mắt của Farello, 
                    quý khách hàng sẽ được hỗ trợ thu lại kính mắt và tròng cũ 
                    với giá cực kỳ ưu đãi, tiết kiệm chi phí nhất có thể.
                </Text>
            </Row>
        </Col>
        <Col span={12} className="flex">
            <EyeOutlined className="mr-5 mt-2 text-[3rem]" />
            <Row>
                <Title level={5} className="text-[1.8rem] uppercase tracking-[1px]">Khám mắt miễn phí</Title>
                <Text className="text-[#828282] text-[1.6rem]">
                   Farello thực hiện đo khám mắt miễn phí cho khách hàng khi đặt lịch 
                   trước 24 tiếng. Với các bác sĩ chuyên khoa, trình độ chuyên môn cao. 
                   Tư vấn kính mắt phù với từng loại bệnh về mắt cho khách hàng.
                </Text>
            </Row>
        </Col>
        <Col span={12} className="flex">
            <ClearOutlined className="mr-5 mt-2 text-[3rem]" />
            <Row>
                <Title level={5} className="text-[1.8rem] uppercase tracking-[1px]">Vệ sinh và bảo quản mắt kính</Title>
                <Text className="text-[#828282] text-[1.6rem]">
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