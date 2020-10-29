import React, { useState } from 'react'
import Tables from '../../components/Tables1'
import Box from '../../components/box'
import { Breadcrumb } from 'antd'
import { renderImage, renderCreated } from '../../utils/renders'
import { useRouter } from 'next/router'
const AccountsList = () => {
  const title = '用户列表'
  const https = 'accounts'
  const router = useRouter()
  const columns = [
    { title: '姓名', key: 'username', dataIndex: 'username' },
    { title: '手机号', key: 'phone', dataIndex: 'phone' },
    { title: '部门', key: 'department', dataIndex: 'department' },
    { title: '村镇', key: 'town', dataIndex: 'town' },
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
export default AccountsList
