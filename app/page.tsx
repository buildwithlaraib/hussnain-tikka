import CartDrawer from "@/components/CartDrawer";
import Deals from "@/components/Deals";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import MenuTheatre from "@/components/MenuTheatre";
import OrderCta from "@/components/OrderCta";
import Signatures from "@/components/Signatures";
import Story from "@/components/Story";
import Visit from "@/components/Visit";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Story />
        <Signatures />
        <MenuTheatre />
        <Deals />
        <Visit />
        <OrderCta />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}