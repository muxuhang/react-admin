import React, { useState } from 'react'
import Tables from '../../components/Tables1'
import Box from '../../components/box'
import { Breadcrumb } from 'antd'
import { renderImage, renderCreated } from '../../utils/renders'
import { useRouter } from 'next/router'
const TasksList = () => {
  const title = '重点工作'
  const https = 'tasks'
  const router = useRouter()
  const columns = [
    { title: '标题', key: 'title', dataIndex: 'title' },
    { title: '状态', key: 'type', dataIndex: 'type' },
    { title: '总数', key: 'total', dataIndex: 'total' },
    { title: '已完成', key: 'complete', dataIndex: 'complete' },
    { title: '截止时间', key: 'endtime', dataIndex: 'endtime' },
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
