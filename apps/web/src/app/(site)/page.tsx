// @ts-nocheck
"use client";

import React from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import HeroSection from "@/site/sections/hero";
import AnnouncementBar from "@/components/announcement-bar";
import AmenitiesSection from "@/site/sections/amenities";
import CoffeeInBedSection from "@/site/sections/coffee-in-bed";
import DayTimelineSection from "@/site/sections/day-timeline";
import SignatureDrinksSection from "@/site/sections/signature-drinks";
import SpacesSection from "@/site/sections/spaces";
import Testimonials from "@/site/sections/testimonials";
import Contact from "@/site/sections/contact";
import Footer from "@/site/sections/footer";

// --- MAIN COMPONENT ---
export default function HomePage() {
  return (
    <ReactLenis 
      root 
      options={{
        lerp: 0.1,
        duration: 1.5,
        smoothWheel: true,
        smoothTouch: false,
        syncTouch: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      }}
    >
      <div className="bg-black text-white">
          <style jsx global>{`
              html { scroll-behavior: smooth; }
          `}</style>
          <main>
              <HeroSection />
              <AnnouncementBar />
              <AmenitiesSection />
              <CoffeeInBedSection />
              <DayTimelineSection />
              <SignatureDrinksSection />
              <SpacesSection />
              <Testimonials />
              <div id="contact">
                <Contact />
              </div>
          </main>
          <Footer />
      </div>
    </ReactLenis>
  );
}