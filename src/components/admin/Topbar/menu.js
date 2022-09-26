import { Menu, Row, Space, Avatar } from 'antd'
import { FiUser, FiLogOut } from 'react-icons/fi'

export const menu = (
    <Menu
      className="shadow-lg py-3 px-8 rounded"
      items={[
        {
          label: (
            <Space>
              <Avatar 
                  size={40} 
                  style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} 
                  className="cursor-pointer">
                  A
              </Avatar>
              <Row className="text-[1.6rem] ml-2">
                 Admin
              </Row>
            </Space>
          ),
          key: '0',
        },
        {
          label: (
            <a href="/admin/adminInfo" className="text-[1.6rem] flex items-center mt-3">
              <FiUser className="mr-5" />
              Thông tin tài khoản
            </a>
          ),
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          label: (
            <a href="/admin/login" className="text-[1.6rem] flex items-center">
              <FiLogOut className="mr-5" />
              Đăng xuất
            </a>
          ),
          key: '2',
        },
      ]}
    />
  );