import mdx from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],

  // ✅ Add this line to disable source maps (faster dev builds)
  productionBrowserSourceMaps: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
    ],
  },

  // Swedish is paused: send /sv to /en. Temporary (307) so it is not cached when
  // Swedish comes back. The Swedish messages are still in src/i18n/messages/sv.json.
  async redirects() {
    return [
      { source: "/sv", destination: "/en", permanent: false },
      { source: "/sv/:path*", destination: "/en/:path*", permanent: false },
    ];
  },

  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default withNextIntl(withMDX(nextConfig));