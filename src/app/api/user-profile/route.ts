import { withAuth } from '@/lib/auth';
import jwtService from '@/lib/jwt/jwt';
import { logger } from '@/lib/logger';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export const GET = withAuth(async (req: NextRequest) => {
  try {
    const token = await getToken({ req, secret });
    if (!token) {
      logger.server('GET: User Profile: Unauthorized');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = await jwtService.decode(token.accessToken);
    return NextResponse.json(user);
  } catch {
    logger.server('GET: User Profile: Unauthorized');
  }
});
