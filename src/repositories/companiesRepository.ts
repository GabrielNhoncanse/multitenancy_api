import { UUID } from 'crypto'
import { pool } from '../database/pool'
import { CreateCompanyParams, CreateCompanyResult } from '../types'

export class CompaniesRepository {

  async create (
    params: CreateCompanyParams
  ): Promise<CreateCompanyResult> {
    const { name, cnpj } = params

    const alreadyExists = await pool.query<{ id: string }>(`
      SELECT id FROM companies WHERE cnpj = $1`,
      [cnpj]
    )

    if (alreadyExists.rows.length > 0) {
      throw new Error('Company alredy registered')
    }

    const { rows } = await pool.query<{ id: UUID }>(`
      INSERT INTO companies (name, cnpj)
      VALUES ($1, $2)
      RETURNING id`,
      [name, cnpj]
    )

    const newId = rows[0].id

    return { id: newId }
  }
}
