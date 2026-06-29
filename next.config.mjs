/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // required for static export; we use width/height/lazy manually
  },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
