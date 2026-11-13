"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, ITEMS } from "@/lib/menu";
import Categories from "./Categories";
import PopularItems from "./PopularItems";

// Category tiles + the item grid they filter
export default function MenuExplorer() {
  // "popular" is the default view; otherwise a category id
  const [active, setActive] = useState("popular");

  const items = useMemo(
    () =>
      active === "popular"
        ? ITEMS.filter((i) => i.popular)
        : ITEMS.filter((i) => i.category === active),
    [active],
  );

  const title =
    active === "popular" ? "Popular items" : (CATEGORIES.find((c) => c.id === active)?.name ?? "Menu");

  // Tapping the active tile again goes back to popular items
  const handleSelect = (id: string) => {
    setActive((current) => (current === id ? "popular" : id));
    document.getElementById("menu-grid")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="menu" className="mx-auto max-w-[1200px] scroll-mt-24 px-4 pb-14 sm:px-8 sm:pb-20">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Browse</p>
      <h2 className="mt-1.5 font-display text-4xl font-bold uppercase sm:text-5xl">Menu categories</h2>

      <div className="mt-6">
        <Categories active={active} onSelect={handleSelect} />
      </div>

      <div id="menu-grid" className="mt-14 scroll-mt-24">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
              {active === "popular" ? "Customer favourites" : "Category"}
            </p>
            <h2 className="mt-1.5 font-display text-4xl font-bold uppercase sm:text-5xl">{title}</h2>
          </div>
          {active !== "popular" && (
            <button
              type="button"
              onClick={() => setActive("popular")}
              className="min-h-11 text-sm font-semibold text-gold hover:underline"
            >
              Back to popular items
            </button>
          )}
        </div>
        <PopularItems items={items} />
      </div>
    </section>
  );
}