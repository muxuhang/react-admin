import React from 'react'
import Tables from '../../components/Tables1'
import Box from '../../components/box'
import { Button, Image } from 'antd'
import { renderEdit, renderImage } from './../../utils/renders'
const AdList = () => {
  const columns = [
    { title: 'id', key: 'id', dataIndex: 'id' },
    { title: '标签', key: 'collection', dataIndex: 'collection' },
    { title: '图片', key: 'image', dataIndex: 'image', render: renderImage },
    { title: '标题', key: 'title', dataIndex: 'title' },
    { title: '创建时间', key: 'created', dataIndex: 'created' },
    { title: '编辑', key: 'edit', render: renderEdit },
  ]

  // const tableHead = [
  //   { name: 'id', type: 'id' },
  //   { name: '标签', type: 'collection' },
  //   { name: '图片', type: 'image' },
  //   { name: '标题', type: 'title' },
  //   { name: '创建时间', type: 'created' }
  // ]
  return (
    <Box title="轮播图">
      <Tables
        https='ads'
        columns={columns} />
    </Box>
  )
}
export default AdList
