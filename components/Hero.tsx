import Image from "next/image";
import { HERO_GALLERY } from "@/lib/menu";

const STATS = [
  { value: "30 min", label: "Average prep" },
  { value: "6 PM – 3 AM", label: "Open daily" },
  { value: "Delivery", label: "and pickup" },
];

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 pt-14 text-center sm:px-8 sm:pt-20">
      <p
        className="fade-up flex items-center justify-center gap-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold sm:text-xs"
      >
        <span className="h-px w-8 bg-gold/50 sm:w-14" aria-hidden="true" />
        Mughalpura · Lahore
        <span className="h-px w-8 bg-gold/50 sm:w-14" aria-hidden="true" />
      </p>

      <h1
        className="fade-up mx-auto mt-6 max-w-4xl text-balance font-display text-[clamp(2.9rem,8.5vw,6.2rem)] font-semibold leading-[1.02] tracking-tight"
        style={{ animationDelay: "120ms" }}
      >
        Fresh from the grill, <span className="gold-text italic">to your door.</span>
      </h1>

      <p
        className="fade-up mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        style={{ animationDelay: "240ms" }}
      >
        Charcoal tikka, loaded burgers and shawarma platters, made fresh every night. Book us for weddings and special events.
      </p>

      <div
        className="fade-up mt-9 flex flex-wrap justify-center gap-3 sm:gap-4"
        style={{ animationDelay: "360ms" }}
      >
        <a
          href="#menu"
          className="inline-flex min-h-12 items-center rounded-full bg-gold px-8 text-sm font-semibold uppercase tracking-[0.16em] text-ink transition hover:bg-gold-light"
        >
          Order now
        </a>
        <a
          href="#deals"
          className="inline-flex min-h-12 items-center rounded-full border border-gold/40 px-8 text-sm font-semibold uppercase tracking-[0.16em] transition hover:border-gold hover:text-gold"
        >
          View deals
        </a>
      </div>

      {/* Arch-shaped photo trio: the middle arch is taller */}
      <div className="fade-up relative mx-auto mt-16 max-w-4xl" style={{ animationDelay: "480ms" }}>
        <div className="grid grid-cols-3 items-end gap-2.5 sm:gap-5">
          {HERO_GALLERY.map((photo, i) => (
            <figure
              key={photo.src}
              className={`relative overflow-hidden rounded-t-[999px] rounded-b-2xl border border-gold/25 bg-surface-2 ${
                i === 1 ? "aspect-[3/4.4]" : "aspect-[3/3.6]"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority
                sizes="(min-width: 1024px) 320px, 33vw"
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent px-2 pb-3 pt-12 text-[9px] font-semibold uppercase tracking-[0.2em] text-cream sm:text-xs">
                {photo.label}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Rotating badge */}
        <div className="pointer-events-none absolute -bottom-7 right-0 flex h-24 w-24 items-center justify-center rounded-full border border-gold/40 bg-ink text-gold sm:-bottom-9 sm:right-8 sm:h-28 sm:w-28">
          <svg viewBox="0 0 120 120" className="animate-slow-spin absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
            </defs>
            <text fontSize="10" fontWeight="600" fill="currentColor" textLength="272" lengthAdjust="spacing">
              <textPath href="#badge-circle">CHARCOAL GRILLED · EVERY NIGHT · </textPath>
            </text>
          </svg>
          <span className="h-2.5 w-2.5 rotate-45 bg-gold" aria-hidden="true" />
        </div>
      </div>

      {/* Quick facts */}
      <dl className="mx-auto mt-20 grid max-w-3xl grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-surface/60 backdrop-blur">
        {STATS.map((stat) => (
          <div key={stat.label} className="px-2 py-5">
            <dt className="font-display text-xl font-semibold text-gold sm:text-3xl">{stat.value}</dt>
            <dd className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted sm:text-xs">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}