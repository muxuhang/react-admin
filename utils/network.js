import { message } from "antd"
import Router from "next/router"
const network = async (
  method = 'GET',
  url = '',
  body = null,
  callBack = () => nul,
  useToken = false
) => {
  let uri = `${process.env.api}${url}`
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + btoa('chen:orange0220')
  }
  fetch(uri, {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : null
  })
    .then(res => {
      if (!res.ok) {
        if (res.status === 401) {
          Router.push('login')
        } else if (res.status >= 500) {
          message.error(`服务器错误: ${res.status}`)
        }
        throw Error(res.statusText)
      }
      return res
    })
    .then(res => res.json())
    .then(res => {
      callBack(res)
    })
    .catch(err => {
      console.error(err)
      callBack({ data: null })
    })
}

export default network