import React, { useEffect, useState } from 'react'
import { Checkbox, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import Layout from '../../components/layout'
import network from '../../utils/network'

const AdList = () => {
  const [list, setList] = useState([])
  const tableHead = ['名称', '图片', '标签', '创建时间']

  useEffect(() => {
    getAdlist()
  }, [])
  const getAdlist = () => {
    network('GET', '/admin/ads', null, (res) => {
      console.log(res);
      setList(res.data)
    })
  }
  const onSelectAllClick = (e) => {

  }
  return (
    <Layout title="轮播图">
      <Container maxWidth="md">
        <Typography variant='h1'>广告图</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    onChange={onSelectAllClick}
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
                      onChange={onSelectAllClick}
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
export default AdList
