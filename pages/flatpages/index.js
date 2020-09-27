import { Checkbox, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import Layout from '../../components/layout'


const Flatpages = () => {
  const tableHead = ['url', '标题', '创建时间']
  const [list, setList] = useState([])
  return (
    <Layout tltle='简单页面'>
      <Container maxWidth="md">
        <Typography variant='h1'>简单页面</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    inputProps={{ 'aria-label': 'select all desserts' }}
                  />
                </TableCell>
                {tableHead.map((item, index) => (
                  <TableCell key={index}>{item}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((item, index) => (
                <TableRow key={index}>
                  <TableCell padding='checkbox'>
                    <Checkbox
                      inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                  </TableCell>
                  <TableCell>{item.collection}</TableCell>
                  <TableCell>
                    <img style={{ height: '2rem' }} src={item.image} alt=''></img>
                  </TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.created}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Layout>
  )
}

export default Flatpages
