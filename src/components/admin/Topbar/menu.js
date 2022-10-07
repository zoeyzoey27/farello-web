import { Menu, Row, Space, Avatar } from 'antd'
import { FiUser, FiLogOut } from 'react-icons/fi'

export const menu = (name,newName,id_token_admin) => {
  const logout = () => {
    localStorage.removeItem("token_admin")
    localStorage.removeItem("id_token_admin")
  }
  return (
    <Menu className="shadow-lg py-3 px-8 rounded">
       <Menu.Item key={0} className="cursor-default hover:bg-white hover:text-black">
          <Space>
            <Avatar 
                size={40} 
                style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} 
                className="font-semibold">
                {newName ? newName.slice(0,2) : 'Ad'}
            </Avatar>
            <Row className="text-[1.6rem] ml-2">
            {name ? name : 'Admin'}
            </Row>
          </Space>
       </Menu.Item>
       <Menu.Item key={1}>
          <a href={`/admin/adminInfo?id=${id_token_admin}`} className="text-[1.6rem] flex items-center mt-3">
            <FiUser className="mr-5" />
            Thông tin tài khoản
          </a>
       </Menu.Item>
       <hr className="my-3" />
       <Menu.Item key={2} onClick={logout}>
          <a href="/admin/login" className="text-[1.6rem] flex items-center">
            <FiLogOut className="mr-5" />
            Đăng xuất
          </a>
       </Menu.Item>
    </Menu>
  )
};