import { Modal, Button, Descriptions, Input, PageHeader, Pagination, Popconfirm, Radio, Table } from "antd"
import { useEffect, useState } from "react"
import network from "../utils/network"
const Tables = (props) => {
  const { columns, https, title } = props
  const [list, setList] = useState([])
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [searchText, setSearch] = useState('')
  const limit = 5
  // 排序
  const [sort, setSort] = useState('created')
  // 分页
  const [current, setCurrent] = useState(1)
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(false)

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
  // 新增
  const addList = () => {

  }
  // 删除
  const deleteList = () => {
    network('DELETE', `/${https}/admin/bulk_delete`, {
      ids: selected.toString()
    }, (res) => {
      if (res.success) {
        getList()
        setSelected([])
        enqueueSnackbar('删除成功', { variant: 'success' })
      } else {
        enqueueSnackbar('删除失败', { variant: 'error' })
      }
      setShow(false)
    })
  }
  const confirm = () => {
    Modal.confirm({
      title: '确认删除?',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteList()
      }
    })
  }
  const renderPageHeader = () => {
    return (
      <PageHeader
        style={{ paddingLeft: 0, paddingRight: 0 }}
        title={title}
        extra={[
          <Button key="3" onClick={addList}>添加</Button>
        ]}>
        <Descriptions size="small" column={3}>
          <Descriptions.Item>
            <Radio.Group>
              <Input style={{ width: 200 }}
                placeholder='输入内容'></Input>
              <Radio.Button value="search">搜索</Radio.Button>
              <Radio.Button value="clean">清空</Radio.Button>
            </Radio.Group>
          </Descriptions.Item>
        </Descriptions>
      </PageHeader>
    )
  }
  const renderTable = () => {
    return (
      <Table
        columns={columns}
        dataSource={list}
        pagination={false}
        rowSelection={{
          selectedRowKeys,
          onChange: (v) => setSelectedRowKeys(v),
          selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
          ],
        }}
        rowKey='id'
      ></Table>
    )
  }
  const renderPagination = () => {
    return (
      <div style={{
        margin: 10,
        display: 'flex',
        flexDirection: 'row-reverse'
      }}>
        {count?<Pagination
          onChange={(page) => {
            setCurrent(page)
          }}
          current={current}
          defaultPageSize={limit}
          total={count * limit}></Pagination>:null}
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

export default Tables