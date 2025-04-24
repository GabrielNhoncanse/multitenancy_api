import { Authentication, CreateUserParams, CreateUserResult } from '../../types'
import * as yup from 'yup'
import bcrypt from 'bcrypt'
import { UsersRepository } from '../../repositories'

const newUserShape = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email('The entered email is not valid').required(),
  role: yup.string().required().oneOf(['admin', 'manager', 'user']),
  password: yup.string().required()
})

const usersRepository = new UsersRepository()

export async function createUser (
  authentication: Authentication,
  params: CreateUserParams
): Promise<CreateUserResult> {

  if (authentication.role === 'user') throw new Error('User must be an admin or manager to create users')

  await newUserShape.validate(params)

  const passwordHash = await bcrypt.hash(params.password, 13)

  const newUserId = await usersRepository.create(params, passwordHash, authentication.companyId)

  return newUserId
}
