import { AxiosHttpClient } from './http-client';
import { IHttpClient } from './types';

export interface HttpClientConfig {
  readonly baseURL?: string;
}

export class HttpClientFactory {
  private static instance: IHttpClient | null = null;

  static createClient(config: HttpClientConfig = {}): IHttpClient {
    const { baseURL } = config;

    return new AxiosHttpClient(baseURL);
  }

  static getInstance(config: HttpClientConfig = {}): IHttpClient {
    if (!this.instance) {
      this.instance = this.createClient(config);
    }
    return this.instance;
  }
}

export const httpClient = HttpClientFactory.getInstance({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || '',
});

export default httpClient;
