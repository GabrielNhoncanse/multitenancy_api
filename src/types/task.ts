import { UUID } from 'crypto'

export type CreateTaskParams = Omit<Task, 'id' | 'createdDate'>

export type CreateTaskResult = Pick<Task, 'id'>

export type Task = {
  id: UUID
  companyId: UUID
  userId: UUID
  title: string
  description?: string | null
  createdDate: string
  dueDate: string
}
