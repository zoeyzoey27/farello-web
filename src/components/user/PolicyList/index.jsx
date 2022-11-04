import React from 'react'
import { Row, Col, Typography } from 'antd'
import { FileProtectOutlined, SyncOutlined, EyeOutlined, ClearOutlined } from '@ant-design/icons'
import i18n from '../../../translation'

const { Title, Text} = Typography

const PolicyList = () => {
  return (
    <Row gutter={[50,50]} className="my-[50px] lg:!mx-[50px] xl:!mx-[100px]">
        <Col xs={24} md={12} className="flex flex-col items-center justify-center md:items-start md:flex-row">
            <FileProtectOutlined className="mr-5 mt-2 text-[3rem]" />
            <Row className="flex flex-col md:flex-row">
                <Title level={5} className="text-[1.8rem] uppercase tracking-[1px] text-center block mt-5 md:mt-0 md:text-left">{i18n.t('policyList.title1')}</Title>
                <Text className="text-[#828282] text-[1.6rem] text-justify">
                   {i18n.t('policyList.desc1')}
                </Text>
            </Row>
        </Col>
        <Col xs={24} md={12} className="flex flex-col items-center justify-center md:items-start md:flex-row">
            <SyncOutlined  className="mr-5 mt-2 text-[3rem]" />
            <Row className="flex flex-col md:flex-row">
                <Title level={5} className="text-[1.8rem] uppercase tracking-[1px] text-center block mt-5 md:mt-0 md:text-left">{i18n.t('policyList.title2')}</Title>
                <Text className="text-[#828282] text-[1.6rem] text-justify">
                   {i18n.t('policyList.desc2')}
                </Text>
            </Row>
        </Col>
        <Col xs={24} md={12} className="flex flex-col items-center justify-center md:items-start md:flex-row">
            <EyeOutlined className="mr-5 mt-2 text-[3rem]" />
            <Row className="flex flex-col md:flex-row">
                <Title level={5} className="text-[1.8rem] uppercase tracking-[1px] text-center block mt-5 md:mt-0 md:text-left">{i18n.t('policyList.title3')}</Title>
                <Text className="text-[#828282] text-[1.6rem] text-justify">
                   {i18n.t('policyList.desc3')}
                </Text>
            </Row>
        </Col>
        <Col xs={24} md={12} className="flex flex-col items-center justify-center md:items-start md:flex-row">
            <ClearOutlined className="mr-5 mt-2 text-[3rem]" />
            <Row className="flex flex-col md:flex-row">
                <Title level={5} className="text-[1.8rem] uppercase tracking-[1px] text-center block mt-5 md:mt-0 md:text-left">{i18n.t('policyList.title4')}</Title>
                <Text className="text-[#828282] text-[1.6rem] text-justify">
                   {i18n.t('policyList.desc4')}
                </Text>
            </Row>
        </Col>
    </Row>
  )
}

export default PolicyList