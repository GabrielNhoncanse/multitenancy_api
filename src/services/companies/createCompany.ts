import { CompanyRepository } from '../../repositories'
import { CreateCompanyParams } from '../../types'
import * as yup from 'yup'

const newCompanyShape = yup.object().shape({
  name: yup.string().required(),
  cnpj: yup.string().required().length(14, 'CNPJ must have 14 digits')
})

const companyRepository = new CompanyRepository()

export async function createCompany (
  params: CreateCompanyParams
) {
  params.cnpj = sanitize(params.cnpj)

  await newCompanyShape.validate(params)

  const newId = await companyRepository.create(params)

  return newId
}

function sanitize (text: string) {
  return text.replace(/\D/g, '')
}
