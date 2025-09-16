import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    return NextResponse.json([
      { id: 1, action: 'Fez login' },
      { id: 2, action: 'Atualizou perfil' },
      { id: 3, action: 'Criou um novo post' },
    ]);
  } catch (error) {
    logger.log('Error getting recent activities', error);
  }
};
