import type { HttpError, HttpRequestConfig, HttpResponse, IHttpClient } from '@/lib/api/types';
import axios, { type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';

export class AxiosHttpClient implements IHttpClient {
  private readonly axiosInstance: AxiosInstance;

  constructor(baseURL?: string, timeout: number = 10000) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
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
