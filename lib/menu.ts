/* ============================================================
   Single source of truth for the restaurant: info, menu, deals.
   Edit this file to change prices, items, hours or contact details.
   ============================================================ */

export type Tone = [string, string];

export type Category = {
  id: string;
  name: string;
  tone: Tone;
  /** When set, the tile scrolls to that section instead of filtering */
  href?: string;
  image?: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  /** Base price in PKR */
  price: number;
  /** Show "From Rs. X" (for items with sizes) */
  fromPrice?: boolean;
  category: string;
  popular?: boolean;
  /** Optional photo, e.g. "/images/zinger-burger.jpg" (file lives in /public/images) */
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
  // Optional round hero photo, e.g. "/images/hero.jpg"
  heroImage: "/hero.jpg",
};

export const DELIVERY = {
  area: "Mughalpura to Lalpull",
  fee: 50,
  freeOver: 1000,
  minOrder: 180,
};

export const CATEGORIES: Category[] = [
  { id: "bbq", name: "BBQ", tone: ["#3a1a0c", "#1a1210"], image: "/1.jpg" },
  { id: "burgers", name: "Burgers", tone: ["#3a280c", "#1a1610"], image: "/2.jpg" },
  { id: "shawarma", name: "Shawarma", tone: ["#33200f", "#161210"], image: "/3.jpg" },
  { id: "pizza", name: "Pizza", tone: ["#3a1410", "#1a1010"], image: "/4.jpg" },
  { id: "fries", name: "Fries", tone: ["#3a300c", "#1a1810"], image: "/5.jpg" },
  { id: "rolls", name: "Rolls", tone: ["#2e1a10", "#151110"], image: "/6.jpg" },
  { id: "platters", name: "Platters", tone: ["#2a2010", "#151310"], image: "/7.jpg" },
  { id: "deals", name: "Deals and combos", tone: ["#4a1f0c", "#1c1210"], href: "#deals", image: "/8.jpg" },
  { id: "drinks", name: "Drinks", tone: ["#0f2a2a", "#101616"], image: "/9.jpg" },
];
export const ITEMS: MenuItem[] = [
  {
    id: "zinger-burger",
    name: "Zinger Burger",
    description: "Crispy fried chicken fillet, lettuce, sauce.",
    price: 300,
    category: "burgers",
    popular: true,
    tone: ["#4a2a10", "#1c1410"],
    image: "/2.jpg",
  },
  {
    id: "chicken-tikka-pizza",
    name: "Chicken Tikka Pizza",
    description: "Tikka topping, mozzarella, tomato base.",
    price: 400,
    fromPrice: true,
    category: "pizza",
    popular: true,
    tone: ["#4a1c10", "#1c1210"],
    image: "/4.jpg",
  },
  {
    id: "bihari-wrap",
    name: "Bihari Wrap",
    price: 400,
    category: "rolls",
    popular: true,
    tone: ["#3a2a14", "#1a1610"],
    image: "/wrap.jpg"
  },
  {
    id: "shawarma-platter",
    name: "Shawarma Platter",
    description: "Shawarma platter with 3 breads.",
    price: 400,
    category: "platters",
    popular: true,
    tone: ["#443010", "#1a1610"],
    image: "/3.jpg"
  },
  {
    id: "chicken-kabab",
    name: "Chicken Kabab",
    price: 130,
    category: "bbq",
    popular: true,
    tone: ["#4a2210", "#1c1210"],
    image: "/1.jpg"
  },
  {
    id: "grilled-fish",
    name: "Grilled Fish",
    price: 1300,
    category: "bbq",
    popular: true,
    tone: ["#2a3a1a", "#141a12"],
    image: "/fish.jpg"
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