"use client";

import { useState } from "react";
import { RESTAURANT } from "@/lib/menu";
import { useCart } from "./CartProvider";

const NAV = [
  { label: "Menu", href: "#menu" },
  { label: "Deals", href: "#deals" },
  { label: "Visit us", href: "#visit" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, open } = useCart();

  return (
    <>
      {/* Announcement strip */}
      <div
        id="top"
        className="bg-ember px-4 py-2 text-center text-xs font-semibold tracking-wide text-white sm:text-[13px]"
      >
        Welcome to our new ordering website · Open daily 6 PM to 3 AM
      </div>

      <header className="sticky top-0 z-40 border-b border-line/60 bg-ink/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-3 sm:px-8 sm:py-4">
          {/* Brand */}
          <a href="#top" className="flex items-center gap-3" aria-label={`${RESTAURANT.name} home`}>
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream font-display text-xl font-bold text-ink">
              {RESTAURANT.initials}
            </span>
            <span className="font-display text-xl font-bold uppercase tracking-[0.08em] sm:text-2xl">
              {RESTAURANT.name}
            </span>
          </a>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-8 text-[15px] font-medium md:flex" aria-label="Main">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="text-[#d9d2c7] transition hover:text-gold">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Cart button with item count */}
            <button
              type="button"
              onClick={open}
              aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#4a463f] transition hover:border-gold"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
              className="hidden min-h-11 items-center rounded-full bg-ember px-6 text-[15px] font-semibold text-white transition hover:bg-ember-dark md:inline-flex"
            >
              Order now
            </a>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#4a463f] md:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile navigation panel */}
        {menuOpen && (
          <nav id="mobile-nav" className="border-t border-line bg-ink px-4 pb-5 pt-3 md:hidden" aria-label="Mobile">
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-[#d9d2c7] hover:bg-surface"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#menu"
              onClick={() => setMenuOpen(false)}
              className="mt-3 flex min-h-12 items-center justify-center rounded-full bg-ember text-base font-semibold text-white"
            >
              Order now
            </a>
          </nav>
        )}
      </header>
    </>
  );
}