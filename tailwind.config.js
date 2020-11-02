module.exports = {
  purge: ['./components/*.tsx', './pages/*.tsx', './pages/**/*.tsx'],
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
