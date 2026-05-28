'use server';
import { verifyToken } from '@/lib/jwt'

import { cookies } from 'next/headers'

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
}

export async function removeSessionCookie() {
    const cookieStore = await cookies()
    cookieStore.delete('session');
}

export async function getSessionCookie() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session');

  if (!session) return null;

  try {
    const payload = verifyToken(session.value)
    return payload;
  } catch {
    return null;
  }
}