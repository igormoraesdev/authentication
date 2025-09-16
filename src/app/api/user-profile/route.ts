import { withAuth } from '@/lib/auth';
import jwtService from '@/lib/jwt/jwt';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export const GET = withAuth(async (req: NextRequest) => {
  const token = await getToken({ req, secret });
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = await jwtService.decode(token.accessToken);
  return NextResponse.json(user);
});
