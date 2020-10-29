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
    { title: '标题', key: 'title', dataIndex: 'title' },
    { title: '姓名', key: 'username', dataIndex: 'username' },
    { title: '留言', key: 'leave', dataIndex: 'leave' },
    { title: '点赞', key: 'likes', dataIndex: 'likes' },
    { title: '创建时间', key: 'created', dataIndex: 'created', render: renderCreated },
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
