function groupByArray (array, size) {
  const result = []
  let temp = []
  let counter = 0

  for (let i = 0; i < array.length; i += 1) {
    if (counter === size) {
      result.push(temp)
      temp = [array[i]]
      counter = 1
    } else {
      temp.push(array[i])
      counter += 1
    }
  }

  if (temp.length) {
    result.push(temp)
  }

  return result
}

function getPreciseDateDifference (date1, date2) {
  const timestamp1 = Math.floor(new Date(date1).getTime())
  const timestamp2 = Math.floor(new Date(date2).getTime())

  const periodsInSeconds = {
    days: 86400,
    hours: 3600,
    minutes: 60,
    seconds: 1
  }

  const result = {}

  let delta = Math.abs(timestamp1 - timestamp2) / 1000

  Object.keys(periodsInSeconds).forEach((key) => {
    result[key] = Math.floor(delta / periodsInSeconds[key])
    delta -= result[key] * periodsInSeconds[key]
  })

  let dateDiff = ''

  if (result.days > 0) {
    dateDiff += `${result.days} days `
  }

  if (result.hours > 0) {
    dateDiff += `${result.hours} hours `
  }

  if (result.minutes > 0) {
    dateDiff += `${result.minutes} minutes `
  }

  if (result.seconds > 0) {
    dateDiff += `${result.seconds} seconds`
  }

  return dateDiff
}

module.exports = {
  getPreciseDateDifference,
  groupByArray
}
