/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: { scrollbar: ["rounded", "w-12"] },
  },
  plugins: [require("tailwind-scrollbar")],
};
