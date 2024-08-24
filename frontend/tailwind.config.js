/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#1b303b",
        light: "#f1e6e1",
        altLight: "#e0c173",
        ansLight: "#CADFFF",
        altDark: "#d28f56",
        primary: "#c7d8dd", // 240,86,199
        primaryDark: "#4e7880", // 80,230,217
        acc: "#CC6868",
        // acc2: "#5F5CB3",
        accLight: "#ddafa1",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
