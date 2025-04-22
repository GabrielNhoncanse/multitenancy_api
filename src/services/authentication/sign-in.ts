import * as yup from 'yup'
import bcrypt from 'bcrypt'
import { SignInUserParams } from '../../types'
import { UsersRepository } from '../../repositories'
import jwt from 'jsonwebtoken'

const signInSchema = yup.object().shape({
  email: yup.string().email('The entered email is not valid').required(),
  password: yup.string().required('Password is required')
})

const usersRepository = new UsersRepository()

export async function signIn (
  params: SignInUserParams
): Promise<{ jwtToken: string }> {
  await signInSchema.validate(params)

  const { password } = params

  const { id, companyId, passwordHash, role } = await usersRepository.getByEmail(params.email)

  const isValidPassword = await bcrypt.compare(password, passwordHash)

  if (!isValidPassword) {
    throw new Error('The given credentials are incorrect')
  }

  if (!process.env.JWT_SECRET_TOKEN) {
    throw new Error('JWT_SECRET_TOKEN is not defined ')
  }

  const jwtToken = jwt.sign({ companyId, userId: id, role }, process.env.JWT_SECRET_TOKEN, { expiresIn: '1h' })

  return { jwtToken }
}
