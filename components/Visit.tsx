import Image from "next/image";
import { DELIVERY, RESTAURANT, formatPrice } from "@/lib/menu";
import Reveal from "./Reveal";

const label = "text-[11px] font-semibold uppercase tracking-[0.22em] text-rust";

export default function Visit() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(RESTAURANT.mapsQuery)}`;

  const facts = [
    { value: `${RESTAURANT.openingTime}`, caption: "We open" },
    { value: formatPrice(DELIVERY.fee), caption: "Delivery" },
    { value: formatPrice(DELIVERY.minOrder), caption: "Min. order" },
  ];

  return (
    <section id="visit" className="mx-auto max-w-6xl scroll-mt-24 px-4 pb-20 sm:px-8 sm:pb-28">
      {/* Photo banner */}
      <Reveal>
        <div className="relative flex min-h-[460px] flex-col justify-end overflow-hidden rounded-3xl bg-ink p-7 text-cream sm:min-h-[520px] sm:p-12">
          <Image
            src="/banner.jpg"
            alt=""
            fill
            sizes="(min-width: 1152px) 1100px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

          <div className="relative grid items-end gap-8 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-saffron">05 — Visit and delivery</p>
              <h2 className="mt-3 text-balance font-display text-4xl font-bold leading-[1.04] sm:text-6xl">
                Come hungry. <em className="font-medium text-saffron">Leave happy.</em>
              </h2>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={`tel:${RESTAURANT.phoneTel}`}
                  className="inline-flex min-h-12 items-center rounded-full bg-paper px-7 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition hover:bg-saffron"
                >
                  Call {RESTAURANT.phoneDisplay}
                </a>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center rounded-full border border-cream/50 px-7 text-sm font-semibold uppercase tracking-[0.14em] transition hover:bg-cream hover:text-ink"
                >
                  Open in Maps
                </a>
              </div>
            </div>

            <dl className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {facts.map((fact) => (
                <div key={fact.caption} className="rounded-2xl border border-white/20 bg-white/10 px-3 py-4 text-center backdrop-blur-md">
                  <dt className="font-display text-xl font-bold sm:text-2xl">{fact.value}</dt>
                  <dd className="mt-1 text-[10px] uppercase tracking-[0.16em] text-cream/70">{fact.caption}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>

      {/* Details cards */}
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <Reveal>
          <div className="h-full rounded-3xl border border-line bg-paper p-7">
            <p className={label}>Opening hours</p>
            {RESTAURANT.hours.map((h) => (
              <p key={h.day} className="mt-3 font-display text-2xl font-semibold leading-snug">
                {h.day}
                <span className="block text-muted">{h.time}</span>
              </p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="h-full rounded-3xl border border-line bg-paper p-7">
            <p className={label}>Delivery</p>
            <p className="mt-3 text-[15px] leading-relaxed">
              {DELIVERY.area}: {formatPrice(DELIVERY.fee)}.
              <br />
              Free over {formatPrice(DELIVERY.freeOver)}.
              <br />
              Minimum order {formatPrice(DELIVERY.minOrder)}.
              <br />
              Pickup also available.
            </p>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="h-full rounded-3xl border border-line bg-paper p-7">
            <p className={label}>Find us</p>
            <p className="mt-3 text-[15px] leading-relaxed">
              {RESTAURANT.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}