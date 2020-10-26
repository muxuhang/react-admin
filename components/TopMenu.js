import React, { useState } from 'react'
import { Badge, Button, Popover } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  SoundOutlined
} from '@ant-design/icons';

const TopMenu = (props) => {
  const renderNotice = () => (
    <div>
      111
    </div>
  )
  return (
    <div style={styles.menubox}>
      <Button
        type='text'
        style={styles.button}
        onClick={props.setCollapsed}>
        {props.collapsed ?
          <MenuUnfoldOutlined /> :
          <MenuFoldOutlined />}
      </Button>
      <div style={{ flex: 1 }}></div>
      <Popover
        content={renderNotice}
        placement="bottomRight"
        title="通知">
        <Button
          type='text'
          style={styles.button}>
          <Badge count={8} size='small'>
            <SoundOutlined />
          </Badge>
        </Button>
      </Popover>
      <Button
        type='text'
        style={styles.button}>
        <UserOutlined />
      </Button>
    </div>
  )
}
const styles = {
  menubox: {
    display: 'flex',
    height: '100%',
    alignItems: 'center'
  },
  button: {
    color: '#ffffff'
  }
}

export default TopMenu
