import { Container, makeStyles, Paper } from '@material-ui/core'
import ReactEcharts from 'echarts-for-react'
import Layout from '../../components/layout'
import LineEcharts from './line-echarts'
import BarEcharts from './bar-echarts'
import PieEcharts from './pie-echarts'
const Dashboards = () => {
  const styles = useStyles()
  return (
    <Layout title='仪表盘'>
      <Container maxWidth={'md'} className={styles.container}>
        <Paper className={styles.paper} elevation={3}>
          <LineEcharts />
        </Paper>
        <Paper className={styles.paper} elevation={3}>
          <BarEcharts />
        </Paper>
        <Paper className={styles.paper} elevation={3}>
          <PieEcharts />
        </Paper>
      </Container>
    </Layout>
  )
}
const useStyles = makeStyles({
  container: {

  },
  paper: {
    margin: 10,
    maxWidth: '100%',
    padding: 10
  }
})
export default Dashboards