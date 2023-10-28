const { violet, blackA, mauve, green } = require('@radix-ui/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: [
      './components/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
    ],
    options: {
      safelist: [
        'sm:w-1/2',
        'sm:w-1/3',
        'lg:w-1/2',
        'sm:mt-10',
        'sm:text-4xl',
        'md:w-1/2',
        'md:w-1/3',
        'md:w-1/4',
        'md:w-1/5',
        'md:w-1/6',
        'lg:w-1/3',
        '2xl:px-96',
        'md:grid-cols-3 ',
        'lg:grid-cols-6',
        'lg:gap-14',
      ],
    },
  },
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        ...violet,
        ...blackA,
        ...mauve,
        green: {
          ...green,
          500: '#50E3C2',
          600: '#29BC9B',
        },
      },
      width: {
        '2/7': '28.5714286%',
      },
      fonts: {
        body: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  variants: {},
  plugins: [],
}
