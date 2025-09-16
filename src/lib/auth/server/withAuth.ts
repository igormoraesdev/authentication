import jwtService from '@/lib/jwt/jwt';
import { logger } from '@/lib/logger';
import { User } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET!;
if (!secret) throw new Error('NEXTAUTH_SECRET não definido!');

type RouteHandler = (_req: NextRequest, _user: User | unknown) => Promise<NextResponse | void>;

export function withAuth(handler: RouteHandler) {
  return async function (req: NextRequest) {
    try {
      const token = await getToken({ req, secret });
      logger.log('Token', token);
      if (!token) {
        logger.log('Error withAuth');
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const user = await jwtService.decode(token.accessToken);

      return handler(req, user);
    } catch (error) {
      logger.log('Error withAuth', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  };
}
