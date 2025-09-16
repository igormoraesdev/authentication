import { jwtService } from '@/lib/jwt/jwt';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET || 'segredo_supersecreto';

type RouteHandler = (_req: NextRequest, _tokenData: CustomUser) => Promise<NextResponse | void>;

export function withAuth(handler: RouteHandler) {
  return async function (req: NextRequest) {
    try {
      const token = await getToken({ req, secret });

      if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const user = await jwtService.decode<CustomUser>(token.accessToken);

      return handler(req, user);
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  };
}
