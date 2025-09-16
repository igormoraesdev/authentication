import { logger } from '@/lib/logger';

export class UserService {
  async getProfile(config?: { headers?: HeadersInit }): Promise<CustomUser | undefined> {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user-profile`, {
        method: 'GET',
        headers: {
          ...config?.headers,
        },
        cache: 'no-store',
      });

      if (!res.ok) {
        logger.log('Error getting user profile', res.statusText);
        return undefined;
      }

      const data: CustomUser = await res.json();
      return data;
    } catch (error) {
      logger.log('Error getting user profile', error);
      return undefined;
    }
  }
  async getRecentActivities(config?: { headers?: HeadersInit }): Promise<Activites[] | undefined> {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recent-activities`, {
        method: 'GET',
        headers: {
          ...config?.headers,
        },
        credentials: 'include',
        cache: 'no-store',
      });

      if (!res.ok) {
        logger.log('Error getting recent activities', res.statusText);
        return undefined;
      }

      const data: Activites[] = await res.json();
      return data;
    } catch (error) {
      logger.log('Error getting recent activities', error);
      return undefined;
    }
  }
}

export const userService = new UserService();
