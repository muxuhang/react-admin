
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts'
import './shandong';
import { useEffect, useState } from 'react';
const useMap = 'shandong'
import shandong_json from "./shandong.json";
const ShanDong = () => {
  const [points, setPoints] = useState([])
  const [linesData, setLinesData] = useState([])
  useEffect(() => {
    echarts.registerMap('shandong',shandong_json)
    getPoints()
  }, [])
  const getPoints = () => {
    console.log(shandong_json.features);
    const list = shandong_json.features.map(e => {
      return {
        name: e.properties.name,
        value: e.properties.centroid,
        childNum: e.properties.childrenNum
      }
    })
    setPoints(list)
    const terminal = shandong_json.features.filter(e=>e.properties.name==='青岛市')[0].properties.centroid
    const list2 = shandong_json.features.map(e => {
      return [e.properties.centroid, terminal]
    })
    setLinesData(list2)
  }
  const option = {
    tooltip: {
      show: false
    },
    geo: {
      map: useMap,
      roam: false,
      zoom: 1.2,
      label: {
        normal: {
          show: false,
          fontSize: '10',
          color: 'rgba(0,0,0,0.7)'
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#0d0059',
          borderColor: '#389dff',
          borderWidth: 1, //设置外层边框
          shadowBlur: 5,
          shadowOffsetY: 8,
          shadowOffsetX: 0,
          shadowColor: '#01012a'
        },
        emphasis: {
          areaColor: '#184cff',
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowBlur: 5,
          borderWidth: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    },
    series: [
      {
        type: 'map',
        map: useMap,
        roam: false,
        zoom: 1.2,
        showLegendSymbol: false, // 存在legend时显示
        label: {
          normal: {
            show: false
          },
          emphasis: {
            show: false,
            textStyle: {
              color: '#fff'
            }
          }
        },
        itemStyle: {
          normal: {
            areaColor: '#0d0059',
            borderColor: '#389dff',
            borderWidth: 0.5
          },
          emphasis: {
            areaColor: '#17008d',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 5,
            borderWidth: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      },
      {
        name: "",
        type: "scatter",
        coordinateSystem: "geo",
        data: points,
        symbolSize: function (val, e) {
          return 10;
        },
        symbol: "circle",
        hoverSymbolSize: 10,
        tooltip: {
          formatter(value) {
            return value.data.name + "<br/>" + "数据：" + value.data.childNum;
          },
          show: true
        },
        encode: {
          value: 2
        },
        label: {
          formatter: "{b}",
          position: "right",
          show: false
        },
        itemStyle: {
          color: "#0efacc"
        },
        emphasis: {
          label: {
            show: false
          }
        }
      },
      {
        type: 'lines',
        coordinateSystem: 'geo',
        z: 99,
        effect: {
          show: true,
          period:6,
          trailWidth: 4,
          trailOpacity: 0.5,
          trailLength: 0.2,
          symbol: 'triangle',
          symbolSize: 10,
        },
        lineStyle: {
          normal: {
            color: '#ffffff',
            width: 2,
            opacity: 0.8,
            curveness: .3
          }
        },
        data: linesData
      }
    ]
  }
  return <div>
    <ReactEcharts style={{ width: 1140, height: 850 }} option={option}></ReactEcharts>
  </div>
}

export default ShanDong