import { requireAuth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const user = await requireAuth(req);

  return NextResponse.json(user);
};
