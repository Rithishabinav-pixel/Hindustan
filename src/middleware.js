import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('admin_token')?.value
  const isValidSession =
    token && token === process.env.ADMIN_SESSION_SECRET

  if (pathname.startsWith('/admin/dashboard')) {
    if (!isValidSession) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  if (pathname === '/admin/login' || pathname === '/admin') {
    if (isValidSession) {
      return NextResponse.redirect(
        new URL('/admin/dashboard/users', request.url)
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
