"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { DELIVERY, RESTAURANT, findProduct, formatPrice } from "@/lib/menu";
import { useCart } from "./CartProvider";

type Fulfilment = "delivery" | "pickup";

const inputClass =
  "h-12 w-full rounded-xl border border-line bg-ink px-4 text-[15px] text-cream outline-none placeholder:text-muted/60 focus:border-gold";

export default function CartDrawer() {
  const { lines, count, subtotal, isOpen, close, setQty, remove, clear } = useCart();

  const [fulfilment, setFulfilment] = useState<Fulfilment>("delivery");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  // Cart lines joined with product details
  const detailed = useMemo(() => {
    const out: { id: string; qty: number; name: string; price: number }[] = [];
    for (const line of lines) {
      const product = findProduct(line.id);
      if (product) out.push({ id: line.id, qty: line.qty, name: product.name, price: product.price });
    }
    return out;
  }, [lines]);

  const deliveryFee =
    fulfilment === "delivery" && subtotal > 0 && subtotal < DELIVERY.freeOver ? DELIVERY.fee : 0;
  const total = subtotal + deliveryFee;

  // Close on Escape and lock page scroll while the drawer is open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const phoneDigits = phone.replace(/\D/g, "").length;
    if (detailed.length === 0) return setError("Your cart is empty.");
    if (name.trim().length < 2) return setError("Please enter your name.");
    if (phoneDigits < 10 || phoneDigits > 15) return setError("Please enter a valid phone number.");
    if (fulfilment === "delivery") {
      if (address.trim().length < 6) return setError("Please enter your delivery address.");
      if (subtotal < DELIVERY.minOrder) {
        return setError(`Minimum order for delivery is ${formatPrice(DELIVERY.minOrder)}.`);
      }
    }
    setError("");

    // Build the order message that opens in WhatsApp
    const rows = detailed.map((l) => `- ${l.qty} x ${l.name} (${formatPrice(l.price * l.qty)})`);
    const message = [
      `New order - ${RESTAURANT.name}`,
      "",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Type: ${fulfilment === "delivery" ? "Delivery" : "Pickup"}`,
      ...(fulfilment === "delivery" ? [`Address: ${address.trim()}`] : []),
      "",
      "Items:",
      ...rows,
      "",
      `Subtotal: ${formatPrice(subtotal)}`,
      ...(fulfilment === "delivery" ? [`Delivery: ${deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}`] : []),
      `Total: ${formatPrice(total)}`,
      ...(note.trim() ? ["", `Note: ${note.trim()}`] : []),
    ].join("\n");

    const url = `https://wa.me/${RESTAURANT.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      {/* Dimmed backdrop */}
      <div
        onClick={close}
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your order"
        inert={!isOpen}
        className={`absolute right-0 top-0 h-full w-full max-w-md border-l border-line bg-surface shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <form onSubmit={handleSubmit} noValidate className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <h2 className="font-display text-3xl font-semibold">
              Your order {count > 0 && <span className="text-gold">({count})</span>}
            </h2>
            <button
              type="button"
              onClick={close}
              aria-label="Close cart"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line hover:border-gold"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5">
            {detailed.length === 0 ? (
              <div className="py-16 text-center">
                <p className="font-display text-2xl">Your cart is empty</p>
                <p className="mt-1 text-sm text-muted">Add something delicious from the menu.</p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-6 min-h-11 rounded-full bg-gold px-7 text-sm font-semibold uppercase tracking-[0.14em] text-ink hover:bg-gold-light"
                >
                  Browse menu
                </button>
              </div>
            ) : (
              <>
                {/* Cart lines */}
                <ul className="space-y-3">
                  {detailed.map((line) => (
                    <li key={line.id} className="rounded-2xl border border-line bg-ink p-4">
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-display text-xl font-semibold">{line.name}</p>
                        <p className="shrink-0 font-semibold text-gold">{formatPrice(line.price * line.qty)}</p>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setQty(line.id, line.qty - 1)}
                            aria-label={`Decrease ${line.name}`}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-lg hover:border-gold"
                          >
                            −
                          </button>
                          <span className="w-6 text-center font-semibold" aria-live="polite">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(line.id, line.qty + 1)}
                            aria-label={`Increase ${line.name}`}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-lg hover:border-gold"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(line.id)}
                          className="min-h-9 text-sm text-muted underline hover:text-cream"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Delivery or pickup */}
                <div>
                  <p className="mb-2 text-sm font-semibold">How would you like your order?</p>
                  <div className="grid grid-cols-2 gap-2">
                    {(["delivery", "pickup"] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        aria-pressed={fulfilment === type}
                        onClick={() => setFulfilment(type)}
                        className={`min-h-11 rounded-xl border text-sm font-semibold capitalize transition ${
                          fulfilment === type
                            ? "border-gold bg-gold/10 text-gold"
                            : "border-line text-cream/80 hover:border-gold/50"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Customer details */}
                <div className="space-y-3">
                  <div>
                    <label htmlFor="cart-name" className="mb-1.5 block text-sm font-semibold">Your name</label>
                    <input id="cart-name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="cart-phone" className="mb-1.5 block text-sm font-semibold">Phone number</label>
                    <input id="cart-phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
                  </div>
                  {fulfilment === "delivery" && (
                    <div>
                      <label htmlFor="cart-address" className="mb-1.5 block text-sm font-semibold">Delivery address</label>
                      <input id="cart-address" type="text" autoComplete="street-address" value={address} onChange={(e) => setAddress(e.target.value)} className={inputClass} />
                    </div>
                  )}
                  <div>
                    <label htmlFor="cart-note" className="mb-1.5 block text-sm font-semibold">
                      Note <span className="font-normal text-muted">(optional)</span>
                    </label>
                    <input id="cart-note" type="text" value={note} onChange={(e) => setNote(e.target.value)} className={inputClass} />
                  </div>
                </div>

                <button type="button" onClick={clear} className="text-sm text-muted underline hover:text-cream">
                  Clear cart
                </button>
              </>
            )}
          </div>

          {/* Footer: totals and checkout */}
          {detailed.length > 0 && (
            <div className="space-y-3 border-t border-line bg-ink px-5 py-4">
              <dl className="space-y-1 text-sm">
                <div className="flex justify-between text-muted">
                  <dt>Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                {fulfilment === "delivery" && (
                  <div className="flex justify-between text-muted">
                    <dt>Delivery</dt>
                    <dd>{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</dd>
                  </div>
                )}
                <div className="flex justify-between pt-1 text-base font-semibold">
                  <dt>Total</dt>
                  <dd className="font-display text-2xl text-gold">{formatPrice(total)}</dd>
                </div>
              </dl>

              {error && (
                <p role="alert" className="rounded-xl border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="flex min-h-12 w-full items-center justify-center rounded-full bg-gold text-sm font-semibold uppercase tracking-[0.16em] text-ink transition hover:bg-gold-light"
              >
                Order on WhatsApp
              </button>
              <p className="text-center text-xs text-muted">
                Your order opens in WhatsApp. Send it to confirm. Pay on delivery or at pickup.
              </p>
            </div>
          )}
        </form>
      </aside>
    </div>
  );
}