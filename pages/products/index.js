import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import Container from '@material-ui/core/Container'
import InputBase from '@material-ui/core/InputBase'
import Box from '@material-ui/core/Box'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Layout from '../../components/layout.js'

const useStyles = makeStyles(theme => ({
  root: {
  }
}))

const ProductList = () => {
  const classes = useStyles()
  const [data, setData] = useState([])
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const limit = 12
  useEffect(() => {
    fetch('https://teachone.md1927.com/products/', {
      headers: {
        Authorization: 'Basic ' + btoa('chen:orange0220')
      }
    })
      .then(res => res.json())
      .then(res => {
        setTotal(res.total)
        setData(res.data)
      }).catch(err => console.log(err))
  }, [])

  return (
    <Layout title="商品列表">
      <Container
        maxWidth="md"
        className={classes.root}>
        <Box display="flex" mt={2} mb={2} justifyContent="space-between">
          <Typography
            variant="h4"
            noWrap
            component="h2">商品管理</Typography>
          <Button
            variant="contained"
            size="small"
            color="primary"
            //component={Link}
            to={'/products/create'}
          >添加</Button>
        </Box>
        <Box mb={2}>
          <InputBase
            autoFocus
            name="search"
            style={{width:'280px',maxWidth:'100%'}}
            placeholder="请输入名称"
          />
          <Button
            variant="outlined"
            style={{marginRight:'6px'}}
          >查询</Button>
          <Button
          >x 清除筛选</Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>名称</TableCell>
                <TableCell>价格</TableCell>
                <TableCell>划线价</TableCell>
                <TableCell>团购价</TableCell>
                <TableCell>开启团购</TableCell>
                <TableCell>上架状态</TableCell>
                <TableCell>操作</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(row => (
                <TableRow key={row.id}>
                  <TableCell>#{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.line_price}</TableCell>
                  <TableCell>{row.group_price}</TableCell>
                  <TableCell>{row.is_group}</TableCell>
                  <TableCell>{row.is_onsale}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small">编辑</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[limit]}
          component="div"
          count={total}
          rowsPerPage={limit}
          page={page}
          //onChangePage={onChangePage}
        />
      </Container>
    </Layout>
  )
}

export default ProductList
