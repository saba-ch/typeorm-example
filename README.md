# Type graphql + typeorm example

## Basic Authorization Features:
- register
- login
- forgot password
- recover password
- query current user

## Stack
- NodeJS
- Typescript
- TypeOrm
- Type Graphql
- Apollo Server
- Docker
- Postgress

## Setup

```bash
git clone git@github.com:saba-coding/typeorm-example.git # Clone the project

cd typeorm-example # get inside project dir

yarn # install dependencies

yarn start:local # start development_local
```

## Commands

```bash
yarn start:local # Starts server with watch mode and development_local env

yarn start:dev # Starts server with development environment (required development build)

yarn build:dev # Builds development server(required development build)
```

## Running with docker

```bash
docker build -t type-graphql-example . # Build docker image

docker run --publish 8000:8000 --it type-graphql-example:latest # Run docker image with exposing port 8000
```