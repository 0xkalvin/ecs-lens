const {
  DescribeServicesCommand,
  ListServicesCommand,
  ECSClient
} = require('@aws-sdk/client-ecs')

const utils = require('./utils')

async function getServicesByCluster (ecsClient, cluster) {
  try {
    const listCommand = new ListServicesCommand({
      cluster,
      maxResults: 100
    })

    const { serviceArns } = await ecsClient.send(listCommand)

    const servicesNames = serviceArns.map((arn) => {
      const resource = arn.split(':')[5]
      const service = resource.split('/')
      const name = service[service.length - 1]

      return name
    })

    const servicesNamesInGroupsOfTen = utils.groupByArray(servicesNames, 10)

    const promises = []

    for (const servicesNamesgroup of servicesNamesInGroupsOfTen) {
      const describeCommand = new DescribeServicesCommand({
        cluster,
        services: servicesNamesgroup
      })

      const promise = ecsClient.send(describeCommand)

      promises.push(promise)
    }

    const responses = await Promise.all(promises)

    let services = []

    for (const response of responses) {
      services = services.concat(response.services)
    }

    return services
  } catch (error) {
    console.error('Failed to fetch services')
    console.error(error.message)

    process.exit(1)
  }
}

async function getDeploments (options) {
  try {
    const { cluster, region } = options

    const ecsClient = new ECSClient({
      region
    })

    const services = await getServicesByCluster(ecsClient, cluster)

    const deployments = []

    for (const service of services) {
      for (const deployment of service.deployments) {
        const deploymentDate = new Date(deployment.createdAt).toISOString()
        const dateDiff = utils.getPreciseDateDifference(
          new Date().toISOString(),
          deploymentDate
        )

        deployments.push({
          createdAt: deploymentDate,
          serviceName: service.serviceName,
          dateDiff
        })
      }
    }

    const sortedDeployments = deployments.sort(function (deploymentA, deploymentB) {
      const deploymentADate = new Date(deploymentA.createdAt)
      const deploymentBDate = new Date(deploymentB.createdAt)

      if (deploymentADate < deploymentBDate) {
        return -1
      }

      if (deploymentADate > deploymentBDate) {
        return 1
      }

      return 0
    })

    return sortedDeployments
  } catch (error) {
    console.error('Failed to get deployments')
    console.error(error.message)

    process.exit(1)
  }
}

module.exports = {
  getDeploments,
  getServicesByCluster
}
