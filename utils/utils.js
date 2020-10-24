const timeformat = (date, symbol = '-') => {
  let time = new Date(date)
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const day = time.getDate()
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  return year + symbol +
    month.toString().padStart(2, '0') + symbol +
    day.toString().padStart(2, '0') + ' ' +
    hours.toString().padStart(2, '0') + ':' +
    minutes.toString().padStart(2, '0') + ':' +
    seconds.toString().padStart(2, '0')
}


export default {
  timeformat
}