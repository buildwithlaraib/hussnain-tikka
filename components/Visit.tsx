import { DELIVERY, RESTAURANT, formatPrice } from "@/lib/menu";
import Reveal from "./Reveal";

const label = "text-[11px] font-semibold uppercase tracking-[0.24em] text-gold";

export default function Visit() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(RESTAURANT.mapsQuery)}`;

  return (
    <section id="visit" className="scroll-mt-24 border-t border-line bg-surface/50">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-16">
        {/* Left: heading and call to action */}
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold sm:text-xs">
            Visit and delivery
          </p>
          <h2 className="mt-3 text-balance font-display text-5xl font-semibold leading-[1.05] sm:text-6xl">
            Come hungry. <span className="gold-text italic">We open late.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            Walk in, call ahead or order online. Our charcoal grill is lit every evening until 3 AM.
          </p>

          <a
            href={`tel:${RESTAURANT.phoneTel}`}
            className="mt-8 inline-block font-display text-4xl font-semibold text-gold transition hover:text-gold-light sm:text-5xl"
          >
            {RESTAURANT.phoneDisplay}
          </a>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`tel:${RESTAURANT.phoneTel}`}
              className="inline-flex min-h-12 items-center rounded-full bg-gold px-8 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition hover:bg-gold-light"
            >
              Call us
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center rounded-full border border-gold/40 px-8 text-sm font-semibold uppercase tracking-[0.16em] transition hover:border-gold hover:text-gold"
            >
              Open in Maps
            </a>
          </div>
        </Reveal>

        {/* Right: details list */}
        <Reveal delay={120}>
          <dl className="divide-y divide-line rounded-3xl border border-line bg-surface">
            <div className="p-6 sm:p-8">
              <dt className={label}>Opening hours</dt>
              {RESTAURANT.hours.map((h) => (
                <dd key={h.day} className="mt-2 font-display text-2xl">
                  {h.day}: {h.time}
                </dd>
              ))}
            </div>
            <div className="p-6 sm:p-8">
              <dt className={label}>Delivery</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-cream/90">
                {DELIVERY.area}: {formatPrice(DELIVERY.fee)}.
                <br />
                Free over {formatPrice(DELIVERY.freeOver)}.
                <br />
                Minimum order {formatPrice(DELIVERY.minOrder)}. Pickup also available.
              </dd>
            </div>
            <div className="p-6 sm:p-8">
              <dt className={label}>Find us</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-cream/90">
                {RESTAURANT.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}