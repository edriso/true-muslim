import type { NextConfig } from 'next';

// GitHub Pages serves the project at /true-muslim/, so the static build needs the
// prefix baked in. The default build stays server-rendered for the Worker target.
const basePath = process.env.PAGES_BASE_PATH ?? '';

const nextConfig: NextConfig = basePath
  ? { output: 'export', basePath, trailingSlash: true }
  : {};

export default nextConfig;
