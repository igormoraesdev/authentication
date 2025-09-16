import jwtService from '@/lib/jwt/jwt';
import { logger } from '@/lib/logger';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// export const GET = withAuth(async (_req: NextRequest, user: CustomUser | unknown) => {
//   try {
//     console.log('ENTREI NA ROTA USER PROFILE');
//     return NextResponse.json(user);
//   } catch (error) {
//     logger.log('Error getting user profile', error);
//   }
// });

export const GET = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token) {
    logger.log('Error withAuth');
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  const user = await jwtService.decode(token.accessToken);
  return NextResponse.json(user);
};
