import LineEcharts from './line-echarts'
import BarEcharts from './bar-echarts'
import PieEcharts from './pie-echarts'
import { Card, Col, Row } from 'antd'
const Dashboards = () => {
  return (
    <>
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