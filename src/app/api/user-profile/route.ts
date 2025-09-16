import { requireAuth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const user = (await requireAuth(req)) as CustomUser;

  return NextResponse.json(user);
};
