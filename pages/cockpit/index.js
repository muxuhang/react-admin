import React, { useEffect, useState } from 'react'
import Tables from '../../components/Tables1'
import { Breadcrumb, Typography } from 'antd'
import { renderImage, renderCreated } from '../../utils/renders'
import { useRouter } from 'next/router'
import { ActiveRingChart, BorderBox1, BorderBox10, BorderBox11, BorderBox13, BorderBox2, BorderBox7, BorderBox9, CapsuleChart, Charts, ConicalColumnChart, Decoration10, Decoration11, Decoration2, Decoration5, Decoration7, Decoration8, Decoration9, DigitalFlop, FlylineChart, FlylineChartEnhanced, FullScreenContainer, Loading, ScrollBoard, ScrollRankingBoard, WaterLevelPond } from '@jiaminghi/data-view-react'
import FlyLineChart from '@jiaminghi/data-view-react/lib/flylineChart'
import ShanDong from './sd_map'
const { Text, Title } = Typography
const width = 1920, height = 1160
const CockpitPage = () => {
  const [loading, setLoading] = useState(true)
  const [scale, setScale] = useState(1)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500);
  }, [])
  useEffect(() => {
    changeScale()
    window.addEventListener('resize', changeScale)
    return () => window.removeEventListener('resize', changeScale)
  }, [])
  const changeScale = () => {
    const innerHeight = window.innerHeight
    const innerWidth = window.innerWidth
    const full_screen_container = document.getElementById('full-screen-container')
    const scale = innerWidth / width <= innerHeight / height ? innerWidth / width : innerHeight / height
    setScale(scale)
  }
  const BorderBox = ({ children, title, style = {} }) => {
    return <div style={{
      height: '100%',
      width: '100%',
      padding: 10,
      position: 'relative',
      ...style
    }}>
      <BorderBox13>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {title && <div style={{ paddingTop: 20, paddingLeft: 20 }}>
            <Title
              level={4}
              style={{
                color: "#fff",
                height: 34,
                lineHeight: '34px',
                marginBottom: 0,
                overflow: 'hidden'
              }}>{title}</Title>
          </div>}
          <div style={{
            flex: 1,
            width: '96%',
            margin: 'auto',
          }}>
            {children}
          </div>
        </div>
      </BorderBox13>
    </div>
  }
  const MessageBox = ({ title, value = 0, unit }) => {
    return <div style={{
      flex: 1, display: 'flex',
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      <Title level={4} style={{ color: "#fff" }}>{title}{unit ? `(${unit})` : ""}</Title>
      <DigitalFlop config={{
        number: [value],
        content: '{nt}',
        style: {
          fontSize: 40,
          fontWight: 'bolder'
        }
      }} style={{ width: '100%', height: '42px' }} />
    </div>
  }
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      background: '#031537',
    }}>
      <div
        id="full-screen-container"
        style={{
          width: width,
          height: height,
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: `translate(-50%,-50%) scale(${scale})`,
          WebkitTransform: `scale(${scale}) translate(-50%,-50%)`,
          transformOrigin: '0 0',
          transition: '0.3s'
        }}>
        {loading ?
          <Loading>Loading...</Loading> :
          <div style={{
            height: '100%',
            padding: 10,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 18,
              marginBottom: 10
            }}>
              <Decoration8 style={{ flex: 1, height: 72, marginLeft: '1%' }} />
              <Decoration11 style={{
                height: '72px',
                color: "#fff",
                fontSize: 24,
                margin: '0 20px',
                width: '320px'
              }}>数据驾驶舱</Decoration11>
              <Decoration8 reverse={true} style={{ flex: 1, height: 72, marginRight: '1%' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', flex: 1, width: '100%' }}>
              {/* 左 */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1
              }}>
                <BorderBox title="融资转化率">
                  <WaterLevelPond config={{
                    data: [55],
                    waveNum:5,
                    waveHeight:8
                  }} style={{ width: '60%', height: '220px', margin: 'auto', marginTop: 20 }} />
                </BorderBox>
                <BorderBox title="融资总额排行榜">
                  <ScrollBoard config={{
                    rowNum: 7,
                    indexHeader: '排名',
                    columnWidth: [55, 120],
                    align: ['center', 'center', 'center'],
                    index: true,
                    header: ['供应商', '金额'],
                    data: [
                      ['*****', '9000000.00'],
                      ['*****', '7200000.00'],
                      ['*****', '6000000.00'],
                      ['*****', '4600000.00'],
                      ['*****', '9000000.00'],
                      ['*****', '3400000.00'],
                      ['*****', '3200000.00'],
                      ['*****', '2900000.00'],
                      ['*****', '1400000.00'],
                    ]
                  }} style={{ width: '100%', height: '266px' }} />
                </BorderBox>
                <BorderBox title="未兑付的持有/融资占比">
                  <Charts option={{
                    series: [
                      {
                        type: 'pie',
                        radius: '88%',
                        data: [
                          { name: '持有', value: 93 },
                          { name: '融资', value: 32 },
                        ],
                        insideLabel: {
                          show: true,
                          style: {
                            fontSize: 14
                          },
                          formatter: '{name}:{value}万\r\n占比:{percent}%'
                        },
                        outsideLabel: {
                          show: false
                        },
                        percentToFixed: 2,
                      }
                    ]
                  }} style={{ width: '100%', height: '260px' }} />
                </BorderBox>
              </div>
              {/* 中 */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '60%',
              }}>
                <BorderBox style={{
                  display: 'flex',
                  flexDirection: 'row',
                  height: "180px"
                }}>
                  <div style={{
                    display: "flex",
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <MessageBox title="企业总数" value={326} unit={'户'} />
                    <MessageBox title="签发总数" value={326} unit={'万元'} />
                    <MessageBox title="融资总额" value={326} unit={'万元'} />
                  </div>
                </BorderBox>
                <div style={{ flex: 1 }}>
                  <ShanDong />
                </div>
              </div>
              {/* 右 */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1
              }}>
                <BorderBox title="企业用户构成">
                  <Charts option={{
                    series: [
                      {
                        type: 'pie',
                        radius: '88%',
                        data: [
                          { name: '核心企业', value: 13 },
                          { name: '供应商', value: 125 },
                        ],
                        insideLabel: {
                          show: true,
                          style: {
                            fontSize: 14
                          },
                          formatter: '{name}:{value}家\r\n占比:{percent}%'
                        },
                        outsideLabel: {
                          show: false
                        },
                        percentToFixed: 2,
                      }
                    ]
                  }} style={{ width: '100%', height: '260px' }} />
                </BorderBox>
                <BorderBox title="签发金额趋势(万)">
                  <Charts option={{
                    grid: {
                      show: true,
                      left: '18%',
                      top: '10%',
                      right: '5%',
                      bottom: '15%'
                    },
                    xAxis: {
                      name: '第二周',
                      axisLine: {
                        style: {
                          stroke: '#fff',
                          lineWidth: 1
                        },
                      },
                      axisTick: {
                        style: {
                          stroke: '#fff',
                          lineWidth: 1
                        },
                      },
                      axisLabel: {
                        style: {
                          fill: '#fff',
                          fontSize: 14,
                        }
                      },
                      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {
                      name: '销售额',
                      data: 'value',
                      axisLine: {
                        style: {
                          stroke: '#fff',
                          lineWidth: 1
                        },
                      },
                      axisTick: {
                        style: {
                          stroke: '#fff',
                          lineWidth: 1
                        },
                      },
                      axisLabel: {
                        style: {
                          fill: '#fff',
                          fontSize: 14,
                        }
                      },
                      splitLine: {
                        style: {
                          stroke: '#fff',
                          lineWidth: 0.5
                        }
                      }
                    },
                    series: [
                      {
                        data: [2339, 1899, 2118, 1790, 3265, 4465, 3996],
                        type: 'line',
                      },
                      {
                        data: [1339, 3199, 1218, 790, 3265, 465, 996],
                        type: 'line',
                      }
                    ]
                  }} style={{ width: '100%', height: '260px' }} />
                </BorderBox>
                <BorderBox title="资方额度排行榜">
                  <ScrollBoard config={{
                    rowNum: 7,
                    indexHeader: '排名',
                    columnWidth: [55, 120],
                    align: ['center', 'center', 'center'],
                    index: true,
                    header: ['资方', '额度'],
                    data: [
                      ['中国银行', '9000000.00'],
                      ['中国建设银行', '7200000.00'],
                      ['鲁商银行', '6000000.00'],
                      ['青岛银行', '4600000.00'],
                      ['中国农业银行', '9000000.00'],
                      ['招商银行', '3400000.00'],
                      ['青岛银行', '3200000.00'],
                      ['工商银行', '2900000.00'],
                      ['中信银行', '1400000.00'],
                    ]
                  }} style={{ width: '100%', height: '266px' }} />
                </BorderBox>
              </div>
            </div>
          </div>
        }
      </div >
    </div >
  )
}
export default CockpitPage
