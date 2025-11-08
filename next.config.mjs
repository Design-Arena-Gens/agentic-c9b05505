/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'agentic-c9b05505.vercel.app']
    }
  }
};

export default nextConfig;
