/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: every page ships as real HTML for SEO and link previews.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
