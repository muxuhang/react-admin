
import React, { useEffect, useState } from 'react'
import Box from '../../components/box';
import { useRouter } from 'next/router';
import network from '../../utils/network';
import utils from '../../utils/utils';
import { Breadcrumb, Button, Card, Col, DatePicker, Image, Input, InputNumber, message, Row, Select, TreeSelect } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
const { SHOW_PARENT, TreeNode } = TreeSelect;
const inbox = () => {
  const [users, setUsers] = useState([])
  const [details, setDetails] = useState({
    title: '',
    body: '',
    receivers: []
  })
  const router = useRouter()
  const { pid } = router.query
  useEffect(() => {
    getData()
  }, [pid])
  useEffect(() => {
    network('GET', `/accounts/`, null, (res) => {
      setUsers(res.data)
    })
  }, [])
  const getData = async () => {
    if (!pid || pid === 'created') return
    network('GET', `/inbox/${pid}`, null, (res) => {
      setDetails(res)
    })
  }
  const changeText = (v, t) => {
    let form = { ...details, [t]: v }
    setDetails(form)
  }
  // 创建新的
  const saveInbox = async () => {
    const form = {
      title: details.title,
      tag: details.tag,
      content: details.content,
    }
    network('POST', '/inbox/', form, (res) => {
      if (res.success) {
        message.success('保存成功')
        router.back()
      } else {
        message.error('创建失败')
      }
    })
  }
  // 修改
  const changeInbox = async () => {
    const form = {
      tpye: details.type,
      title: details.title,
      content: details.content,
      persions: details.persions
    }
    network('PUT', `/inbox/${pid}`, form, (res) => {
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
        <Breadcrumb.Item><a href='/inbox'>通知</a></Breadcrumb.Item>
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
        <Col xs={24} sm={20}>
          <Input.TextArea
            rows={4}
            onChange={(e) => changeText(e.target.value, 'body')}
            value={details.body}></Input.TextArea>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>接收人员</Col>
        <Col xs={24} sm={14}>
          <TreeSelect
            value={details.receivers}
            style={{ width: '100%' }}
            treeCheckable
            showCheckedStrategy={SHOW_PARENT}
            onChange={(e) => changeText(e, 'receivers')}
            placeholder='请选择接收人员' >
            {users && users.map((item) => (
              <TreeNode
                title={item.username}
                value={item._id}
                key={item._id}></TreeNode>
            ))}
          </TreeSelect>
        </Col>
      </Row>
      {pid !== 'created' && <Row gutter={[8, 16]}>
        <Col xs={4}>创建时间</Col>
        <Col xs={24} sm={14} flex={1}>
          <Input value={utils.timeformat(details.created)} disabled></Input>
        </Col>
      </Row>}
      {pid !== 'created' && <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>修改时间</Col>
        <Col xs={24} sm={14}>
          <Input value={utils.timeformat(details.updated ? details.updated : details.created)} disabled></Input></Col>
      </Row>}
      <Row gutter={[8, 16]}>
        <Button
          type='primary'
          style={{ marginTop: 30 }}
          onClick={!details._id ?
            saveInbox :
            changeInbox}>保存</Button>
      </Row>
    </Box>
  )
}
export default inbox
