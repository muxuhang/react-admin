import React, { useState, useCallback, useEffect } from 'react'
import Router from 'next/router'
import {
  UserOutlined,
  LockOutlined
} from '@ant-design/icons';

import Cookies from 'universal-cookie'
import { Button, Card, Col, Image, Input, Row, Typography } from 'antd'
import network from '../../utils/network'
const { Title } = Typography
const Login = (props) => {
  const [loading, setLoading] = useState(false)
  const redirect = '/'
  const [data, setData] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({ username: false, password: false })
  const handleChange = event => {
    const name = event.target.name
    const value = event.target.value
    let error = false
    if (name === 'username' && (value.length < 2 || value.length > 10)) {
      error = true
    } else if (name === 'password' && (value.length < 2 || value.length > 16)) {
      error = true
    }
    setErrors({ ...errors, [name]: error })
    setData({ ...data, [name]: value })
  }

  const checkForm = () => {
    let check = true
    if (!data.username || errors.username) {
      check = false
    } else if (!data.password || errors.password) {
      check = false
    }
    return check
  }

  const handleSubmit = () => {
    setLoading(true)
    network('post', '/accounts/login', {
      username: data.username,
      password: data.password
    }, (res) => {
      const cookies = new Cookies()
      cookies.set('access', res.token, { path: '/' })
      // cookies.set('refresh', res.refresh, { path: '/' })
      Router.push(redirect)
      setLoading(false)
    }, false)
  }
  useEffect(() => {
    Router.prefetch('/')
  })

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#1890ff',
      justifyContent: 'center'
    }}>
      <Row
        gutter={[12, 12]}
        align={'middle'}>
        <Col
          style={{ maxWidth: 440, width: '96%', margin: "auto" }}>
          <Card style={{ borderRadius: 5 }}>
            <Title level={3}>纸坊镇考核台账系统</Title>
            <Input
              margin="dense"
              label="用户名"
              name="username"
              style={{ marginTop: 10 }}
              placeholder='请输入用户名'
              addonBefore={<UserOutlined />}
              onChange={handleChange}
              value={data.username}
              required />
            <Input
              label="密码"
              type="password"
              name="password"
              placeholder='请输入密码'
              addonBefore={<LockOutlined />}
              style={{ marginTop: 10, marginBottom: 30 }}
              value={data.password}
              onChange={handleChange}
              required />
            <Button
              onClick={handleSubmit}
              type='primary'
              loading={loading}
              disabled={loading}
              style={{ width: '100%' }}
              disabled={!checkForm()}>登 录</Button>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Login
