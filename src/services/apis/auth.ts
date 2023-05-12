import { Api } from '@/services/config';

import { LoginUser } from '@/models';
import { useSnackbarStore } from '@/store/snackbar';

export const authHanlder = async (
	data: LoginUser | undefined,
	url: string,
	method: 'get' | 'post'
) => {
	const API = new Api();
	const { showSnackbar } = useSnackbarStore();
	try {
		const res = await API[method](url, data);
		localStorage.setItem('token', res.data.token);
		API.setAuthorization();
	} catch (error) {
		if (error !== 'NOT_TOKEN') {
			showSnackbar('error', error as string);
		}
		throw error;
	}
};
