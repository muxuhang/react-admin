import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, InputBase, Link, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from '@material-ui/core'
import Layout from '../../components/layout'
import network from '../../utils/network'
import utils from '../../utils/utils'
import { Pagination } from '@material-ui/lab'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import Tables from '../../components/tables'
const AdList = () => {
  const [list, setList] = useState([])
  const [selected, setSelected] = useState([])
  const [searchText, setSearch] = useState('')
  const tableHead = [
    { name: 'id', type: 'id' },
    { name: '标签', type: 'collection' },
    { name: '图片', type: 'image' },
    { name: '标题', type: 'title' },
    { name: '创建时间', type: 'created' }
  ]
  // 分页
  const [current, setCurrent] = useState(1)
  const [count, setCount] = useState(0)
  const router = useRouter()
  const limit = 5
  // 排序
  const [sort, setSort] = useState('created')
  // 弹窗
  const [show, setShow] = useState(false)

  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    getAdlist()
  }, [current, sort])
  // 获取列表
  const getAdlist = () => {
    network('GET', `/ads/admin?limit=${limit}&&offset=${(current - 1) * limit}&search=${searchText}&sort=${sort}`, null, (res) => {
      setCount(Math.ceil(res.total / limit));
      setList(res.data)
    })
  }
  // 删除选中
  const deleteItem = () => {
    network('DELETE', `/ads/admin/bulk_delete`, {
      ids: selected.toString()
    }, (res) => {
      if (res.success) {
        getAdlist()
        setSelected([])
        enqueueSnackbar('删除成功', { variant: 'success' })
      } else {
        enqueueSnackbar('删除失败', { variant: 'error' })
      }
      setShow(false)
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
  // 搜索
  const search = () => {
    setCurrent(1)
    if (current === 1) getAdlist()
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
            <TableCell>#{item.id}</TableCell>
            <TableCell>{item.collection}</TableCell>
            <TableCell>
              <img style={{ height: '2rem', display: 'block' }} src={item.image} alt=''></img>
            </TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>
              {utils.timeformat(item.created)}
            </TableCell>
            <TableCell>
              <Link href={`/ads/${item.id}`}>编辑</Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    )
  }
  // 分页
  const renderTablePagination = () => {
    return (
      <Grid container style={{ padding: '1rem 0' }}>
        <Grid item style={{ flex: 1 }}>
          {selected.length ? <Button onClick={() => setShow(true)}>删除</Button> : null}
        </Grid>
        <Grid item>
          <Pagination
            count={count}
            page={current}
            onChange={(e, page) => setCurrent(page)} color="primary" />
        </Grid>
      </Grid>
    )
  }
  // 危险操作提示
  const renderChoose = () => {
    return <Dialog open={show}>
      <DialogTitle>确认删除</DialogTitle>
      <DialogContent>
        <DialogContentText>
          删除后将不可复原
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShow(false)}>
          取消
        </Button>
        <Button onClick={() => deleteItem()}>
          确认
        </Button>
      </DialogActions>
    </Dialog>
  }
  return (
    <Layout title="轮播图">
      <Container maxWidth="md">
        <Grid container>
          <Typography variant='h4'>广告图</Typography>
        </Grid>
        {/* {renderChoose()}
        {renderTableSearch()}
        <Paper variant="outlined">
          <TableContainer>
            <Table>
              {renderTableHead()}
              {renderTableBody()}
            </Table>
            {renderTablePagination()}
          </TableContainer>
        </Paper> */}
        <Tables title='广告图' https='ads' tableHead={tableHead} />
      </Container>
    </Layout>
  )
}
export default AdList
