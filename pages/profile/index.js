import React, { useEffect, useState } from 'react'

import Router from 'next/router'
import { Avatar, Backdrop, Button, CircularProgress, Container, Grid, Paper, Typography } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab';
import Layout from '../../components/layout'
import network from '../../utils/network'
import utils from '../../utils/utils'
const Profile = () => {
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    getProfile()
  }, [])
  const getProfile = () => {
    network('get', '/accounts/profile', null, (res) => {
      setProfile(res)
    })
  }
  const handleLogout = () => {

  }
  return (
    <Layout tltle='我的信息'>
      <Container maxWidth="md">
        <Typography variant="h1">我的信息</Typography>
        {!!profile ? <Paper variant="outlined" style={{ padding: 20 }}>
          <Avatar src={profile.avatar}></Avatar>
          <Grid><Typography>{profile.id}</Typography></Grid>
          <Grid><Typography>{profile.username}</Typography></Grid>
          <Grid><Typography>{profile.nickname}</Typography></Grid>
          <Grid><Typography>{utils.timeformat(profile.date_joined)}</Typography></Grid>
          <Grid>{profile.roles.map((item, index) => <Typography key={index}>{item}</Typography>)}</Grid>
        </Paper> : null}
        <Button onClick={handleLogout}>退出登录</Button>
      </Container>
    </Layout>
  )
}

// export async function getServerSideProps({req, res}) {
//   if(res) {
//    res.writeHead(301, {Location:'/login'})
//    res.end()
//    return {}
//   }
//   const cookies = new Cookies(req.headers.cookie)
//   const access = cookies.get('access')

//   if(access === undefined) {
//     res.statusCode = 302
//     res.setHeader('Location', '/login?redirect=/profile')
//     return {props:{data:{}}}
//   }

//   const response = await fetch(`${process.env.api}/api/accounts/profile/`, {
//     headers: {
//       Authorization: 'Bearer ' + access,
//     }
//   })

//   if(!response.ok) {
//     res.statusCode = 302
//     res.setHeader('Location', '/login?redirect=/profile')
//     return {props:{data:{}}}
//   }

//   const data = await response.json()

//   return {
//     props: {
//       data
//     }
//   }
// }

export default Profile
