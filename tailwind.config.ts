import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f8ff',
          100: '#dff0ff',
          200: '#bfe1ff',
          300: '#99d1ff',
          400: '#4cb5ff',
          500: '#0099ff',
          600: '#007ad1',
          700: '#005fa3',
          800: '#004375',
          900: '#002a47'
        }
      }
    }
  },
  plugins: []
};

export default config;
