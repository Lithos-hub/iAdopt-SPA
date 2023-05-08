import { ref, onMounted } from 'vue';

export const useTailwindMode = () => {
	const mode = ref('dark');

	const toggleMode = () => {
		localStorage.mode = localStorage.mode === 'dark' ? 'light' : 'dark';
		// On page load or when changing themes, best to add inline in `head` to avoid FOUC
		if (
			localStorage.mode === 'dark' ||
			(!('mode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			mode.value = 'dark';
		} else {
			document.documentElement.classList.remove('dark');
			mode.value = 'light';
		}
	};

	onMounted(() => (mode.value = localStorage.mode));

	return { mode, toggleMode };
};
