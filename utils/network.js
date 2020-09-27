
const network = (
  method = 'GET',
  url = '',
  body = {},
  callBack = () => nul,
  useToken = false
) => {
  let headers = {
    'Content-Type': 'application/json'
  }
  if (useToken) header.Authorization = 'Basic ' + btoa('chen:orange0220')
  fetch(`${process.env.api}${url}`, {
    method: method,
    headers: headers,
    body: JSON.stringify(body)
  })
    .then(res => {
      if (!res.ok) {
        if (res.status === 401) {
          throw Error('登录失败')
        }
        throw Error(res.statusText)
      }
      return res
    })
    .then(res => res.json())
    .then(res => {
      callBack(res)
    })
    .catch(err => callBack(err))
}

export default network