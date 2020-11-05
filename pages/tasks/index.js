import React, { useState } from 'react'
import Tables from '../../components/Tables1'
import Box from '../../components/box'
import { Breadcrumb, Typography } from 'antd'
import { renderImage, renderCreated } from '../../utils/renders'
import { useRouter } from 'next/router'
const { Text } = Typography
const TasksList = () => {
  const title = '重点工作'
  const https = 'tasks'
  const router = useRouter()
  const columns = [
    { title: '标题', key: 'title', dataIndex: 'title' },
    {
      title: '状态', key: 'status', dataIndex: 'status', render: (v) => (<Text type={v === 'new' ? 'warning' : v === 'done' ? 'success' : 'danger'}>
        {v === 'new' ? '进行中' : v === 'done' ? '已完成' : '已超时'}
      </Text>)
    },
    { title: '总数', key: 'total', dataIndex: 'total' },
    { title: '已完成', key: 'complete', dataIndex: 'complete' },
    { title: '截止时间', key: 'expired', dataIndex: 'expired' },
    { title: '创建时间', key: 'created', dataIndex: 'created', render: renderCreated },
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
export default TasksList
