import { Api } from '@/services/config';
import type { HTTPMethod } from '@/services';

import { SurveyDTO } from '@/models';
import { useSnackbarStore } from '@/store/snackbar';

interface SurveyParams {
	data?: SurveyDTO | [string];
	url: string;
	method: HTTPMethod;
}

export const surveyHandler = async ({ data, url, method }: SurveyParams) => {
	const API = new Api();
	const { showSnackbar } = useSnackbarStore();
	let response;
	try {
		switch (method.toLowerCase()) {
			case 'get':
				response = await API.get(url);
				return response;
			case 'post':
				await API.post(url, data);
				break;
			case 'put':
				await API.put(url, data);
				break;
			case 'patch':
				await API.patch(url, data);
				break;
			case 'delete':
				await API.delete(url);
				break;
			default:
				break;
		}
	} catch (error) {
		if (error !== 'NOT_TOKEN') showSnackbar('error', error as string);
		throw error;
	}
};
