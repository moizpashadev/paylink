// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
  
      return config;
    },
    webpack(config, { isServer }) {
      if (!isServer) {
        config.resolve.fallback = {
          fs: false,
        };
      }
      return config;
    },
  };
  
  export default nextConfig;
  