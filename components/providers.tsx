"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { Toaster } from "sonner";
import { LanguageProvider } from "@/context/language-context";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <LanguageProvider>
      <NextThemesProvider {...props}>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </NextThemesProvider>
    </LanguageProvider>
  );
}
