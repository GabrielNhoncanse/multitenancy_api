import { UUID } from 'crypto'

export type Company = {
  id: UUID
  name: string
  cnpj: string
  created_date: string
}

export type CreateCompanyParams = {
  name: string
  cnpj: string
}

export type CreateCompanyResult = {
  id: UUID
}
