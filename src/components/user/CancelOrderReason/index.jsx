import React from 'react'
import { Row, Radio, Space, Input } from 'antd'
import { CancelReasonUser } from '../../../constant/cancelReason'
import i18n from '../../../translation'

const CancelOrderReason = ({onChange, valueChecked, valueTextarea, onChangeTextarea}) => {
  const { TextArea } = Input
  return (
    <Row className="flex flex-col text-[1.6rem] w-full">
        <Row className="mb-5">{i18n.t('userCancelOrder.title')}</Row>
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
                       placeholder={i18n.t('userCancelOrder.placeholder')}
                       className="my-5 !w-full text-[1.6rem]" 
                       autoSize={{ minRows: 3, maxRows: 6 }} /> : null}
            </Space>
        </Radio.Group>
    </Row>
  )
}

export default CancelOrderReason