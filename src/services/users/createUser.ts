import { CreateUserParams, CreateUserResult } from '../../types'
import * as yup from 'yup'
import bcrypt from 'bcrypt'
import { UsersRepository } from '../../repositories'

const newUserShape = yup.object().shape({
  companyId: yup.string().uuid().required(),
  name: yup.string().required(),
  email: yup.string().email('The entered email is not valid').required(),
  role: yup.string().required().oneOf(['admin', 'manager', 'user']),
  plainPassword: yup.string().required()
})

const usersRepository = new UsersRepository()

export async function createUser (
  params: CreateUserParams
): Promise<CreateUserResult> {
  await newUserShape.validate(params)

  const passwordHash = await bcrypt.hash(params.password, 13)

  const newUserId = await usersRepository.create(params, passwordHash)

  return newUserId
}
