
import {
  HomeOutlined,
  UsergroupAddOutlined,
  AppstoreOutlined,
  SettingOutlined,
  DesktopOutlined,
  ContainerOutlined,
  InboxOutlined,
  AlignRightOutlined,
  ProjectOutlined
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useRouter } from 'next/router';
const { SubMenu } = Menu;

const LeftMenu = ({ collapsed }) => {
  const router = useRouter()
  console.log(router.pathname);
  const menulist = [
    { name: '首页', path: '/', icon: <HomeOutlined /> },
    { name: '用户列表', path: '/accounts', icon: <UsergroupAddOutlined /> },
    { name: '广告', path: '/ads', icon: <HomeOutlined /> },
    { name: '重点工作', path: '/tasks', icon: <ProjectOutlined /> },
    { name: '简单页面', path: '/flatpages', icon: <AlignRightOutlined /> },
    { name: '通知', path: '/inbox', icon: <InboxOutlined /> },
    {
      name: '部门', path: '/orgs', icon: <AppstoreOutlined />, content: [
        { name: '部门列表', path: '/orgs/departments' },
        { name: '人员列表', path: '/orgs/staffs' }
      ]
    },
    { name: '设置', path: '/settings', icon: <SettingOutlined /> },
  ]
  return (
    <Menu
      defaultSelectedKeys={[router.pathname]}
      mode="inline"
      theme='dark'
      openKeys={['/orgs']}
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