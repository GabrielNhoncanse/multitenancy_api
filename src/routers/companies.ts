import { Router } from 'express'
import { createCompany } from '../services/companies'

export const companiesRouter = Router()

companiesRouter.post('/', async (req, res) => {
  try {
    const { id: companyId } = await createCompany(req.body)

    res.status(201).json({ companyId })
  } catch (error) {
    res.status(400).send(error instanceof Error ? error.message : 'Unkown error')
  }
})
