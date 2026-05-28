import jwt, { SignOptions } from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET!

export function signToken(payload: object, expiresIn: SignOptions['expiresIn'] = '7d') {
  return jwt.sign(payload, SECRET, { expiresIn })
}

export function verifyToken<T>(token: string): T {
  return jwt.verify(token, SECRET) as T
}