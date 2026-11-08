/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/khanehzad-admin",
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;