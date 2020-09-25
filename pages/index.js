import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'

import Layout from '../components/layout'

const Home = () => (
  <Layout title="壹健壹康">
    <Container maxWidth="md">
      <h1>Hello</h1>
      <Link href="/settings">
        <a>settings,</a>
      </Link>
      <Link href="/products"><a>products,</a></Link>
      <Link href="/ads"><a>Ads,</a></Link>
      <Link href="/shop"><a>shop,</a></Link>
      <Link href="/login"><a>login,</a></Link>
      <Link href="/search"><a>search,</a></Link>
    </Container>
  </Layout>
)

export default Home
