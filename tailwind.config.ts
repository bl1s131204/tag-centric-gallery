import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif']
      },
			colors: {
        gold: "#FFD700",
        emerald: "#25c08a",
        royal: "#2D3A64",
        navbar: "#181b20",
        "navbar-blur": "rgba(24, 27, 32, 0.65)",
        accent: {
          gold: "#FFD700",
          emerald: "#2fe598",
          blue: "#2563eb"
        }
      },
      boxShadow: {
        "glass":
          "0 8px 32px 0 rgba(31, 38, 135, 0.15), 0 1.5px 5px 0 rgba(255, 215, 0, 0.13)"
      },
      backgroundImage: {
        "glass-card":
          "linear-gradient(112deg, rgba(32,37,51,0.9) 90%, rgba(70,89,127,0.7) 100%)"
      },
      borderRadius: {
        xl: "1.2rem",
        full: "9999px"
      },
      transitionDuration: {
        DEFAULT: "300ms"
      },
      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    }
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
