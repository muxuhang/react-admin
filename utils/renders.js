import { Image } from "antd"
import utils from './utils'
const renderImage = (v) => <Image src={v} style={{ maxWidth: 100 }}></Image>
const renderEdit = (v) => (
  <div>
    <a>编辑</a>
  </div>
)
const renderCreated = (v) => {
  return <span>{utils.timeformat(v)}</span>
}
export {
  renderImage,
  renderEdit,
  renderCreated
}