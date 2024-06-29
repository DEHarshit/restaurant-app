/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'pulse-border': {
          '0%, 100%': { borderColor: '#dc2626' }, // red-500
          '50%': { borderColor: '#991b1b' }, // red-300
        },
      },
      animation: {
        'pulse-border': 'pulse-border 2s infinite',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        primary: ['Quicksand'],
        sans: ['Quicksand', 'sans-serif']
      }
    },
  },
  plugins: [],
};
