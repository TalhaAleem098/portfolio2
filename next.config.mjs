/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    qualities: [70, 75, 80, 85],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
