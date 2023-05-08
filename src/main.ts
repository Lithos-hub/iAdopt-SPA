import App from './App.vue';
import router from './router';
import { createApp } from 'vue';

import './style.css';

import { VueQueryPlugin } from 'vue-query';

import { MotionPlugin } from '@vueuse/motion';

// Vuetify

import 'vuetify/styles';
import { ThemeDefinition, createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import i18n from './plugins/i18n';

// import { useTailwindMode } from '@/composables/useTailwindMode';
// localStorage.mode = 'dark';
// const { toggleMode } = useTailwindMode();
// toggleMode();

const lightTheme: ThemeDefinition = {
	dark: false,
	colors: {
		primary: '#5465ff',
		secondary: '#788bff',
		black: '#0d1b2a',
		background: '#FFFFFF10',
		surface: '#FFFFFF10',
	},
};

const darkTheme: ThemeDefinition = {
	dark: true,
	colors: {
		primary: '#5465ff',
		secondary: '#788bff',
		black: '#0d1b2a',
		background: '#10101010',
		surface: '#0d1b2a',
	},
};

const vuetify = createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: 'darkTheme',
		themes: {
			darkTheme,
			lightTheme,
		},
	},
});

createApp(App)
	.use(VueQueryPlugin)
	.use(MotionPlugin)
	.use(vuetify)
	.use(router)
	.use(i18n)
	.mount('#app');
