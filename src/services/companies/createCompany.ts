import { CompanyRepository } from '../../repositories'
import { Company, User } from '../../types'
import * as yup from 'yup'

type createCompanyParams = {
  newCompany: Pick<Company, 'name' | 'cnpj'>
}

const newCompanyShape = yup.object().shape({
  name: yup.string().required(),
  cnpj: yup.string().required().length(14, 'CNPJ must have 14 digits')
})

const companyRepository = new CompanyRepository()

export async function createCompany (
  params: createCompanyParams
) {
  const { newCompany } = params
  newCompany.cnpj = sanitize(newCompany.cnpj)

  await newCompanyShape.validate(newCompany)

  const newId = await companyRepository.create(newCompany)

  return newId
}

function sanitize (text: string) {
  return text.replace(/\D/g, '')
}
