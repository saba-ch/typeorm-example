import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import dotenv from 'dotenv'
import path from 'path'
import 'reflect-metadata'

import app from './app'
import { authMiddleware } from './shared/middlewares'

const PORT = process.env.PORT || 8000
const configPath = process.env.NODE_ENV === 'development_local' ? path.join(__dirname, '../config/development_local.env') : path.join(__dirname, '../../config/', `${process.env.NODE_ENV}.env`)

const start = async () => {
  dotenv.config({ path: configPath })

  if (!process.env.DB_PORT) throw new Error('You must provide DB_PORT')
  if (!process.env.DB_USER) throw new Error('You must provide DB_USER')
  if (!process.env.DB_PASS) throw new Error('You must provide DB_PASS')
  if (!process.env.DB_NAME) throw new Error('You must provide DB_NAME')

  await createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    logging: process.env.NODE_ENV !== 'production',
    synchronize: true,
    extra: {
      socketPath: process.env.SOCKET_PATH
    },
    entities: [
      process.env.NODE_ENV === 'development_local' ? "src/**/*Entity.*" : "dist/src/**/*Entity.*"
    ]
  });

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