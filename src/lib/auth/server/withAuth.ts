import { logger } from '@/lib/logger';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

type RouteHandler = (_req: NextRequest) => Promise<NextResponse | void>;

export function withAuth(handler: RouteHandler) {
  return async function (req: NextRequest) {
    try {
      const token = await getToken({ req, secret });

      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      return handler(req);
    } catch {
      throw logger.server('withAuth: Error');
    }
  };
}
