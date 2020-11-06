
import React, { useEffect, useState } from 'react'
import Box from '../../../components/box';
import { useRouter } from 'next/router';
import network from '../../../utils/network';
import utils from '../../../utils/utils';
import { Breadcrumb, Button, Card, Col, DatePicker, Image, Input, InputNumber, message, Row, Select } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
const Deps = () => {
  const [details, setDetails] = useState({
    name: '',
    desc: ''
  })
  const router = useRouter()
  const { pid } = router.query
  useEffect(() => {
    getData()
  }, [pid])
  const getData = async () => {
    if (!pid || pid === 'created') return
    network('GET', `/orgs/deps/${pid}`, null, (res) => {
      setDetails(res)
    })
  }
  const changeText = (v, t) => {
    let form = { ...details, [t]: v }
    setDetails(form)
  }
  // 创建新的
  const saveDeps = async () => {
    const form = {
      name: details.name,
      desc: details.desc,
    }
    network('POST', '/orgs/deps/', form, (res) => {
      if (res.success) {
        message.success('保存成功')
        router.back()
      } else {
        message.error('创建失败')
      }
    })
  }
  // 修改
  const changeDeps = async () => {
    const form = {
      name: details.name,
      desc: details.desc,
    }
    network('PUT', `/orgs/deps/${pid}`, form, (res) => {
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
        <Breadcrumb.Item><a href='/orgs/deps'>重点工作</a></Breadcrumb.Item>
        <Breadcrumb.Item>{pid === 'created' ? '添加' : '编辑'}</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>部门</Col>
        <Col xs={24} sm={14}>
          <Input
            onChange={(e) => changeText(e.target.value, 'name')}
            value={details.name}></Input>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>描述</Col>
        <Col xs={24} sm={14}>
          <Input
            onChange={(e) => changeText(e.target.value, 'desc')}
            value={details.desc}></Input>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Button
          type='primary'
          style={{ marginTop: 30 }}
          onClick={!details._id ?
            saveDeps :
            changeDeps}>保存</Button>
      </Row>
    </Box>
  )
}
export default Deps
