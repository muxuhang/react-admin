import React, { useEffect, useState } from 'react'
import Box from '../../components/box'
import { Breadcrumb } from 'antd'
import { useRouter } from 'next/router'
import network from '../../utils/network'
const Settings = () => {
  const title = '设置'
  const router = useRouter()
  useEffect(() => {
    getSettings()
  }, [])
  const getSettings = () => {
    network('GET', '/settings', null, (res) => {
      console.log(res);
    })
  }
  return (
    <Box title={title}>
      <Breadcrumb>
        <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
        <Breadcrumb.Item>{title}</Breadcrumb.Item>
      </Breadcrumb>
    </Box>
  )
}
export default Settings
