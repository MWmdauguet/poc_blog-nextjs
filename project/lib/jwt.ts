import jwt, { SignOptions } from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET!

export interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

export function signToken(payload: JwtPayload, expiresIn: SignOptions['expiresIn'] = '7d') {
  return jwt.sign(payload, SECRET, { expiresIn })
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, SECRET) as JwtPayload
}