// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        monza: {
          50: '#FEF2F3',
          100: '#FFE1E2',
          200: '#FFC8CB',
          300: '#FFA2A6',
          400: '#FC6D74',
          500: '#F43F48',
          600: '#E22029',
          700: '#BE171F',
          800: '#9D171D',
          900: '#821A1F',
          950: '#47080B',
        },
        mountain: {
          50: '#F5F5F6',
          100: '#E6E6E7',
          200: '#D0D0D1',
          300: '#AFB0B1',
          400: '#8E8F91',
          500: '#6E6F71',
          600: '#555657',
          700: '#414243',
          800: '#303031',
          900: '#222223',
          950: '#121213',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}