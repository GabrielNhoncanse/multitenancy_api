import { Router } from 'express'
import { signIn } from '../services/authentication'

export const authenticationRouter = Router()

authenticationRouter.post('/sign-in', async (req, res) => {
  try {
    const { jwtToken } = await signIn(req.body)

    res.status(200).json({ token: jwtToken })
  } catch (error) {
    res.status(400).send(error instanceof Error ? error.message : 'Unkown error')
  }
})
