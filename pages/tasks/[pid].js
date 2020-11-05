
import React, { useEffect, useState } from 'react'
import Box from '../../components/box';
import { useRouter } from 'next/router';
import network from '../../utils/network';
import utils from '../../utils/utils';
import { Breadcrumb, Button, Col, DatePicker, Modal, Input, InputNumber, message, Row, Select, TreeSelect } from 'antd';
import moment from 'moment'
const { SHOW_PARENT, TreeNode } = TreeSelect;
const task = () => {
  const [users, setUsers] = useState([])
  const [details, setDetails] = useState({
    title: '',
    body: '',
    status: 'new',
    total: 0,
    complete: 0,
    receivers: [],
    expired: ''
  })
  const router = useRouter()
  const { pid } = router.query
  useEffect(() => {
    getData()
  }, [pid])
  useEffect(() => {
    // 获取用户列表
    network('GET', `/accounts/`, null, (res) => {
      console.log(res.data);
      setUsers(res.data)
    })
  }, [])
  const getData = async () => {
    // 获取详情
    if (!pid || pid === 'created') return
    network('GET', `/tasks/${pid}`, null, (res) => {
      setDetails(res)
    })
  }
  const changeText = (v, t) => {
    let form = { ...details, [t]: v }
    setDetails(form)
  }
  // 创建新的
  const saveTasks = async () => {
    const form = {
      title: details.title,
      body: details.body,
      status: details.status,
      receivers: details.receivers,
      // total: details.total,
      // complete: details.complete,
      expired: details.expired,
    }
    network('POST', '/tasks/', form, (res) => {
      if (res.success) {
        message.success('保存成功')
        router.back()
      } else {
        message.error('创建失败')
      }
    })
  }// 删除
  const deleteTasks = async () => {
    network('DELETE', `/tasks/${pid}`, null, (res) => {
      if (res.success) {
        message.success('删除成功')
        router.back()
      } else {
        message.error('创建失败')
      }
    })
  }
  // 点击删除需要进一步确认
  const confirm = () => {
    Modal.confirm({
      title: '确认删除?',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk() {
        deleteTasks()
      }
    })
  }
  // 修改
  const changeTasks = async () => {
    const form = {
      title: details.title,
      body: details.body,
      status: details.status,
      receivers: details.receivers,
      // total: details.total,
      // complete: details.complete,
      expired: details.expired,
    }
    network('PUT', `/tasks/${pid}`, form, (res) => {
      if (res.success) {
        message.success('保存成功')
        router.back()
      } else {
        message.error('修改失败')
      }
    })
  }
  return (
    <Box>
      <Breadcrumb style={{ paddingBottom: 16 }}>
        <Breadcrumb.Item ><a href='/'>首页</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href='/tasks'>重点工作</a></Breadcrumb.Item>
        <Breadcrumb.Item>{pid === 'created' ? '添加' : '编辑'}</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>标题</Col>
        <Col xs={24} sm={14}>
          <Input
            onChange={(e) => changeText(e.target.value, 'title')}
            value={details.title}></Input>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>内容</Col>
        <Col xs={24} sm={14}>
          <Input.TextArea
            rows={4}
            onChange={(e) => changeText(e.target.value, 'body')}
            value={details.body}></Input.TextArea>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>选择村庄</Col>
        <Col xs={24} sm={14}>
          <TreeSelect
            value={details.receivers}
            style={{ width: '100%' }}
            treeCheckable
            showCheckedStrategy={SHOW_PARENT}
            onChange={(e) => changeText(e, 'receivers')}
            placeholder='请选择村庄' >
            {users && users.map((item) => (
              <TreeNode
                title={item.username}
                value={item._id}
                key={item._id}></TreeNode>
            ))}
          </TreeSelect>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>状态</Col>
        <Col xs={24} sm={14}>
          <Select
            value={details.status}
            onChange={(e) => changeText(e, 'status')}>
            <Select.Option value='new'>进行中</Select.Option>
            <Select.Option value='done'>已完成</Select.Option>
            <Select.Option value='expired'>已超时</Select.Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>总数</Col>
        <Col xs={24} sm={14}>
          <InputNumber
            onChange={(e) => changeText(e, 'total')}
            value={details.total}></InputNumber>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col xs={4}>已完成</Col>
        <Col xs={24} sm={14}>
          <InputNumber
            onChange={(e) => changeText(e, 'complete')}
            value={details.complete}></InputNumber>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>截止时间</Col>
        <Col xs={24} sm={14}>
          <DatePicker
            format='YYYY-MM-DD HH:mm'
            showTime
            value={details.expired ? moment(details.expired) : ''}
            onChange={(date, dateString) => changeText(dateString, 'expired')}
          ></DatePicker>
        </Col>
      </Row>
      {pid !== 'created' && <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>创建时间</Col>
        <Col xs={24} sm={14} flex={1}>
          <Input value={utils.timeformat(details.created)} disabled></Input>
        </Col>
      </Row>}
      {pid !== 'created' && <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>修改时间</Col>
        <Col xs={24} sm={14}>
          <Input value={utils.timeformat(details.updated ? details.updated : details.created)} disabled></Input></Col>
      </Row>}
      <Row gutter={[8, 16]}
        style={{ marginTop: 30 }}>
        <Button
          type='primary'
          onClick={!details._id ?
            saveTasks :
            changeTasks}>保存</Button>
        {pid!=='created' && <Button onClick={confirm} style={{ marginLeft: 20 }} danger>删除</Button>}
      </Row>
    </Box>
  )
}
export default task
