
import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout';
import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import network from '../../utils/network';

const ad = () => {
  const [details, setDetails] = useState({
    key: '',
    description: '',
    value: ''
  })
  const router = useRouter()
  const { pid } = router.query
  useEffect(() => {
    getData()
  }, [pid])
  const getData = async () => {
    if (!pid || pid === 'created') return
    network('GET', `/admin/settings/${pid}`, null, (res) => {
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
    network('POST', '/admin/settings', form, (res) => {
      console.log();
      if (res.success) {
        router.back()
      } else {
        alert('创建失败')
      }
    })
  }
  // 修改
  const changeAds = async () => {
    const form = details
    network('POST', `/admin/settings/${details.key}`, form, (res) => {
      if (res.success) {
        router.back()
      } else {
        alert('修改失败')
      }
    })
  }
  return (
    <Layout title='设置'>
      <Container maxWidth="md">
        <Grid>
          <Typography>编码</Typography>
          <TextField
            onChange={(e) => changeText(e.target.value, 'key')}
            value={details.key}></TextField>
        </Grid>
        <Grid>
          <Typography>值</Typography>
          <TextField
            onChange={(e) => changeText(e.target.value, 'value')}
            value={details.value}></TextField>
        </Grid>
        <Grid>
          <Typography>描述</Typography>
          <TextField
            onChange={(e) => changeText(e.target.value, 'description')}
            value={details.description}></TextField>
        </Grid>
        <Button onClick={!details.key ? saveAds : changeAds}>保存</Button>
      </Container>
    </Layout>
  )
}

export default ad
