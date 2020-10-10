
import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout';
import { Button, Container, Grid, Input, Modal, Paper, TextField, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import network from '../../utils/network';
import utils from '../../utils/utils';
import dynamic from 'next/dynamic'
const BraftEditor = dynamic(() => import('braft-editor'),
  {
    ssr: false
  })
const ad = () => {
  const [details, setDetails] = useState({
    id: '',
    slug: '',
    title: '',
    created: '',
    updated: '',
    body: ''
  })
  const router = useRouter()
  const { pid } = router.query
  useEffect(() => {
    getData()
  }, [pid])
  const getData = async () => {
    if (!pid || pid === 'created') return
    network('GET', `/flatpages/admin/${pid}`, null, (res) => {
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
    network('POST', '/flatpages/admin', form, (res) => {
      if (res.success) {
        router.back()
      } else {
        alert('创建失败')
      }
    })
  }
  // 修改
  const changeFlatpages = async () => {
    const form = details
    network('PUT', `/flatpages/admin/${pid}`, form, (res) => {
      if (res.success) {
        console.log(res);
        // router.back()
      } else {
        alert('修改失败')
      }
    })
  }
  return (
    <Layout title=''>
      <Container maxWidth="md">
        {pid !== 'created' && <Grid>
          <Typography>id</Typography>
          <TextField value={details.id} disabled></TextField>
        </Grid>}
        <Grid>
          <Typography>标签</Typography>
          <TextField
            onChange={(e) => changeText(e.target.value, 'slug')}
            value={details.slug}></TextField>
        </Grid>
        <Grid>
          <Typography>标题</Typography>
          <TextField
            onChange={(e) => changeText(e.target.value, 'title')}
            value={details.title}></TextField>
        </Grid>
        {pid !== 'created' && <Grid>
          <Typography>创建时间</Typography>
          <TextField value={utils.timeformat(details.created)} disabled></TextField>
        </Grid>}
        {pid !== 'created' && <Grid>
          <Typography>修改时间</Typography>
          <TextField value={utils.timeformat(details.updated ? details.updated : details.created)} disabled></TextField>
        </Grid>}
        <Grid>
          <Typography>内容</Typography>
          <Paper>
            <BraftEditor value={details.body} onChange={(e) => changeText(e, 'body')} />
          </Paper>
        </Grid>
        <Button onClick={!details.id ? saveFlatpages : changeFlatpages}>保存</Button>
      </Container>
    </Layout>
  )
}

export default ad
