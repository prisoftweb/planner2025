/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains : ['docs-teltan.s3.amazonaws.com', 's3.amazonaws.com', 'api-production.s3.amazonaws.com', 'https://crmprospectos.herokuapp.com', 'localhost', 'http://127.0.0.1:3000/,'], // <== Domain name
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'docs-teltan.s3.amazonaws.com',
        port: '',
        pathname: '/public/**',
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
