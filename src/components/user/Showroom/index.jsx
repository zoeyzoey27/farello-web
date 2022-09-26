import React from 'react'
import { Row, Col } from 'antd'
import showroom1 from '../../../assets/images/show-room1.jpg'
import showroom2 from '../../../assets/images/show-room2.jpg'
import showroom3 from '../../../assets/images/show-room3.jpg'
import showroom4 from '../../../assets/images/show-room4.jpg'

const Showroom = () => {
  return (
    <Row gutter={16} className="my-[50px] !mx-[100px]">
        <Col span={12}>
           <img src={showroom1} alt="" className="w-full h-full !object-center !object-cover" />
        </Col>
        <Col span={12}>
           <Row>
              <Col span={24}>
                 <img src={showroom2} alt='' className="w-full h-full !object-center !object-cover" />
              </Col>
              <Col 
                  span={24} 
                  className="text-[1.6rem] font-semibold tracking-[1px] my-3 flex items-center justify-center p-3 bg-[rgba(30,30,30,.77)] text-white uppercase"
              >
                  ĐẾN FARELLO ĐỂ ĐƯỢC KHÁM MẮT MIỄN PHÍ
              </Col>
              <Col span={24}>
                 <Row gutter={16}>
                    <Col span={12}>
                       <img src={showroom3} alt='' className="w-full h-full !object-center !object-cover" />
                    </Col>
                    <Col span={12}>
                       <img src={showroom4} alt='' className="w-full h-full !object-center !object-cover" />
                    </Col>
                 </Row>
              </Col>
           </Row>
        </Col>
    </Row>
  )
}

export default Showroom