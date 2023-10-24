import LineEcharts from './line-echarts'
import BarEcharts from './bar-echarts'
import PieEcharts from './pie-echarts'
import { Button, Card, Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
const Dashboards = () => {
  const router = useRouter()
  const [soundList, setSoundList] = useState([
    { title: '/musics/1.mp3', file: '/musics/1.mp3', howl: null },
    { title: '/musics/2.mp3', file: '/musics/2.mp3', howl: null },
    { title: '/musics/3.mp3', file: '/musics/3.mp3', howl: null },
    { title: '/musics/4.mp3', file: '/musics/4.mp3', howl: null },
    { title: '/musics/5.mp3', file: '/musics/5.mp3', howl: null },
    { title: '/musics/6.mp3', file: '/musics/6.mp3', howl: null },
    { title: '/musics/7.mp3', file: '/musics/7.mp3', howl: null },
    { title: '/musics/8.mp3', file: '/musics/8.mp3', howl: null },
    { title: '/musics/9.mp3', file: '/musics/9.mp3', howl: null },
  ])
  useEffect(() => {
    setTimeout(() => {
      console.log(1);
      localStorage.setItem('soundList', JSON.stringify(soundList))
    }, 1000);
  }, [])
  return (
    <>
    <Button onClick={() => router.push('/cockpit')}>数据驾驶舱</Button>
      <Row gutter={[8, 8]}>
        <Col xs={12}>
          <Card>
            <LineEcharts />
          </Card>
        </Col>
        <Col xs={12}>
          <Card>
            <BarEcharts />
          </Card>
        </Col>
        <Col xs={12}>
          <Card>
            <PieEcharts />
          </Card>
        </Col>
      </Row>
    </>
  )
}
export default Dashboards