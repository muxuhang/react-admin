import React, { useState } from 'react'
import Tables from '../../../components/Tables1'
import Box from '../../../components/box'
import { Breadcrumb } from 'antd'
import { renderImage, renderCreated } from '../../../utils/renders'
import { useRouter } from 'next/router'
const DepsList = () => {
  const title = '部门管理'
  const https = 'orgs/deps'
  const router = useRouter()
  const columns = [
    { title: 'ID', key: '_id', dataIndex: '_id' },
    { title: '部门', key: 'name', dataIndex: 'name' },
    { title: '描述', key: 'desc', dataIndex: 'desc' },
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
export default DepsList
