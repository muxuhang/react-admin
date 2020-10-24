import LineEcharts from './line-echarts'
import BarEcharts from './bar-echarts'
import PieEcharts from './pie-echarts'
import { Card } from 'antd'
const Dashboards = () => {
  return (
    <>
      <Card elevation={3}>
        <LineEcharts />
      </Card>
      <Card elevation={3}>
        <BarEcharts />
      </Card>
      <Card elevation={3}>
        <PieEcharts />
      </Card>
    </>
  )
}
export default Dashboards