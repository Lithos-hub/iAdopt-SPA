import { Form } from '@/models';
import { Api } from '@/services/config';
import { useSnackbarStore } from '@/store/snackbar';

export const chatGPTHandler = async (data: Form) => {
	const { showSnackbar } = useSnackbarStore();
	try {
		const API = new Api();
		return await API.post('/gpt', data);
	} catch (error) {
		showSnackbar('error', error as string);
		throw error;
	}
};
