"use client";

import Image from "next/image";
import { CATEGORIES, ITEMS, gradient } from "@/lib/menu";

type Props = {
  active: string;
  onSelect: (id: string) => void;
};

const tileClass =
  "relative flex h-28 flex-col justify-end overflow-hidden rounded-2xl border p-3.5 text-left transition hover:-translate-y-0.5 sm:h-32";

export default function Categories({ active, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
      {CATEGORIES.map((cat) => {
        const count = ITEMS.filter((i) => i.category === cat.id).length;
        const isActive = active === cat.id;
        const inner = (
          <>
            {cat.image && (
              <>
                <Image
                  src={cat.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 220px, (min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
                {/* Dark overlay so the text stays readable on top of the photo */}
                <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
              </>
            )}
            <span className="relative text-[15px] font-semibold">{cat.name}</span>
            {!cat.href && (
              <span className="relative text-xs text-muted">
                {count} {count === 1 ? "item" : "items"}
              </span>
            )}
          </>
        );

        // Tiles with an href jump to another section (e.g. deals)
        if (cat.href) {
          return (
            <a
              key={cat.id}
              href={cat.href}
              className={`${tileClass} border-line`}
              style={{ background: gradient(cat.tone) }}
            >
              {inner}
            </a>
          );
        }

        return (
          <button
            key={cat.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(cat.id)}
            className={`${tileClass} ${isActive ? "border-gold ring-2 ring-gold/50" : "border-line"}`}
            style={{ background: gradient(cat.tone) }}
          >
            {inner}
          </button>
        );
      })}
    </div>
  );
}