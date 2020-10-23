import React, { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import Router from 'next/router'

import Cookies from 'universal-cookie'
import { Button, Input } from 'antd'
import network from '../utils/network'

const Login = (props) => {
  const redirect = '/profile'
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
    network('post', '/accounts/login', {
      username: data.username,
      password: data.password
    }, (res) => {
      const cookies = new Cookies()
      cookies.set('access', res.access, { path: '/' })
      cookies.set('refresh', res.refresh, { path: '/' })
      Router.push(redirect)
    })
  }
  useEffect(() => {
    Router.prefetch('/')
  })


  return (
    <div>
      <Input
        margin="dense"
        label="用户名"
        name="username"
        onChange={handleChange}
        value={data.username}
        error={errors.username}
        helperText={errors.username && '用户名格式错误'}
        required />
      <Input
        label="密码"
        type="password"
        name="password"
        value={data.password}
        error={errors.password}
        onChange={handleChange}
        helperText={errors.password && '密码长度不正确'}
        required />
      <Button
        onClick={handleSubmit}
        disabled={!checkForm()}>登 录</Button>
    </div>
  )
}

export default Login
