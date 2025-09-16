import { requireAuth } from '@/lib/auth';
import { logger } from '@/lib/logger';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    await requireAuth(request);
    return NextResponse.json([
      { id: 1, action: 'Fez login' },
      { id: 2, action: 'Atualizou perfil' },
      { id: 3, action: 'Criou um novo post' },
    ]);
  } catch (error) {
    logger.log('Error getting recent activities', error);
  }
};
