"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { CATEGORIES, ITEMS, formatPrice } from "@/lib/menu";
import AddToCartButton from "./AddToCartButton";

// Only show categories that actually have items
const TABS = CATEGORIES.filter((cat) => ITEMS.some((item) => item.category === cat.id));

// Dark menu section: category tabs, a list of dishes and a large photo of the selected dish
export default function MenuTheatre() {
  const [tab, setTab] = useState(TABS[0]?.id ?? "");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const items = useMemo(() => ITEMS.filter((item) => item.category === tab), [tab]);
  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  return (
    <section id="menu" className="scroll-mt-20 bg-char text-cream">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-8 sm:py-28">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-saffron">03 — The menu</p>
        <h2 className="mt-3 text-balance font-display text-4xl font-bold sm:text-6xl">
          Pick your <em className="font-medium text-saffron">favourite</em>
        </h2>

        {/* Category tabs */}
        <div
          role="tablist"
          aria-label="Menu categories"
          className="no-scrollbar -mx-4 mt-9 flex gap-2.5 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {TABS.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={tab === cat.id}
              onClick={() => {
                setTab(cat.id);
                setSelectedId(null);
              }}
              className={`min-h-11 shrink-0 rounded-full border px-5 text-sm font-semibold transition ${
                tab === cat.id
                  ? "border-cream bg-cream text-ink"
                  : "border-cream/25 text-cream/80 hover:border-cream/60"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Dish list */}
          <ul className="space-y-2.5">
            {items.map((item) => {
              const active = selected?.id === item.id;
              return (
                <li
                  key={item.id}
                  className={`flex items-center gap-3 rounded-2xl border p-3 pl-5 transition ${
                    active ? "border-rust bg-rust text-white" : "border-cream/15 hover:border-cream/40"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    aria-pressed={active}
                    className="min-w-0 flex-1 py-2 text-left"
                  >
                    <span className="block font-display text-xl font-semibold leading-tight">{item.name}</span>
                    <span className={`mt-1 block text-sm ${active ? "text-white/80" : "text-cream/60"}`}>
                      {item.description}
                    </span>
                  </button>
                  <p className="shrink-0 font-display text-lg font-semibold">
                    {item.fromPrice && (
                      <span className="mr-1 font-sans text-[10px] font-medium uppercase opacity-70">from</span>
                    )}
                    {formatPrice(item.price)}
                  </p>
                  <AddToCartButton
                    id={item.id}
                    variant="icon"
                    label={`Add ${item.name} to order`}
                    className={
                      active
                        ? "border-white/50 text-white hover:bg-white hover:text-rust"
                        : "border-cream/30 text-cream hover:bg-cream hover:text-ink"
                    }
                  />
                </li>
              );
            })}
          </ul>

          {/* Large photo of the selected dish */}
          {selected && (
            <div className="relative min-h-[340px] overflow-hidden rounded-3xl bg-ink lg:min-h-[460px]">
              {selected.image && (
                <Image
                  key={selected.id}
                  src={selected.image}
                  alt={selected.name}
                  fill
                  sizes="(min-width: 1024px) 480px, 100vw"
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-paper p-5 text-ink sm:inset-x-6 sm:bottom-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-rust">Selected</p>
                <div className="mt-1 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate font-display text-2xl font-semibold">{selected.name}</p>
                    <p className="text-sm text-muted">{formatPrice(selected.price)}</p>
                  </div>
                  <AddToCartButton id={selected.id} label="Add" variant="solid" className="shrink-0" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}