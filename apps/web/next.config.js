module.exports = {
  reactStrictMode: true,
  experimental: {
    transpilePackages: ['ui'],
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'i.dummyjson.com',
      },
    ],
  },
};
