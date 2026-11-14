"use client";

import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

type Props = {
  id: string;
  label?: string;
  variant?: "outline" | "solid";
  className?: string;
};

const styles = {
  outline: "border border-gold/60 text-gold hover:bg-gold hover:text-ink",
  solid: "border border-gold bg-gold text-ink hover:bg-gold-light",
};

// Adds a product to the cart and briefly confirms with a check mark
export default function AddToCartButton({
  id,
  label = "Add to order",
  variant = "outline",
  className = "",
}: Props) {
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
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold uppercase tracking-[0.12em] transition duration-300 active:scale-95 ${styles[variant]} ${className}`}
    >
      {added && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12l5 5L20 7" />
        </svg>
      )}
      <span aria-live="polite">{added ? "Added" : label}</span>
    </button>
  );
}