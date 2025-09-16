import { logger } from '@/lib/logger';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET!;
if (!secret) throw new Error('NEXTAUTH_SECRET não definido!');

type RouteHandler = (_req: NextRequest) => Promise<NextResponse | void>;

export function withAuth(handler: RouteHandler) {
  return async function (req: NextRequest) {
    try {
      const token = await getToken({ req, secret });

      if (!token) {
        logger.log('Error withAuth', new Error('Token não encontrado!'));
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      return handler(req);
    } catch (error) {
      logger.log('Error withAuth', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  };
}
