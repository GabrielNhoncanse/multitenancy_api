import express from 'express'
import { companiesRouter, usersRouter } from './routers'

export async function buildApp () {
  const app = express()

  app.use(express.json())

  app.get('/health', (req, res) => {
    res.send('Server is running')
  })

  app.use('/companies', companiesRouter)
  app.use('/users', usersRouter)

  return app
}
