export interface HttpRequestConfig {
  readonly url: string;
  readonly method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  readonly headers?: Record<string, string>;
  readonly params?: Record<string, unknown>;
  readonly data?: unknown;
  readonly timeout?: number;
}

export interface HttpResponse<T = unknown> {
  readonly data: T;
  readonly status: number;
}

export interface HttpError {
  readonly message: string;
  readonly status?: number;
  readonly statusText?: string;
  readonly data?: unknown;
}

export interface IHttpClient {
  get<T = unknown>(
    _url: string,
    _config?: Omit<HttpRequestConfig, 'url' | 'method'>,
  ): Promise<HttpResponse<T>>;
  post<T = unknown>(
    _url: string,
    _data?: unknown,
    _config?: Omit<HttpRequestConfig, 'url' | 'method' | 'data'>,
  ): Promise<HttpResponse<T>>;
  put<T = unknown>(
    _url: string,
    _data?: unknown,
    _config?: Omit<HttpRequestConfig, 'url' | 'method' | 'data'>,
  ): Promise<HttpResponse<T>>;
  delete<T = unknown>(
    _url: string,
    _config?: Omit<HttpRequestConfig, 'url' | 'method'>,
  ): Promise<HttpResponse<T>>;
  patch<T = unknown>(
    _url: string,
    _data?: unknown,
    _config?: Omit<HttpRequestConfig, 'url' | 'method' | 'data'>,
  ): Promise<HttpResponse<T>>;
}
