import { Hero } from "@/components/landing/hero";
import { ServicesGrid } from "@/components/landing/services-grid";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Hero />
      <ServicesGrid />
      <Footer />
    </main>
  );
}
