import React from 'react'
import Tables from '../../components/Tables1'
import Box from '../../components/box'
import { Breadcrumb } from 'antd'
import { renderCreated } from '../../utils/renders'
import { useRouter } from 'next/router'
const UsersList = () => {
  const title = '{/* 标题 */}'
  const https = 'demo'
  const router = useRouter()
  const columns = [
    { title: '更新时间', key: 'updated_at', dataIndex: 'updated_at', render: renderCreated },
    { title: '创建时间', key: 'created_at', dataIndex: 'created_at', render: renderCreated },
    {
      title: '编辑', key: 'edit', render: (v) => (<>
        <a onClick={() => router.push(`/${https}/${v._id}`)}>编辑</a>
      </>)
    }
  ]
  return (
    <Box title={title}>
      <Breadcrumb>
        <Breadcrumb.Item><a href='/'>首页</a></Breadcrumb.Item>
        <Breadcrumb.Item>{title}</Breadcrumb.Item>
      </Breadcrumb>
      <Tables
        https={https}
        title={title}
        columns={columns} />
    </Box>
  )
}
export default UsersList
