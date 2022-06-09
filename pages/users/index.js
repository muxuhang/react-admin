import React, { useState } from 'react'
import Tables from '../../components/Tables1'
import Box from '../../components/box'
import { Breadcrumb } from 'antd'
import { renderImage, renderCreated } from '../../utils/renders'
import { useRouter } from 'next/router'
const UsersList = () => {
  const title = '用户列表'
  const https = 'users'
  const router = useRouter()
  const columns = [
    { title: '姓名', key: 'username', dataIndex: 'username' },
    { title: '昵称', key: 'nickname', dataIndex: 'nickname' },
    { title: '手机号', key: 'telphone', dataIndex: 'telphone' },
    { title: '邮箱', key: 'email', dataIndex: 'email' },
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
