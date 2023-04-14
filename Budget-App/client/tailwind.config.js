module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var'],
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('@tailwindcss/forms'),
    require('autoprefixer'),
    require('@heroicons/react/24/outline'),
    require('@headlessui/react'),
  ],
};
