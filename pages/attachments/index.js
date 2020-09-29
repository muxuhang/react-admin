import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../../components/layout'


const Attachments = () => {
  const classes = useStyles()

  return (
    <Layout title='媒体附件'>
      <Container maxWidth="md">
      </Container>
    </Layout>
  )
}

const useStyles = makeStyles({

})

export default Attachments
