const timeformat = (date, symbol = '-') => {
  let time = new Date(date)
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const day = time.getDate()
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  return year + symbol +
    month + symbol +
    day + ' ' +
    hours + ':' +
    minutes + ':' +
    seconds
}


export default {
  timeformat
}