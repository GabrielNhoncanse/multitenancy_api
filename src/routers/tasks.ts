import { Router } from 'express'
import { createTask, updateTask } from '../services/tasks'
import { UUID } from 'crypto'

export const tasksRouter = Router()

tasksRouter.post('/', async (req, res) => {
  try {
    const { id: taskId } = await createTask((req as any).user, req.body)

    res.status(201).json({ taskId })
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unkown error' })
  }
})

tasksRouter.patch('/:id', async (req, res) => {
  try {
    await updateTask((req as any).user, req.params.id as UUID, req.body)

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Unkown error' })
  }
})
