import App from './App.vue';
import { render } from '@testing-library/vue';

import { createTestingPinia } from '@pinia/testing';

describe('Component: App', () => {
	it('renders correctly', () => {
		const view = render(App, {
			global: {
				plugins: [createTestingPinia()],
			},
		});
		expect(view).toBeTruthy();
	});
});
