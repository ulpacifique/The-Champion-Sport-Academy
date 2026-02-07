/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cerulean-blue': {
          '50': '#f0f6fe',
          '100': '#dceafd',
          '200': '#c1dafc',
          '300': '#97c4f9',
          '400': '#65a4f5',
          '500': '#4282ef',
          '600': '#2c64e4',
          '700': '#2552da',
          '800': '#2341aa',
          '900': '#223b86',
          '950': '#192552',
        },
        'bright-sun': {
          '50': '#fffbeb',
          '100': '#fff3c6',
          '200': '#ffe588',
          '300': '#ffd149',
          '400': '#ffbd20',
          '500': '#f99b07',
          '600': '#dd7302',
          '700': '#b75006',
          '800': '#943c0c',
          '900': '#7a330d',
          '950': '#461902',
        },
        'iron': {
          '50': '#f7f7f7',
          '100': '#ededed',
          '200': '#dfdfdf',
          '300': '#d1d1d1',
          '400': '#adadad',
          '500': '#999999',
          '600': '#888888',
          '700': '#7b7b7b',
          '800': '#676767',
          '900': '#545454',
          '950': '#363636',
        },
      },
      keyframes: {
        'breathing': {
          '0%, 100%': {
            transform: 'scale(1)',
            opacity: '1'
          },
          '50%': {
            transform: 'scale(1.05)',
            opacity: '0.8'
          }
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(249, 155, 7, 0.3)'
          },
          '50%': {
            boxShadow: '0 0 20px rgba(249, 155, 7, 0.6), 0 0 30px rgba(249, 155, 7, 0.4)'
          }
        }
      },
      animation: {
        'breathing': 'breathing 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}