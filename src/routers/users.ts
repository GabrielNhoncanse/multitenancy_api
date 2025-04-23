import { Router } from 'express'
import { createUser } from '../services/users'

export const usersRouter = Router()

usersRouter.post('/', async (req, res) => {
  try {
    const { id: userId } = await createUser((req as any).user, req.body)

    res.status(201).json({ userId })
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unkown error' })
  }
})
