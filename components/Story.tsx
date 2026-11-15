import Image from "next/image";
import { DELIVERY, RESTAURANT, formatPrice } from "@/lib/menu";
import Reveal from "./Reveal";

const POINTS = [
  "Made fresh to order, every order",
  `Delivery from ${DELIVERY.area}`,
  `Open every night until ${RESTAURANT.closingTime}`,
];

export default function Story() {
  return (
    <section id="story" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: heading and photo */}
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-rust">01 — Our story</p>
          <h2 className="mt-4 text-balance font-display text-5xl font-bold leading-[1.02] sm:text-6xl">
            One grill. Every night. <em className="font-medium text-rust">No shortcuts.</em>
          </h2>

          <div className="relative mt-9 aspect-[4/3] overflow-hidden rounded-3xl bg-line">
            <Image
              src="/story.jpg"
              alt="Shawarma platter from Hussnain Tikka"
              fill
              sizes="(min-width: 1024px) 540px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Right: highlight cards */}
        <div className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Reveal delay={80}>
              <div className="h-full rounded-3xl border border-line bg-paper p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-rust/10 text-rust" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3c1 3 4 4.5 4 8a4 4 0 0 1-8 0c0-1.5.6-2.4 1.5-3.5C10.5 6.5 11.5 5 12 3z" />
                    <path d="M9 21h6" />
                  </svg>
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold">Charcoal grilled</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Our tikka and kabab are cooked over real charcoal for that smoky, restaurant flavour.
                </p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="h-full rounded-3xl bg-ink p-6 text-cream">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-saffron/15 text-saffron" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold">Fresh every time</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">
                  Burgers, pizza and platters are prepared when you order, never sitting around.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={240}>
            <div className="rounded-3xl border border-line bg-paper p-7 sm:p-9">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-rust">Why Mughalpura orders from us</p>
              <ul className="mt-5 space-y-4">
                {POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 font-display text-xl leading-snug sm:text-2xl">
                    <span className="mt-2.5 h-2 w-2 shrink-0 rotate-45 bg-rust" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-6 border-t border-line pt-5 text-sm text-muted">
                Minimum delivery order {formatPrice(DELIVERY.minOrder)}. Pickup is always available.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}