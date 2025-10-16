/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const repoName = process.env.NEXT_PUBLIC_BASE_PATH || '';
const repoOwner = process.env.NEXT_PUBLIC_REPO_OWNER || '';
const isUserSite = repoOwner && repoName === `${repoOwner}.github.io`;
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