@tailwindcss/aspect-ratio
module.exports = {
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    require('@tailwindcss/aspect-ratio'),
  },
}
