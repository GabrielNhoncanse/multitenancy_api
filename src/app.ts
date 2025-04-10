import express from 'express'
import usersRouter from './routers/users'


export async function buildApp () {
  const app = express()

  app.get('/health', (req, res) => {
    res.send('Server is running')
  })

  app.use('/users', usersRouter)

  return app
}
