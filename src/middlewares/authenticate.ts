import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET_TOKEN

export const authenticate: RequestHandler = (req, res, next) => {
  const authorizationHeader = req.headers['authorization'] // Authorization: Bearer <token>
  const jwtToken = authorizationHeader?.split(' ')[1]

  if (!jwtToken) {
    res.status(401).json({ error: 'Authorization token not provided' })
    return
  }

  if (!JWT_SECRET) {
    console.error('JWT_SECRET_TOKEN is not defined ')
    res.status(500).send('Internal server error')
    return
  }

  jwt.verify(jwtToken, JWT_SECRET, (error, decoded) => {
    if (error) { return res.status(403).json({ error: 'Invalid or expired authorization token' }) }

    (req as any).user = decoded
    next()
  })
}
