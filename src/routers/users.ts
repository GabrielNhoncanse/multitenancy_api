import { Router } from 'express'
import { createUser } from '../services/users'
import { listTasksByUserId } from '../services/tasks/listTasksByUserId'
import { UUID } from 'crypto'

export const usersRouter = Router()

usersRouter.get('/:id/tasks', async (req, res) => {
  try {
    const tasks = await listTasksByUserId((req as any).user, req.params.id as UUID)

    res.status(200).json({ tasks })
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unkown error' })
  }
})

usersRouter.post('/', async (req, res) => {
  try {
    const { id: userId } = await createUser((req as any).user, req.body)

    res.status(201).json({ userId })
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unkown error' })
  }
})
