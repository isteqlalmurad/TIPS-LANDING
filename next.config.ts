import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Short-URL redirects for legal documents. The Terms cite the DPA at
  // /dpa and the Privacy Policy cites the Cookie Policy at /cookies;
  // the canonical pages live under /legal/. 308 permanent redirects
  // keep those cited links resolving.
  async redirects() {
    return [
      {
        source: "/dpa",
        destination: "/legal/data-processing-agreement",
        permanent: true,
      },
      {
        source: "/cookies",
        destination: "/legal/cookie-policy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
