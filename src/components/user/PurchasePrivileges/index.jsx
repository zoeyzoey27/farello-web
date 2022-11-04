import React from 'react'
import { Drawer, Row } from 'antd'
import { BsCheckAll } from 'react-icons/bs'
import i18n from '../../../translation'

const PurchasePrivileges = ({onClose, visible}) => {
  return (
    <Drawer 
       title={i18n.t('purchasePrivileges.title')}
       placement="right" 
       onClose={onClose} 
       visible={visible}
       width={320}>
       <Row className="text-[1.6rem] my-5 flex items-start w-full">
          <BsCheckAll className="mr-5 text-[3rem] w-[10%]" />
          <Row className="flex-1 text-justify">{i18n.t('purchasePrivileges.item1')}</Row>
       </Row>
       <Row className="text-[1.6rem] my-5 flex items-start w-full">
          <BsCheckAll className="mr-5 text-[3rem] w-[10%]" />
          <Row className="flex-1 text-justify">{i18n.t('purchasePrivileges.item2')}</Row>
       </Row>
       <Row className="text-[1.6rem] my-5 flex items-start w-full">
          <BsCheckAll className="mr-5 text-[3rem] w-[10%]" />
          <Row className="flex-1 text-justify">{i18n.t('purchasePrivileges.item3')}</Row>
       </Row>
       <Row className="text-[1.6rem] my-5 flex items-start w-full">
          <BsCheckAll className="mr-5 text-[3rem] w-[10%]" />
          <Row className="flex-1 text-justify">{i18n.t('purchasePrivileges.item4')}</Row>
       </Row>
       <Row className="text-[1.6rem] my-5 flex items-start w-full">
          <BsCheckAll className="mr-5 text-[3rem] w-[10%]" />
          <Row className="flex-1 text-justify">{i18n.t('purchasePrivileges.item5')}</Row>
       </Row>
    </Drawer>
  )
}

export default PurchasePrivileges