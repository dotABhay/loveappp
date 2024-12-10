/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    // Warning: This allows production builds to complete even if there are ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to complete even if there are TypeScript errors.
    ignoreBuildErrors: true,
  },
  experimental: {
    appDir: true, // For handling experimental features
  },
  webpack: (config) => {
    // Fixes `window` or `document` not defined issues by ignoring problematic modules on the server side.
    config.resolve.fallback = {
      ...config.resolve.fallback,
      window: false,
    };
    return config;
  },
};
