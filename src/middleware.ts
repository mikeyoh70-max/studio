import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This middleware is not actively used for auth anymore,
// but can be used for other purposes in the future.
export function middleware(request: NextRequest) {
  return NextResponse.next()
}
 
export const config = {
  // No routes are matched.
  matcher: [],
}
