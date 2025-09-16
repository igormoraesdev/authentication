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
      logger.log('Error getting user profile', token);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = await jwtService.decode(token.accessToken);
    return NextResponse.json(user);
  } catch (error) {
    logger.log('Error getting user profile', error);
  }
});
