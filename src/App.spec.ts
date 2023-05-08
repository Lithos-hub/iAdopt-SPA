import App from './App.vue';
import { render } from '@testing-library/vue';

describe('Component: App', () => {
	it('renders correctly', () => {
		const view = render(App);
		expect(view).toBeTruthy();
	});
});
