import React from 'react'
import { Row, Radio, Space, Input } from 'antd'
import { CancelReasonUser } from '../../../constant/cancelReason'

const CancelOrderReason = ({onChange, valueChecked, valueTextarea, onChangeTextarea}) => {
  const { TextArea } = Input
  return (
    <Row className="flex flex-col text-[1.6rem] w-full">
        <Row className="mb-5">Vui lòng chọn một lý do hủy đơn hàng:</Row>
        <Radio.Group onChange={onChange} value={valueChecked} className="w-full">
            <Space direction="vertical" className="w-full">
                {
                    CancelReasonUser.map((item) => (
                        <Radio key={item.value} value={item.value} className="text-[1.6rem]">
                            {item.name}
                        </Radio>
                    ))
                }
                {valueChecked === "OTHERS" ? 
                    <TextArea 
                       value={valueTextarea}
                       onChange={onChangeTextarea}
                       placeholder="Vui lòng nhập lý do hủy đơn hàng của bạn ..." 
                       className="my-5 !w-full text-[1.6rem]" 
                       autoSize={{ minRows: 3, maxRows: 6 }} /> : null}
            </Space>
        </Radio.Group>
    </Row>
  )
}

export default CancelOrderReason