import React, { useState } from 'react'
import Tables from '../../components/Tables1'
import Box from '../../components/box'
import { Breadcrumb } from 'antd'
import { renderImage, renderCreated } from './../../utils/renders'
import { useRouter } from 'next/router'
const AdList = () => {
  const title = '广告图'
  const https = 'ads'
  const [sort, setSort] = useState('-created')
  const router = useRouter()
  const columns = [
    { title: '标签', key: 'collection', dataIndex: 'collection' },
    { title: '图片', key: 'image', dataIndex: 'image', render: renderImage },
    { title: '标题', key: 'title', dataIndex: 'title' },
    {
      title: '创建时间', key: 'created', dataIndex: 'created', sorter: {
        compare: () => setSort(sort === 'created' ? '-created' : 'created'),
      },
      render: renderCreated
    },
    {
      title: '编辑', key: 'edit', render: (v) => (<>
        <a onClick={() => router.push(`/${https}/${v._id}`)}>编辑</a>
      </>)
    }
  ]
  return (
    <Box title={title}>
      <Breadcrumb>
        <Breadcrumb.Item ><a href='/'>首页</a></Breadcrumb.Item>
        <Breadcrumb.Item>{title}</Breadcrumb.Item>
      </Breadcrumb>
      <Tables
        https={https}
        title={title}
        sort={sort}
        columns={columns} />
    </Box>
  )
}
export default AdList
