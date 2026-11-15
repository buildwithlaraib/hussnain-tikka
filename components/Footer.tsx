import { RESTAURANT } from "@/lib/menu";

// Fixed year: avoids new Date() during prerendering. Update this once a year.
const COPYRIGHT_YEAR = 2026;

const LINKS = [
  { label: "Story", href: "#story" },
  { label: "Favourites", href: "#signatures" },
  { label: "Menu", href: "#menu" },
  { label: "Deals", href: "#deals" },
];

const heading = "text-[11px] font-semibold uppercase tracking-[0.22em] text-saffron";

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-3 font-display text-2xl font-bold">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rust text-lg text-white">H</span>
            {RESTAURANT.name}
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/65">{RESTAURANT.tagline} Charcoal grill in Mughalpura, Lahore.</p>
        </div>

        <div>
          <p className={heading}>Visit</p>
          <address className="mt-4 text-sm not-italic leading-relaxed text-cream/75">
            {RESTAURANT.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="mt-2 block">
              {RESTAURANT.openingTime} to {RESTAURANT.closingTime}, daily
            </span>
          </address>
        </div>

        <div>
          <p className={heading}>Explore</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/75">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition hover:text-saffron">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={heading}>Order</p>
          <ul className="mt-4 space-y-2 text-sm text-cream/75">
            <li>
              <a href={`tel:${RESTAURANT.phoneTel}`} className="transition hover:text-saffron">
                {RESTAURANT.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${RESTAURANT.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-saffron"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-cream/50 sm:px-8">
          © {COPYRIGHT_YEAR} {RESTAURANT.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}