import React from 'react'
import Tables from '../../components/Tables1'
import Box from '../../components/box'
import { Button, Image } from 'antd'
import { renderEdit, renderImage, renderCreated } from './../../utils/renders'
const AdList = () => {
  const columns = [
    { title: 'id', key: 'id', dataIndex: 'id' },
    { title: '标签', key: 'collection', dataIndex: 'collection' },
    { title: '图片', key: 'image', dataIndex: 'image', render: renderImage },
    { title: '标题', key: 'title', dataIndex: 'title' },
    {
      title: '创建时间', key: 'created', dataIndex: 'created', sorter: {
        compare: (a) => {
          console.log(a);
        },
        multiple: 3,
      },
      render: renderCreated
    },
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
    <Box title="广告图">
      <Tables
        https='ads'
        title={'广告图'}
        columns={columns} />
    </Box>
  )
}
export default AdList
