import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/components/CartProvider";
import Deals from "@/components/Deals";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MenuExplorer from "@/components/MenuExplorer";
import Visit from "@/components/Visit";

export default function Home() {
  return (
    <CartProvider>
      <Header />
      <main>
        <Hero />
        <MenuExplorer />
        <Deals />
        <Visit />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}