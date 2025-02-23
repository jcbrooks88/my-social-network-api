/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Make sure Tailwind looks inside your src folder for Tailwind classes
    "./index.html",          // If you have an index.html file, include it
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};


