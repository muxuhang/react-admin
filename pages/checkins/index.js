import React, { useState } from 'react'
import Tables from '../../components/Tables1'
import Box from '../../components/box'
import { Breadcrumb, Typography } from 'antd'
import { renderImage, renderCreated } from '../../utils/renders'
import { useRouter } from 'next/router'
const { Text } = Typography
const CheckinsList = () => {
  const title = '打卡记录'
  const https = 'checkins'
  const columns = [
    { title: '姓名', key: 'user', dataIndex: 'user' },
    { title: '地址', key: 'address', dataIndex: 'address' },
    {
      title: '状态', key: 'status', dataIndex: 'status', render: (e) =>
        <Text type={e === 'normal' ? 'success' : 'warning'} >{e === 'normal' ? '正常' : '异常'}</Text>
    },
    {
      title: '打卡设备', key: 'device', dataIndex: 'device', render: (e) =>
        <>{e.brand + '_' + e.type}</>
    },
    { title: '打卡时间', key: 'created', dataIndex: 'created', render: renderCreated },
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
export default CheckinsList
