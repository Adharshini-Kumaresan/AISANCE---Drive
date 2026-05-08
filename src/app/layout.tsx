import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AISANCE Drive | Driver Intelligence & Comfort Analytics Platform",
  description: "A luxury AI operating system for intelligent mobility comfort. Real-time driver behavior intelligence, passenger comfort analytics, and fleet performance insights.",
  keywords: "driver intelligence, comfort analytics, fleet management, ride smoothness, WRMS, driver behavior",
  openGraph: {
    title: "AISANCE Drive | Driver Intelligence Platform",
    description: "Every movement measured. Every action understood. Smarter fleets. Smoother rides.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
