/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
        config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
        return config;
    },
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'dfepvtbxjabxgopadrjb.supabase.co',
            port: '',
            pathname: '/**',
          },
        ],
      },
};
export default nextConfig;
