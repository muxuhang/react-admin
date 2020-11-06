import React, { useState } from 'react'
import Tables from '../../components/Tables1'
import Box from '../../components/box'
import { Breadcrumb } from 'antd'
import { renderImage, renderCreated } from '../../utils/renders'
import { useRouter } from 'next/router'
const PostsList = () => {
  const title = '工作动态'
  const https = 'posts'
  const router = useRouter()
  const columns = [
    { title: '姓名', key: '_id', dataIndex: '_id' },
    { title: '动态', key: 'text', dataIndex: 'text' },
    { title: '状态', key: 'status', dataIndex: 'status' },
    { title: '时间', key: 'created', dataIndex: 'created', render: renderCreated },
    // {
    //   title: '编辑', key: 'edit', render: (v) => (<>
    //     <a onClick={() => router.push(`/${https}/${v._id}`)}>编辑</a>
    //   </>)
    // }
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
        useadd={false}
        columns={columns} />
    </Box>
  )
}
export default PostsList
