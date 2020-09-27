import React, { useEffect } from 'react'

import Router from 'next/router'
import { Button, Container, Paper, Typography } from '@material-ui/core'

import Layout from '../../components/layout'
import network from '../../utils/network'
const Profile = () => {



  useEffect(() => {
    // getProfile()
  }, [])
  const getProfile = () => {
    network('get', '/accounts/profile', null, (res) => {
      console.log(res);
    })
  }
  const handleLogout = () => {

  }
  return (
    <Layout tltle='我的信息'>
      <Container maxWidth="md">
        <Typography variant="h1">我的信息</Typography>
        <Paper variant="outlined" style={{ padding: 20 }}>
          111
        </Paper>
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
