import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import 'reflect-metadata'

import app from './app'
import { createConnection } from 'typeorm'

const PORT = process.env.PORT || 8000

const start = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [`${__dirname}/**/*Resolver.{ts,js}`],
  })

  const server = new ApolloServer({
    schema,
    playground: process.env.NODE_ENV !== 'production',
    context: ({ req }) => ({ req })
  })

  server.applyMiddleware({ app })

  app.listen(PORT, () => console.info(`Listening on port: ${PORT}`))
}

start()