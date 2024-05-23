/** @type {import('next').NextConfig} */

// @SEV
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/workspace/settings",
        destination: "/workspace/settings/general",
        permanent: true,
      },
      {
        source: "/",
        destination: "/workspace/overview",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
