/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    disableStaticImages: false,
    domains: ["res.cloudinary.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://dqhcwhfd-8000.inc1.devtunnels.ms/api/:path*", // Correctly forwards the path
        // destination: "https://lms-backend-rho-pink.vercel.app/api/:path*", // Correctly forwards the path
      },
    ];
  },
};

export default nextConfig;
