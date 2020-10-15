import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import dotenv from 'dotenv'
import path from 'path'
import 'reflect-metadata'

import app from './app'
import { authMiddleware } from './shared/middlewares'

const PORT = process.env.PORT || 8000

const start = async () => {

  dotenv.config({
    path: path.join(__dirname, '../config/', `${process.env.NODE_ENV || 'development'}.env`)
  })

  await createConnection();

  const schema = await buildSchema({
    resolvers: [`${__dirname}/**/*Resolver.{ts,js}`],
    authChecker: authMiddleware
  })

  const server = new ApolloServer({
    schema,
    playground: process.env.NODE_ENV !== 'production',
    context: ({ req }) => ({ req }),
  })

  server.applyMiddleware({ app })

  app.listen(PORT, () => console.info(`Listening on port: ${PORT}`))
}

start()