import { Router } from 'express'
import { createTask } from '../services/tasks'

export const tasksRouter = Router()

tasksRouter.post('/', async (req, res) => {
  try {
    const { id: taskId } = await createTask((req as any).user, req.body)

    res.status(201).json({ taskId })
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unkown error' })
  }
})
