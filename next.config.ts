import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* Config options here */

  /* Authorized domains to fetch images from Supabase */
  images: {
    domains: ['hfvazyqdtrydsgylnvwq.supabase.co'],
    unoptimized: true,
  }
};

export default nextConfig;
