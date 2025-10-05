import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Load environment variables based on NODE_ENV
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
