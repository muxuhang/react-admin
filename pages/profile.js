import React from 'react'

import Router from 'next/router'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import Cookies from 'universal-cookie'

import Layout from '../components/layout'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(2)
  }
}))

const Profile = ({data}) => {
  const classes = useStyles()

  const handleLogout = () => {
    const cookies = new Cookies()
    cookies.remove('access')
    Router.push('/')
  }

  return (
    <Layout>
      <Container maxWidth="sm" className={classes.root}>
        <Typography
          variant="h5"
          component="h3"
          gutterBottom
        >我的信息</Typography>
        <Typography
        >{data.username}</Typography>
        <Button
          variant="contained"
          onClick={handleLogout}>退出</Button>
      </Container>
    </Layout>
  )
}

export async function getServerSideProps({req, res}) {
  //if(res) {
  //  res.writeHead(301, {Location:'/login'})
  //  res.end()
  //  return {}
  //}
  const cookies = new Cookies(req.headers.cookie)
  const access = cookies.get('access')

  if(access === undefined) {
    res.statusCode = 302
    res.setHeader('Location', '/login?redirect=/profile')
    return {props:{data:{}}}
  }

  const response = await fetch(`${process.env.api}/api/accounts/profile/`, {
    headers: {
      Authorization: 'Bearer ' + access,
    }
  })

  if(!response.ok) {
    res.statusCode = 302
    res.setHeader('Location', '/login?redirect=/profile')
    return {props:{data:{}}}
  }

  const data = await response.json()

  return {
    props: {
      data
    }
  }
}

export default Profile
