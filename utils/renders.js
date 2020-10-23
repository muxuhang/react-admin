import { Image } from "antd"

const renderImage = (v) => <Image src={v} style={{ maxWidth: 100 }}></Image>
const renderEdit = (v) => (
  <div>
    <a>编辑</a>
  </div>
)
export {
  renderImage,
  renderEdit
}