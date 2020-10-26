import React, { useState } from 'react'
import { Badge, Button } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  SoundOutlined
} from '@ant-design/icons';

const TopMenu = (props) => {
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
      <Button
        type='text'
        style={styles.button}>
        <Badge count={8} size='small'>
          <SoundOutlined />
        </Badge>
      </Button>
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
