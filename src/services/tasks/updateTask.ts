import * as yup from 'yup'
import { Authentication, CreateCompanyResult, UpdateTaskParams } from '../../types'
import { TasksRepository } from '../../repositories'
import { UUID } from 'crypto'

const updateTaskShape = yup.object().shape({
  title: yup.string().nullable(),
  description: yup.string().nullable(),
  due_date: yup.date().typeError('Due date must be a valid date in ISO format. (e.g.: 2025-04-28T14:00:00Z)').nullable(),
  status: yup.string().nullable().oneOf(['to do', 'doing', 'done'])
}).test(
  'at-least-one-task-field',
  'At least one task property must be provided',
  (value) => {
    return !!(value?.title || value?.description || value?.due_date || value?.status)
  }
)

const tasksRepository = new TasksRepository()

export async function updateTask (
  authentication: Authentication,
  taskId: UUID,
  params: UpdateTaskParams
): Promise<void> {
  await updateTaskShape.validate(params)

  const { userId } = await tasksRepository.getById(authentication, taskId)

  if (authentication.role === 'user' && authentication.userId !== userId) throw new Error('Unauthorized')

  await tasksRepository.update(params, taskId)

  return
}
