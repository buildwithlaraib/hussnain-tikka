import Image from "next/image";
import { CATEGORIES, formatPrice, gradient, type MenuItem } from "@/lib/menu";
import AddToCartButton from "./AddToCartButton";

export default function ItemCard({ item }: { item: MenuItem }) {
  const categoryName = CATEGORIES.find((c) => c.id === item.category)?.name;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_24px_60px_-30px_rgba(212,162,76,0.45)]">
      {/* Photo (or a gradient placeholder until a photo is added) */}
      <div className="relative aspect-[4/3] overflow-hidden" style={{ background: gradient(item.tone) }}>
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center px-4 text-center font-display text-2xl italic text-gold/80">
            {item.name}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-surface/80 to-transparent" />

        {/* Price tag */}
        <p className="absolute bottom-3 right-3 rounded-full border border-gold/30 bg-ink/80 px-3.5 py-1.5 font-display text-lg font-semibold text-gold backdrop-blur">
          {item.fromPrice && (
            <span className="mr-1.5 font-sans text-[10px] font-medium uppercase tracking-wider text-muted">
              from
            </span>
          )}
          {formatPrice(item.price)}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {categoryName && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">{categoryName}</p>
        )}
        <h3 className="mt-2 font-display text-2xl font-semibold leading-tight">{item.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{item.description}</p>
        <div className="mt-5">
          <AddToCartButton id={item.id} className="w-full" />
        </div>
      </div>
    </article>
  );
}