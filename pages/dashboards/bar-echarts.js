import ReactEcharts from "echarts-for-react"

const BarEcharts = () => {
  const getOption = () => {
    return ({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }, {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }, {
        data: [120, 900, 150, 80, 70, 110, 130],
        type: 'bar'
      }]
    })
  }
  return (
    <ReactEcharts
      style={{ width: '100% !important' }}
      option={getOption()}
      theme={"theme_name"}></ReactEcharts>
  )
}

export default BarEcharts