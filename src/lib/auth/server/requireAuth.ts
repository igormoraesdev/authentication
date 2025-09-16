import jwtService from '@/lib/jwt/jwt';
import { logger } from '@/lib/logger';
import { decode } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function requireAuth(req: NextRequest): Promise<{ user: CustomUser } | NextResponse> {
  try {
    const cookie =
      process.env.NODE_ENV === 'production'
        ? '__Secure-authjs.session-token'
        : 'authjs.session-token';
    const cookieHeader = req.headers.get('cookie');
    const sessionToken = cookieHeader?.split(`${cookie}=`)[1];

    const token = await decode({
      token: sessionToken,
      secret: secret as string,
      salt: 'salt',
    });

    if (!token) {
      logger.log('requireAuth: token não encontrado');
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    const user = (await jwtService.decode(token.accessToken)) as CustomUser;

    return { user };
  } catch (error) {
    logger.log('requireAuth: erro ao verificar token', error);
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }
}
