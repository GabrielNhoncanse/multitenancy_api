import { UUID } from 'crypto'

export type Company = {
  id: UUID
  name: string
  CNPJ: string
  created_date: string
}

export type CreateCompanyParams = {
  name: string
  CNPJ: string
}

export type CreateCompanyResult = {
  id: UUID
}
