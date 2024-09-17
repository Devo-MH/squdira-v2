/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',  // Add this to ensure Tailwind processes all files in the 'src' directory
  ],
  theme: {
    extend: {},  // You can extend Tailwind's default theme here if needed
  },
  plugins: [],
};
