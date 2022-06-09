
import React, { useEffect, useState } from 'react'
import Box from '../../components/box';
import { useRouter } from 'next/router';
import network from '../../utils/network';
import utils from '../../utils/utils';
import { Breadcrumb, Button, Card, Col, DatePicker, Image, Input, InputNumber, message, Row, Select } from 'antd';
const Users = () => {
  const [details, setDetails] = useState({
    username: '',
    nickname: '',
    telphone: '',
    email: '',
    password: '',
    updated_at: new Date(),
    last_login_at: new Date(),
    created_at: new Date()
  })
  const router = useRouter()
  const { pid } = router.query
  useEffect(() => {
    getData()
  }, [pid])
  const getData = async () => {
    if (!pid || pid === 'created') return
    network('GET', `/users/${pid}`, null, (res) => {
      if (res._id) {
        setDetails(res)
      }
    })
  }
  const changeText = (v, t) => {
    let form = { ...details, [t]: v }
    setDetails(form)
  }
  // 创建新的
  const saveUsers = async () => {
    network('POST', '/users/', details, (res) => {
      if (res._id) {
        message.success('保存成功')
        router.back()
      } else {
        message.error(res.message || '创建失败')
      }
    })
  }
  // 修改
  const changeUsers = async () => {
    network('PATCH', `/users/${pid}`, details, (res) => {
      if (res.modifiedCount) {
        message.success('保存成功')
        router.back()
      } else {
        message.error(res.message || '修改失败')
      }
    })
  }
  return (
    <Box>
      <Breadcrumb style={{ paddingBottom: 16 }}>
        <Breadcrumb.Item ><a href='/'>首页</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href='/users'>用户列表</a></Breadcrumb.Item>
        <Breadcrumb.Item>{pid === 'created' ? '添加' : '编辑'}</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>用户名</Col>
        <Col xs={24} sm={14}>
          <Input
            onChange={(e) => changeText(e.target.value, 'username')}
            value={details.username}></Input>
        </Col>
        <Col>
          <Button type='link'>修改密码</Button>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>昵称</Col>
        <Col xs={24} sm={14}>
          <Input
            onChange={(e) => changeText(e.target.value, 'nickname')}
            value={details.nickname}></Input>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>手机号</Col>
        <Col xs={24} sm={14}>
          <Input
            type={'number'}
            onChange={(e) => changeText(e.target.value, 'telphone')}
            value={details.telphone}></Input>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>邮箱</Col>
        <Col xs={24} sm={14}>
          <Input
            type={'email'}
            onChange={(e) => changeText(e.target.value, 'email')}
            value={details.email}></Input>
        </Col>
      </Row>
      {pid !== 'created' && <Row gutter={[8, 16]}>
        <Col xs={4}>创建时间</Col>
        <Col xs={24} sm={14} flex={1}>
          <Input value={utils.timeformat(details.created_at)} disabled></Input>
        </Col>
      </Row>}
      {pid !== 'created' && <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>修改时间</Col>
        <Col xs={24} sm={14}>
          <Input value={utils.timeformat(details.updated_at ? details.updated_at : details.created_at)} disabled></Input></Col>
      </Row>}
      <Row gutter={[8, 16]}>
        <Button
          type='primary'
          style={{ marginTop: 30 }}
          onClick={!details._id ?
            saveUsers :
            changeUsers}>保存</Button>
      </Row>
    </Box>
  )
}
export default Users
