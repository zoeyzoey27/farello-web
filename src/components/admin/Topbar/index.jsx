import React from 'react'
import { Row, Avatar } from 'antd'
import { menu } from './menu'
import { Dropdown, Space } from 'antd'
import { AiOutlineMenuFold } from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'
import { useQuery } from '@apollo/client'
import { GET_ADMIN } from './graphql'

const Topbar = ({onClick}) => {
  const id_token_admin = localStorage.getItem("id_token_admin")
  const { data } = useQuery(GET_ADMIN, {
    variables: {
      adminId: id_token_admin
    }
  })
  const name = data?.admin?.fullName
  const newName = data?.admin?.fullName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D")
  return (
    <Row className="bg-[#154c79] h-[65px] flex items-center justify-between px-[50px] w-full">
        <Row className="logo text-[3.5rem] text-white">Farello</Row>
        <Row className="flex items-center -mr-10 md:-mr-0">
          <AiOutlineMenuFold className="text-[2.5rem] text-white mr-10 cursor-pointer block lg:hidden" onClick={onClick} />
          <Dropdown overlay={menu(name,newName,id_token_admin)}>
              <Space>
                <Avatar 
                    style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} 
                    className="cursor-pointer w-[40px] h-[40px] md:w-[45px] md:h-[45px] flex items-center justify-center text-[1.8rem] font-semibold">
                    {newName ? newName.slice(0,2) : 'Ad'}
                </Avatar>
                <BiChevronDown className="cursor-pointer text-[2rem] ml-1 text-white" />
              </Space>
          </Dropdown>
        </Row>
    </Row>
  )
}

export default Topbar