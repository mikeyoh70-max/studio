import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// Admin and user login features have been removed.
// This middleware is no longer needed.
export function middleware(request: NextRequest) {
  return NextResponse.next()
}
 
export const config = {
  // No routes are matched.
  matcher: [],
}
