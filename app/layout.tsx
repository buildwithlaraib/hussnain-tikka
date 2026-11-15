import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import "./globals.css";

// Serif for headings, prices and the brand name
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

// Clean sans for body text and buttons
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hussnain Tikka | Charcoal grill in Mughalpura, Lahore",
  description:
    "Order tikka, burgers, pizza, shawarma and more from Hussnain Tikka in Mughalpura, Lahore. Delivery and pickup, open daily 6 PM to 3 AM.",
};

export const viewport: Viewport = {
  themeColor: "#f6efe4",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased">
        {/* The cart provider wraps the whole app so every component can use the cart */}
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}