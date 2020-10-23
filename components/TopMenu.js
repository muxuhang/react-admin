import React, { useState } from 'react'
import { Button } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

const TopMenu = (props) => {
  return (
    <div>
      <Button
        type='text'
        style={{ color: '#fff' }}
        onClick={props.setCollapsed}>
        {props.collapsed ?
          <MenuUnfoldOutlined /> :
          <MenuFoldOutlined />}
      </Button>
    </div>
  )
}

export default TopMenu
