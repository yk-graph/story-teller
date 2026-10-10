import "@fontsource/bebas-neue/400.css";
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/300-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VANCOUVER — Four Seasons",
  description: "A cinematic trailer of Vancouver's spring, summer, autumn and winter.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
