import React, { useState } from 'react'
import { Layout, Grid, Drawer } from 'antd'
import Topbar from '../../components/admin/Topbar'
import MenuAdmin from '../../components/admin/MenuAdmin'
import DeleteAccountReason from '../../components/admin/DeleteAccountReason'

const CategoryManagement = () => {
  const { useBreakpoint } = Grid
  const { Sider } = Layout
  const screens = useBreakpoint()
  const [ visible, setVisible ] = useState(false)
  const onOpen = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }
  return (
    <Layout className="max-w-screen min-h-screen">
      <Topbar onClick={onOpen} />
      <Layout className="w-hull h-full">
      {screens.lg && (
        <Sider
          id="side-bar"
          className="bg-white text-center lg:h-auto lg:relative w-[0px] lg:!min-w-[250px]">
          <MenuAdmin />
        </Sider>
      )}
      {!screens.lg && (
        <Drawer
          title="Menu"
          placement="right"
          width={320}
          onClose={onClose}
          visible={visible}>
          <MenuAdmin />
        </Drawer>
      )}
      <Layout className="m-10">
        <DeleteAccountReason />
      </Layout>
      </Layout>
    </Layout>
  )
}

export default CategoryManagement