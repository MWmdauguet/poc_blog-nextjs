'use server';

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