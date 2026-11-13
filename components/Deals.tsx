import { DEALS, formatPrice } from "@/lib/menu";
import AddToCartButton from "./AddToCartButton";

export default function Deals() {
  return (
    <section id="deals" className="mx-auto max-w-[1200px] scroll-mt-24 px-4 pb-14 sm:px-8 sm:pb-20">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Save more</p>
      <h2 className="mt-1.5 font-display text-4xl font-bold uppercase sm:text-5xl">Deals and combos</h2>

      <div className="mt-6 grid gap-5 md:grid-cols-2 sm:gap-6">
        {DEALS.map((deal) => (
          <article
            key={deal.id}
            className="flex flex-wrap items-center justify-between gap-5 rounded-[22px] border border-[#5a2a14] bg-gradient-to-br from-[#2a140a] via-[#4a1f0c] to-[#7a3410] p-6 sm:p-8"
          >
            <div className="min-w-[200px] flex-1">
              <h3 className="font-display text-4xl font-bold uppercase">{deal.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#e5d3c3]">{deal.description}</p>
            </div>
            <div className="flex flex-col items-start gap-3 sm:items-end">
              <p className="font-display text-4xl font-bold text-gold">{formatPrice(deal.price)}</p>
              <AddToCartButton id={deal.id} label="Add deal" variant="cream" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}