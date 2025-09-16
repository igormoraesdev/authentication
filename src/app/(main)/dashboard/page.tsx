import { Dashboard } from '@/components/features';
import { userService } from '@/lib/service';
import { cookies } from 'next/headers';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const user = await userService.getProfile({
    headers: {
      cookie: cookieStore?.toString(),
      cache: 'no-store',
    },
  });
  return <Dashboard user={user as CustomUser} />;
}
