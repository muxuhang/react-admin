import React from 'react'
import Tables from '../../components/Tables1'
import Box from '../../components/box'
import { renderEdit, renderImage, renderCreated } from '../../utils/renders'
const AccountsList = () => {
  const columns = [
    { title: 'id', key: 'id', dataIndex: 'id' },
    { title: '标签', key: 'collection', dataIndex: 'collection' },
    { title: '图片', key: 'image', dataIndex: 'image', render: renderImage },
    { title: '标题', key: 'title', dataIndex: 'title' },
    {
      title: '创建时间', key: 'created', dataIndex: 'created', sorter: {
        compare: (a) => { },
        multiple: 3,
      },
      render: renderCreated
    },
    { title: '编辑', key: 'edit', render: renderEdit },
  ]
  return (
    <Box title="用户列表">
      <Tables
        https='accounts'
        title={'用户列表'}
        columns={columns} />
    </Box>
  )
}
export default AccountsList
