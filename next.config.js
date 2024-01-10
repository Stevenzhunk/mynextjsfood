/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'stevenz-food-ordering.s3.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;
