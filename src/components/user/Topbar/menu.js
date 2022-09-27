import { Menu } from 'antd'
import { AiOutlineRight } from 'react-icons/ai'

export const menu = (
    <Menu
      className="shadow-lg py-3 px-8 rounded"
      items={[
        {
          label: (
            <a href="/login" className="text-[1.6rem] flex items-center justify-between mt-3">
              Đăng ký/Đăng nhập
              <AiOutlineRight className='ml-20' />
            </a>
          ),
          key: '0',
        },
        {
          label: (
            <a href="/userInfo" className="text-[1.6rem] flex items-center justify-between mt-3">
              Thông tin tài khoản
              <AiOutlineRight className='ml-20' />
            </a>
          ),
          key: '1',
        },
        {
          type: 'divider',
        },
        {
          label: (
            <a href="/login" className="text-[1.6rem] flex items-center justify-between">
              Đăng xuất
              <AiOutlineRight className='ml-20' />
            </a>
          ),
          key: '2',
        },
      ]}
    />
  );