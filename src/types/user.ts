import { UUID } from 'crypto'

export type User = {
  id: UUID,
  company_id: UUID,
  name: string,
  email: string,
  role: 'admin' | 'manager' | 'user',
  plain_password?: string,
  password_hash: string,
  created_date: string
}
