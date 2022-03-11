# ecs-lens

A command-line interface to view ECS deployment history. Searching for recent deployments across multiple services can be quite inconvenient, specially when you need that information fast. This tool helps you to quickly get an ordered list of deployments that went out for a particular ECS cluster and when they exactly happened.

## Install

```
npm i -g ecs-lens
```

## Usage

All deployments
```bash
ecs-lens --region us-east-1 --cluster my-microservices
```

Filter by period
```bash
# Deployments from last 2 days
ecs-lens --region us-east-1 --cluster my-microservices -p d2

# Deployments from last 12 hours
ecs-lens --region us-east-1 --cluster my-microservices -p h12

# Deployments from last 40 minutes
ecs-lens --region us-east-1 --cluster my-microservices -p m40
```

Options
```
Usage: ecs-lens [options]

Options:
  -r, --region   AWS region                                           [required]
  -c, --cluster  ECS cluster name                                     [required]
  -p, --period   (Optional) The period from now in which deployments should be searched
                 for. It supports filtering by last X days/hours/minutes. The
                 format must be the unit followed by the value. For instance: d2
                 (last 2 days), h30 (last 30 hours), m15 (last 15 minutes).
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]

Examples:
  ecs-lens --region us-east-1 --cluster mycluster
  ecs-lens -r us-east-1 -c mycluster -p d2

Missing required arguments: r, c
```
