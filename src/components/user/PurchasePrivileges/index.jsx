import React from 'react'
import { Drawer, Row } from 'antd'
import { BsCheckAll } from 'react-icons/bs'

const PurchasePrivileges = ({onClose, visible}) => {
  return (
    <Drawer 
       title="Đặc quyền của khách hàng mua sản phẩm tại Farello" 
       placement="right" 
       onClose={onClose} 
       visible={visible}
       width={320}>
       <Row className="text-[1.6rem] my-5 flex items-start w-full">
          <BsCheckAll className="mr-5 text-[3rem] w-[10%]" />
          <Row className="flex-1 text-justify">Giảm giá 50% cho gọng kính thay thế. Áp dụng trong trường hợp gọng kính của bạn bị hỏng và không đạt điều kiện bảo hành trong vòng 2 năm từ ngày mua.</Row>
       </Row>
       <Row className="text-[1.6rem] my-5 flex items-start w-full">
          <BsCheckAll className="mr-5 text-[3rem] w-[10%]" />
          <Row className="flex-1 text-justify">Giảm giá 10% tròng kính khi thay tròng kính mới cho gọng Farello đang sử dụng vì mục tiêu bảo vệ môi trường.</Row>
       </Row>
       <Row className="text-[1.6rem] my-5 flex items-start w-full">
          <BsCheckAll className="mr-5 text-[3rem] w-[10%]" />
          <Row className="flex-1 text-justify">Miễn phí 1 lần thay đổi độ kính. Nếu bạn cảm thấy không thoải mái với thị lực trong vòng 2 năm từ ngày mua, Farello sẽ miễn phí 1 lần khám lại và thay đổi độ tròng kính phù hợp với tình trạng thị lực của bạn.</Row>
       </Row>
       <Row className="text-[1.6rem] my-5 flex items-start w-full">
          <BsCheckAll className="mr-5 text-[3rem] w-[10%]" />
          <Row className="flex-1 text-justify">Miễn phí vệ sinh, thay ve, thay ốc, điều chỉnh gọng kính trọn đời.</Row>
       </Row>
       <Row className="text-[1.6rem] my-5 flex items-start w-full">
          <BsCheckAll className="mr-5 text-[3rem] w-[10%]" />
          <Row className="flex-1 text-justify">Đo mắt và kiểm tra thị lực miễn phí trọn đời. Áp dụng với mọi khách hàng, kể cả những khách hàng chưa sử dụng dịch vụ của Farello.</Row>
       </Row>
    </Drawer>
  )
}

export default PurchasePrivileges