/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push("@node-rs/argon2", "@node-rs/bcrypt");
        return config;
    },
    images: {
        // We disable image optimisation during static export builds
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
