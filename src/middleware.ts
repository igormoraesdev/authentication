import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;

  const isAuthPage = nextUrl.pathname.includes('/auth/signin');
  const isDashboard = nextUrl.pathname.startsWith('/dashboard');

  if (!isAuthenticated && isDashboard) {
    return NextResponse.redirect(new URL('/auth/signin', nextUrl.origin));
  }

  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl.origin));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/dashboard', '/auth/signin'],
};
