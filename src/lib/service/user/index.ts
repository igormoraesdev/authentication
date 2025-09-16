import { httpClient } from '@/lib/api';

export class UserService {
  private readonly client = httpClient;
  private readonly baseEndpoint = '/api';

  async getProfile(config?: { headers: { cookie: string; cache: string } }): Promise<CustomUser> {
    try {
      const response = await this.client.get<CustomUser>(`${this.baseEndpoint}/user-profile`, {
        headers: config?.headers,
      });
      return response.data;
    } catch (error) {
      throw new Error('Error getting user profile', { cause: error });
    }
  }
}

export const userService = new UserService();
