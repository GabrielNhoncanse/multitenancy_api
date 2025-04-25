import { UUID } from 'crypto'
import { pool } from '../database/pool'
import { Authentication, CreateTaskParams, CreateTaskResult, Task, UpdateTaskParams } from '../types'

export class TasksRepository {

  async create (
    authentication: Authentication,
    params: CreateTaskParams
  ): Promise<CreateTaskResult> {
    const { companyId, userId } = authentication
    const { title, description, dueDate, status } = params

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
      INSERT INTO tasks (company_id, user_id, title, description, due_date, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id`,
      [companyId, userId, title, description, dueDate, status]
    )

    return { id: result.rows[0].id }
  }

  async getById (
    authentication: Authentication,
    id: UUID
  ): Promise<Task> {
    const { companyId } = authentication

    const { rows } = await pool.query<Task>(`
      SELECT id, company_id AS "companyId", user_id AS "userId", title, description, created_date AS "createdDate", due_date AS "dueDate", status
      FROM tasks
      WHERE id = $1
        AND company_id = $2`,
      [id, companyId]
    )

    if (rows.length === 0) throw new Error(`No task with id ${id} found on company ${companyId}`)

    return rows[0]
  }

  async update (
    params: UpdateTaskParams,
    taskId: UUID
  ): Promise<void> {
    const entries = Object.entries(params)

    const properties = entries.map(([key], index) => {
      return `${key} = $${index + 1}`
    }).join(', ')

    const values: string[] = entries.map(([_, value]) => {
      return value!
    })
    values.push(taskId)

    const query = `UPDATE tasks SET ${properties} WHERE id = $${values.length}`

    await pool.query(query, values)
  }
}
