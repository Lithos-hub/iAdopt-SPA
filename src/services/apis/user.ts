import { Api } from '@/services';

export const getUserData = async () => {
	const API = new Api();
	return await API.get('/user');
};
