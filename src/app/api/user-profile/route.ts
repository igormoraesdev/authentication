import { withAuth } from '@/lib/auth';
import { logger } from '@/lib/logger';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withAuth(async (_req: NextRequest, user: CustomUser | unknown) => {
  try {
    return NextResponse.json(user);
  } catch (error) {
    logger.log('Error getting user profile', error);
  }
});
