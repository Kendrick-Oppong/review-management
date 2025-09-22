import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/providers/query-provider";
import { ThemeProvider } from "@/lib/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const bai_Jamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Review Management",
  description: "Review Management App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${bai_Jamjuree.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
        <Toaster
          style={{ fontFamily: "inherit" }}
          position="top-center"
          className="text-base"
          toastOptions={{
            classNames: {
              toast: "!bg-background",
              title: "!text-base !text-black dark:!text-white",
              description: "!text-base !text-black dark:!text-white !mt-2",
            },
          }}
        />
      </html>
    </QueryProvider>
  );
}
