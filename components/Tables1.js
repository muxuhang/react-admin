import { Pagination, Table } from "antd"
import { useEffect, useState } from "react"
import network from "../utils/network"



const Tables = (props) => {
  const { columns, https } = props
  const [list, setList] = useState([])
  const [selected, setSelected] = useState([])
  const [searchText, setSearch] = useState('')
  const limit = 5
  // 排序
  const [sort, setSort] = useState('created')
  // 分页
  const [current, setCurrent] = useState(1)
  const [count, setCount] = useState(10)
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
  const renderPagination = () => (
    <div style={{
      margin: 10,
      display: 'flex',
      flexDirection: 'row-reverse'
    }}>
      <Pagination
        onChange={(page) => {
          setCurrent(page)
        }}
        current={current}
        defaultPageSize={limit}
        total={count * limit}></Pagination>
    </div>
  )
  return (
    <>
      <Table
        columns={columns}
        dataSource={list}
        pagination={false}
        rowKey='id'
      ></Table>
      {renderPagination()}
    </>
  )
}

export default Tables