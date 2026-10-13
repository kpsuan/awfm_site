/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: every page ships as real HTML for SEO and link previews.
  output: 'export',
  // Dev and production builds use separate folders, so running a build
  // while `next dev` is up can't corrupt the dev server's cache.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
