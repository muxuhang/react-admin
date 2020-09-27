import Router from "next/router"
const network = (
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