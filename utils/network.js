import { message } from "antd"
import Router from "next/router"
import Cookies from 'universal-cookie'
const network = async (
  method = 'GET',
  url = '',
  body = null,
  callBack = () => nul,
  useToken = true
) => {
  let uri = `${process.env.api}${url}`

  let headers = {
    'Content-Type': 'application/json'
  }
  if (useToken) {
    const cookies = new Cookies()
    const access = await cookies.get('access')
    headers.Authorization = 'Bearer ' + access
    if (!access || access === undefined || access === 'undefined') {
      Router.push('login')
    }
  }
  fetch(uri, {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : null
  })
    .then(res => {
      if (!res.ok) {
        if (res.status === 400) {
          message.error(`请求错误: ${res.status}`)
        }
        else if (res.status === 401) {
          // 清除access然后跳转到登录
          // Router.push('login')
        } else if (res.status >= 500) {
          message.error(`服务器错误: ${res.status}`)
        }
        throw Error(res.statusText)
      }
      return res
    })
    .then((res) => res.json())
    .then(res => {
      callBack(res)
    })
    .catch(err => {
      console.error(err)
      callBack({ data: null })
    })
}

export default network