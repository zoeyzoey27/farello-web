import React from 'react'
import { Menu, Row, Divider } from 'antd'
import './style.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { AiOutlineProfile, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaShippingFast } from 'react-icons/fa'
import { FiUser, FiLogOut, FiUsers, FiUserPlus } from 'react-icons/fi'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'

const MenuAdmin = () => {
    const navigate = useNavigate()
    const location = useLocation()
    return (
        <Menu
            selectedKeys={[location.pathname]}
            mode="inline"
            className="h-full w-full py-10 text-[1.6rem] font-semibold text-[#828282]">
            <Menu.Item key="/admin/categoryManagement" onClick={() => navigate('/admin/categoryManagement')}>
                <Row className="flex items-center">
                    <AiOutlineProfile className="mr-3 text-[2rem]" />
                    Danh mục sản phẩm
                </Row>
            </Menu.Item>
            <Menu.Item key="/admin/productManagement" onClick={() => navigate('/admin/productManagement')}>
                <Row className="flex items-center">
                    <AiOutlineShoppingCart className="mr-3 text-[2rem]" />
                    Quản lý sản phẩm
                </Row>
            </Menu.Item>
            <Menu.Item key="/admin/orderManagement" onClick={() => navigate('/admin/orderManagement')}>
                <Row className="flex items-center">
                    <FaShippingFast className="mr-3 text-[2rem]" />
                    Quản lý đơn hàng
                </Row>
            </Menu.Item>
            <Menu.Item key="/admin/addAdmin" onClick={() => navigate('/admin/addAdmin')}>
                <Row className="flex items-center">
                    <FiUserPlus className="mr-3 text-[2rem]" />
                    Tạo tài khoản
                </Row>
            </Menu.Item>
            <Menu.Item key="/admin/adminList" onClick={() => navigate('/admin/adminList')}>
                <Row className="flex items-center">
                    <MdOutlineAdminPanelSettings className="mr-3 text-[2rem]" />
                    Quản lý admin
                </Row>
            </Menu.Item>
            <Menu.Item key="/admin/userList" onClick={() => navigate('/admin/userList')}>
                <Row className="flex items-center">
                    <FiUsers className="mr-3 text-[2rem]" />
                    Danh sách người dùng
                </Row>
            </Menu.Item>
            <Divider />
            <Menu.Item key="/admin/adminInfo" onClick={() => navigate('/admin/adminInfo')}>
                <Row className="flex items-center">
                    <FiUser className="mr-3 text-[2rem]" />
                    Thông tin tài khoản
                </Row>
            </Menu.Item>
            <Menu.Item key="logout">
                <Row className="flex items-center">
                    <FiLogOut className="mr-3 text-[2rem]" />
                    Đăng xuất
                </Row>
            </Menu.Item>
        </Menu>
    )
}

export default MenuAdmin