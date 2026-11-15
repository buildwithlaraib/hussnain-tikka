import Image from "next/image";
import { RESTAURANT } from "@/lib/menu";

// Final call-to-action band
export default function OrderCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-8 sm:pb-28">
      <div className="relative overflow-hidden rounded-3xl bg-rust px-7 py-12 text-white sm:px-12 sm:py-16">
        <div className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80">
              Hungry? The grill is hot until {RESTAURANT.closingTime}
            </p>
            <h2 className="mt-4 text-balance font-display text-4xl font-bold leading-[1.04] sm:text-6xl">
              Dinner is one tap away, <em className="font-medium">smoke included.</em>
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#menu"
                className="inline-flex min-h-12 items-center rounded-full bg-ink px-8 text-sm font-semibold uppercase tracking-[0.14em] text-cream transition hover:bg-char"
              >
                Start your order
              </a>
              <a
                href={`tel:${RESTAURANT.phoneTel}`}
                className="inline-flex min-h-12 items-center rounded-full border border-white/60 px-8 text-sm font-semibold uppercase tracking-[0.14em] transition hover:bg-white hover:text-rust"
              >
                {RESTAURANT.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Tilted photo card */}
          <div className="hidden justify-center md:flex">
            <div className="relative aspect-[4/5] w-56 rotate-3 overflow-hidden rounded-2xl border-4 border-paper bg-ink shadow-2xl lg:w-64">
              <Image src="/4.jpg" alt="Chicken tikka pizza" fill sizes="256px" className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}