import { httpClient } from '@/lib/api';
import { logger } from '@/lib/logger';

export class UserService {
  private readonly client = httpClient;
  private readonly baseEndpoint = '/api';

  async getProfile(config?: {
    headers: { cookie: string; cache: string };
  }): Promise<CustomUser | undefined> {
    try {
      const response = await this.client.get<CustomUser>(`${this.baseEndpoint}/user-profile`, {
        headers: config?.headers,
      });
      return response.data;
    } catch (error) {
      logger.log('Error getting user profile', error);
    }
  }
  async getRecentActivites(): Promise<Activites[] | undefined> {
    try {
      const response = await this.client.get<Activites[]>(`${this.baseEndpoint}/recent-activities`);
      return response.data;
    } catch (error) {
      logger.log('Error getting recent activities', error);
    }
  }
}

export const userService = new UserService();
