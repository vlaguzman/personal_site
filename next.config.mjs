/** @type {import("next").NextConfig} */
const nextConfig = {
  // Next 16 blocks dev-only assets (HMR, hydration chunks) for any host except localhost.
  allowedDevOrigins: ["127.0.0.1", "192.168.0.*"],

  // The essays hub was merged into the speaking page. Temporary so the target can be revised.
  async redirects() {
    return [
      {
        source: "/:locale(en|es)/essays",
        destination: "/:locale/speaking#writing",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
