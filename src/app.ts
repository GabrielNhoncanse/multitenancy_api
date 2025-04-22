import express from 'express'
import { authenticationRouter, companiesRouter, usersRouter } from './routers'

export async function buildApp () {
  const app = express()

  app.use(express.json())

  app.get('/health', (_, res) => { res.status(200).send({ status: 'ok' }) })

  // Unprotected routes
  app.use('/auth', authenticationRouter)
  app.use('/companies', companiesRouter)

  // Protected routes // to-do: add auth middleware
  app.use('/users', usersRouter)

  return app
}
