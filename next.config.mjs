/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    disableStaticImages: false,
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
