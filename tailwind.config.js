/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: '#C5E8A7',
        // secondary: '#85C399',
        // background: '#E0F8CC',
        // text: '#528D73'

        primary: '#50B498',
        secondary: '#9CDBA6',
        // background: '#DEF9C4',
        background: '#F1F8E8',
        text: '#468585'
      },
      fontFamily: {
        inter: ["Inter", "serif"]
      }
    },
  },
  plugins: [require('daisyui'),
  ],
}

