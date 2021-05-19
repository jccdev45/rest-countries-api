module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				// Dark Mode Elements
				darkblue: `hsl(209, 23%, 22%)`,
				// Dark Mode Background
				vdblue_bg: `hsl(207, 26%, 17%)`,
				// Light Mode Text
				vdblue_text: `hsl(200, 15%, 8%)`,
				// Light Mode Input
				darkgray: `hsl(0, 0%, 52%)`,
				// Light Mode Background
				vlgray: `hsl(0, 0%, 98%)`,
				// Dark Mode Text & Light Mode Elements
				white: `hsl(0, 0%, 100%)`,
			},
			fontFamily: {
				sans: ["Nunito Sans", "sans-serif"],
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
