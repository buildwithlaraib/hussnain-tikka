import Image from "next/image";
import { formatPrice, gradient, type MenuItem } from "@/lib/menu";

export default function ItemCard({ item }: { item: MenuItem }) {
  return (
    <article className="overflow-hidden rounded-[20px] border border-line bg-surface">
      {/* Photo (or a labelled placeholder until a photo is added) */}
      <div
        className="relative flex h-48 items-center justify-center sm:h-52"
        style={{ background: gradient(item.tone) }}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <span className="px-4 text-center text-xs font-semibold uppercase tracking-widest text-gold">
            Photo · {item.name}
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="mt-1.5 min-h-10 text-sm leading-relaxed text-muted">{item.description}</p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="font-display text-[1.75rem] font-bold leading-none text-gold">
            {item.fromPrice && <span className="mr-1 text-sm font-semibold text-muted">From</span>}
            {formatPrice(item.price)}
          </p>
          {/* TEST: AddToCartButton ki jagah temporary button */}
          <button type="button" className="rounded-full bg-ember px-5 py-2 text-sm font-semibold text-white">
            Add
          </button>
        </div>
      </div>
    </article>
  );
}