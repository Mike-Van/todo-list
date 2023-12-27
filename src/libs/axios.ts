import axios, { AxiosError, AxiosResponse } from 'axios';

const apiInstance = axios.create({ baseURL: '/api' });

apiInstance.interceptors.response.use(
	(response: AxiosResponse) => response.data,
	(error: AxiosError) => {
		console.error('=== AXIOS CLIENT ERROR ===', error);
		window.alert('An error occurred, please check the console.');
		return Promise.reject(error);
	}
);

export { apiInstance };

declare module 'axios' {
	export interface AxiosInstance {
		request<T = unknown>(config: AxiosRequestConfig): Promise<T>;
		get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
		delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
		head<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T>;
		post<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
		put<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
		patch<T = unknown>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
	}
}
