"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { usePathname } from "next/navigation";

function ForcedThemeWatcher() {
  const { setTheme } = useTheme();
  const pathname = usePathname();

  React.useEffect(() => {
    if (pathname === "/") {
      setTheme("light");
    } else if (pathname === "/dashboard") {
      setTheme("dark");
    }
  }, [pathname, setTheme]);

  return null;
}

export function ThemeProvider({
  children,
  ...props
}: Readonly<React.ComponentProps<typeof NextThemesProvider>>) {
  return (
    <NextThemesProvider {...props}>
      <ForcedThemeWatcher />
      {children}
    </NextThemesProvider>
  );
}
