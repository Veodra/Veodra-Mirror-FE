export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Veodra Mirror",
  description:
    "GitHub Release Mirror. Stable, fast downloads for your software.",
  navItems: [
    {
      label: "home",
      href: "/",
    },
    {
      label: "docs",
      href: "/docs",
    },
    {
      label: "pricing",
      href: "/pricing",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
