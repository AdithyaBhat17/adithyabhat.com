module.exports = {
  purge: {
    enabled: true,
    content: [
      './components/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
    ],
    options: {
      safelist: ['sm:w-1/2', 'sm:w-1/3', 'lg:w-1/2'],
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
