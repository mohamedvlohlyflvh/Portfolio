import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { TechStack } from "@/components/sections/tech-stack";
import { Work } from "@/components/sections/work";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

/**
 * Home — section composition order (server component shell).
 * Mounted: Navbar, Hero, TechStack, Work, Contact, Footer.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <TechStack />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
