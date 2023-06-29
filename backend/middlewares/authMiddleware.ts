import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '../consts'

export const validateUser = () => (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt
    const user = jwt.verify(token, JWT_SECRET_KEY)
    req.user = user
    next()
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError || e instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ ok: false, message: e.message })
    }
    res.status(500).json({ ok: false, message: 'Internal server error' })
  }
}
