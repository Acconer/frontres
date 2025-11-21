/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */

import colors from 'tailwindcss/colors'

export default {
  content: [
    "./index.html",
    "./src/**/*.{scss,js,ts,jsx,tsx}",
    "node_modules/@frostui/tailwindcss/dist/*.js",
    "./app/**/*.{scss,js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-mode="dark"]'],

  theme: {

    container: {
      center: true,
    },

    fontFamily: {
      sans: ['Figtree', 'sans-serif'],
    },

    extend: {
      colors: {
        'primary': '#3e60d5',
        'secondary': '#6c757d',
        'success': '#47ad77',
        'info': '#16a7e9',
        'warning': '#ffc35a',
        'danger': '#f15776',
        'light': '#f2f2f7',
        'dark': '#212529',

        'gray': {
          ...colors.gray,
          '800': '#313a46'
        }
      },

      keyframes: {
        load: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },

        gridTemplateColumns: {
          'menu': '200px 1fr'
        }
      },

      minWidth: (theme: (arg0: string) => any) => ({
        ...theme('width'),
      }),

      maxWidth: (theme: (arg0: string) => any) => ({
        ...theme('width'),
      }),

      minHeight: (theme: (arg0: string) => any) => ({
        ...theme('height'),
      }),

      maxHeight: (theme: (arg0: string) => any) => ({
        ...theme('height'),
      }),
    },
  },
  plugins: [
    require('@frostui/tailwindcss/plugin'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ],
}

