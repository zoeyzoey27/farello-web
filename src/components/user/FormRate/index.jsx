import React, { useState } from 'react'
import { Space, Row, Rate, Form, Input, Button, message, Spin } from 'antd'
import { schemaValidate } from '../../../validation/CreateComment'
import { converSchemaToAntdRule } from '../../../validation'
import { useMutation } from '@apollo/client'
import { CREATE_COMMENT } from './graphql'
import moment from 'moment'
import { DATE_TIME_FORMAT } from '../../../constant'
import i18n from '../../../translation'

const FormRate = ({product}) => {
  const { TextArea } = Input;
  const desc = [
    i18n.t('formRate.option1'), 
    i18n.t('formRate.option2'), 
    i18n.t('formRate.option3'), 
    i18n.t('formRate.option4'), 
    i18n.t('formRate.option5')
  ]
  const [loading, setLoading] = useState(false)
  const [valueRate, setValueRate] = useState(0)
  const [createComment] = useMutation(CREATE_COMMENT)
  const yupSync = converSchemaToAntdRule(schemaValidate)
  const onSubmit = async (values) => {
     setLoading(true)
     await createComment({
        variables: {
            commentInput: {
                content: values.content,
                ratePoint: valueRate,
                rateDescription: desc[valueRate - 1],
                likes: 0,
                dislikes: 0,
                userId: localStorage.getItem("id_token"),
                productId: product?.id,
                createdAt:  moment().format(DATE_TIME_FORMAT),
            }
        },
        onCompleted: () => {
            setLoading(false)
            window.location.reload()
            message.success(i18n.t('formRate.messageSuccess'))
        },
        onError: (err) => {
            setLoading(false)
            message.err(`${err.message}`)
        }
     })
  }
  return (
    <Spin spinning={loading} size="large">
        <Space direction="vertical" size="middle" className="w-full">
            <Row className="text-[1.6rem] block rounded bg-[#f8f8f8] py-3 px-5">
                {i18n.t('formRate.subtext')}
            </Row>
            <Row className="flex items-start">
                <img src={product?.images[0]} width={80} alt="" />
                <Row className="flex flex-col ml-5">
                    <Row className="text-[1.6rem]">{product?.name}</Row>
                    <Row className="text-[1.4rem] text-[#AFAAAA]">{`Mã sản phẩm: ${product?.productId}`}</Row>
                </Row>
            </Row>
            <Row className="flex flex-col items-center justify-center w-full">
                <Rate tooltips={desc} onChange={setValueRate} value={valueRate} />
                {valueRate ? <Row className="text-[1.6rem] mt-2">{desc[valueRate - 1]}</Row> : null}
            </Row>
            <Form onFinish={onSubmit} layout='vertical' autoComplete='off'>
                <Form.Item
                    name="content"
                    className="w-full"
                    required={false}
                    rules={[yupSync]}
                    label={
                    <Row className="font-semibold text-[1.6rem]">
                        {i18n.t('formRate.content')}
                        <Row className="text-red-500 ml-3">*</Row>
                    </Row>
                    }>
                    <TextArea placeholder="Hãy chia sẻ những cảm nhận của bạn về sản phẩm này nhé!" className="resize-none text-[1.6rem] !h-[150px] rounded" />
                </Form.Item>
                <Form.Item className="flex justify-center w-full">
                    <Button 
                        size="large" 
                        htmlType="submit"
                        className="w-full !border-colorTheme !bg-colorTheme !text-white hover:bg-colorTheme hover:text-white hover:border-colorTheme hover:opacity-90 !text-[1.6rem] hover:shadow-md rounded">
                        {i18n.t('formRate.buttonSubmit')}
                    </Button>
                </Form.Item>
            </Form>
        </Space>
    </Spin>
  )
}

export default FormRate