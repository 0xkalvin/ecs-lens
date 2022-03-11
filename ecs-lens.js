#! /usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const output = require('./lib/output')
const ecs = require('./lib/ecs')
const { supportedUnitsForPeriod } = require('./lib/constants')

function parseOptions (rawOptions) {
  const { cluster, region, period } = rawOptions
  const options = {}

  options.cluster = cluster
  options.region = region

  if (period) {
    const periodUnit = period[0]
    const periodValue = Number(period.slice(1))

    if (!supportedUnitsForPeriod.has(periodUnit)) {
      throw new Error('Invalid unit for period')
    }

    if (!Number.isInteger(periodValue) || periodValue <= 0) {
      throw new Error('Invalid value for period')
    }

    options.period = [periodUnit, periodValue]
  }

  return options
}

async function run (options) {
  const parsedOptions = parseOptions(options)

  output.printInitialMessage(parsedOptions)

  const deployments = await ecs.getDeploments(parsedOptions)

  const table = output.buildResultTable(deployments)

  output.printResults(table)
}

if (require.main === module) {
  const argv = yargs(hideBin(process.argv))
    .usage('Usage: ecs-lens [options]')
    .example('ecs-lens --region us-east-1 --cluster mycluster')
    .example('ecs-lens -r us-east-1 -c mycluster -p d2')
    .alias('r', 'region')
    .nargs('r', 1)
    .describe('r', 'AWS region')
    .demandOption(['r'])
    .alias('c', 'cluster')
    .nargs('c', 1)
    .describe('c', 'ECS cluster name')
    .demandOption(['c'])
    .alias('p', 'period')
    .nargs('p', 1)
    .describe('p', '(Optional) The period from now in which deployments should be searched for. It supports filtering by last X days/hours/minutes. The format must be the unit followed by the value. For instance: d2 (last 2 days), h30 (last 30 hours), m15 (last 15 minutes).')
    .alias('v', 'version')
    .help('h')
    .alias('h', 'help')
    .argv

  run(argv)
}

module.exports.run = run
