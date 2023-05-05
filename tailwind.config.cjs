/** @type {import('tailwindcss').Config} */
module.exports = {
	important: true,
	content: ['./index.html', './src/**/*.{vue,js,ts}'],
	safelist: [
		{
			pattern:
				/^(bg|text|border)-(slate|gray|zinc|neutral|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)(-)?(100|200|300|400|500|600|700|800|900)?$/,
		},
	],
	theme: {
		extend: {
			colors: {
				primary: {
					1: '#5465ff',
					2: '#788bff',
					3: '#9bb1ff',
					4: '#bfd7ff',
					5: '#e2fdff',
				},
				secondary: {
					1: '#0d1b2a',
					2: '#1b263b',
					3: '#415a77',
				},
				state: {
					info: '#4cb8fc',
					warning: '#fcb84c',
					error: '#fc4c4c',
					success: '#76db82',
				},
			},
		},
	},
	plugins: [],
};
