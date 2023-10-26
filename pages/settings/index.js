import React, { useEffect, useState } from 'react'
import Box from '../../components/box'
import { Breadcrumb, Col, Input, PageHeader, Row } from 'antd'
import network from '../../utils/network'
const SettingsList = () => {
  const title = '设置'
  const [settings, setSettings] = useState({
    domain: '',
    name: '',
    _id: ''
  })
  useEffect(() => {
    getData()
  }, [])
  const getData = () => {
    network('GET', '/settings/', null, (res) => {
      setSettings(res)
    })
  }
  const renderPageHeader = () => {
    return (
      <PageHeader
        style={{ paddingLeft: 0, paddingRight: 0 }}
        title={title}>
      </PageHeader>
    )
  }
  return (
    <Box title={title}>
      <Breadcrumb>
        <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
        <Breadcrumb.Item>{title}</Breadcrumb.Item>
      </Breadcrumb>
      {renderPageHeader()}
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>域名</Col>
        <Col xs={24} sm={14}>
          <Input value={settings.domain}></Input>
        </Col>
      </Row>
    </Box>
  )
}
export default SettingsList
