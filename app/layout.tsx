import type { Metadata } from "next";
import { Bai_Jamjuree } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/lib/providers/query-provider";

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
      <html lang="en">
        <body className={`${bai_Jamjuree.className} antialiased`}>
          {children}
        </body>
      </html>
    </QueryProvider>
  );
}
