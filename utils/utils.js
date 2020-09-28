const timeformat = (date) => {
  let time = new Date(date)
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const day = time.getDate()
  console.log('time', year, month, day);
}


export default {
  timeformat
}