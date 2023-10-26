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
  let uri = `${process.env.api}/api${url}`

  let headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
  if (useToken) {
    const cookies = new Cookies()
    const access = await cookies.get('access')
    headers.Authorization = 'Bearer ' + access
    if (!access || access === undefined || access === 'undefined') {
      // Router.push('login')
    }
  }
  fetch(uri, {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : null
  })
    .then(async res => {
      if (!res.ok) {
        if (res.status === 401) {
          Router.push('/login')
        } else if (res.status >= 500) {
          message.error(res.message || `服务器错误: ${res.status}`)
        } else {
          return res
        }
        throw Error(res.statusText)
      }
      return res
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.message) {
        message.error(res.message)
      }
      return res
    })
    .then(res => {
      callBack(res)
    })
    .catch(err => {
      console.error('请求失败: ', err)
      callBack({ data: null })
    })
}

export default network