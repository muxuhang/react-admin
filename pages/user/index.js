import { Breadcrumb, Col, Input, Row, Button } from 'antd'
import { useEffect, useState } from 'react'
import Box from '../../components/box'
import network from '../../utils/network'
import Cookies from 'universal-cookie'
import Router from 'next/router'

const user = () => {
  const title = '个人中心'
  const [details, setDetails] = useState({
    username: '',
  })
  useEffect(() => {
    getDetails()
  }, [])
  const getDetails = () => {
    network('GET', `/accounts/profile/`, null, (res) => {
      setDetails(res)
    })
  }
  const changeText = (v, t) => {

  }
  const saveDetails = () => {
    const form = details
    network('PUT', `/accounts/profile/`, form, (res) => {
      getDetails()
    })
  }
  const clearToken = async () => {
    const cookies = new Cookies()
    console.log(cookies.get('access'));
    await cookies.remove('access')
    Router.push('/login')
  }
  return (
    <Box>
      <Breadcrumb>
        <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
        <Breadcrumb.Item>{title}</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>姓名</Col>
        <Col xs={24} sm={14}>
          <Input
            onChange={(e) => changeText(e.target.value, 'username')}
            value={details.username}></Input>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>密码</Col>
        <Col xs={4} style={{ lineHeight: '32px' }}>
          <a href='/change-password'>修改密码</a>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Button
          type='primary'
          style={{ marginTop: 30 }}
          onClick={saveDetails}>保存</Button>
        <Button
          style={{ marginTop: 30 }}
          onClick={clearToken}>退出登录</Button>
      </Row>
    </Box>
  )
}
export default user