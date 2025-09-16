export const runtime = 'nodejs';

import { Dashboard } from '@/components/features';
import { userService } from '@/lib/service';
import { cookies } from 'next/headers';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const headers = {
    cookie: cookieHeader,
  };
  const user = await userService.getProfile({ headers });

  return <Dashboard user={user as CustomUser} />;
}
