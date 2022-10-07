import { Menu } from 'antd'
import { AiOutlineRight } from 'react-icons/ai'

export const menu = () => {
  const token = localStorage.getItem("token")
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("id_token")
  }
  return (
    <Menu className="shadow-lg py-3 px-8 rounded">
      <Menu.Item key={0} disabled={token && true}>
          <a href="/login" className="text-[1.6rem] flex items-center justify-between mt-3">
              Đăng ký/Đăng nhập
              <AiOutlineRight className='ml-20' />
          </a>
      </Menu.Item>
      <hr className="my-2" />
      <Menu.Item key={1} disabled={!token && true}>
          <a href="/userInfo" className="text-[1.6rem] flex items-center justify-between mt-3">
              Thông tin tài khoản
              <AiOutlineRight className='ml-20' />
          </a>
      </Menu.Item>
      <hr className="my-2" />
      <Menu.Item key={2} disabled={!token && true} onClick={logout}>
          <a href="/login" className="text-[1.6rem] flex items-center justify-between mt-3">
              Đăng xuất
              <AiOutlineRight className='ml-20' />
          </a>
      </Menu.Item>
    </Menu>
  )
}