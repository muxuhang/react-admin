/* 
  参数 title 表格标题
  参数 https 接口地址
  例: 传 ads 
    删除 `/${https}/admin/bulk_delete`
    获取列表 `/${https}/admin`
    跳转详情 `/${https}/[id]`
    跳转添加 `/${https}/created`
  参数 tableHead 表格内容
    tableHead = [
      { name: 'id', type: 'id' },
      { name: '标签', type: 'collection' },
      { name: '图片', type: 'image' },
      { name: '标题', type: 'title' },
      { name: '创建时间', type: 'created' }
    ]
    name为标题，type为接口参数
    特殊参数 图片，时间 自定义添加
  参数 limit 展示长度
  后台需统一接口结构，前端调整
  参数 useEdit 是否使用编辑
*/
/* 
  待优化
    1、选择时使用的参数不是id
    2、空数据展示
    3、数据
    4、样式优化
    5、导出功能
    6、接口使用nextjs服务端调用
*/
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Input, Link, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Typography } from '@material-ui/core'
import network from '../utils/network'
import utils from '../utils/utils'
import { Pagination } from '@material-ui/lab'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
const Tables = ({ title, https, tableHead, limit = 5, useEdit = true }) => {
  const [list, setList] = useState([])
  const [selected, setSelected] = useState([])
  const [searchText, setSearch] = useState('')
  // 分页
  const [current, setCurrent] = useState(1)
  const [count, setCount] = useState(0)
  const router = useRouter()
  // 排序
  const [sort, setSort] = useState('created')
  // 弹窗
  const [show, setShow] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const styles = useStyles()
  useEffect(() => {
    getList()
  }, [current, sort])
  // 获取列表
  const getList = () => {
    network('GET', `/${https}/admin?limit=${limit}&&offset=${(current - 1) * limit}&search=${searchText}&sort=${sort}`, null, (res) => {
      setCount(Math.ceil(res.total / limit));
      setList(res.data ? res.data : [])
    })
  }
  // 删除选中
  const deleteItem = () => {
    network('DELETE', `/${https}/admin/bulk_delete`, {
      ids: selected.toString()
    }, (res) => {
      if (res._id) {
        getList()
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
    if (current === 1) getList()
  }
  // 清空
  const clear = () => {
    setSearch('')
    getList()
  }
  const renderTableSearch = () => {
    return (
      <Grid container className={styles.toolbar}>
        <Grid item style={{ flex: 1 }}>
          <Typography className={styles.title}>{title}</Typography>
        </Grid>
        <Paper elevation={0}>
          <Input
            size={'small'}
            placeholder="搜索"
            disableUnderline={true}
            className={styles.searchInput}
            value={searchText}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                search()
              }
            }}
            onChange={(e) => setSearch(e.target.value)}
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <ButtonGroup size={'small'} variant="outlined">
            <Button onClick={search}>搜索</Button>
            <Button onClick={clear}>清空</Button>
          </ButtonGroup>
          <ButtonGroup size={'small'} variant={'outlined'}>
            <Button
              style={{ marginLeft: 20 }}
              onClick={() => {
                router.push(`/${https}/created`)
              }}>添加</Button>
          </ButtonGroup>
        </Paper>
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
              {item.type == 'created' ? <TableSortLabel
                direction={sort === 'created' ? 'asc' : 'desc'}
                onClick={() => {
                  sort === 'created' ? setSort('-created') : setSort('created')
                }}
              >
                {item.name}
              </TableSortLabel> : item.name}
            </TableCell>
          ))}
          {useEdit && <TableCell></TableCell>}
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
            {tableHead.map((row, key) => {
              return (
                <TableCell key={key}>
                  {row.type === 'image' ? <img style={{ height: '2rem', display: 'block' }} src={item.image} alt=''></img> :
                    row.type === 'created' ? utils.timeformat(item.created) :
                      item[row.type]}
                </TableCell>
              )
            })}

            {useEdit && <TableCell>
              <Link href={`/${https}/${item.id}`}>编辑</Link>
            </TableCell>}
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
          {selected.length ? <Button size={'small'} onClick={() => setShow(true)}>删除</Button> : null}
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
    <>
      {renderChoose()}
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
    </>
  )
}
const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    padding: 10
  },
  title: {
    fontSize: 20,
    fontWeight: '500'
  },
  searchInput: {
    fontSize: 14,
    borderBottom: '1px solid rgba(0, 0, 0, 0.23)'
  }
})
export default Tables

