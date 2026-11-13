import { DELIVERY, RESTAURANT, formatPrice } from "@/lib/menu";

const card = "rounded-[20px] border border-line bg-surface p-6";

export default function Visit() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(RESTAURANT.mapsQuery)}`;

  return (
    <section id="visit" className="scroll-mt-24 border-t border-line bg-panel">
      <div className="mx-auto max-w-[1200px] px-4 py-14 sm:px-8 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Visit and delivery</p>
        <h2 className="mt-1.5 font-display text-4xl font-bold uppercase sm:text-5xl">
          Hours, delivery and contact
        </h2>

        <div className="mt-8 grid gap-5 md:grid-cols-3 sm:gap-6">
          {/* Hours */}
          <div className={card}>
            <h3 className="text-[17px] font-semibold">Opening hours</h3>
            <ul className="mt-3 space-y-1 text-[15px] leading-relaxed text-[#b9b2a7]">
              {RESTAURANT.hours.map((h) => (
                <li key={h.day}>
                  {h.day}: {h.time}
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery */}
          <div className={card}>
            <h3 className="text-[17px] font-semibold">Delivery</h3>
            <ul className="mt-3 space-y-1 text-[15px] leading-relaxed text-[#b9b2a7]">
              <li>
                {DELIVERY.area}: {formatPrice(DELIVERY.fee)}
              </li>
              <li>Free over {formatPrice(DELIVERY.freeOver)}</li>
              <li>Minimum order {formatPrice(DELIVERY.minOrder)}. Pickup also available.</li>
            </ul>
          </div>

          {/* Contact */}
          <div className={card}>
            <h3 className="text-[17px] font-semibold">Find us</h3>
            <address className="mt-3 text-[15px] not-italic leading-relaxed text-[#b9b2a7]">
              {RESTAURANT.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <div className="mt-4 flex flex-col gap-2.5">
              <a
                href={`tel:${RESTAURANT.phoneTel}`}
                className="flex min-h-11 items-center justify-center rounded-full bg-ember text-[15px] font-semibold text-white transition hover:bg-ember-dark"
              >
                Call {RESTAURANT.phoneDisplay}
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-11 items-center justify-center rounded-full border border-[#4a463f] text-[15px] font-semibold transition hover:border-gold hover:text-gold"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}