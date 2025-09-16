import jwtService from '@/lib/jwt/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  if (email !== 'teste@email.com' || password !== '123456') {
    return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  }

  const user = {
    id: '1',
    name: 'John Doe',
    email,
    memberSince: '2023-01-15',
  };

  const token = await jwtService.encode(user);

  return NextResponse.json({ message: 'Login successful', token });
}
