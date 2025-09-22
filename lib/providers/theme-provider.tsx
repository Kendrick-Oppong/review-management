"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { usePathname } from "next/navigation";

function ForcedThemeWatcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [isInitialMount, setIsInitialMount] = React.useState(true);

  React.useEffect(() => {
    if (isInitialMount) {
      if (pathname === "/") {
        setTheme("light");
      } else if (pathname === "/dashboard") {
        setTheme("dark");
      }
      setIsInitialMount(false);
    }
  }, [pathname, setTheme, isInitialMount, resolvedTheme]);

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
