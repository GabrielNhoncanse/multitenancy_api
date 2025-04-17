import { UUID } from 'crypto'
import { pool } from '../database/pool'
import { CreateCompanyParams, CreateCompanyResult } from '../types'
import { PoolClient } from 'pg'

export class CompaniesRepository {

  async create (
    params: Pick<CreateCompanyParams, 'company'>,
    client?: PoolClient
  ): Promise<CreateCompanyResult> {
    const { company } = params

    const db = client ?? pool

    const alreadyExists = await db.query<{ id: string }>(`
      SELECT id FROM companies WHERE cnpj = $1`,
      [company.cnpj]
    )

    if (alreadyExists.rows.length > 0) {
      throw new Error('Company alredy registered')
    }

    const { rows } = await db.query<{ id: UUID }>(`
      INSERT INTO companies (name, cnpj)
      VALUES ($1, $2)
      RETURNING id`,
      [company.name, company.cnpj]
    )

    const newId = rows[0].id

    return { id: newId }
  }
}
