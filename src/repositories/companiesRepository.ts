import { pool } from '../database/pool'
import { CreateCompanyParams, CreateCompanyResult } from '../types'

export async function createCompany (
  data: CreateCompanyParams
): Promise<CreateCompanyResult> {
  const { rows } = await pool.query(
    `
    INSERT INTO companies (name, cnpj)
    VALUES ($1, $2)
    RETURNING id
    `,
    [data.name, data.CNPJ]
  )

  const newId = rows[0].id

  return { id: newId }
}
