module.exports = {
  images: {
    domains: ['www.datocms-assets.com'],
  },
  async redirects() {
    return [
      {
        source: '/linkedin',
        destination: 'https://linkedin.com/in/adithya-nr',
        permanent: true,
      },
      {
        source: '/github',
        destination: 'https://github.com/adithyabhat17',
        permanent: true,
      },
      {
        source: '/twitter',
        destination: 'https://twitter.com/adithya__nr',
        permanent: true,
      },
      {
        source: '/dribbble',
        destination: 'https://dribbble.com/adithyanr',
        permanent: true,
      },
      {
        source: '/behance',
        destination: 'https://behance.net/adithyabhat',
        permanent: true,
      },
      {
        source: '/resume',
        destination: '/resume.pdf',
        permanent: true,
      },
    ]
  },
}
