import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value
 
  // If user is not logged in and is trying to access admin pages, redirect to login
  if (!session && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
 
  // If user is logged in and tries to access login page, redirect to dashboard
  if (session && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }
 
  return NextResponse.next()
}
 
export const config = {
  matcher: ['/admin/:path*', '/login'],
}