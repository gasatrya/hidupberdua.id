/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Source Serif Pro"', ...defaultTheme.fontFamily.serif],
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      typography: {
        xl: {
          css: [
            {
              lineHeight: 1.5,
              h1: {
                marginBottom: 0,
              },
            },
          ],
        },
        DEFAULT: {
          css: {
            a: {
              textDecoration: false,
              fontWeight: '400',
            },
            'h2 a': {
              fontWeight: '800',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
