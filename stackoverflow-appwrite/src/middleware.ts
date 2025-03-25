import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getOrCreateStorage } from './models/server/storage.collection'
import { getOrCreateDb } from './models/server/dbsetup'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  await Promise.all([
    getOrCreateStorage(),
    getOrCreateDb()
  ])
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
    /*
    match all request paths except for the ones that start with:
    - api
    -_next/static
    -_next/image
    - favicon.ico
    */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}