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
    } catch {
      logger.server('Error getting user profile');
    }
  }
  async getRecentActivites(): Promise<Activites[] | undefined> {
    try {
      const response = await this.client.get<Activites[]>(`${this.baseEndpoint}/recent-activities`);
      return response.data;
    } catch {
      logger.frontend('Error getting recent activities');
    }
  }
}

export const userService = new UserService();
