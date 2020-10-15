import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Container, Grid, IconButton, InputBase, Link, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from '@material-ui/core'
import Layout from '../../components/layout'
import network from '../../utils/network'
import utils from '../../utils/utils'
import { Pagination } from '@material-ui/lab'
import { useRouter } from 'next/router'
const Flatpages = () => {
  const [list, setList] = useState([])
  const [selected, setSelected] = useState([])
  const [searchText, setSearch] = useState('')
  const tableHead = ['标签', '标题', '创建时间', '']

  // 分页
  const [current, setCurrent] = useState(1)
  const [count, setCount] = useState(0)
  const router = useRouter()
  const limit = 5
  // 排序
  const [sort, setSort] = useState('created')
  useEffect(() => {
    getAdlist()
  }, [current, sort])
  // 获取列表
  const getAdlist = () => {
    network('GET', `/flatpages/admin?limit=${limit}&&offset=${(current - 1) * limit}&search=${searchText}&sort=${sort}`, null, (res) => {
      setCount(Math.ceil(res.total / limit));
      setList(res.data)
    })
  }
  // 分页
  const changePagination = async (page) => {
    setCurrent(page)
  }
  const search = () => {
    setCurrent(1)
    if (current === 1) getAdlist()
  }
  // 删除选中
  const deleteItem = () => {
    network('DELETE', `/flatpages/admin/bulk_delete`, {
      ids: selected.toString()
    }, (res) => {
      if (res.success) {
        getAdlist()
        setSelected([])
      } else {
        alert('删除失败')
      }
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
            router.push(`/flatpages/created`)
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
              inputProps={{ 'aria-label': 'select mall desserts' }}
            />
          </TableCell>
          {tableHead.map((item, index) => (
            <TableCell key={index}>
              {item == '创建时间' ? <TableSortLabel
                direction={sort === 'created' ? 'asc' : ''}
                onClick={() => {
                  sort === 'created' ? setSort('-created') : setSort('created')
                }}
              >
                {item}
              </TableSortLabel> : item}
            </TableCell>
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
            <TableCell>{item.slug}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>
              {utils.timeformat(item.created)}
            </TableCell>
            <TableCell>
              <Link href={`/flatpages/${item.id}`}>编辑</Link>
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
          <Pagination
            count={count}
            page={current}
            onChange={(e, page) => changePagination(page)} color="primary" />
        </Grid>
      </Grid>
    )
  }
  return (
    <Layout title="轮播图">
      <Container maxWidth="md">
        <Grid container>
          <Typography variant='h4'>简单页面</Typography>
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
export default Flatpages
