
import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", // Add this line
  ],
  theme: {
    extend: {},
  },
  darkMode: "class", // Add this line
  plugins: [nextui()], // Add this line
}
