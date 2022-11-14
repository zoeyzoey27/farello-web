import React from 'react'
import { useQuery } from '@apollo/client'
import { Row, Col, Button } from 'antd'
import { FaFacebookF } from 'react-icons/fa'
import { BsInstagram } from 'react-icons/bs'
import image from '../../../assets/images/dangkybct.png'
import { GET_CATEGORIES, GET_POSTS } from './graphql'
import { ASC } from '../../../constant'
import i18n from '../../../translation'

const Footer = () => {
   const { data } = useQuery(GET_CATEGORIES, {
      variables: {
         categorySearchInput: {},
         skip: null,
         take: null,
         orderBy: {
             createdAt: ASC
         }
     }
   })
   const { data: dataCategoryPost } = useQuery(GET_POSTS, {
      variables: {
        skip: null,
        take: null,
        orderBy: {
          createdAt: ASC
        }
      }
    })
  return (
    <Row className="!bg-[rgb(247, 247, 247)] p-[20px] md:p-[50px] w-full">
        <Row gutter={16} className="w-full">
          <Col className="gutter-row" xs={24} lg={10}>
              <Row className="text-[3.5rem] logo">Farello</Row>
              <Row className="my-3 text-[1.6rem]">
                 <Row className="font-semibold mr-3">{`${i18n.t('common.email')}:`}</Row> 
                 contact@farello.vn
              </Row>
              <Row className="my-3 text-[1.6rem]">
                 <Row className="font-semibold mr-3">{`${i18n.t('footer.hotline')}:`}</Row> 
                 036.8523.966
              </Row>
              <Row className="my-3 text-[1.6rem]">
                 <Row className="font-semibold mr-3">{`${i18n.t('footer.workTime')}:`}</Row> 
                 8:30 - 22:00
              </Row>
              <Row className="my-3 text-[1.6rem] font-semibold">
                 {`${i18n.t('footer.store')}:`}
              </Row>
              <Row className="my-3 text-[1.6rem]">
                 {`${i18n.t('footer.address')}`}
              </Row>
              <Button 
                 size="large" 
                 href="https://www.google.com/maps/place/115+P.+Kim+M%C3%A3,+Kim+M%C3%A3,+Ba+%C4%90%C3%ACnh,+H%C3%A0+N%E1%BB%99i,+Vi%E1%BB%87t+Nam/@21.0313603,105.8224493,17z/data=!3m1!4b1!4m5!3m4!1s0x3135ab74eb4ad6a7:0x23a170b554639773!8m2!3d21.0313603!4d105.824638?shorturl=1"
                 className="mt-3 mb-6 hover:bg-black hover:text-white hover:border-black">
                 {`${i18n.t('footer.map')}`}
              </Button>
              <Row>
                 <Button 
                     shape="circle" 
                     href='https://www.facebook.com/kinhmatfarello'
                     icon={<FaFacebookF className="w-full" />} 
                     className="mr-3 hover:bg-black hover:border-black hover:text-white flex items-center justify-center" />
                 <Button 
                     shape="circle" 
                     href='https://www.instagram.com/farello_vn/'
                     icon={<BsInstagram className="w-full " />}
                     className="mr-3 hover:bg-black hover:border-black hover:text-white flex items-center justify-center" />
              </Row>
          </Col>
          <Col className="gutter-row mt-10 lg:mt-0 w-full" xs={24} lg={14}>
             <Row gutter={16} className="w-full">
               <Col className="gutter-row mb-5 md:mb-0" xs={24} md={8}>
                  <Col className="font-semibold text-[1.6rem]">{i18n.t('footer.product')}</Col>
                  {
                     data?.categories?.map((item) => (
                        <Col className="my-3 cursor-pointer text-[1.6rem]" key={item.id}>{item.name}</Col>
                     ))
                  }
               </Col>
               <Col className="gutter-row mb-5 md:mb-0" xs={24} md={8}>
                  <Col className="font-semibold text-[1.6rem]">{i18n.t('footer.policy')}</Col>
                  <Col className="my-3 text-[1.6rem]">{i18n.t('footer.policy1')}</Col>
                  <Col className="my-3 text-[1.6rem]">{i18n.t('footer.policy2')}</Col>
                  <Col className="my-3 text-[1.6rem]">{i18n.t('footer.policy3')}</Col>
                  <Col className="my-3 text-[1.6rem]">{i18n.t('footer.policy4')}</Col>
                  <Col className="my-3 text-[1.6rem]">{i18n.t('footer.policy5')}</Col>
               </Col>
               <Col className="gutter-row mb-5 md:mb-0" xs={24} md={8}>
                  <Col className="font-semibold text-[1.6rem]">{i18n.t('footer.news')}</Col>
                  {
                     dataCategoryPost?.postCategories?.map((item) => (
                        <Col className="my-3 cursor-pointer text-[1.6rem]" key={item.id}>{item.title}</Col>
                     ))
                  }
               </Col>
               <Col className="gutter-row mb-5 md:mb-0" xs={24} md={8}>
                  <img src={image} alt='' className='my-5' width={130} />
               </Col>
               <Col className="gutter-row" xs={24} md={16}>
                  <Col className="my-5 text-[1.6rem] text-justify block">
                  {i18n.t('footer.subtext')}
                  </Col>
               </Col>
             </Row>
          </Col>
        </Row>
    </Row>
  )
}

export default Footer