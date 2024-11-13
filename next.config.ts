import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nbnfqxzmnnluqcenoqkm.supabase.co"
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com"
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com"
      }
    ],
  },
};

export default nextConfig;
