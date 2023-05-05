import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';

import { VueQueryPlugin } from 'vue-query';

import { MotionPlugin } from '@vueuse/motion';

import { createPinia } from 'pinia';
const pinia = createPinia();

// Vuetify

import 'vuetify/styles';
import { ThemeDefinition, createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import i18n from './plugins/i18n';

const myCustomLightTheme: ThemeDefinition = {
	dark: true,
	colors: {
		primary: '#5465ff',
		secondary: '#788bff',
		black: '#0d1b2a',
	},
};

const vuetify = createVuetify({
	components,
	directives,
	theme: {
		defaultTheme: 'myCustomLightTheme',
		themes: {
			myCustomLightTheme,
		},
	},
});

createApp(App)
	.use(VueQueryPlugin)
	.use(pinia)
	.use(MotionPlugin)
	.use(vuetify)
	.use(router)
	.use(i18n)
	.mount('#app');
