import { UUID } from 'crypto'
import { pool } from '../database/pool'
import { CreateUserParams, CreateUserResult } from '../types'

export class UsersRepository {

  async create (
    params: CreateUserParams,
    passwordHash: string
  ): Promise<CreateUserResult> {
    const { companyId, name, email, role } = params

    const alreadyExists = await pool.query<{ id: UUID }>(`
      SELECT id FROM users WHERE email = $1`,
      [email]
    )

    if (alreadyExists.rows.length > 0) {
      throw new Error('Email already registered')
    }

    const { rows } = await pool.query<{ id: UUID }>(`
      INSERT INTO users (company_id, name, email, role, password_hash)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id`,
      [companyId, name, email, role, passwordHash]
    )

    const newId = rows[0].id

    return { id: newId }
  }
}
