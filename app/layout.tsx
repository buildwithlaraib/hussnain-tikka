import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";

// Display font for headings and prices
const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

// Body font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hussnain Tikka | Charcoal grill in Mughalpura, Lahore",
  description:
    "Order tikka, burgers, pizza, shawarma and more from Hussnain Tikka in Mughalpura, Lahore. Delivery and pickup, open daily 6 PM to 3 AM.",
};

export const viewport: Viewport = {
  themeColor: "#0f1110",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${barlow.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}