import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

import Layout from '../components/layout'
import { Button } from '@material-ui/core'
import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()
  const buttonList = [
    { name: '设置', path: '/settings' },
    { name: '商品列表', path: '/products' },
    { name: '广告', path: '/ads' },
    { name: '简单页面', path: '/flatpages' },
    { name: '媒体附件', path: '/attachments' },
  ]

  return (
    <Layout title="艺小星">
      <Container maxWidth="md">
        <h1>艺小星</h1>
        {buttonList.map((item, index) => <Button onClick={() => router.push(item.path)} key={index}>{item.name}</Button>)}
      </Container>
    </Layout>
  )
}

export default Home
