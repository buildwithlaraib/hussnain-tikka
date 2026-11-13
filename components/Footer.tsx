import { RESTAURANT } from "@/lib/menu";

// Fixed year: avoids new Date() during prerendering (Next.js Cache Components).
// Update this once a year.
const COPYRIGHT_YEAR = 2026;

export default function Footer() {
  return (
    <footer className="border-t border-line bg-panel">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-4 py-6 text-center text-sm text-[#8a857c] sm:flex-row sm:px-8 sm:text-left">
        <p>
          © {COPYRIGHT_YEAR} {RESTAURANT.name}. All rights reserved.
        </p>
        <nav aria-label="Footer" className="flex gap-6">
          <a href="#menu" className="hover:text-gold">Menu</a>
          <a href="#deals" className="hover:text-gold">Deals</a>
          <a href="#visit" className="hover:text-gold">Visit us</a>
        </nav>
      </div>
    </footer>
  );
}