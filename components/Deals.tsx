import { DEALS, formatPrice } from "@/lib/menu";
import AddToCartButton from "./AddToCartButton";
import Reveal from "./Reveal";

// Ticket-style deal cards with notched sides
export default function Deals() {
  return (
    <section id="deals" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-20 sm:px-8 sm:pb-24">
      <Reveal className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold sm:text-xs">Save more</p>
        <h2 className="mt-3 text-balance font-display text-4xl font-semibold sm:text-6xl">Deals and combos</h2>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {DEALS.map((deal, i) => (
          <Reveal key={deal.id} delay={i * 120}>
            <article className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-surface-2 to-surface p-7 sm:p-9">
              {/* Ticket notches */}
              <span className="absolute -left-3.5 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full border border-gold/30 bg-ink" aria-hidden="true" />
              <span className="absolute -right-3.5 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full border border-gold/30 bg-ink" aria-hidden="true" />

              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Combo</p>
              <h3 className="mt-2 font-display text-4xl font-semibold">{deal.name}</h3>
              <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-muted">{deal.description}</p>

              <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-gold/30 pt-6">
                <p className="font-display text-4xl font-semibold text-gold">{formatPrice(deal.price)}</p>
                <AddToCartButton id={deal.id} label="Add deal" variant="solid" />
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}