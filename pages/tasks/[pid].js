
import React, { useEffect, useState } from 'react'
import Box from '../../components/box';
import { useRouter } from 'next/router';
import network from '../../utils/network';
import utils from '../../utils/utils';
import { Breadcrumb, Button, Col, DatePicker, Image, Input, InputNumber, message, Row, Select } from 'antd';
import moment from 'moment'

const task = () => {
  const [details, setDetails] = useState({
    title: '',
    content: '',
    type: '进行中',
    total: 0,
    complete: 0,
    endtime: '',
  })
  const router = useRouter()
  const { pid } = router.query
  useEffect(() => {
    getData()
  }, [pid])
  const getData = async () => {
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
    const form = details
    network('POST', '/tasks/', form, (res) => {
      if (res.success) {
        message.success('保存成功')
        router.back()
      } else {
        message.error('创建失败')
      }
    })
  }
  // 修改
  const changeTasks = async () => {
    const form = {
      title: details.title,
      content: details.content,
      type: details.type,
      total: details.total,
      complete: details.complete,
      endtime: details.endtime,
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
            onChange={(e) => changeText(e.target.value, 'content')}
            value={details.content}></Input.TextArea>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col xs={4} style={{ lineHeight: '32px' }}>状态</Col>
        <Col xs={24} sm={14}>
          <Select
            value={details.type}
            onChange={(e) => changeText(e, 'type')}>
            <Select.Option value='进行中'>进行中</Select.Option>
            <Select.Option value='已完成'>已完成</Select.Option>
            <Select.Option value='已超时'>已超时</Select.Option>
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
            value={details.endtime ? moment(details.endtime) : null}
            onChange={(date, dateString) => changeText(dateString, 'endtime')}
          ></DatePicker>
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
            saveTasks :
            changeTasks}>保存</Button>
      </Row>
    </Box>
  )
}
export default task
