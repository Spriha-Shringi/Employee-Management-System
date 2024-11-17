/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        jungleGreen: "#419D78", // Define your custom color
      },
    },
  },
  plugins: [],
}

