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
        'lg:w-1/3',
      ],
    },
  },
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        green: {
          500: '#50E3C2',
          600: '#29BC9B',
        },
      },
      width: {
        '2/7': '28.5714286%',
      },
    },
  },
  variants: {},
  plugins: [],
}
