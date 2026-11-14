"use client";

import { CATEGORIES, ITEMS } from "@/lib/menu";

type Props = {
  active: string;
  onSelect: (id: string) => void;
};

const pill =
  "inline-flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-full border px-5 text-sm font-semibold transition duration-300";

// Pill tabs that filter the menu. Categories without items stay hidden.
export default function Categories({ active, onSelect }: Props) {
  const tabs = CATEGORIES.map((cat) => ({
    ...cat,
    count: ITEMS.filter((i) => i.category === cat.id).length,
  })).filter((cat) => cat.count > 0);

  const popularCount = ITEMS.filter((i) => i.popular).length;

  return (
    <div
      role="tablist"
      aria-label="Menu categories"
      className="-mx-4 flex snap-x gap-2.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
    >
      <button
        type="button"
        role="tab"
        aria-selected={active === "popular"}
        onClick={() => onSelect("popular")}
        className={`${pill} ${
          active === "popular"
            ? "border-gold bg-gold text-ink"
            : "border-line text-cream hover:border-gold/60"
        }`}
      >
        Popular <span className="text-xs opacity-70">{popularCount}</span>
      </button>

      {tabs.map((cat) => (
        <button
          key={cat.id}
          type="button"
          role="tab"
          aria-selected={active === cat.id}
          onClick={() => onSelect(cat.id)}
          className={`${pill} ${
            active === cat.id
              ? "border-gold bg-gold text-ink"
              : "border-line text-cream hover:border-gold/60"
          }`}
        >
          {cat.name} <span className="text-xs opacity-70">{cat.count}</span>
        </button>
      ))}

      <a href="#deals" className={`${pill} border-gold/40 text-gold hover:border-gold`}>
        Deals and combos
      </a>
    </div>
  );
}