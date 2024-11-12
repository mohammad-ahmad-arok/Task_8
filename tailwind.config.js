/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FEAF00",
        secondary: "#F8D442", 
        danger: "#FE0000",
        dimSecondary: "#F2EAE1",
        dimGray: "#E5E5E5",
        dimWhite: "#FDFDFD",
        dimBlack: "#6C6C6C",
      }
    },
  },
  plugins: [],
}

