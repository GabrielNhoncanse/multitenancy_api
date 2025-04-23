import { UUID } from 'crypto'

export type CreateUserParams = {
  name: string
  email: string
  role: UserRoleOptions
  password: string
}

export type CreateUserResult = {
  id: UUID
}

export type GetUserByEmailResult = {
  id: UUID
  companyId: UUID
  passwordHash: string
  role: UserRoleOptions
}

export type SignInUserParams = {
  email: string
  password: string
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
