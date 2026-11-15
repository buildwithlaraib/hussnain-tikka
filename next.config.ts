import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keeps the app on the classic rendering model (avoids Cache Components errors)
  cacheComponents: false,
};

export default nextConfig;