import React, { useState } from 'react'
import Tables from '../../components/Tables1'
import Box from '../../components/box'
import { Breadcrumb } from 'antd'
import { renderImage, renderCreated } from './../../utils/renders'
const AdList = () => {
  const title = '广告图'
  const [sort, setSort] = useState('created')
  const columns = [
    { title: 'id', key: 'id', dataIndex: 'id' },
    { title: '标签', key: 'collection', dataIndex: 'collection' },
    { title: '图片', key: 'image', dataIndex: 'image', render: renderImage },
    { title: '标题', key: 'title', dataIndex: 'title' },
    {
      title: '创建时间', key: 'created', dataIndex: 'created', sorter: {
        compare: () => setSort(sort === 'created' ? '-created' : 'created'),
      },
      render: renderCreated
    }
  ]
  return (
    <Box title={title}>
      <Breadcrumb>
        <Breadcrumb.Item ><a href='/'>首页</a></Breadcrumb.Item>
        <Breadcrumb.Item>{title}</Breadcrumb.Item>
      </Breadcrumb>
      <Tables
        https='ads'
        title={title}
        sort={sort}
        columns={columns} />
    </Box>
  )
}
export default AdList
