
import React, { useEffect, useState } from 'react'
import Box from '../../components/box';
import { useRouter } from 'next/router';
import network from '../../utils/network';
import utils from '../../utils/utils';
import { Breadcrumb, Button, Card, Col, DatePicker, Image, Input, InputNumber, message, Row, Select } from 'antd';
import { Editor } from '@tinymce/tinymce-react';
const flatpages = () => {
  const [details, setDetails] = useState({
    title: '',
    tag: '',
    content: ''
  })
  const router = useRouter()
  const { pid } = router.query
  useEffect(() => {
    getData()
  }, [pid])
  const getData = async () => {
    if (!pid || pid === 'created') return
    network('GET', `/flatpages/${pid}`, null, (res) => {
      setDetails(res)
    })
  }
  const changeText = (v, t) => {
    let form = { ...details, [t]: v }
    setDetails(form)
  }
  // 创建新的
  const saveFlatpages = async () => {
    const form = details
    network('POST', '/flatpages/', form, (res) => {
      if (res.success) {
        message.success('保存成功')
        router.back()
      } else {
        message.error('创建失败')
      }
    })
  }
  // 修改
  const changeFlatpages = async () => {
    const form = {
      title: details.title,
      tag: details.tag,
      content: details.content,
    }
    network('PUT', `/flatpages/${pid}`, form, (res) => {
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
        <Breadcrumb.Item><a href='/flatpages'>重点工作</a></Breadcrumb.Item>
        <Breadcrumb.Item>{pid === 'created' ? '添加' : '编辑'}</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>标签</Col>
        <Col xs={24} sm={14}>
          <Input
            onChange={(e) => changeText(e.target.value, 'tag')}
            value={details.tag}></Input>
        </Col>
      </Row>
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
          <Editor
            id='editor'
            init={{ language: 'zh_CN' }}
            apiKey="ylsabkd70mkbrxazn61lb056svezauol1n0nl070pvyfv6v0"
            value={details.content}
            onEditorChange={e => changeText(e, 'content')}
          />
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
            saveFlatpages :
            changeFlatpages}>保存</Button>
      </Row>
    </Box>
  )
}
export default flatpages
