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
				'inter': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
				'poppins': ['Poppins', 'sans-serif'],
				'playfair': ['Playfair Display', 'serif'],
				'mono': ['JetBrains Mono', 'Fira Code', 'monospace']
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1.5' }],
				'sm': ['0.875rem', { lineHeight: '1.6' }],
				'base': ['1rem', { lineHeight: '1.7' }],
				'lg': ['1.125rem', { lineHeight: '1.6' }],
				'xl': ['1.25rem', { lineHeight: '1.5' }],
				'2xl': ['1.5rem', { lineHeight: '1.4' }],
				'3xl': ['1.875rem', { lineHeight: '1.3' }],
				'4xl': ['2.25rem', { lineHeight: '1.2' }],
				'5xl': ['3rem', { lineHeight: '1.1' }],
			},
			colors: {
				// Professional color system
				primary: {
					50: 'hsl(210, 100%, 97%)',
					100: 'hsl(210, 100%, 94%)',
					200: 'hsl(210, 100%, 87%)',
					300: 'hsl(210, 100%, 80%)',
					400: 'hsl(210, 100%, 70%)',
					500: 'hsl(210, 100%, 60%)',
					600: 'hsl(210, 100%, 50%)',
					700: 'hsl(210, 100%, 40%)',
					800: 'hsl(210, 100%, 35%)',
					900: 'hsl(210, 100%, 30%)',
					950: 'hsl(210, 100%, 20%)',
				},
				secondary: {
					50: 'hsl(215, 20%, 95%)',
					100: 'hsl(215, 20%, 90%)',
					200: 'hsl(215, 20%, 85%)',
					300: 'hsl(215, 20%, 75%)',
					400: 'hsl(215, 20%, 65%)',
					500: 'hsl(215, 20%, 50%)',
					600: 'hsl(215, 20%, 40%)',
					700: 'hsl(215, 20%, 30%)',
					800: 'hsl(215, 20%, 25%)',
					900: 'hsl(215, 20%, 20%)',
					950: 'hsl(215, 20%, 15%)',
				},
				neutral: {
					50: 'hsl(210, 40%, 98%)',
					100: 'hsl(210, 40%, 96%)',
					200: 'hsl(214, 32%, 91%)',
					300: 'hsl(213, 27%, 84%)',
					400: 'hsl(215, 20%, 65%)',
					500: 'hsl(215, 16%, 47%)',
					600: 'hsl(215, 19%, 35%)',
					700: 'hsl(215, 25%, 27%)',
					800: 'hsl(217, 33%, 17%)',
					900: 'hsl(222, 84%, 5%)',
					950: 'hsl(229, 84%, 5%)',
				},
				// Legacy colors for compatibility
				"brand-pink": "hsl(340, 82%, 52%)",
				emerald: "hsl(142, 76%, 36%)",
				gold: "hsl(51, 100%, 50%)",
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
			},
			boxShadow: {
				'soft': '0 2px 16px hsla(220, 63%, 6%, 0.15)',
				'medium': '0 4px 24px hsla(220, 63%, 6%, 0.25)',
				'large': '0 8px 40px hsla(220, 63%, 6%, 0.35)',
				'glow': '0 0 40px hsla(210, 100%, 60%, 0.15)',
				'glass': '0 8px 32px hsla(220, 63%, 6%, 0.4), inset 0 1px 0 hsla(210, 40%, 98%, 0.05)',
			},
			backdropBlur: {
				'xs': '2px',
				'4xl': '72px',
			},
			borderRadius: {
				'2xl': '1rem',
				'3xl': '1.5rem',
			},
			animation: {
				'fade-in': 'fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
				'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
				'slide-in-right': 'slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
				'scale-in': 'scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
			},
			transitionDuration: {
				'DEFAULT': '200ms',
				'150': '150ms',
				'250': '250ms',
			},
			transitionTimingFunction: {
				'DEFAULT': 'cubic-bezier(0.4, 0, 0.2, 1)',
				'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
			},
			maxWidth: {
				'8xl': '90rem',
				'9xl': '100rem',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
