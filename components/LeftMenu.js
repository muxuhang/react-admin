
import {
  HomeOutlined,
  AppstoreOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
const { SubMenu } = Menu;

const LeftMenu = ({ collapsed }) => {
  // const menu = [
  //   { name: '首页', path: '/', icon: <Home /> },
  //   { name: '仪表盘', path: '/dashboards', icon: <Dashboard /> },
  //   { name: '商品列表', path: '/products', icon: <Store /> },
  //   { name: '媒体附件', path: '/attachments', icon: <InsertPhoto /> },
  //   { name: '简单页面', path: '/flatpages', icon: <Note /> }
  // ]
  return (
    <Menu
      defaultSelectedKeys={['1']}
      mode="inline"
      theme='dark'
      collapsed={collapsed}
    >
      <div style={{
        height: '32px',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        margin: '16px'
      }} />
      <Menu.Item key="1" icon={<HomeOutlined />}>
        首页
          </Menu.Item>
      <Menu.Item key="2" icon={<DesktopOutlined />}>
        Option 2
          </Menu.Item>
      <Menu.Item key="3" icon={<ContainerOutlined />}>
        Option 3
          </Menu.Item>
      <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <Menu.Item key="7">Option 7</Menu.Item>
        <Menu.Item key="8">Option 8</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </SubMenu>
    </Menu>
  )
}
export default LeftMenu