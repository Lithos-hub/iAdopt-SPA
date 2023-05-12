import axios, { AxiosHeaders, AxiosInstance } from 'axios';
import {
	requestErrorInterceptor,
	requestInterceptor,
	responseErrorInterceptor,
	responseInterceptor,
} from './interceptors';

export class Api {
	private static instance: unknown;
	public client!: AxiosInstance;

	constructor() {
		if (!Api.instance) {
			this.client = axios.create({
				baseURL: `${import.meta.env.VITE_API_URL}/api/v1/`,
			});
			this.client.interceptors.request.use((config) => {
				(config.headers as AxiosHeaders).set('x-token', localStorage.getItem('token'));
				return config;
			});

			this.client.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
			this.client.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

			Api.instance = this;
		}

		return Api.instance as Api;
	}

	get get() {
		return this.client.get;
	}

	get post() {
		return this.client.post;
	}

	get patch() {
		return this.client.patch;
	}

	get put() {
		return this.client.put;
	}

	get delete() {
		return this.client.delete;
	}

	public setAuthorization() {
		const token = localStorage.getItem('token');
		if (token) {
			this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
			this.client.defaults.headers.common['x-token'] = `${token}`;
		} else {
			this.removeAuthorization();
		}
	}

	public removeAuthorization() {
		if (this.client.defaults.headers.common?.Authorization) {
			delete this.client.defaults.headers.common?.Authorization;
		}
	}

	// HEADER WHEN UPLOADING FILES
	public setFormHeader() {
		this.client.defaults.headers.post['Content-Type'] = 'multipart/form-data';
		this.client.defaults.headers.post.Accept = 'multipart/form-data';
	}

	// HEADER WHEN ANY OTHERS REQUESTS
	public setJsonHeader() {
		this.client.defaults.headers.post['Content-Type'] = 'application/json';
		this.client.defaults.headers.post.Accept = 'application/json';
	}
}
