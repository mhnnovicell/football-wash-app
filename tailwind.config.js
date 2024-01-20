/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
    './src/*.{js,ts,jsx,tsx,vue}',
  ],
  theme: {
    extend: {
      height: {
        'dh-screen': '100dvh',
      },
      width: {
        'dw-screen': '100dvw',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
