const supportedUnitsForPeriod = new Set(['d', 'h', 'm'])

const supportedUnitsToMilliseconds = {
  d: 24 * 60 * 60 * 1000,
  h: 60 * 60 * 1000,
  m: 60 * 1000
}

const periodsInSeconds = {
  days: 86400,
  hours: 3600,
  minutes: 60,
  seconds: 1
}

module.exports = {
  periodsInSeconds,
  supportedUnitsForPeriod,
  supportedUnitsToMilliseconds
}
