import jwtService from '@/lib/jwt/jwt';
import { logger } from '@/lib/logger';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function requireAuth(req: NextRequest): Promise<{ user: CustomUser } | NextResponse> {
  try {
    const token = await getToken({ req, secret });
    console.log('token', token);
    if (!token) {
      logger.log('requireAuth: token não encontrado');
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    const user = (await jwtService.decode(token.accessToken)) as CustomUser;

    console.log('user', user);

    return { user };
  } catch (error) {
    logger.log('requireAuth: erro ao verificar token', error);
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }
}
