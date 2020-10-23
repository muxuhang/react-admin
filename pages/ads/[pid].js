
import React, { useEffect, useState } from 'react'
import Box from '../../components/box';
import { Button, Container, Grid, Input, TextField, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import network from '../../utils/network';
import utils from '../../utils/utils';
import { useSnackbar } from 'notistack';

const ad = () => {
  const [details, setDetails] = useState({
    collection: '',
    image: '',
    title: '',
    url: ''
  })
  const router = useRouter()
  const { pid } = router.query
  const { enqueueSnackbar } = useSnackbar()
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
      enqueueSnackbar('标签和图片必传', { variant: 'warning' })
      return
    }
    network('POST', '/ads/admin', form, (res) => {
      if (res.success) {
        enqueueSnackbar('保存成功', { variant: 'success' })
        router.back()
      } else {
        enqueueSnackbar('创建失败', { variant: 'error' })
      }
    })
  }
  // 修改
  const changeAds = async () => {
    const form = details
    network('PUT', `/ads/admin/${pid}`, form, (res) => {
      if (res.success) {
        enqueueSnackbar('保存成功', { variant: 'success' })
        router.back()
      } else {
        enqueueSnackbar('修改失败', { variant: 'error' })
      }
    })
  }
  return (
    <Box title=''>
      <Container maxWidth="md">
        {pid !== 'created' && <Grid>
          <Typography>id</Typography>
          <TextField value={details.id} disabled></TextField>
        </Grid>}
        <Grid>
          <Typography>标签</Typography>
          <TextField
            onChange={(e) => changeText(e.target.value, 'collection')}
            value={details.collection}></TextField>
        </Grid>
        <Grid>
          <Typography>标题</Typography>
          <TextField
            onChange={(e) => changeText(e.target.value, 'title')}
            value={details.title}></TextField>
        </Grid>
        <Grid>
          <Typography>图片</Typography>
          <img style={{ maxWidth: 400 }} src={details.image} alt=''></img>
          <TextField
            onChange={(e) => changeText(e.target.value, 'image')}
            value={details.image}></TextField>
        </Grid>
        <Grid>
          <Typography>链接</Typography>
          <TextField
            onChange={(e) => changeText(e.target.value, 'url')}
            value={details.url}></TextField>
        </Grid>
        {pid !== 'created' && <Grid>
          <Typography>创建时间</Typography>
          <TextField value={utils.timeformat(details.created)} disabled></TextField>
        </Grid>}
        {pid !== 'created' && <Grid>
          <Typography>修改时间</Typography>
          <TextField value={utils.timeformat(details.updated ? details.updated : details.created)} disabled></TextField>
        </Grid>}
        <Button onClick={!details.id ? saveAds : changeAds}>保存</Button>
      </Container>
    </Box>
  )
}

export default ad
