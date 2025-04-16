import { CompaniesRepository } from '../../repositories'
import { CreateCompanyParams } from '../../types'
import * as yup from 'yup'

const newCompanyShape = yup.object().shape({
  name: yup.string().required(),
  cnpj: yup.string().required().length(14, 'CNPJ must have 14 digits')
})

const companiesRepository = new CompaniesRepository()

export async function createCompany (
  params: CreateCompanyParams
) {
  params.cnpj = sanitize(params.cnpj)

  await newCompanyShape.validate(params)

  const newId = await companiesRepository.create(params)

  return newId
}

function sanitize (text: string) {
  return text.replace(/\D/g, '')
}
