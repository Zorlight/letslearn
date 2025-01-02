/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],
  },
  reactStrictMode: false,
  env: {
    TINYMCE_API_KEY: process.env.TINYMCE_API_KEY,
  },
};

export default nextConfig;
