/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  // important: true,
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1ca110',
        'accent': '#ffb300',
        'warn': '#f44336',
        'black': '#272932',
      },
      keyframes: {
        customBounce: {
          '0%, 100%': {
            transform: 'translateY(-60%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(80%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          }
        }
      },
      animation: {
        customBounce: 'customBounce 1s infinite',
      },
    },
  },
  plugins: [],
}
