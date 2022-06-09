
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import network from '../../utils/network';
import utils from '../../utils/utils';
import { Col, Image, Input, message, Row } from 'antd';

const AdsDetail = (props) => {
  const [details, setDetails] = useState({
    collection: '',
    image: '',
    title: '',
    url: ''
  })
  const { pid, save } = props
  useEffect(() => {
    setDetails({
      collection: '',
      image: '',
      title: '',
      url: ''
    })
    getData()
  }, [pid])
  useEffect(() => {
    save > 0 && (pid === 'created' ? saveAds() : changeAds())
  }, [save])
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
        message.success('创建成功')
        props.closeModal()
      } else {
        message.error(res.message ||'创建失败')
      }
    })
  }
  // 修改
  const changeAds = async () => {
    const form = details
    network('PUT', `/ads/admin/${pid}`, form, (res) => {
      if (res._id) {
        message.success('修改成功')
        props.closeModal()
      } else {
        message.error(res.message ||'修改失败')
      }
    })
  }
  return (
    <div onClick={() => console.log(1)} {...props}>
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
    </div>
  )
}
export default AdsDetail
