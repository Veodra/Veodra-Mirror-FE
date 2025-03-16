/** @type {import('next').NextConfig} */
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/, // 支持 .mdx 和 .md 文件
  remarkPlugins: [],
  rehypePlugins: [],
});

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["zh", "en"],
    defaultLocale: "zh",
    localeDetection: false,
  },
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"], // 添加 mdx 支持
};

module.exports = withMDX(nextConfig);
