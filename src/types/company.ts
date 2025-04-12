import { UUID } from 'crypto'

export type Company = {
  id: UUID
  name: string
  cnpj: string
  createdDate: string
}

export type CreateCompanyParams = {
  name: string
  cnpj: string
}

export type CreateCompanyResult = {
  id: UUID
}
