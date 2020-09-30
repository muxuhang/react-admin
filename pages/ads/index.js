import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Container, Grid, IconButton, InputBase, Link, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import Layout from '../../components/layout'
import network from '../../utils/network'
import utils from '../../utils/utils'
import { Pagination } from '@material-ui/lab'
import { useRouter } from 'next/router'
import { Search, SearchOutlined } from '@material-ui/icons'

const AdList = () => {
  const [list, setList] = useState([])
  const [selected, setSelected] = useState([])
  const [searchText, setSearch] = useState('')
  const tableHead = ['id', '名称', '图片', '标签', '创建时间', '']
  const router = useRouter()

  useEffect(() => {
    getAdlist()
  }, [])
  // 获取列表
  const getAdlist = () => {
    network('GET', '/admin/ads', null, (res) => {
      setList(res.data)
    })
  }
  // 全选
  const onSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = list.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }
  // 单独选择
  const onSelectClick = (id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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
    network('DELETE', `/admin/ads/${selected[0]}`, null, (res) => {
      if (res.success) {
        getAdlist()
        setSelected([])
      } else {
        alert('删除失败')
      }
    })
  }
  const search = () => {
    console.log('search');
    return
    network('GET', `/admin/ads`, null, (res) => {
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
            router.push(`/ads/created`)
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
    const isSelected = (id) => selected.indexOf(id) !== -1;
    return (
      <TableBody>
        {list.map((item, index) => (
          <TableRow key={index}>
            <TableCell padding='checkbox'>
              <Checkbox
                checked={isSelected(item.id)}
                onChange={() => onSelectClick(item.id)}
                inputProps={{ 'aria-label': 'select all desserts' }}
              />
            </TableCell>
            <TableCell>#{item.id}</TableCell>
            <TableCell>{item.collection}</TableCell>
            <TableCell>
              <img style={{ height: '2rem', display: 'block' }} src={item.image} alt=''></img>
            </TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{utils.timeformat(item.created)}</TableCell>
            <TableCell>
              <Link href={`/ads/${item.id}`}>编辑</Link>
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
    <Layout title="轮播图">
      <Container maxWidth="md">
        <Grid container>
          <Typography variant='h1'>广告图</Typography>
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
export default AdList
