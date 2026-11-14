"use client";

import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

const NAV = [
  { label: "Menu", href: "#menu" },
  { label: "Deals", href: "#deals" },
  { label: "Visit us", href: "#visit" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, open } = useCart();

  // Give the header a frosted background once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement strip */}
      <div
        id="top"
        className="border-b border-gold/20 bg-surface px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-gold sm:text-xs"
      >
        Welcome to our new ordering website · Open daily 6 PM to 3 AM
      </div>

      <header
        className={`sticky top-0 z-40 transition-colors duration-300 ${
          scrolled ? "border-b border-line/70 bg-ink/85 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-4 sm:px-8">
          {/* Left: navigation (desktop) or menu button (mobile) */}
          <div className="flex items-center">
            <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-[13px] font-medium uppercase tracking-[0.18em] text-cream/80 transition hover:text-gold"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line md:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>

          {/* Center: brand */}
          <a href="#top" aria-label="Hussnain Tikka home" className="text-center">
            <span className="block font-display text-2xl font-semibold leading-none sm:text-[1.75rem]">
              Hussnain <span className="gold-text italic">Tikka</span>
            </span>
            <span className="mt-1.5 hidden text-[10px] font-medium uppercase tracking-[0.32em] text-muted sm:block">
              Charcoal grill · Lahore
            </span>
          </a>

          {/* Right: cart and order */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <button
              type="button"
              onClick={open}
              aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line transition hover:border-gold"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 7h12l-1 13H7L6 7z" />
                <path d="M9 7a3 3 0 0 1 6 0" />
              </svg>
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-bold text-ink">
                  {count}
                </span>
              )}
            </button>
            <a
              href="#menu"
              className="hidden min-h-11 items-center rounded-full bg-gold px-6 text-[13px] font-semibold uppercase tracking-[0.16em] text-ink transition hover:bg-gold-light md:inline-flex"
            >
              Order
            </a>
          </div>
        </div>

        {/* Mobile navigation panel */}
        {menuOpen && (
          <nav id="mobile-nav" className="border-t border-line bg-ink/95 px-4 pb-7 pt-3 text-center md:hidden" aria-label="Mobile">
            <ul>
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 font-display text-3xl font-medium"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#menu"
              onClick={() => setMenuOpen(false)}
              className="mt-4 inline-flex min-h-12 items-center rounded-full bg-gold px-10 text-sm font-semibold uppercase tracking-[0.16em] text-ink"
            >
              Order now
            </a>
          </nav>
        )}
      </header>
    </>
  );
}