import { Breadcrumb, Button, Col, Input, Row } from "antd"
import { useState } from "react"
import Box from "../../components/box"


const ChangePassword = () => {
  const title = '修改密码'
  const [form, setForm] = useState({
    password: '',
    newPassword: '',
    confirmPassword: ''
  })
  const saveDetails = () => {

  }
  const changeText = (v, t) => {
    let msg = {
      ...form,
      [t]: v
    }
    console.log(msg);
    setForm(msg)
  }
  return (
    <Box>
      <Breadcrumb>
        <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href='/user'>个人中心</a></Breadcrumb.Item>
        <Breadcrumb.Item>{title}</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ height: 30 }}></div>
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>原密码</Col>
        <Col xs={24} sm={14}>
          <Input
            onChange={(e) => changeText(e.target.value, 'password')}
            placeholder='请输入原密码'
            type='password'
            value={form.password}></Input>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>新密码</Col>
        <Col xs={24} sm={14}>
          <Input
            onChange={(e) => changeText(e.target.value, 'newPassword')}
            placeholder='请输入新密码'
            type='password'
            value={form.newPassword}></Input>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>确认密码</Col>
        <Col xs={24} sm={14}>
          <Input
            onChange={(e) => changeText(e.target.value, 'confirmPassword')}
            placeholder='确认密码'
            type='password'
            value={form.confirmPassword}></Input>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Button
          type='primary'
          style={{ marginTop: 30 }}
          onClick={saveDetails}>保存</Button>
      </Row>
    </Box>
  )
}
export default ChangePassword