import ReactEcharts from "echarts-for-react"

const LineEcharts = () => {
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
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    })
  }
  return (
    <ReactEcharts
      style={{width:'100%'}}
      option={getOption()}
      theme={"theme_name"}></ReactEcharts>
  )
}

export default LineEcharts