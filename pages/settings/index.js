import React, { useEffect, useState } from 'react'

import Layout from '../../components/layout'
import network from '../../utils/network'
import { Checkbox, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'

const Settings = () => {
  const [settings, setSettings] = useState([])
  const tableHead = ['编码', '值', '描述']
  useEffect(() => {
    getSettings()
  }, [])
  const getSettings = () => {
    network('get', '/admin/settings', null, (res) => {
      console.log(res);
      setSettings(res.data)
    })
  }
  const onSelectAllClick = (e) => {

  }
  return (
    <Layout title='设置'>
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
              {settings.map((item, index) => (
                <TableRow key={index}>
                  <TableCell padding='checkbox'>
                    <Checkbox
                      onChange={onSelectAllClick}
                      inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                  </TableCell>
                  <TableCell>{item.key}</TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell>{item.description ? item.description : '----'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Layout>
  )
}

export default Settings
