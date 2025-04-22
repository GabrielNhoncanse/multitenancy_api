import { pool } from '../../database/pool'
import { CompaniesRepository, UsersRepository } from '../../repositories'
import { CreateCompanyParams, CreateCompanyResult } from '../../types'
import * as yup from 'yup'
import bcrypt from 'bcrypt'

const createCompanySchema = yup.object().shape({
  company: yup.object({
    name: yup.string().required(),
    cnpj: yup.string().required()
  }),
  adminUser: yup.object({
    name: yup.string().required(),
    email: yup.string().email('The entered email is not valid').required(),
    password: yup.string().required()
  })
})

const companiesRepository = new CompaniesRepository()
const usersRepository = new UsersRepository()

export async function createCompany (
  params: CreateCompanyParams
): Promise<CreateCompanyResult> {
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    await createCompanySchema.validate(params)

    params.company.cnpj = sanitize(params.company.cnpj)

    const newCompany = await companiesRepository.create(params, client)

    const passwordHash = await bcrypt.hash(params.adminUser.password, 13)

    await usersRepository.create({
      companyId: newCompany.id,
      role: 'admin',
      ...params.adminUser
    },
      passwordHash,
      client
    )

    await client.query('COMMIT')

    return newCompany
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

function sanitize (text: string) {
  return text.replace(/\D/g, '')
}
