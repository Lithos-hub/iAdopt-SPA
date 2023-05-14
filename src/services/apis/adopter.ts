import { Api } from '@/services/config';
import { useSnackbarStore } from '@/store/snackbar';

export const handleGetAdopterSurvey = async (link: string) => {
	const { showSnackbar } = useSnackbarStore();
	try {
		const API = new Api();
		const { data } = await API.get(`/adopter/${link}`);
		return data;
	} catch (error) {
		showSnackbar('error', error as string);
		throw error;
	}
};
