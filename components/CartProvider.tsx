"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { findProduct } from "@/lib/menu";

export type CartLine = { id: string; qty: number };

const STORAGE_KEY = "hussnain-tikka-cart";
const MAX_QTY = 50;
const EMPTY: CartLine[] = [];

/* ------------------------------------------------------------
   Tiny external store: keeps the cart in localStorage so it
   survives refreshes, without hydration mismatches.
   ------------------------------------------------------------ */
let current: CartLine[] | null = null;
const listeners = new Set<() => void>();

// Drops anything that is not a valid, known cart line
function sanitize(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return EMPTY;
  const out: CartLine[] = [];
  for (const entry of value) {
    if (entry && typeof entry === "object") {
      const { id, qty } = entry as { id?: unknown; qty?: unknown };
      if (typeof id === "string" && typeof qty === "number" && qty > 0 && findProduct(id)) {
        out.push({ id, qty: Math.min(Math.floor(qty), MAX_QTY) });
      }
    }
  }
  return out;
}

function readCart(): CartLine[] {
  if (current !== null) return current;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    current = raw ? sanitize(JSON.parse(raw)) : EMPTY;
  } catch {
    current = EMPTY;
  }
  return current;
}

function writeCart(next: CartLine[]) {
  current = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage may be blocked (private mode); the cart still works in memory
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/* ------------------------------------------------------------
   Context
   ------------------------------------------------------------ */
type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  add: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  // Server render and first client render both see an empty cart
  const lines = useSyncExternalStore(subscribe, readCart, () => EMPTY);
  const [isOpen, setIsOpen] = useState(false);

  const add = useCallback((id: string) => {
    const cur = readCart();
    const exists = cur.some((l) => l.id === id);
    writeCart(
      exists
        ? cur.map((l) => (l.id === id ? { ...l, qty: Math.min(l.qty + 1, MAX_QTY) } : l))
        : [...cur, { id, qty: 1 }],
    );
  }, []);

  const remove = useCallback((id: string) => {
    writeCart(readCart().filter((l) => l.id !== id));
  }, []);

  const setQty = useCallback(
    (id: string, qty: number) => {
      if (qty <= 0) {
        remove(id);
        return;
      }
      writeCart(
        readCart().map((l) => (l.id === id ? { ...l, qty: Math.min(qty, MAX_QTY) } : l)),
      );
    },
    [remove],
  );

  const clear = useCallback(() => writeCart(EMPTY), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const { count, subtotal } = useMemo(() => {
    let c = 0;
    let s = 0;
    for (const line of lines) {
      const product = findProduct(line.id);
      if (!product) continue;
      c += line.qty;
      s += product.price * line.qty;
    }
    return { count: c, subtotal: s };
  }, [lines]);

  const value = useMemo<CartContextValue>(
    () => ({ lines, count, subtotal, isOpen, add, setQty, remove, clear, open, close }),
    [lines, count, subtotal, isOpen, add, setQty, remove, clear, open, close],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}