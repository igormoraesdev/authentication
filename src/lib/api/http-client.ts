import { auth } from '@/auth';
import type { HttpError, HttpRequestConfig, HttpResponse, IHttpClient } from '@/lib/api/types';
import axios, { type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';
import { getSession } from 'next-auth/react';

export class AxiosHttpClient implements IHttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(baseURL?: string, timeout: number = 10000) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.setInterceptors();
  }

  private setInterceptors() {
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const isServer = typeof window === 'undefined';
        const session = isServer ? await auth() : await getSession();

        if (session?.accessToken) {
          config.headers.Authorization = `Bearer ${session.accessToken}`;
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error),
    );
  }

  private transformError(error: AxiosError): HttpError {
    return {
      message: error.message,
      status: error.response?.status,
    };
  }

  private transformResponse<T>(response: AxiosResponse<T>): HttpResponse<T> {
    return {
      data: response.data,
      status: response.status,
    };
  }

  async get<T = unknown>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
    try {
      const response = await this.axiosInstance.get<T>(url, { ...config });
      return this.transformResponse(response);
    } catch (error) {
      throw this.transformError(error as AxiosError);
    }
  }

  async post<T = unknown>(
    url: string,
    data?: unknown,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<T>> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, { ...config });
      return this.transformResponse(response);
    } catch (error) {
      throw this.transformError(error as AxiosError);
    }
  }

  async put<T = unknown>(
    url: string,
    data?: unknown,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<T>> {
    try {
      const response = await this.axiosInstance.put<T>(url, data, { ...config });
      return this.transformResponse(response);
    } catch (error) {
      throw this.transformError(error as AxiosError);
    }
  }

  async delete<T = unknown>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
    try {
      const response = await this.axiosInstance.delete<T>(url, { ...config });
      return this.transformResponse(response);
    } catch (error) {
      throw this.transformError(error as AxiosError);
    }
  }

  async patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: HttpRequestConfig,
  ): Promise<HttpResponse<T>> {
    try {
      const response = await this.axiosInstance.patch<T>(url, data, { ...config });
      return this.transformResponse(response);
    } catch (error) {
      throw this.transformError(error as AxiosError);
    }
  }
}
