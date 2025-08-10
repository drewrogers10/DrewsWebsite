import type { Config } from 'tailwindcss'

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#0066cc",
        secondary: "#000000", 
        accent: "#00cc66",
        // Light mode gradient colors
        'gradient-light-1': "#0066cc", // Blue
        'gradient-light-2': "#1a1a1a", // Dark gray (softer than pure black)
        'gradient-light-3': "#00cc66", // Green
        // Dark mode gradient colors  
        'gradient-dark-1': "#4a90e2", // Lighter blue
        'gradient-dark-2': "#2d3748", // Medium gray
        'gradient-dark-3': "#48bb78", // Lighter green
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
