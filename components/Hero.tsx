import Image from "next/image";
import { RESTAURANT } from "@/lib/menu";

export default function Hero() {
  return (
    <section className="mx-auto flex max-w-[1200px] flex-col items-center gap-10 px-4 pb-14 pt-8 sm:px-8 sm:pb-20 sm:pt-12 lg:flex-row lg:gap-14">
      {/* Text side */}
      <div className="w-full flex-1">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#3a2a1c] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-gold sm:text-[13px]">
          <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
          Open daily . Lahore
        </div>

        <h1 className="mt-5 font-display text-[3.4rem] font-bold uppercase leading-[0.95] sm:text-7xl lg:text-[5.5rem]">
          Fresh from the grill, <span className="text-gold">to your door.</span>
        </h1>

        <p className="mt-6 max-w-[520px] text-base leading-relaxed text-[#b9b2a7] sm:text-lg">
          Charcoal tikka, loaded burgers and shawarma platters, made fresh every night. Book us for weddings and special events.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
          <a
            href="#menu"
            className="inline-flex min-h-12 items-center rounded-full bg-ember px-7 text-base font-semibold text-white transition hover:bg-ember-dark"
          >
            Order now
          </a>
          <a
            href="#deals"
            className="inline-flex min-h-12 items-center rounded-full border border-[#4a463f] px-7 text-base font-semibold transition hover:border-gold hover:text-gold"
          >
            View deals
          </a>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4 text-xs text-[#b9b2a7] sm:gap-9 sm:text-sm">
          <div>
            <p className="font-display text-2xl font-bold text-cream sm:text-3xl">30 min</p>
            <p>Average prep time</p>
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-cream sm:text-3xl">6 PM to 3 AM</p>
            <p>Open every day</p>
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-cream sm:text-3xl">Delivery</p>
            <p>and pickup</p>
          </div>
        </div>
      </div>

      {/* Round photo side */}
      <div className="w-full max-w-[440px] flex-1">
        <div className="aspect-square rounded-full bg-[conic-gradient(from_200deg,#c2410c,#f2b24a,#c2410c)] p-3.5">
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_35%_30%,#5a2a14,#1a110c_70%)]">
            {RESTAURANT.heroImage ? (
              <Image
                src={RESTAURANT.heroImage}
                alt={`${RESTAURANT.name} grilled platter`}
                fill
                priority
                sizes="(min-width: 1024px) 440px, 90vw"
                className="object-cover"
              />
            ) : (
              <p className="px-10 text-center text-xs font-semibold uppercase tracking-widest text-gold">
                Hero photo
                <br />
                Platter of tikka and kabab
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}