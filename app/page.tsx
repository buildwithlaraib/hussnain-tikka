import CartDrawer from "@/components/CartDrawer";
import Deals from "@/components/Deals";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import MenuExplorer from "@/components/MenuExplorer";
import Visit from "@/components/Visit";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <MenuExplorer />
        <Deals />
        <Visit />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}