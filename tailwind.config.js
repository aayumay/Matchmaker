/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ivory: '#F4F0E8',
        charcoal: '#11110F',
        gold: {
          50: '#FBF8F0', 100: '#F5EDD8', 200: '#E9D6A7', 300: '#DDBF76',
          400: '#C7A253', 500: '#B28A3C', 600: '#92702E', 700: '#705523',
          800: '#503D1C', 900: '#302511',
        },
        rose: { tint: '#F1E7E1', light: '#F4E5E0', DEFAULT: '#B97966', dark: '#8E5445' },
        success: '#2E8B57',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 18px 50px rgba(17,17,15,0.08)',
        'glass-lg': '0 28px 80px rgba(17,17,15,0.12)',
        gold: '0 12px 35px rgba(178,138,60,0.2)',
        card: '0 14px 40px rgba(17,17,15,0.055)',
        'card-hover': '0 22px 60px rgba(17,17,15,0.1)',
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #DDBF76 0%, #B28A3C 55%, #92702E 100%)',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
