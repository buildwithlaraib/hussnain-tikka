/* ============================================================
   Single source of truth for the restaurant: info, menu, deals.
   Edit this file to change prices, items, hours or contact details.
   ============================================================ */

export type Tone = [string, string];

export type Category = {
  id: string;
  name: string;
  tone: Tone;
  /** When set, the tab scrolls to that section instead of filtering */
  href?: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  /** Base price in PKR */
  price: number;
  /** Show "from Rs. X" (for items with sizes) */
  fromPrice?: boolean;
  category: string;
  popular?: boolean;
  /** Optional photo, e.g. "/2.jpg" (file lives in /public) */
  image?: string;
  /** Gradient used as a placeholder until a photo is added */
  tone: Tone;
};

export type Deal = {
  id: string;
  name: string;
  description: string;
  price: number;
};

/** Anything that can be added to the cart */
export type Product = {
  id: string;
  name: string;
  price: number;
};

export const RESTAURANT = {
  name: "Hussnain Tikka",
  initials: "HT",
  tagline: "Fresh from the grill, to your door.",
  phoneDisplay: "03076812703",
  phoneTel: "+923076812703",
  // WhatsApp number in international format, digits only (92 + number without the leading 0)
  whatsapp: "923076812703",
  addressLines: ["Jaffrypull, near Bluebells School,", "Mughalpura, Lahore 54840"],
  mapsQuery: "Jaffrypull near Bluebells School Mughalpura Lahore",
  hours: [{ day: "Every day", time: "6:00 PM to 3:00 AM" }],
};

/** Three arch-shaped photos in the hero (the middle one is larger) */
export const HERO_GALLERY = [
  { src: "/2.jpg", alt: "Crispy zinger burger", label: "Zinger Burger" },
  { src: "/1.jpg", alt: "Charcoal grilled chicken kabab", label: "Chicken Kabab" },
  { src: "/4.jpg", alt: "Chicken tikka pizza", label: "Tikka Pizza" },
];

export const DELIVERY = {
  area: "Mughalpura to Lalpull",
  fee: 50,
  freeOver: 1000,
  minOrder: 180,
};

export const CATEGORIES: Category[] = [
  { id: "bbq", name: "BBQ", tone: ["#3a1a0c", "#1a1210"] },
  { id: "burgers", name: "Burgers", tone: ["#3a280c", "#1a1610"] },
  { id: "shawarma", name: "Shawarma", tone: ["#33200f", "#161210"] },
  { id: "pizza", name: "Pizza", tone: ["#3a1410", "#1a1010"] },
  { id: "fries", name: "Fries", tone: ["#3a300c", "#1a1810"] },
  { id: "rolls", name: "Rolls", tone: ["#2e1a10", "#151110"] },
  { id: "platters", name: "Platters", tone: ["#2a2010", "#151310"] },
  { id: "drinks", name: "Drinks", tone: ["#0f2a2a", "#101616"] },
];

export const ITEMS: MenuItem[] = [
  {
    id: "zinger-burger",
    name: "Zinger Burger",
    description: "Crispy fried chicken fillet, lettuce, sauce.",
    price: 300,
    category: "burgers",
    popular: true,
    image: "/2.jpg",
    tone: ["#4a2a10", "#1c1410"],
  },
  {
    id: "chicken-tikka-pizza",
    name: "Chicken Tikka Pizza",
    description: "Tikka topping, mozzarella, tomato base.",
    price: 400,
    fromPrice: true,
    category: "pizza",
    popular: true,
    image: "/4.jpg",
    tone: ["#4a1c10", "#1c1210"],
  },
  {
    id: "bihari-wrap",
    name: "Bihari Wrap",
    price: 400,
    category: "rolls",
    popular: true,
    image: "/wrap.jpg",
    tone: ["#3a2a14", "#1a1610"],
  },
  {
    id: "shawarma-platter",
    name: "Shawarma Platter",
    description: "Shawarma platter with 3 breads.",
    price: 400,
    category: "platters",
    popular: true,
    image: "/3.jpg",
    tone: ["#443010", "#1a1610"],
  },
  {
    id: "chicken-kabab",
    name: "Chicken Kabab",
    price: 130,
    category: "bbq",
    popular: true,
    image: "/1.jpg",
    tone: ["#4a2210", "#1c1210"],
  },
  {
    id: "grilled-fish",
    name: "Grilled Fish",
    price: 1300,
    category: "bbq",
    popular: true,
    image: "/fish.jpg",
    tone: ["#2a3a1a", "#141a12"],
  },
];

export const DEALS: Deal[] = [
  {
    id: "deal-1",
    name: "Deal 1",
    description: "2 special zinger burger, 1 small pizza, 1 litre cold drink.",
    price: 1050,
  },
  {
    id: "deal-2",
    name: "Deal 2",
    description: "1 medium pizza, 1 large pizza, 1.5 litre bottle.",
    price: 1999,
  },
];

/** Looks up any cart-able product (menu item or deal) by id */
export function findProduct(id: string): Product | undefined {
  const item = ITEMS.find((i) => i.id === id);
  if (item) return { id: item.id, name: item.name, price: item.price };
  const deal = DEALS.find((d) => d.id === id);
  if (deal) return { id: deal.id, name: deal.name, price: deal.price };
  return undefined;
}

export function formatPrice(amount: number): string {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}

export function gradient(tone: Tone): string {
  return `linear-gradient(135deg, ${tone[0]}, ${tone[1]})`;
}