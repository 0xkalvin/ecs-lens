const chalk = require('chalk')
const Table = require('cli-table3')

function buildResultTable (data) {
  const table = new Table({
    chars: {
      top: '═',
      'top-mid': '╤',
      'top-left': '╔',
      'top-right': '╗',
      bottom: '═',
      'bottom-mid': '╧',
      'bottom-left': '╚',
      'bottom-right': '╝',
      left: '║',
      'left-mid': '╟',
      right: '║',
      'right-mid': '╢'
    },
    head: [
      chalk.white.bold('#'),
      chalk.white.bold('Service'),
      chalk.white.bold('Last deployment'),
      chalk.white.bold('Timestamp')
    ],
    style: {
      head: [],
      border: []
    },
    colWidths: [5, 60, 50, 28]
  })

  for (let i = 0; i < data.length; i += 1) {
    const deployment = [
      i + 1,
      data[i].serviceName,
      `${data[i].dateDiff} ago`,
      data[i].createdAt
    ]

    table.push(deployment)
  }

  return table
}

function printInitialMessage ({ cluster, region }) {
  console.log(`Fetching deployment history from ${cluster} in ${region}...`)
}

function printResults (table) {
  console.log(table.toString())
}

module.exports = {
  buildResultTable,
  printInitialMessage,
  printResults
}
