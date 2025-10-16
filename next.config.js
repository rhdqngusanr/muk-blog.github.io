/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repoName = process.env.NEXT_PUBLIC_BASE_PATH || '';
const isUserSite = repoName.endsWith('.github.io');
const basePath = isProd && repoName && !isUserSite ? `/${repoName}` : '';
const assetPrefix = isProd && basePath ? `${basePath}/` : undefined;

const nextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages
  output: 'export',
  basePath,
  assetPrefix,
};

module.exports = nextConfig;