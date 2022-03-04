# ecs-lens

A command-line interface to view ECS deployment history. Searching for recent deployments across multiple services can be quite inconvenient, specially when you need that information fast. This tool helps you to quickly get an ordered list of deployments that went out for a particular ECS cluster and when they exactly happened.

## Install

```
npm i -g ecs-lens
```

## Usage

```bash
ecs-lens --region us-east-1 --cluster my-microservices
```

```
Usage: ecs-lens [options]

Options:
  -r, --region   AWS region                                           [required]
  -c, --cluster  ECS cluster name                                     [required]
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]

Examples:
  ecs-lens --region us-east-1 --cluster mycluster

Missing required arguments: r, c

```
