import { RESTAURANT, type MenuItem } from "@/lib/menu";
import ItemCard from "./ItemCard";

export default function PopularItems({ items }: { items: MenuItem[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-8 text-center">
        <p className="font-semibold">No items in this category yet.</p>
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
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
}