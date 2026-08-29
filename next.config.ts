import type { NextConfig } from "next";

// GitHub Pages serves a project site from /<repo>, so assets need that prefix in
// production. Local dev serves from root. Set NEXT_PUBLIC_BASE_PATH="" to build
// for a root-level host (Vercel, custom domain) instead.
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ?? "/el-haj-international";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  output: "export", // static HTML export — required for GitHub Pages
  basePath,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true }, // no image optimisation server on Pages
  trailingSlash: true, // /calculator/ resolves to calculator/index.html
};

export default nextConfig;
