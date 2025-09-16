import { withAuth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export const GET = withAuth(async () =>
  NextResponse.json([
    { id: 1, action: 'Fez login' },
    { id: 2, action: 'Atualizou perfil' },
    { id: 3, action: 'Criou um novo post' },
  ]),
);
