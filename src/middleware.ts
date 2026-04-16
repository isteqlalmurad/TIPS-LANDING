import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Countries that should see Arabic hero content
const ARABIC_COUNTRIES = ['SA', 'AE'];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Allow ?geo=SA override for testing (dev only)
  const geoOverride = request.nextUrl.searchParams.get('geo');

  // Vercel provides geolocation headers automatically at the edge
  const country = geoOverride || request.headers.get('x-vercel-ip-country') || 'GB';

  // Set cookie so client components can read it
  response.cookies.set('geo-country', country, {
    path: '/',
    maxAge: 60 * 60, // 1 hour
    sameSite: 'lax',
  });

  // Set header for server components
  response.headers.set('x-geo-country', country);

  // Set dir hint for Arabic countries
  if (ARABIC_COUNTRIES.includes(country)) {
    response.headers.set('x-geo-dir', 'rtl');
    response.headers.set('x-geo-lang', 'ar');
  }

  return response;
}

export const config = {
  // Only run middleware on page routes, not on static assets
  matcher: ['/((?!_next/static|_next/image|favicon|logo|shots|profiles|video).*)'],
};
