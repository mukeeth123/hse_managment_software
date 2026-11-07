/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#073B2F',
          darker: '#092B24',
          emerald: '#087F5B',
          teal: '#20A887',
          mint: '#DDF5EA',
          bg: '#F4F7F5',
          border: '#E3EAE6',
          text: '#172B25',
          muted: '#65756D',
        },
        status: {
          critical: '#B42318',
          high: '#DC6803',
          medium: '#D99A16',
          low: '#16834A',
          submitted: '#2563EB',
          underReview: '#D97706',
          investigation: '#7C3AED',
          actionPending: '#C77A14',
          closed: '#16834A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}