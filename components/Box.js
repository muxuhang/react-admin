import React, { useState } from 'react';
import TopMenu from './TopMenu';
import { Card, Layout } from 'antd';
import LeftMenu from './LeftMenu';
const { Header, Footer, Sider, Content } = Layout;

export default function Box({ children }) {
  const [collapsed, setCollapsed] = useState(true)
  return (
    <Layout style={{ minHeight: '100%' }}>
      <Sider collapsed={collapsed}>
        <LeftMenu />
      </Sider>
      <Layout>
        <Header>
          <TopMenu
            collapsed={collapsed}
            setCollapsed={() => setCollapsed(!collapsed)} />
        </Header>
        <Content style={{ display: 'flex' }}>
          <Card style={{ margin: 20, flex: 1 }}>
            {children}
          </Card>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
}