import React from 'react'
import { useQuery } from '@apollo/client'
import { Row, Col, Button } from 'antd'
import logo from '../../../assets/images/logo.png'
import { FaFacebookF } from 'react-icons/fa'
import { BsInstagram } from 'react-icons/bs'
import { getCategories } from '../../../graphqlClient/queries'
import image from '../../../assets/images/dangkybct.png'

const Footer = () => {
   const { loading, error, data } = useQuery(getCategories)
  if (loading) return <p>Loading....</p>
	if (error) return <p>Error!</p>
  const categories = data?.categories
  return (
    <Row className="!bg-[rgb(247, 247, 247)] p-[50px] w-full">
        <Row gutter={16} className="w-full">
          <Col className="gutter-row" span={10}>
              <img src={logo} alt='' width={150} />
              <Row className="my-3 text-[1.6rem]">
                 <Row className="font-semibold mr-3">Email:</Row> 
                 contact@farello.vn
              </Row>
              <Row className="my-3 text-[1.6rem]">
                 <Row className="font-semibold mr-3">Hotline:</Row> 
                 036.8523.966
              </Row>
              <Row className="my-3 text-[1.6rem]">
                 <Row className="font-semibold mr-3">Mon - Sun:</Row> 
                 8:30 - 22:00
              </Row>
              <Row className="my-3 text-[1.6rem] font-semibold">
                 Store Hà Nội
              </Row>
              <Row className="my-3 text-[1.6rem]">
                 115 Kim Mã, Quận Ba Đình, Hà Nội
              </Row>
              <Button 
                 size="large" 
                 href="https://www.google.com/maps/place/115+P.+Kim+M%C3%A3,+Kim+M%C3%A3,+Ba+%C4%90%C3%ACnh,+H%C3%A0+N%E1%BB%99i,+Vi%E1%BB%87t+Nam/@21.0313603,105.8224493,17z/data=!3m1!4b1!4m5!3m4!1s0x3135ab74eb4ad6a7:0x23a170b554639773!8m2!3d21.0313603!4d105.824638?shorturl=1"
                 className="mt-3 mb-6 hover:bg-black hover:text-white hover:border-black">
                 Xem bản đồ
              </Button>
              <Row>
                 <Button 
                     shape="circle" 
                     href='https://www.facebook.com/kinhmatfarello'
                     icon={<FaFacebookF className="w-full" />} 
                     className="mr-3 hover:bg-black hover:border-black hover:text-white flex items-center" />
                 <Button 
                     shape="circle" 
                     href='https://www.instagram.com/farello_vn/'
                     icon={<BsInstagram className="w-full " />}
                     className="mr-3 hover:bg-black hover:border-black hover:text-white flex items-center" />
              </Row>
          </Col>
          <Col className="gutter-row" span={14}>
             <Row gutter={16} className="w-full">
               <Col className="gutter-row" span={8}>
                  <Col className="font-semibold text-[1.6rem]">Sản phẩm</Col>
                  {
                     categories.map((item) => (
                        <Col className="my-3 cursor-pointer text-[1.6rem]" key={item.id}>{item.name}</Col>
                     ))
                  }
               </Col>
               <Col className="gutter-row" span={8}>
                  <Col className="font-semibold text-[1.6rem]">Các chính sách</Col>
                  <Col className="my-3 text-[1.6rem]">Khám mắt miễn phí</Col>
                  <Col className="my-3 text-[1.6rem]">Bảo hành</Col>
                  <Col className="my-3 text-[1.6rem]">Đổi trả</Col>
                  <Col className="my-3 text-[1.6rem]">Vận chuyển</Col>
                  <Col className="my-3 text-[1.6rem]">Thả cũ - Đổi mới</Col>
               </Col>
               <Col className="gutter-row" span={8}>
                  <Col className="font-semibold text-[1.6rem]">Tin tức</Col>
                  <Col className="my-3 text-[1.6rem]">Bảo vệ mắt</Col>
                  <Col className="my-3 text-[1.6rem]">Kiến thức</Col>
                  <Col className="my-3 text-[1.6rem]">Sức khỏe</Col>
                  <Col className="my-3 text-[1.6rem]">Thời trang</Col>
               </Col>
               <Col className="gutter-row" span={8}>
                  <img src={image} alt='' className='my-5' width={130} />
               </Col>
               <Col className="gutter-row" span={16}>
                  <Col className="my-5 text-[1.6rem]">
                       Đại diện pháp luật: Nguyễn Tiến Dũng. Ngày cấp giấy phép: 14/08/2019. Ngày hoạt động: 14/08/2019
                  </Col>
               </Col>
             </Row>
          </Col>
        </Row>
    </Row>
  )
}

export default Footer