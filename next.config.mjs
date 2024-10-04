/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@refinedev/antd'],
  webpack: (config) => {
    // Add rule for SVG files
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    return config;
  },
};

export default nextConfig;
