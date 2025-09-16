import { httpClient } from '@/lib/api';
import { logger } from '@/lib/logger';

export class AuthService {
  private readonly client = httpClient;
  private readonly baseEndpoint = '/api/auth';

  async login(credentials: Auth.Params): Promise<Auth.Response | undefined> {
    try {
      const response = await this.client.post<Auth.Response>(
        `${this.baseEndpoint}/signin`,
        credentials,
      );
      return response.data;
    } catch (error) {
      logger.log('Error login', error);
    }
  }
}

export const authService = new AuthService();
