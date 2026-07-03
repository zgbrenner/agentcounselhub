/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGitHubPages ? "/agentcounselhub" : "",
  assetPrefix: isGitHubPages ? "/agentcounselhub/" : "",
  images: {
    unoptimized: true
  },
  experimental: {
    typedRoutes: true
  }
};

export default nextConfig;
