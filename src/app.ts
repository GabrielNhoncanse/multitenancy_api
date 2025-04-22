import express from 'express'
import { authenticationRouter, companiesRouter, tasksRouter, usersRouter } from './routers'
import { authenticate } from './middlewares'

export async function buildApp () {
  const app = express()

  app.use(express.json())

  app.get('/health', (_, res) => { res.status(200).send({ status: 'ok' }) })

  // Unprotected routes
  app.use('/auth', authenticationRouter)
  app.use('/companies', companiesRouter)

  // Protected routes // to-do: add auth middleware
  app.use('/tasks', authenticate, tasksRouter)
  app.use('/users', authenticate, usersRouter)

  return app
}
