const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGitHubPages ? "/nordic-furniture" : "",
  assetPrefix: isGitHubPages ? "/nordic-furniture/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
