import { Authentication, Task } from '../../types'
import { TasksRepository } from '../../repositories'
import { UUID } from 'crypto'

const tasksRepository = new TasksRepository()

export async function listTasksByUserId (
  authentication: Authentication,
  userId: UUID
): Promise<Task[]> {
  if (authentication.role === 'user' && authentication.userId !== userId) throw new Error('Unauthorized')

  const tasks = await tasksRepository.listByUserId(authentication, userId)

  return tasks
}
