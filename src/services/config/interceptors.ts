'@/store';
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

interface DataError {
	error: string;
	status: number;
}

export const requestInterceptor = (
	config: InternalAxiosRequestConfig<unknown>
): InternalAxiosRequestConfig<unknown> => {
	return config;
};

export const requestErrorInterceptor = (
	error: unknown
): Promise<InternalAxiosRequestConfig<unknown>> => {
	return Promise.reject(error);
};

export const responseInterceptor = (response: AxiosResponse<unknown>): AxiosResponse<unknown> => {
	return response;
};

export const responseErrorInterceptor = (error: unknown): Promise<AxiosResponse<unknown>> => {
	const data = (error as AxiosError).response?.data as DataError;

	switch (data.status) {
		case 401:
			localStorage.clear();
			break;
	}

	return Promise.reject(data.error);
};
