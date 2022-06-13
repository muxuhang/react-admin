
import {
  HomeOutlined,
  UsergroupAddOutlined,
  AppstoreOutlined,
  SettingOutlined,
  DesktopOutlined,
  BoxPlotOutlined,
  InboxOutlined,
  AlignRightOutlined,
  ProjectOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';
const { SubMenu } = Menu;

const LeftMenu = ({ collapsed }) => {
  const router = useRouter()
  const [show, setShow] = useState(true)
  const menulist = [
    { name: '首页', path: '/', icon: <HomeOutlined /> },
    { name: '用户列表', path: '/users', icon: <UsergroupAddOutlined /> },
    // { name: '广告', path: '/ads', icon: <HomeOutlined /> },
    // {
    //   name: '部门', path: '/orgs', icon: <AppstoreOutlined />, content: [
    //     { name: '部门结构', path: '/orgs' },
    //     { name: '部门管理', path: '/orgs/deps' },
    //     { name: '区域管理', path: '/orgs/regions' },
    //     { name: '人员管理', path: '/orgs/staffs' },
    //   ]
    // },
    // { name: '设置', path: '/settings', icon: <SettingOutlined /> },
    // { name: '重点工作', path: '/tasks', icon: <ProjectOutlined /> },
    { name: '简单页面', path: '/flatpages', icon: <AlignRightOutlined /> },
  ]
  return (
    <Menu
      defaultSelectedKeys={[router.pathname]}
      mode="inline"
      theme='dark'
      defaultOpenKeys={['/orgs']}
      collapsed={collapsed}
    >
      <div style={{
        height: '32px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        margin: '16px'
      }} />
      {menulist.map((item, index) => item.content ? (
        <SubMenu
          key={item.path}
          icon={item.icon}
          title={item.name}>
          {item.content.map((row, keys) =>
            <Menu.Item
              key={row.path}
              onClick={() => router.push(row.path)}>
              {row.name}
            </Menu.Item>
          )}
        </SubMenu>
      ) : (
        <Menu.Item key={item.path} icon={item.icon} onClick={() => router.push(item.path)}>
          {item.name}
        </Menu.Item>
      ))}
    </Menu>
  )
}
export default LeftMenu