import Image from "next/image";
import { DEALS, formatPrice } from "@/lib/menu";
import AddToCartButton from "./AddToCartButton";
import Reveal from "./Reveal";

// Deals: the first one is a large photo card, the rest are saffron cards
export default function Deals() {
  return (
    <section id="deals" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-rust">04 — Save more</p>
        <h2 className="mt-3 text-balance font-display text-4xl font-bold sm:text-6xl">
          Deals <em className="font-medium text-rust">and combos</em>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {DEALS.map((deal, index) => {
          const featured = index === 0;
          return (
            <Reveal key={deal.id} delay={index * 120} className={featured ? "lg:col-span-2" : ""}>
              {featured ? (
                <article className="relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-3xl bg-ink p-7 text-cream sm:min-h-[460px] sm:p-10">
                  {deal.image && (
                    <Image
                      src={deal.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 760px, 100vw"
                      className="object-cover opacity-80"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="relative">
                    <span className="inline-block rounded-full bg-saffron px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-ink">
                      Best seller
                    </span>
                    <h3 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{deal.name}</h3>
                    <p className="mt-2 max-w-md text-[15px] leading-relaxed text-cream/80">{deal.description}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                      <p className="rounded-full bg-paper px-5 py-2.5 font-display text-2xl font-bold text-ink">
                        {formatPrice(deal.price)}
                      </p>
                      <AddToCartButton id={deal.id} label="Add deal" variant="solid" />
                    </div>
                  </div>
                </article>
              ) : (
                <article className="flex h-full min-h-[420px] flex-col justify-between rounded-3xl bg-saffron p-7 text-ink sm:min-h-[460px] sm:p-8">
                  {deal.image && (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink/10">
                      <Image
                        src={deal.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 360px, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="mt-6 font-display text-4xl font-bold">{deal.name}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink/80">{deal.description}</p>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                      <p className="font-display text-3xl font-bold">{formatPrice(deal.price)}</p>
                      <AddToCartButton
                        id={deal.id}
                        label="Add deal"
                        variant="solid"
                        className="bg-ink hover:bg-char"
                      />
                    </div>
                  </div>
                </article>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}