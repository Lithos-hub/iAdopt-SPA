// Utilities
import { defineStore } from 'pinia';

import { Report, Survey } from '@/models';
import { getUserData } from '@/services';

interface UserStoreState {
	isLoading: boolean;
	user: {
		token: string;
		email: string;
		reports: Report[];
		surveys: Survey[];
	};
}

export const useUserStore = defineStore('user', {
	state: (): UserStoreState => ({
		isLoading: false,
		user: {
			token: 'fake-token',
			email: 'example@example.com',
			reports: [],
			surveys: [],
		},
	}),
	actions: {
		logout() {
			this.user = {
				token: '',
				email: '',
				reports: [],
				surveys: [],
			};
			localStorage.clear();
		},
		async getUserData() {
			this.isLoading = true;
			try {
				const { data } = await getUserData();
				this.user = data.user;
			} catch (error) {
				console.log(error);
			} finally {
				this.isLoading = false;
			}
		},
	},
});

//
