export const runtime = 'nodejs';

import { Dashboard } from '@/components/features';
import { cookies } from 'next/headers';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user-profile`, {
    method: 'GET',
    headers: {
      cookie: cookieHeader,
    },
    cache: 'no-store',
  });
  const user = await res.json();

  return <Dashboard user={user as CustomUser} />;
}
