import React, { useEffect, useState } from 'react'
import Tables from '../../components/Tables1'
import { Breadcrumb, Typography } from 'antd'
import { renderImage, renderCreated } from '../../utils/renders'
import { useRouter } from 'next/router'
import config from './map.json'
import { ActiveRingChart, BorderBox1, BorderBox10, BorderBox11, BorderBox13, BorderBox2, BorderBox7, BorderBox9, CapsuleChart, Charts, ConicalColumnChart, Decoration10, Decoration11, Decoration2, Decoration5, Decoration7, Decoration8, Decoration9, DigitalFlop, FlylineChart, FlylineChartEnhanced, FullScreenContainer, Loading, ScrollBoard, ScrollRankingBoard, WaterLevelPond } from '@jiaminghi/data-view-react'
import FlyLineChart from '@jiaminghi/data-view-react/lib/flylineChart'
const { Text, Title } = Typography
const CockpitPage = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500);
  }, [])
  const BorderBox = ({ children, title, style = {} }) => {
    return <div style={{
      height: '100%',
      width: '100%',
      padding: 10,
      position: 'relative',
      ...style
    }}>
      <BorderBox13>
        {title && <div style={{ padding: 20, height: '100%' }}>
          <Title
            level={4}
            style={{
              color: "#fff",
              height: 40
            }}>{title}</Title>
        </div>}
        {children}
      </BorderBox13>
    </div>
  }
  const MessageBox = ({ title, value = 0, unit }) => {
    return <div style={{ flex: 1, display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
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
    <div>
      <FullScreenContainer
        style={{
          background: '#031537'
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

                </BorderBox>
                <BorderBox title="融资总额排行榜">

                </BorderBox>
                <BorderBox title="未兑付的持有/融资占比">

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
                  <FlylineChartEnhanced
                    style={{ height: 300 }}
                    config={{
                      points: config.points,
                      lines: config.lines,
                      "icon": {
                        "show": true,
                        "src": "/images/mapPoint.png"
                      },
                      "text": {
                        "show": true
                      },
                      "k": 0.5,
                      "bgImgSrc": "/images/map.jpg"
                    }} style={{ width: '100%', height: '100%' }} />
                </div>
                {/* <div style={{ height: '33.33%' }}>
                  <BorderBox></BorderBox>
                </div> */}
              </div>
              {/* 右 */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1
              }}>
                <BorderBox title="企业用户构成">

                </BorderBox>
                <BorderBox title="签发金额趋势">
                </BorderBox>
                <BorderBox title="资方额度排行榜">

                </BorderBox>
              </div>
            </div>
          </div>
        }
      </FullScreenContainer >
    </div >
  )
}
export default CockpitPage
