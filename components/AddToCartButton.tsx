"use client";

import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

type Props = {
  id: string;
  label?: string;
  variant?: "ember" | "cream";
};

const styles = {
  ember: "bg-ember text-white hover:bg-ember-dark",
  cream: "bg-cream text-ink hover:bg-white",
};

// Adds a product to the cart and briefly confirms with a check mark
export default function AddToCartButton({ id, label = "Add", variant = "ember" }: Props) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  // Reset the confirmation after a short moment
  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setAdded(false), 1400);
    return () => clearTimeout(timer);
  }, [added]);

  return (
    <button
      type="button"
      onClick={() => {
        add(id);
        setAdded(true);
      }}
      className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-5 text-sm font-semibold transition active:scale-95 ${styles[variant]}`}
    >
      {added ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12l5 5L20 7" />
        </svg>
      ) : null}
      <span aria-live="polite">{added ? "Added" : label}</span>
    </button>
  );
}