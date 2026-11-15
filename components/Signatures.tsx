"use client";

import Image from "next/image";
import { useRef } from "react";
import { ITEMS, formatPrice } from "@/lib/menu";
import AddToCartButton from "./AddToCartButton";

// Horizontal carousel of customer favourites
export default function Signatures() {
  const scroller = useRef<HTMLDivElement>(null);
  const favourites = ITEMS.filter((i) => i.popular);

  function scrollByCard(direction: 1 | -1) {
    scroller.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  }

  const arrow =
    "flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 transition hover:bg-ink hover:text-cream";

  return (
    <section id="signatures" className="scroll-mt-24 pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-rust">02 — Favourites</p>
            <h2 className="mt-3 text-balance font-display text-4xl font-bold sm:text-6xl">
              Dishes Lahore <em className="font-medium text-rust">comes back for</em>
            </h2>
          </div>
          <div className="hidden gap-3 sm:flex">
            <button type="button" onClick={() => scrollByCard(-1)} aria-label="Previous dishes" className={arrow}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button type="button" onClick={() => scrollByCard(1)} aria-label="Next dishes" className={arrow}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar mx-auto mt-10 flex max-w-6xl snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-8"
      >
        {favourites.map((item, index) => (
          <article
            key={item.id}
            className={`group w-[78%] shrink-0 snap-start overflow-hidden rounded-3xl border border-line bg-paper sm:w-[300px] ${
              index % 2 === 1 ? "sm:mt-8" : ""
            }`}
          >
            <div className="relative aspect-[4/4.6] overflow-hidden bg-line">
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(min-width: 640px) 300px, 78vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
              )}
              <span className="absolute left-4 top-4 rounded-full bg-paper/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <AddToCartButton
                id={item.id}
                variant="icon"
                label={`Add ${item.name} to order`}
                className="absolute right-4 top-4 border-white/70 bg-paper/95 text-ink hover:bg-rust hover:text-white"
              />
            </div>

            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-semibold leading-tight">{item.name}</h3>
                <p className="shrink-0 font-display text-lg font-bold text-rust">
                  {item.fromPrice && <span className="mr-1 font-sans text-[10px] font-medium uppercase text-muted">from</span>}
                  {formatPrice(item.price)}
                </p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}