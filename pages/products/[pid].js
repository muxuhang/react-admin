
import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout';
import { Button, Container, Grid, Input, TextField, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import network from '../../utils/network';

const product = () => {
  const [details, setDetails] = useState({
    name:'',
    price:0,
    line_price:0,
    group_price:0,
    images:[],
    is_group:true,
    is_onsale:true
  })
  const router = useRouter()
  const { pid } = router.query
  useEffect(() => {
    getData()
  }, [pid])
  const getData = async () => {
    if (!pid || pid === 'created') return
    network('GET', `/products/admin/${pid}`, null, (res) => {
      console.log(res);
      setDetails(res)
    })
  }
  const changeText = (v, t) => {
    let form = { ...details, [t]: v }
    setDetails(form)
  }
  // 创建新的
  const saveDetails = async () => {
    const form = details
    network('POST', '/products/admin', form, (res) => {
      console.log(111);
      if (res.success) {
        router.back()
      } else {
        alert('创建失败')
      }
    })
  }
  // 修改
  const changeDetails = async () => {
    const form = details
    network('PUT', `/products/admin/${pid}`, form, (res) => {
      if (res.success) {
        router.back()
      } else {
        alert('修改失败')
      }
    })
  }
  return (
    <Layout title='商品详情'>
      <Container maxWidth="md">
        <Grid container>
          <Typography variant='h1'>商品管理</Typography>
        </Grid>
        {details.id && <Grid>
          <Typography>id</Typography>
          <TextField value={details.id} disabled></TextField>
        </Grid>}
        <Grid>
          <Typography>商品名</Typography>
          <TextField
            onChange={(e) => changeText(e.target.value, 'name')}
            value={details.name}></TextField>
        </Grid>
        <Grid>
          <Typography>价格</Typography>
          <TextField
            onChange={(e) => changeText(e.target.value, 'price')}
            value={details.price}></TextField>
        </Grid>
        <Grid>
          <Typography>划线价</Typography>
          <TextField
            onChange={(e) => changeText(e.target.value, 'line_price')}
            value={details.line_price}></TextField>
        </Grid>
        <Grid>
          <Typography>团购价</Typography>
          <TextField
            onChange={(e) => changeText(e.target.value, 'group_price')}
            value={details.group_price}></TextField>
        </Grid>
        <Grid>
          <Typography>商品图</Typography>
          <TextField
            onChange={(e) => changeText(e.target.value, 'images')}
            value={details.images}></TextField>
        </Grid>
        <Grid>
          <Typography>是否团购</Typography>
          <TextField
            onChange={(e) => changeText(e.target.value, 'is_group')}
            value={details.is_group}></TextField>
        </Grid>
        <Grid>
          <Typography>是否上架</Typography>
          <TextField
            onChange={(e) => changeText(e.target.value, 'is_onsale')}
            value={details.is_onsale}></TextField>
        </Grid>
        <Button onClick={!details.id ? saveDetails : changeDetails}>保存</Button>
      </Container>
    </Layout>
  )
}

export default product
