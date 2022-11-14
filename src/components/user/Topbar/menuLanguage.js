import { Menu } from 'antd'

export const menuLanguage = () => {
  return (
    <Menu className="shadow-lg py-3 px-5 rounded">
       <Menu.Item 
          key={0} 
          onClick={() => {
            localStorage.setItem("language", "vi")
            window.location.reload()
          }}>
          <span>Tiếng Việt</span>
       </Menu.Item>
       <Menu.Item 
          key={1} 
          onClick={() => {
            localStorage.setItem("language", "en")
            window.location.reload()
          }}>
          <span>English</span>
       </Menu.Item>
    </Menu>
  )
};