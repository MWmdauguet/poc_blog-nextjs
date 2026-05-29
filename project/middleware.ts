import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'

export const runtime = 'nodejs'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value
  const { pathname } = request.nextUrl

  if (!token) return NextResponse.redirect(new URL('/login', request.url))

  try {
    const payload = verifyToken(token) as { role: string }

    if (pathname.startsWith('/admin') && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (pathname.startsWith('/user') && payload.role !== 'user' && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url))
    }

  } catch {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*'],
}