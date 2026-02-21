import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Runtime config has been removed in Next.js 16
  // Use environment variables directly with NEXT_PUBLIC_ prefix for client-side access
  // Server-side: process.env.VARIABLE_NAME
  // Client-side: process.env.NEXT_PUBLIC_VARIABLE_NAME
};

export default nextConfig;
