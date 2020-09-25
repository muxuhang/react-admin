import React from 'react'
import Router from 'next/router'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Nav from '../components/nav'
import Product from '../components/product'
import {makeStyles} from '@material-ui/core/styles'

import server from '../api'

const useStyles = makeStyles({
  products: {
    marginTop: 16
  }
})


const Shop = ({products}) => {
  const classes = useStyles()

  return (
    <div>
      <Nav />
      <Container maxWidth="md">
        <Grid container spacing={1} className={classes.products}>
        {products.results.map(row => (
          <Grid item xs={6} sm={4} md={3} key={row.id}>
            <Product
              data={row}
              onClick={()=>Router.push('/products/[id]', `/products/${row.id}`)} />
          </Grid>
        ))}
      </Grid>
      </Container>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${server}/api/shop/product/`)
  const products = await res.json()

  return {
    props: {
      products,
    }
  }
}

export default Shop
