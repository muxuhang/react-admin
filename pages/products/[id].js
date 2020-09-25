import React from 'react'
import Head from 'next/head'
import Nav from '../../components/nav'
import Container from '@material-ui/core/Container'
import server from '../../api'

const Product = ({data}) => {
  return (
    <div>
      <Head>
        <title>{data.name}</title>
      </Head>
      <Nav />
      <Container maxWidth="sm">
        <div>
          {data.images.map((row, key)=> (
            <img key={key} src={`${server}${row}`} alt={data.name} width="200" height="200" />
          ))}
        </div>
        <h1>{data.name}</h1>
        <p>{data.price}</p>
        <div dangerouslySetInnerHTML={{__html:data.content}} />
      </Container>
    </div>
  )
}

export async function getStaticProps({params}) {
  const res = await fetch(`${server}/api/shop/product/${params.id}/`)
  const data = await res.json()
  return {
    props: {
      data
    }
  }
}

export async function getStaticPaths() {
  const res = await fetch(`${server}/api/shop/product/`)
  const data = await res.json()

  const paths = data.results.map(row => {return {params:{id:row.id.toString()}}})

  return {paths, fallback:false}
}

export default Product
