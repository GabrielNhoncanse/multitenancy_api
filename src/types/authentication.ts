import { UUID } from 'crypto'
import { UserRoleOptions } from './user'

export type Authentication = {
  companyId: UUID
  userId: UUID
  role: UserRoleOptions
}
