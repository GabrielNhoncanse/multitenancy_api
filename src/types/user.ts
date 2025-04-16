import { UUID } from 'crypto'

export type CreateUserParams = {
  companyId: UUID
  name: string
  email: string
  role: UserRoleOptions
  plainPassword: string
}

export type CreateUserResult = {
  id: UUID
}

export type User = {
  id: UUID
  companyId: UUID
  name: string
  email: string
  role: UserRoleOptions
  passwordHash: string
  createdDate: string
}

export type UserRoleOptions = 'admin' | 'manager' | 'user'
