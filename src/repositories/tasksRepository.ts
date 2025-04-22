import { UUID } from 'crypto'
import { pool } from '../database/pool'
import { CreateTaskParams, CreateTaskResult } from '../types'

export class TasksRepository {

  async create (
    params: CreateTaskParams
  ): Promise<CreateTaskResult> {
    const { companyId, userId, title, description, dueDate } = params

    const { rows } = await pool.query<{ companyExists: boolean, userExists: boolean }>(`
      SELECT
        EXISTS (SELECT 1 FROM companies WHERE id = $1) AS "companyExists",
        EXISTS (SELECT 1 FROM users WHERE id = $2) AS "userExists"
      `,
      [companyId, userId]
    )

    const { companyExists, userExists } = rows[0]

    if (!companyExists) {
      throw new Error(`Company with id ${companyId} not found`)
    }

    if (!userExists) {
      throw new Error(`User with id ${userId} not found`)
    }

    const result = await pool.query<{ id: UUID }>(`
      INSERT INTO tasks (company_id, user_id, title, description, due_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id`,
      [companyId, userId, title, description, dueDate]
    )

    return { id: result.rows[0].id }
  }
}
