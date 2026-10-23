import type { Metadata, Viewport } from "next";
import { SITE } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: SITE.themeColor,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
