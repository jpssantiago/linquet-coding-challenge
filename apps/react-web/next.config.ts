import type { NextConfig } from "next"
import "dotenv/config"

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_AUTH_API_URL: process.env.NEXT_PUBLIC_AUTH_API_URL,
    NEXT_PUBLIC_MSG_API_URL: process.env.NEXT_PUBLIC_MSG_API_URL
  }
}

export default nextConfig