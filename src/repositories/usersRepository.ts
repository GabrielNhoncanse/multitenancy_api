import { UUID } from 'crypto'
import { pool } from '../database/pool'
import { CreateUserParams, CreateUserResult, GetUserByEmailResult } from '../types'
import { PoolClient } from 'pg'

export class UsersRepository {

  async create (
    params: CreateUserParams,
    passwordHash: string,
    client?: PoolClient
  ): Promise<CreateUserResult> {
    const { companyId, name, email, role } = params

    const db = client ?? pool

    const alreadyExists = await db.query<{ id: UUID }>(`
      SELECT id FROM users WHERE email = $1`,
      [email]
    )

    if (alreadyExists.rows.length > 0) {
      throw new Error('Email already registered')
    }

    const { rows } = await db.query<{ id: UUID }>(`
      INSERT INTO users (company_id, name, email, role, password_hash)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id`,
      [companyId, name, email, role, passwordHash]
    )

    const newId = rows[0].id

    return { id: newId }
  }

  async getByEmail (
    email: string
  ): Promise<GetUserByEmailResult> {

    const { rows } = await pool.query<GetUserByEmailResult>(`
      SELECT id, company_id AS "companyId", password_hash AS "passwordHash", role
      FROM users
      WHERE email = $1`,
      [email]
    )

    if (rows.length === 0) {
      throw new Error('User not found')
    }

    return rows[0]
  }
}
