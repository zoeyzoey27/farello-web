import React from 'react'
import { Row, Avatar, Badge } from 'antd'
import { menu } from './menu'
import { Dropdown, Space } from 'antd'
import { AiOutlineMenuFold } from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'
import { useQuery } from '@apollo/client'
import { GET_ADMIN, GET_INQUIRIES } from './graphql'
import { AiOutlineMail } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { GrLanguage } from 'react-icons/gr'
import { menuLanguage } from './menuLanguage'

const Topbar = ({onClick}) => {
  const navigate = useNavigate()
  const id_token_admin = localStorage.getItem("id_token_admin")
  const { data } = useQuery(GET_ADMIN, {
    variables: {
      adminId: id_token_admin
    }
  })
  const { data: dataInquiry } = useQuery(GET_INQUIRIES, {
    variables: {
      inquirySearchInput: {
        isRead: false
      },
      skip: null,
      take: null,
      orderBy: {
        createdAt: "desc"
      }
    }
  })
  const name = data?.admin?.fullName
  const newName = data?.admin?.fullName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D")
  const logout = () => {
    localStorage.removeItem("token_admin")
    localStorage.removeItem("id_token_admin")
    navigate("/admin/login")
  }
  return (
    <Row className="bg-white h-[65px] flex items-center justify-between px-[50px] w-full">
        <Row className="logo text-[3rem] md:text-[3.5rem] -ml-10 md:-ml-0">Farello</Row>
        <Row className="flex items-center -mr-10 md:-mr-0">
          <Dropdown overlay={menuLanguage}>
              <Space>
                 <GrLanguage className="text-[2rem] cursor-pointer" />
                 <span className="font-medium">LA</span>
              </Space>
          </Dropdown>
          <Badge 
            count={dataInquiry?.getInquiries?.length || 0} 
            size="default" 
            showZero={false}
            overflowCount={99} 
            offset={[6, 0]}
            className="text-black ml-9 mr-9 md:mr-14"
            style={{ backgroundColor: '#f5222d', color: '#fff' }}>
            <AiOutlineMail className="text-[2.3rem] cursor-pointer" onClick={() => navigate('/admin/inquiryManagement')}  />
          </Badge>
          <AiOutlineMenuFold className="text-[2.5rem] cursor-pointer block lg:hidden" onClick={onClick} />
          <Dropdown overlay={menu(name,newName,id_token_admin,logout)} className="hidden lg:flex">
              <Space>
                <Avatar 
                    style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} 
                    className="cursor-pointer w-[40px] h-[40px] md:w-[45px] md:h-[45px] flex items-center justify-center text-[1.8rem] font-semibold">
                    {newName ? newName.slice(0,2) : 'Ad'}
                </Avatar>
                <BiChevronDown className="cursor-pointer text-[2rem] ml-1" />
              </Space>
          </Dropdown>
        </Row>
    </Row>
  )
}

export default Topbar