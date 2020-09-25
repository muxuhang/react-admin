import React, { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Router from 'next/router'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import Cookies from 'universal-cookie'

const Login = (props) => {
  const router = useRouter()
  //const { redirect } = router.query
  const redirect = '/profile'
  const [data, setData] = useState({username:'', password:''})
  const [errors, setErrors] = useState({username:false, password:false})

  const handleChange = event => {
    const name = event.target.name
    const value = event.target.value
    let error = false
    if (name === 'username' && (value.length < 2 || value.length > 10)) {
      error = true
    } else if(name === 'password' &&  (value.length < 2 || value.length > 16)) {
      error = true
    }
    setErrors({...errors, [name]:error})
    setData({...data, [name]:value})
  }

  const checkForm = () => {
    let check = true
    if(!data.username || errors.username) {
      check = false
    } else if (!data.password || errors.password){
      check = false
    }
    return check
  }

  const handleSubmit = useCallback(() => {
    fetch(`${process.env.api}/api/accounts/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password
      })
    })
      .then(res => {
        if(!res.ok) {
          if(res.status === 401) {
            throw Error('登录失败')
          }
          throw Error(res.statusText)
        }
        return res
      })
      .then(res => res.json())
      .then(res => {
        const cookies = new Cookies()
        cookies.set('access', res.access, {path:'/'})
        cookies.set('refresh', res.refresh, {path:'/'})
        Router.push(redirect)
      })
      .catch(err => alert(err.message))
  }, [data])

  useEffect(() => {
    Router.prefetch('/')
  })


  return (
    <Container maxWidth="xs">
      <Paper>
        <Box p={4} mt={4}>
          <Typography
            gutterBottom
            variant="h4"
            component="h2">登 录</Typography>
          <TextField
            variant="outlined"
            margin="dense"
            label="用户名"
            name="username"
            onChange={handleChange}
            value={data.username}
            error={errors.username}
            helperText={errors.username && '用户名格式错误'}
            required
            fullWidth />
          <TextField
            variant="outlined"
            margin="dense"
            label="密码"
            type="password"
            name="password"
            value={data.password}
            error={errors.password}
            onChange={handleChange}
            helperText={errors.password && '密码长度不正确'}
            required
            fullWidth />
          <Box my={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!checkForm()}
              fullWidth>登 录</Button>
          </Box>
          <Link href="/help"><Button>需要帮助?</Button></Link>
          <Link href="/"><Button>返回首页</Button></Link>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login
