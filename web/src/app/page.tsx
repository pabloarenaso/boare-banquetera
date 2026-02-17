
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { Concept } from "@/components/home/concept";
import { Services } from "@/components/home/services";
import { Gallery } from "@/components/home/gallery";
import { Cta } from "@/components/home/cta";

export default function Home() {
  return (
    <div className="antialiased text-stone-800 bg-white">
      <Navbar />
      <Hero />
      <Concept />
      <Services />
      <Gallery />
      <Cta />
      <Footer />
    </div>
  );
}
