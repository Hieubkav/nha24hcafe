import { getCafeData } from "@/site/data/cafe.server";
import Hero from "@/site/sections/hero";
import Features from "@/site/sections/features";
import MenuHighlights from "@/site/sections/menu-highlights";
import Gallery from "@/site/sections/gallery";
import Contact from "@/site/sections/contact";
import Footer from "@/site/sections/footer";
import MobileCta from "@/site/sections/mobile-cta";
import StructuredData from "@/site/structured-data";

export default async function Home() {
  const cafe = await getCafeData();

  return (
    <main className="min-h-svh bg-[oklch(0.145_0_0)] text-white">
      <StructuredData data={cafe} />
      <Hero cafe={cafe} />
      <Features cafe={cafe} />
      <MenuHighlights cafe={cafe} />
      <Gallery cafe={cafe} />
      <Contact cafe={cafe} />
      <Footer cafe={cafe} />
      <MobileCta cafe={cafe} />
    </main>
  );
}
