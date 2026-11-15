"use client";

import { useEffect, useState } from "react";
import { RESTAURANT } from "@/lib/menu";
import { useCart } from "./CartProvider";

const NAV = [
  { label: "Story", href: "#story" },
  { label: "Favourites", href: "#signatures" },
  { label: "Menu", href: "#menu" },
  { label: "Deals", href: "#deals" },
  { label: "Visit", href: "#visit" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count, open } = useCart();

  // Give the header a soft shadow once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top info strip */}
      <div id="top" className="bg-ink text-cream">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] sm:px-8 sm:text-[11px]">
          <p className="truncate">Mughalpura, Lahore · Open daily {RESTAURANT.openingTime} to {RESTAURANT.closingTime}</p>
          <a href={`tel:${RESTAURANT.phoneTel}`} className="hidden shrink-0 transition hover:text-saffron sm:block">
            Call {RESTAURANT.phoneDisplay}
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 bg-cream/90 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-[0_1px_0_0_var(--color-line)]" : ""
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-8">
          {/* Brand */}
          <a href="#top" aria-label="Hussnain Tikka home" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rust font-display text-lg font-bold text-white">
              H
            </span>
            <span className="leading-tight">
              <span className="block font-display text-xl font-bold">{RESTAURANT.name}</span>
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.28em] text-muted sm:block">
                Charcoal grill · Lahore
              </span>
            </span>
          </a>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[13px] font-medium text-ink/80 transition hover:text-rust"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Cart and menu button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={open}
              aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
              className="relative flex min-h-11 items-center gap-2 rounded-full border border-ink/20 px-4 text-sm font-semibold transition hover:border-ink"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 7h12l-1 13H7L6 7z" />
                <path d="M9 7a3 3 0 0 1 6 0" />
              </svg>
              <span className="hidden sm:inline">Order</span>
              {count > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-rust px-1 text-[11px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 lg:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile navigation panel */}
        {menuOpen && (
          <nav id="mobile-nav" className="border-t border-line bg-cream px-4 pb-6 pt-2 lg:hidden" aria-label="Mobile">
            <ul>
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block border-b border-line/70 py-3.5 font-display text-2xl font-semibold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}