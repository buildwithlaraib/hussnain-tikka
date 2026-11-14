import { RESTAURANT } from "@/lib/menu";

// Fixed year: avoids new Date() during prerendering (Next.js Cache Components).
// Update this once a year.
const COPYRIGHT_YEAR = 2026;

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 text-center sm:px-8">
        <p className="font-display text-3xl font-semibold">
          Hussnain <span className="gold-text italic">Tikka</span>
        </p>
        <p className="text-sm text-muted">{RESTAURANT.tagline}</p>

        <nav aria-label="Footer" className="flex gap-8 text-[13px] font-medium uppercase tracking-[0.18em]">
          <a href="#menu" className="text-cream/80 transition hover:text-gold">Menu</a>
          <a href="#deals" className="text-cream/80 transition hover:text-gold">Deals</a>
          <a href="#visit" className="text-cream/80 transition hover:text-gold">Visit us</a>
        </nav>

        <p className="border-t border-line pt-6 text-xs text-muted">
          © {COPYRIGHT_YEAR} {RESTAURANT.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}