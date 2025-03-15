import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import {useTranslations} from 'next-intl';
import { useRouter } from 'next/router';

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  I18nIcon,
  GithubIcon,
  Logo,
} from "@/components/icons";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { UserButton } from "./userbutton";

export const Navbar = () => {
  const t = useTranslations('Nav');
  const router = useRouter();
  const removeLocale = ( path: string ) => {
    if (path.startsWith('/en') || path.startsWith('/zh')) {
      return path.slice(3);
    }
    return path;
  };

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2 md:gap-4" href="/">
            <Logo />
            <p className="font-bold text-inherit">Veodra Mirror</p>
          </NextLink>
        </NavbarBrand>
        <div className="hidden md:flex gap-12 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {t(item.label)}
              </NextLink>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent className="flex basis-1 pl-4" justify="end">
        <ThemeSwitch className="hidden sm:flex"/>
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly aria-label="i18n" variant="flat">
              <I18nIcon className="text-default-500" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu onAction={(key) => router.push(`/${key}`+router.asPath, undefined, { locale: false })}>
            <DropdownItem key="en">English</DropdownItem>
            <DropdownItem key="zh">简体中文</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <UserButton />
        <NavbarMenuToggle className="flex md:hidden"/>
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2 items-center">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={"foreground"}
                href={item.href}
                size="lg"
              >
                {t(item.label)}
              </Link>
            </NavbarMenuItem>
          ))}
          <ThemeSwitch className="flex sm:hidden"/>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
