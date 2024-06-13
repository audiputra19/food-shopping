/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        beat: {
          '0%': { transform: 'scale(1)' },
          '20%': { transform: 'scale(1.3)' },
          '40%': { transform: 'scale(0.9)' },
          '60%': { transform: 'scale(1.1)' },
          '80%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        beat: 'beat 0.6s ease-in-out',
      }
    },
  },
  plugins: [],
}

