import { UUID } from 'crypto'

export type Company = {
  id: UUID
  name: string
  cnpj: string
  createdDate: string
}

export type CreateCompanyParams = {
  company: {
    name: string
    cnpj: string
  },
  adminUser: {
    name: string
    email: string
    password: string
  }
}

export type CreateCompanyResult = {
  id: UUID
}
