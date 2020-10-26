import { Modal, Button, Descriptions, Input, PageHeader, Pagination, Popconfirm, Radio, Table, message } from "antd"
import { Router, useRouter } from "next/router"
import { useEffect, useState } from "react"
import network from "../utils/network"
const Tables = (props) => {
  const { https, title, sort } = props
  const router = useRouter()
  let [columns, setColumns] = useState([])
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [searchText, setSearch] = useState('')
  const limit = 5
  // 分页
  const [current, setCurrent] = useState(1)
  const [count, setCount] = useState(0)

  useEffect(() => {
    getColumns()
    getList()
  }, [current, sort])
  // 获取列表标题，并添加编辑部分
  const getColumns = () => {
    setColumns([
      ...props.columns,
      {
        title: '编辑', key: 'edit', render: (v) => {
          return (
            <div>
              <a onClick={() => router.push(`/${https}/${v.id}`)}>编辑</a>
            </div>
          )
        }
      }
    ])
  }
  // 获取列表数据
  const getList = () => {
    network('GET', `/${https}/admin?limit=${limit}&&offset=${(current - 1) * limit}&search=${searchText}&sort=${sort}`, null, (res) => {
      setCount(Math.ceil(res.total / limit));
      setList(res.data ? res.data : [])
      setLoading(false)
    })
  }
  // 删除选中部分
  const deleteList = () => {
    network('DELETE', `/${https}/admin/bulk_delete`, {
      ids: selectedRowKeys.toString()
    }, (res) => {
      if (res.success) {
        getList()
        setSelectedRowKeys([])
        message.info('删除成功')
      } else {
        message.info('删除失败')
      }
      setShow(false)
    })
  }
  // 点击删除需要进一步确认
  const confirm = () => {
    Modal.confirm({
      title: '确认删除?',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk() {
        deleteList()
      }
    })
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
  // 表格头部
  const renderPageHeader = () => {
    return (
      <PageHeader
        style={{ paddingLeft: 0, paddingRight: 0 }}
        title={title}
        extra={[
          <Button
            key={'1'}
            onClick={() => router.push(`/${https}/created`)}>添加</Button>
        ]}>
        <Descriptions size="small" column={3}>
          <Descriptions.Item>
            <Radio.Group>
              <Input
                value={searchText}
                style={{ width: 200 }}
                placeholder='输入内容'
                onKeyUp={(e) => {
                  if (e.key === 'Enter') {
                    search()
                  }
                }}
                onChange={(e) => setSearch(e.target.value)}></Input>
              <Radio.Button value="search" onClick={search}>搜索</Radio.Button>
              <Radio.Button value="clean" onClick={clear}>清空</Radio.Button>
            </Radio.Group>
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    )
  }
  // 表格部分
  const renderTable = () => {
    return (
      <Table
        columns={columns}
        dataSource={list}
        pagination={false}
        showSorterTooltip={false}
        loading={loading}
        rowSelection={{
          selectedRowKeys,
          onChange: (v) => setSelectedRowKeys(v),
        }}
        rowKey='id'
      ></Table>
    )
  }
  // 分页和删除按钮
  const renderPagination = () => {
    return (
      <div style={{
        margin: 10,
        display: 'flex',
        flexDirection: 'row-reverse'
      }}>
        {count ? <Pagination
          onChange={(page) => {
            setCurrent(page)
          }}
          current={current}
          defaultPageSize={limit}
          total={count * limit}></Pagination> : null}
        <div style={{ flex: 1 }}></div>
        {selectedRowKeys.length ? <Button onClick={confirm} danger>删除</Button> : null}
      </div>
    )
  }
  return (
    <>
      {renderPageHeader()}
      {renderTable()}
      {renderPagination()}
    </>
  )
}
const styles = {
  editInput: {
    maxWidth: 200
  }
}

export default Tables