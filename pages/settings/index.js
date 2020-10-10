import React, { useEffect, useState } from 'react'

import Layout from '../../components/layout'
import network from '../../utils/network'
import { Button, Checkbox, Container, Grid, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import utils from '../../utils/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Settings = () => {
  const [list, setList] = useState([])
  const [selected, setSelected] = useState([])
  const [searchText, setSearch] = useState('')
  const tableHead = ['编码', '值', '描述', '操作']
  const router = useRouter()
  useEffect(() => {
    getSettings()
  }, [])
  const getSettings = () => {
    network('get', '/settings/admin', null, (res) => {
      console.log(res);
      setList(res.data)
    })
  }
  // 全选
  const onSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = list.map((n) => n.key);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }
  // 单独选择
  const onSelectClick = (key) => {
    const selectedIndex = selected.indexOf(key);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, key);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  }
  // 分页
  const changePagination = (page) => {
    console.log(page);
  }
  // 删除选中
  const deleteItem = () => {
    console.log(selected);
    network('DELETE', `/settings/admin/${selected[0]}`, null, (res) => {
      if (res.success) {
        getAdlist()
        setSelected([])
      } else {
        alert('删除失败')
      }
    })
  }
  const search = () => {
    network('GET', `/settings/admin`, null, (res) => {
      if (res.success) {
        setList(res.data)
      }
    })
  }
  const renderTableSearch = () => {
    return (
      <Grid container alignItems={'center'} style={{ display: 'flex' }}>
        <Grid item style={{ flex: 1 }}>
          <InputBase
            variant="contained"
            placeholder="搜索"
            value={searchText}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                search()
              }
            }}
            onChange={(e) => setSearch(e.target.value)}
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <Button
            variant="outlined"
            onClick={search}>搜索</Button>
        </Grid>
        <Button
          variant="outlined"
          onClick={() => {
            router.push(`/settings/created`)
          }}>添加</Button>
      </Grid>
    )
  }
  const renderTableHead = () => {
    return (
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
    )
  }
  const renderTableBody = () => {
    const isSelected = (key) => selected.indexOf(key) !== -1;
    return (
      <TableBody>
        {list.map((item, index) => (
          <TableRow key={index}>
            <TableCell padding='checkbox'>
              <Checkbox
                checked={isSelected(item.key)}
                onChange={() => onSelectClick(item.key)}
                inputProps={{ 'aria-label': 'select all desserts' }}
              />
            </TableCell>
            <TableCell>{item.key}</TableCell>
            <TableCell>{item.value}</TableCell>
            <TableCell>{item.description?item.description:'----'}</TableCell>
            <TableCell>
              <Link href={`/settings/${item.key}`}>编辑</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    )
  }
  const renderTablePagination = () => {
    return (
      <Grid container style={{ padding: '1rem 0' }}>
        <Grid item style={{ flex: 1 }}>
          {selected.length ? <Button onClick={deleteItem}>删除</Button> : null}
        </Grid>
        <Grid item>
          <Pagination count={10} onChange={(e, page) => changePagination(page)} color="primary" />
        </Grid>
      </Grid>
    )
  }
  return (
    <Layout title='设置'>
      <Container maxWidth="md">
        <Grid container>
          <Typography variant='h1'>设置</Typography>
        </Grid>
        {renderTableSearch()}
        <Paper variant="outlined">
          <TableContainer>
            <Table>
              {renderTableHead()}
              {renderTableBody()}
            </Table>
            {renderTablePagination()}
          </TableContainer>
        </Paper>
      </Container>
    </Layout>
  )
}

export default Settings
