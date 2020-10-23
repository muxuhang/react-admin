import React from 'react'


import { Button } from 'antd'
import { useRouter } from 'next/router'
import Box from '../components/box'

const Home = () => {
  const router = useRouter()
  const buttonList = [
    { name: '设置', path: '/settings' },
    { name: '商品列表', path: '/products' },
    { name: '广告', path: '/ads' },
    { name: '简单页面', path: '/flatpages' },
    { name: '媒体附件', path: '/attachments' },
  ]

  return (
    <Box title="艺小星">
      <div>
        {buttonList.map((item, index) => <Button onClick={() => router.push(item.path)} key={index}>{item.name}</Button>)}
      </div>
    </Box>
  )
}

export default Home
