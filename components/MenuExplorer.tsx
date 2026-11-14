"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, ITEMS } from "@/lib/menu";
import Categories from "./Categories";
import PopularItems from "./PopularItems";
import Reveal from "./Reveal";

// Category tabs + the item grid they filter
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
    active === "popular" ? "Customer favourites" : (CATEGORIES.find((c) => c.id === active)?.name ?? "Menu");

  return (
    <section id="menu" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-8 sm:py-24">
      <Reveal className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold sm:text-xs">The menu</p>
        <h2 className="mt-3 text-balance font-display text-4xl font-semibold sm:text-6xl">{title}</h2>
      </Reveal>

      <div className="mt-9">
        <Categories active={active} onSelect={setActive} />
      </div>

      <div className="mt-10">
        <PopularItems items={items} />
      </div>
    </section>
  );
}