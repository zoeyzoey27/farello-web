import React from 'react'
import { Menu, Row, Divider } from 'antd'
import './style.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { AiOutlineProfile, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaShippingFast } from 'react-icons/fa'
import { FiUser, FiLogOut, FiUsers } from 'react-icons/fi'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import { AiOutlineDashboard } from 'react-icons/ai'
import { ImNewspaper } from 'react-icons/im'

const MenuAdmin = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const logout = () => {
        localStorage.removeItem("token_admin")
        localStorage.removeItem("id_token_admin")
        navigate("/admin/login")
    }
    const id = localStorage.getItem("id_token_admin")
    return (
        <Menu
            selectedKeys={[location.pathname]}
            mode="inline"
            className="h-full w-full py-10 text-[1.6rem] font-semibold text-[#828282]">
            <Menu.Item key="/admin/dashboard" onClick={() => navigate('/admin/dashboard')}>
                <Row className="flex items-center">
                    <AiOutlineDashboard className="mr-3 text-[2rem]" />
                    Bảng điều khiển
                </Row>
            </Menu.Item>
            <Menu.SubMenu title={
                <Row className="flex items-center">
                    <AiOutlineProfile className="mr-3 text-[2rem]" />
                    Danh mục sản phẩm
                </Row>
            } key="sub1">
                <Menu.Item 
                   key="/admin/categoryManagement" 
                   className="text-[1.6rem]"
                   onClick={() => navigate('/admin/categoryManagement')}>
                   Danh sách danh mục
                </Menu.Item>
                <Menu.Item 
                   key="/admin/addCategory" 
                   className="text-[1.6rem]"
                   onClick={() => navigate('/admin/addCategory')}>
                   Thêm mới danh mục
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title={
                <Row className="flex items-center">
                    <AiOutlineShoppingCart className="mr-3 text-[2rem]" />
                    Quản lý sản phẩm
                </Row>
            } key="sub2">
                <Menu.Item 
                   key="/admin/productManagement" 
                   className="text-[1.6rem]"
                   onClick={() => navigate('/admin/productManagement')}>
                   Danh sách sản phẩm
                </Menu.Item>
                <Menu.Item 
                   key="/admin/addProduct" 
                   className="text-[1.6rem]"
                   onClick={() => navigate('/admin/addProduct')}>
                   Thêm mới sản phẩm
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="/admin/orderManagement" onClick={() => navigate('/admin/orderManagement')}>
                <Row className="flex items-center">
                    <FaShippingFast className="mr-3 text-[2rem]" />
                    Quản lý đơn hàng
                </Row>
            </Menu.Item>
            <Menu.SubMenu title={
                <Row className="flex items-center">
                    <ImNewspaper className="mr-3 text-[2rem]" />
                    Quản lý bài viết
                </Row>
            } key="sub3">
                <Menu.Item 
                   key="/admin/postManagement" 
                   className="text-[1.6rem]"
                   onClick={() => navigate('/admin/postManagement')}>
                   Danh sách bài viết
                </Menu.Item>
                <Menu.Item 
                   key="/admin/addPostCategory" 
                   className="text-[1.6rem]"
                   onClick={() => navigate('/admin/postCategory')}>
                   Danh mục bài viết
                </Menu.Item>
                <Menu.Item 
                   key="/admin/addPost" 
                   className="text-[1.6rem]"
                   onClick={() => navigate('/admin/addPost')}>
                   Tạo bài viết
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title={
                <Row className="flex items-center">
                    <MdOutlineAdminPanelSettings className="mr-3 text-[2rem]" />
                    Quản lý Admin
                </Row>
            } key="sub4">
                <Menu.Item 
                   key="/admin/adminList" 
                   className="text-[1.6rem]"
                   onClick={() => navigate('/admin/adminList')}>
                   Danh sách Admin
                </Menu.Item>
                <Menu.Item 
                   key="/admin/addAdmin" 
                   className="text-[1.6rem]"
                   onClick={() => navigate('/admin/addAdmin')}>
                   Tạo tài khoản
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="/admin/userList" onClick={() => navigate('/admin/userList')}>
                <Row className="flex items-center">
                    <FiUsers className="mr-3 text-[2rem]" />
                    Quản lý khách hàng
                </Row>
            </Menu.Item>
            <Divider />
            <Menu.Item key="/admin/adminInfo" onClick={() => navigate(`/admin/adminInfo?id=${id}`)}>
                <Row className="flex items-center">
                    <FiUser className="mr-3 text-[2rem]" />
                    Thông tin tài khoản
                </Row>
            </Menu.Item>
            <Menu.Item key="/admin/login" onClick={logout}>
                <Row className="flex items-center">
                    <FiLogOut className="mr-3 text-[2rem]" />
                    Đăng xuất
                </Row>
            </Menu.Item>
        </Menu>
    )
}

export default MenuAdmin