
import React, { useEffect, useState } from 'react'
import Box from '../../components/box';
import { useRouter } from 'next/router';
import network from '../../utils/network';
import utils from '../../utils/utils';
import { Breadcrumb, Button, Col, Image, Input, message, Row } from 'antd';
import Grid from 'antd/lib/card/Grid';

const ad = () => {
  const [details, setDetails] = useState({
    collection: '',
    image: '',
    title: '',
    url: ''
  })
  const router = useRouter()
  const { pid } = router.query
  useEffect(() => {
    getData()
  }, [pid])
  const getData = async () => {
    if (!pid || pid === 'created') return
    network('GET', `/ads/admin/${pid}`, null, (res) => {
      setDetails(res)
    })
  }
  const changeText = (v, t) => {
    let form = { ...details, [t]: v }
    setDetails(form)
  }
  // 创建新的
  const saveAds = async () => {
    const form = details
    if (!form.image || !form.collection) {
      message.info('标签和图片必传')
      return
    }
    network('POST', '/ads/admin', form, (res) => {
      if (res._id) {
        message.success('保存成功')
        router.back()
      } else {
        message.error(res.message ||'创建失败')
      }
    })
  }
  // 修改
  const changeAds = async () => {
    const form = {
      collection: details.collection,
      image: details.image,
      title: details.title,
      url: details.url
    }
    network('PUT', `/ads/admin/${pid}`, form, (res) => {
      if (res._id) {
        message.success('保存成功')
        router.back()
      } else {
        message.error(res.message ||'修改失败')
      }
    })
  }
  return (
    <Box>
      <Breadcrumb style={{ paddingBottom: 16 }}>
        <Breadcrumb.Item ><a href='/'>首页</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href='/ads'>广告图</a></Breadcrumb.Item>
        <Breadcrumb.Item>{pid === 'created' ? '添加' : '编辑'}</Breadcrumb.Item>
      </Breadcrumb>
      <Row gutter={[8, 16]}>
        <Col xs={4}>标签</Col>
        <Col xs={24} sm={14}>
          <Input
            onChange={(e) => changeText(e.target.value, 'collection')}
            value={details.collection}></Input>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col xs={4}>标题</Col>
        <Col xs={24} sm={14}>
          <Input
            onChange={(e) => changeText(e.target.value, 'title')}
            value={details.title}></Input>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col xs={4}>图片</Col>
        <Col xs={24} sm={14}>
          <Image src={details.image} style={{ maxWidth: 300, marginBottom: 16 }} alt=''></Image>
          <Input
            onChange={(e) => changeText(e.target.value, 'image')}
            value={details.image}></Input>
        </Col>
      </Row>
      <Row gutter={[8, 16]}>
        <Col xs={4}>链接</Col>
        <Col xs={24} sm={14}>
          <Input
            onChange={(e) => changeText(e.target.value, 'url')}
            value={details.url}></Input>
        </Col>
      </Row>
      {pid !== 'created' && <Row gutter={[8, 16]}>
        <Col xs={4}>创建时间</Col>
        <Col xs={24} sm={14} flex={1}>
          <Input value={utils.timeformat(details.created)} disabled></Input>
        </Col>
      </Row>}
      {pid !== 'created' && <Row gutter={[8, 16]}>
        <Col xs={4}>修改时间</Col>
        <Col xs={24} sm={14}>
          <Input value={utils.timeformat(details.updated ? details.updated : details.created)} disabled></Input></Col>
      </Row>}
      <Row gutter={[8, 16]}>
        <Button onClick={!details._id ? saveAds : changeAds}>保存</Button>
      </Row>
    </Box>
  )
}
export default ad
