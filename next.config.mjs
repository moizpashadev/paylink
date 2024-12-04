// next.config.mjs
export default {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config) {
    // Avoid overriding default CSS handling
    return config;
  },
};