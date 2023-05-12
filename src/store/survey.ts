import { Survey, SurveyDTO } from '@/models';
import { surveyHandler } from '@/services';
import { defineStore } from 'pinia';

interface SurveyStore {
	loading: boolean;
	surveysList: Survey[];
	surveyDetails: Survey;
}

export const useSurveyStore = defineStore('useSurvey', {
	state: (): SurveyStore => ({
		loading: false,
		surveysList: [],
		surveyDetails: {
			_id: '',
			title: '',
			link: '',
			is_favourite: false,
		},
	}),
	actions: {
		setLoading(loading: boolean) {
			this.loading = loading;
		},
		async getSurveysList() {
			this.setLoading(true);
			try {
				const response = await surveyHandler({
					url: `/surveys/`,
					method: 'GET',
				});
				if (response) this.surveysList = response.data;
			} catch (error) {
				console.log(error);
			} finally {
				this.setLoading(false);
			}
		},
		async getSurveyDetails(id: string) {
			this.setLoading(true);
			try {
				const response = await surveyHandler({
					url: `/surveys/${id}`,
					method: 'GET',
				});
				if (response) this.surveyDetails = response.data;
			} catch (error) {
				console.log(error);
			} finally {
				this.setLoading(false);
			}
		},
		async updateSurvey(data: SurveyDTO) {
			this.setLoading(true);
			try {
				await surveyHandler({
					url: `/surveys/${data._id}`,
					method: 'PATCH',
					data,
				});
				this.getSurveysList();
			} catch (error) {
				console.log(error);
			} finally {
				this.setLoading(false);
			}
		},
	},
});
