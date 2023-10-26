
import React, { useEffect, useState } from 'react'
import Box from '../../components/box';
import { useRouter } from 'next/router';
import network from '../../utils/network';
import utils from '../../utils/utils';
import { Breadcrumb, Button, Col, Input, message, Row } from 'antd';
const Tasks = () => {
  const [details, setDetails] = useState({
    title: '',
    type: '',
    status: '',
    updated_at: new Date(),
    created_at: new Date()
  })
  const router = useRouter()
  const { pid } = router.query
  useEffect(() => {
    getData()
  }, [pid])
  const getData = async () => {
    if (!pid || pid === 'created') return
    network('GET', `/tasks/${pid}`, null, (res) => {
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
  const saveTasks = async () => {
    network('POST', '/tasks/', details, (res) => {
      if (res._id) {
        message.success('保存成功')
        router.back()
      } else {
        message.error(res.message || '创建失败')
      }
    })
  }
  // 修改
  const changeTasks = async () => {
    network('PATCH', `/tasks/${pid}`, details, (res) => {
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
        <Breadcrumb.Item><a href='/tasks'>任务</a></Breadcrumb.Item>
        <Breadcrumb.Item>{pid === 'created' ? '添加' : '编辑'}</Breadcrumb.Item>
      </Breadcrumb>
      {/* 输入 */}
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>标题</Col>
        <Col xs={24} sm={16}>
          <Input
            onChange={(e) => changeText(e.target.value, 'title')}
            value={details.title}></Input>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>类别</Col>
        <Col xs={24} sm={16}>
          <Input
            onChange={(e) => changeText(e.target.value, 'type')}
            value={details.type}></Input>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>状态</Col>
        <Col xs={24} sm={16}>
          <Input
            onChange={(e) => changeText(e.target.value, 'status')}
            value={details.status}></Input>
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
          disabled={!details.title}
          style={{ marginTop: 30 }}
          onClick={!details._id ?
            saveTasks :
            changeTasks}>保存</Button>
      </Row>
    </Box>
  )
}
export default Tasks
