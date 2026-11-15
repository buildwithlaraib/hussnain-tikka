"use client";

import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";

type Variant = "solid" | "outline" | "icon";

type Props = {
  id: string;
  /** Button text (or the accessible name for the icon variant) */
  label?: string;
  variant?: Variant;
  className?: string;
};

const base =
  "inline-flex items-center justify-center transition duration-300 active:scale-95";

const styles: Record<Variant, string> = {
  solid:
    "min-h-11 gap-2 rounded-full bg-rust px-6 text-sm font-semibold uppercase tracking-[0.12em] text-white hover:bg-rust-dark",
  outline:
    "min-h-11 gap-2 rounded-full border border-ink/25 px-6 text-sm font-semibold uppercase tracking-[0.12em] text-ink hover:border-ink hover:bg-ink hover:text-cream",
  icon: "h-10 w-10 shrink-0 rounded-full border",
};

// Adds a product to the cart and briefly confirms with a check mark
export default function AddToCartButton({
  id,
  label = "Add to order",
  variant = "solid",
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

  const icon = added ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12l5 5L20 7" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );

  return (
    <button
      type="button"
      onClick={() => {
        add(id);
        setAdded(true);
      }}
      aria-label={variant === "icon" ? label : undefined}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {variant === "icon" ? (
        icon
      ) : (
        <>
          {added && icon}
          <span aria-live="polite">{added ? "Added" : label}</span>
        </>
      )}
    </button>
  );
}