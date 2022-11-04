import React from 'react'
import { Space, Breadcrumb, Image, Row, Col } from 'antd'
import about from '../../../assets/images/about.jpg'
import about2 from '../../../assets/images/gioi-thieu.jpg'
import design from '../../../assets/images/gioi-thieu1.jpg'
import product from '../../../assets/images/gioi-thieu2.jpg'
import videoBackground from '../../../assets/images/nature_spirit.mov'
import i18n from '../../../translation'

const AboutUs = () => {
  return (
    <Space 
        direction="vertical" 
        size="middle" 
        className="max-w-full max-h-full mb-10">
        <Breadcrumb className="my-10 px-10 py-2 bg-[#f8f8f8]">
          <Breadcrumb.Item href="/" className="text-[1.6rem]">{i18n.t('common.home')}</Breadcrumb.Item>
          <Breadcrumb.Item className="text-[1.6rem] font-semibold">{i18n.t('aboutus.title')}</Breadcrumb.Item>
        </Breadcrumb>
        <Image src={about} alt="" preview={false} />
        <Row className="title-header">{i18n.t('aboutus.heading')}</Row>
        <Row className="text-[1.6rem] text-justify lg:!mx-[50px] xl:!mx-[100px]">
           {i18n.t('aboutus.graph1')}
           <br />
           {i18n.t('aboutus.graph2')}
           <br />
           {i18n.t('aboutus.graph3')}
        </Row>
        <Row className="flex justify-between my-[50px]">
            <Col span={11} className="mb-[30px] bg-[#f8f8f8] p-[50px]" >
                <Col className="mb-10">
                     <Row className="uppercase font-semibold mb-2 text-[2rem]">{i18n.t('aboutus.title1')}</Row>
                     <Row className="text-[1.6rem] text-justify">
                        {i18n.t('aboutus.subtitle')}
                     </Row>
                </Col>
                <Col className="mb-10">
                     <Row className="uppercase font-semibold mb-2 text-[2rem]">{i18n.t('aboutus.title2')}</Row>
                     <Row className="text-[1.6rem] text-justify">
                        {i18n.t('aboutus.subtitle')}
                     </Row>
                </Col>
                <Col className="mb-10">
                     <Row className="uppercase font-semibold mb-2 text-[2rem]">{i18n.t('aboutus.title3')}</Row>
                     <Row className="text-[1.6rem] text-justify">
                        {i18n.t('aboutus.subtitle')}
                     </Row>
                </Col>
            </Col>
            <Col span={11} className="mb-[30px]">
              <Image src={about2} alt="" preview={false} className="w-full object-cover object-center" />
            </Col>
            <Col span={11} className=" bg-[#f8f8f8] p-[50px]">
                <Image src={design} alt="" preview={false} className="mb-5 w-full object-cover object-center" />
                <Row className="uppercase font-semibold mb-2 text-[2rem]">{i18n.t('aboutus.title4')}</Row>
                <Row className="text-[1.6rem] text-justify">
                  {i18n.t('aboutus.desc1')}
                </Row>
            </Col>
            <Col span={11} className="bg-[#f8f8f8] p-[50px]">
                <Image src={product} alt="" preview={false} className="mb-5" />
                <Row className="uppercase font-semibold mb-2 text-[2rem]">{i18n.t('aboutus.title5')}</Row>
                <Row className="text-[1.6rem] text-justify">
                  {i18n.t('aboutus.desc2')}
                </Row>
            </Col>
        </Row>
        <video preload='false' autoPlay muted loop className='max-h-[680px] w-full object-cover'>
          <source src={videoBackground} type="video/mp4" />
        </video>
        <Row className="text-[1.6rem] text-justify lg:!mx-[50px] xl:!mx-[100px] my-10">
           {i18n.t('aboutus.graph4')}
        </Row>
    </Space>
  )
}

export default AboutUs