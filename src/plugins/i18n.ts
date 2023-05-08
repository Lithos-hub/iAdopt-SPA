// Create i18n config file to get spanish and english translations from @/lang/es.json and @/lang/en.json

import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import es from '@/locales/es.json';

const i18n = createI18n({
	locale: localStorage.getItem('locale') || 'es',
	fallbackLocale: 'es',
	legacy: false,
	globalInjection: true,
	messages: {
		en,
		es,
	},
});

export default i18n;
