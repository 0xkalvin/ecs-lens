#! /usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const output = require('./lib/output')
const ecs = require('./lib/ecs')

function parseOptions (rawOptions) {
  const { cluster, region } = rawOptions

  return {
    cluster,
    region
  }
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
    .alias('r', 'region')
    .nargs('r', 1)
    .describe('r', 'AWS region')
    .demandOption(['r'])
    .alias('c', 'cluster')
    .nargs('c', 1)
    .describe('c', 'ECS cluster name')
    .demandOption(['c'])
    .alias('v', 'version')
    .help('h')
    .alias('h', 'help')
    .argv

  run(argv)
}

module.exports.run = run
