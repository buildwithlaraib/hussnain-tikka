import Image from "next/image";
import { DEALS, DELIVERY, ITEMS, RESTAURANT, formatPrice } from "@/lib/menu";
import AddToCartButton from "./AddToCartButton";

export default function Hero() {
  const deal = DEALS[0];
  const featured = ITEMS.find((i) => i.id === "chicken-kabab") ?? ITEMS[0];

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-16 pt-10 sm:px-8 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24">
      {/* Left: copy */}
      <div>
        <p className="fade-up inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
          <span className="h-2 w-2 rounded-full bg-rust" aria-hidden="true" />
          Charcoal grill · Open till {RESTAURANT.closingTime}
        </p>

        <h1
          className="fade-up mt-6 text-balance font-display text-[clamp(2.7rem,7.4vw,5.6rem)] font-bold uppercase leading-[0.96] tracking-tight"
          style={{ animationDelay: "100ms" }}
        >
          Fire-grilled <em className="font-medium normal-case text-rust">flavour</em> to your door
          <span className="text-rust">.</span>
        </h1>

        <p
          className="fade-up mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg"
          style={{ animationDelay: "200ms" }}
        >
          Charcoal tikka, loaded burgers, pizza and shawarma platters, made fresh every night in Mughalpura. Order
          online in under a minute.
        </p>

        {/* Quick facts */}
        <dl className="fade-up mt-8 flex gap-8 sm:gap-12" style={{ animationDelay: "300ms" }}>
          <div>
            <dt className="font-display text-3xl font-bold text-rust sm:text-4xl">
              {RESTAURANT.openingTime}–{RESTAURANT.closingTime}
            </dt>
            <dd className="mt-1 text-sm text-muted">open every day</dd>
          </div>
          <div className="border-l border-line pl-8 sm:pl-12">
            <dt className="font-display text-3xl font-bold text-rust sm:text-4xl">{formatPrice(DELIVERY.fee)}</dt>
            <dd className="mt-1 text-sm text-muted">delivery, free over {formatPrice(DELIVERY.freeOver)}</dd>
          </div>
        </dl>

        <div className="fade-up mt-9 flex flex-wrap gap-3" style={{ animationDelay: "400ms" }}>
          <a
            href="#menu"
            className="inline-flex min-h-12 items-center rounded-full bg-rust px-8 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-rust-dark"
          >
            Order now
          </a>
          <a
            href={`tel:${RESTAURANT.phoneTel}`}
            className="inline-flex min-h-12 items-center rounded-full border border-ink/25 px-8 text-sm font-semibold uppercase tracking-[0.14em] transition hover:border-ink hover:bg-ink hover:text-cream"
          >
            Call us
          </a>
        </div>

        {/* Featured deal strip */}
        {deal && (
          <div
            className="fade-up mt-10 flex items-center justify-between gap-4 rounded-2xl border border-line bg-paper p-4 pl-5 sm:max-w-md"
            style={{ animationDelay: "500ms" }}
          >
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-rust">Tonight&apos;s deal</p>
              <p className="mt-1 truncate font-display text-lg font-semibold">
                {deal.name} · {formatPrice(deal.price)}
              </p>
            </div>
            <AddToCartButton id={deal.id} label="Add" variant="solid" className="shrink-0" />
          </div>
        )}
      </div>

      {/* Right: large photo with floating cards */}
      <div className="fade-up relative" style={{ animationDelay: "250ms" }}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] rounded-tr-[7rem] bg-line sm:aspect-[4/4.6]">
          <Image
            src="/hero.jpg"
            alt="Chicken tikka and kababs grilling over charcoal"
            fill
            priority
            sizes="(min-width: 1024px) 500px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        </div>

        {/* Floating: opening hours */}
        <div className="absolute left-3 top-6 flex items-center gap-3 rounded-2xl bg-paper px-4 py-3 shadow-xl sm:-left-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rust text-white" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-semibold">Open late</span>
            <span className="block text-xs text-muted">until {RESTAURANT.closingTime}, every day</span>
          </span>
        </div>

        {/* Floating: customer favourite */}
        {featured && (
          <div className="absolute bottom-5 left-3 rounded-2xl bg-ink px-5 py-4 text-cream shadow-xl sm:-left-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-saffron">Customer favourite</p>
            <p className="mt-1 font-display text-xl font-semibold">{featured.name}</p>
            <p className="mt-0.5 text-sm text-cream/70">{formatPrice(featured.price)}</p>
          </div>
        )}
      </div>
    </section>
  );
}