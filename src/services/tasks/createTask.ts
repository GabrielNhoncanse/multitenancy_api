import * as yup from 'yup'
import { Authentication, CreateCompanyResult, CreateTaskParams } from '../../types'
import { TasksRepository } from '../../repositories'

const newTaskShape = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().nullable(),
  dueDate: yup.date().typeError('Due date must be a valid date in ISO format. (e.g.: 2025-04-28T14:00:00Z)').required()
})

const tasksRepository = new TasksRepository()

export async function createTask (
  authentication: Authentication,
  params: CreateTaskParams
): Promise<CreateCompanyResult> {
  await newTaskShape.validate(params)

  if (authentication.role === 'user') throw new Error('User not authorized')

  const result = await tasksRepository.create(authentication, params)

  return result
}
