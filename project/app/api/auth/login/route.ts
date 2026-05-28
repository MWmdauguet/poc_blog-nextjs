import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/jwt'
import { NextResponse } from 'next/server'
import argon2 from 'argon2'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const user = await prisma.user.findFirst({ where: { email } })

  if (!user || !await argon2.verify(user.password, password)) {
    return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 })
  }

  const token = signToken({ id: user.id, email: user.email, role: user.role })

  return NextResponse.json({ token })
}