import React from 'react'
import { Row, Image, Avatar } from 'antd'
import logo from '../../../assets/images/logo.png'
import { menu } from './menu'
import { Dropdown, Space } from 'antd'
import { AiOutlineMenuFold } from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'

const Topbar = ({onClick}) => {
  return (
    <Row className="bg-white h-[65px] flex items-center justify-between px-[50px] w-full">
       <Image
            src={logo}
            className="block cursor-pointer w-[145px] md:w-[160px] -ml-10 md:-ml-0"
            preview={false}
        /> 
        <Row className="flex items-center -mr-10 md:-mr-0">
          <AiOutlineMenuFold className="text-[2.5rem] mr-10 cursor-pointer block lg:hidden" onClick={onClick} />
          <Dropdown overlay={menu}>
              <Space>
                <Avatar 
                    style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} 
                    className="cursor-pointer w-[40px] h-[40px] md:w-[45px] md:h-[45px] flex items-center justify-center text-[1.8rem] font-semibold">
                    Ad
                </Avatar>
                <BiChevronDown className="cursor-pointer text-[2rem] ml-1" />
              </Space>
          </Dropdown>
        </Row>
    </Row>
  )
}

export default Topbar