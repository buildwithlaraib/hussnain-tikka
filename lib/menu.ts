/* ============================================================
   Single source of truth for the restaurant: info, menu, deals.
   Edit this file to change prices, items, hours or contact details.
   ============================================================ */

export type Category = {
  id: string;
  name: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  /** Base price in PKR */
  price: number;
  /** Show "from Rs. X" (for items with sizes) */
  fromPrice?: boolean;
  category: string;
  popular?: boolean;
  /** Photo file inside /public, e.g. "/2.jpg" */
  image?: string;
};

export type Deal = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
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
  openingTime: "6 PM",
  closingTime: "3 AM",
  hours: [{ day: "Every day", time: "6:00 PM to 3:00 AM" }],
};

export const DELIVERY = {
  area: "Mughalpura to Lalpull",
  fee: 50,
  freeOver: 1000,
  minOrder: 180,
};

export const CATEGORIES: Category[] = [
  { id: "bbq", name: "BBQ" },
  { id: "burgers", name: "Burgers" },
  { id: "shawarma", name: "Shawarma" },
  { id: "pizza", name: "Pizza" },
  { id: "fries", name: "Fries" },
  { id: "rolls", name: "Rolls" },
  { id: "platters", name: "Platters" },
  { id: "drinks", name: "Drinks" },
];

export const ITEMS: MenuItem[] = [
  {
    id: "zinger-burger",
    name: "Zinger Burger",
    description: "Crispy fried chicken fillet, lettuce and sauce.",
    price: 300,
    category: "burgers",
    popular: true,
    image: "/2.jpg",
  },
  {
    id: "chicken-tikka-pizza",
    name: "Chicken Tikka Pizza",
    description: "Tikka topping, mozzarella and tomato base.",
    price: 400,
    fromPrice: true,
    category: "pizza",
    popular: true,
    image: "/4.jpg",
  },
  {
    id: "bihari-wrap",
    name: "Bihari Wrap",
    description: "Spiced bihari filling in a soft wrap.",
    price: 400,
    category: "rolls",
    popular: true,
    image: "/wrap.jpg",
  },
  {
    id: "shawarma-platter",
    name: "Shawarma Platter",
    description: "Shawarma platter served with 3 breads.",
    price: 400,
    category: "platters",
    popular: true,
    image: "/3.jpg",
  },
  {
    id: "chicken-kabab",
    name: "Chicken Kabab",
    description: "Chicken kabab grilled over charcoal.",
    price: 130,
    category: "bbq",
    popular: true,
    image: "/1.jpg",
  },
  {
    id: "grilled-fish",
    name: "Grilled Fish",
    description: "Whole fish, grilled over charcoal.",
    price: 1300,
    category: "bbq",
    popular: true,
    image: "/fish.jpg",
  },
];

export const DEALS: Deal[] = [
  {
    id: "deal-1",
    name: "Deal 1",
    description: "2 special zinger burgers, 1 small pizza and a 1 litre cold drink.",
    price: 1050,
    image: "/2.jpg",
  },
  {
    id: "deal-2",
    name: "Deal 2",
    description: "1 medium pizza, 1 large pizza and a 1.5 litre bottle.",
    price: 1999,
    image: "/4.jpg",
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