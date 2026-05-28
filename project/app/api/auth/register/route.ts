import { prisma } from '@/lib/prisma'
import { signToken } from '@/lib/jwt'
import { NextResponse } from 'next/server'
import argon2 from 'argon2'

export async function POST(req: Request) {
    const { pseudo, email, password } = await req.json()

    const user = await prisma.user.findFirst({ where: { email } })

    if (user) {
        return NextResponse.json({ error: 'account already exist' }, { status: 401 })
    }

    const newUser = await prisma.user.create({
        data: {
            pseudo: pseudo,
            email: email,
            password: await argon2.hash(password, { type: argon2.argon2i }),
            role: 'user',
        },
    })

    const token = signToken({ id: newUser.id, email: newUser.email, role: newUser.role })

    return NextResponse.json({ token })
}