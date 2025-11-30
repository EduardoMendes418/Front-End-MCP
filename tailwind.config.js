/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				primary: {
					50: "#f0f9ff",
					100: "#e0f2fe",
					500: "#3b82f6",
					600: "#2563eb",
					700: "#1d4ed8",
					900: "#1e3a8a",
				},
				dark: {
					100: "#1f2937",
					200: "#111827",
					300: "#0f172a",
				},
			},
			animation: {
				"pulse-slow": "pulse 3s linear infinite",
				"bounce-slow": "bounce 2s infinite",
				float: "float 3s ease-in-out infinite",
			},
			keyframes: {
				float: {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-10px)" },
				},
			},
		},
	},
	plugins: [],
};
