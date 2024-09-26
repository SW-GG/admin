/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sw-gg.github.io',
        pathname: '/static-image/**',
      },
    ],
  },
};

export default nextConfig;
