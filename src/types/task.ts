import { UUID } from 'crypto'

export type CreateTaskParams = Pick<Task, 'title' | 'description' | 'dueDate' | 'status'>

export type CreateTaskResult = Pick<Task, 'id'>

export type Task = {
  id: UUID
  companyId: UUID
  userId: UUID
  title: string
  description?: string | null
  createdDate: string
  dueDate: string
  status: TaskStatusOptions
}

export type TaskStatusOptions = 'to do' | 'doing' | 'done'
