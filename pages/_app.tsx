import type { AppProps } from "next/app";

import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";

import { NextIntlClientProvider } from "next-intl";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      * {
        transition: background-color 0.3s ease-in-out;
      }  
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  return (
    <NextIntlClientProvider
      locale={router.locale}
      messages={pageProps.messages}
    >
      <HeroUIProvider navigate={router.push}>
        <ToastProvider />
        <NextThemesProvider>
          <Component {...pageProps} />
        </NextThemesProvider>
      </HeroUIProvider>
    </NextIntlClientProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
