module.exports = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: false, // or 'media' or 'class' => use depending on dark mode approach
	theme: {
		extend: {
			// Extend colors and themes here
			// If no dark or light theme is available, you can add colors directly to extend
			dark: {
				// Dark Theme colors
			},
			light: {
				// light theme colors
			},
			colors: {
				...require('tailwindcss/defaultTheme').colors,
				'color-green': {
					primary: '#45b901'
				}
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: [require('tailwind-scrollbar-hide')]
};
