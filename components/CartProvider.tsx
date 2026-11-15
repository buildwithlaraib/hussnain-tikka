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

const STORAGE_KEY = "hussnain-tikka-cart";
const MAX_QTY = 99;
const EMPTY: CartLine[] = [];

/* ---------- Tiny external store, persisted in localStorage ---------- */

let cache: CartLine[] = EMPTY;
let cacheRaw: string | null = null;
const listeners = new Set<() => void>();

// Drops anything that is not a valid, known product
function sanitize(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return EMPTY;
  const out: CartLine[] = [];
  for (const entry of value) {
    if (typeof entry !== "object" || entry === null) continue;
    const { id, qty } = entry as { id?: unknown; qty?: unknown };
    if (typeof id !== "string" || typeof qty !== "number") continue;
    if (!findProduct(id)) continue;
    const safeQty = Math.min(MAX_QTY, Math.floor(qty));
    if (safeQty > 0) out.push({ id, qty: safeQty });
  }
  return out;
}

// Returns the same array instance until the stored data changes
function readCart(): CartLine[] {
  if (typeof window === "undefined") return EMPTY;
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return cache;
  }
  if (raw === cacheRaw) return cache;
  cacheRaw = raw;
  try {
    cache = raw ? sanitize(JSON.parse(raw)) : EMPTY;
  } catch {
    cache = EMPTY;
  }
  return cache;
}

function writeCart(next: CartLine[]) {
  cache = next.length > 0 ? next : EMPTY;
  cacheRaw = next.length > 0 ? JSON.stringify(next) : null;
  try {
    if (cacheRaw) window.localStorage.setItem(STORAGE_KEY, cacheRaw);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable (private mode): the cart still works in memory
  }
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  // Keeps several open tabs in sync
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function getServerSnapshot(): CartLine[] {
  return EMPTY;
}

/* ---------- Context ---------- */

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const lines = useSyncExternalStore(subscribe, readCart, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const add = useCallback((id: string) => {
    if (!findProduct(id)) return;
    const current = readCart();
    const existing = current.find((line) => line.id === id);
    if (existing) {
      writeCart(
        current.map((line) =>
          line.id === id ? { ...line, qty: Math.min(MAX_QTY, line.qty + 1) } : line,
        ),
      );
    } else {
      writeCart([...current, { id, qty: 1 }]);
    }
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    const current = readCart();
    if (qty <= 0) {
      writeCart(current.filter((line) => line.id !== id));
      return;
    }
    const safeQty = Math.min(MAX_QTY, Math.floor(qty));
    writeCart(current.map((line) => (line.id === id ? { ...line, qty: safeQty } : line)));
  }, []);

  const remove = useCallback((id: string) => {
    writeCart(readCart().filter((line) => line.id !== id));
  }, []);

  const clear = useCallback(() => writeCart([]), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    let count = 0;
    let subtotal = 0;
    for (const line of lines) {
      const product = findProduct(line.id);
      if (!product) continue;
      count += line.qty;
      subtotal += product.price * line.qty;
    }
    return { lines, count, subtotal, isOpen, add, setQty, remove, clear, open, close };
  }, [lines, isOpen, add, setQty, remove, clear, open, close]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}