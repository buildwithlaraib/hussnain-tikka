import { RESTAURANT, type MenuItem } from "@/lib/menu";
import ItemCard from "./ItemCard";
import Reveal from "./Reveal";

export default function PopularItems({ items }: { items: MenuItem[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-line bg-surface p-10 text-center">
        <p className="font-display text-2xl">Nothing here yet.</p>
        <p className="mt-2 text-sm text-muted">
          Call us on{" "}
          <a className="font-semibold text-gold underline" href={`tel:${RESTAURANT.phoneTel}`}>
            {RESTAURANT.phoneDisplay}
          </a>{" "}
          to order.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
      {items.map((item, i) => (
        <Reveal key={item.id} delay={(i % 3) * 90} className="h-full">
          <ItemCard item={item} />
        </Reveal>
      ))}
    </div>
  );
}