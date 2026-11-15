import { DEALS, ITEMS } from "@/lib/menu";

// Slowly scrolling ticker of dish names
export default function Marquee() {
  const names = [...ITEMS.map((i) => i.name), ...DEALS.map((d) => d.name)];

  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden}>
      {names.map((name) => (
        <li key={`${hidden}-${name}`} className="flex items-center">
          <span className="font-display text-xl font-medium italic text-cream sm:text-2xl">{name}</span>
          <span className="mx-6 inline-block h-1.5 w-1.5 rotate-45 bg-saffron sm:mx-9" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden bg-ink py-4" aria-label="Our dishes">
      <div className="animate-marquee flex w-max hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}