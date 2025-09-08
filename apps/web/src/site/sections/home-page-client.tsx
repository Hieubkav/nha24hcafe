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
import cafeData from '../../../../../data/nha24h.json';

// Generate JSON-LD structured data
const generateJsonLd = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "name": cafeData.name,
    "description": cafeData.long_description,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": cafeData.address.full.split(',')[0],
      "addressLocality": cafeData.address.city,
      "addressRegion": cafeData.address.district,
      "postalCode": "", // Add if available
      "addressCountry": cafeData.address.country
    },
    "telephone": cafeData.contact.phone,
    "openingHours": "Mo-Su 00:00-24:00", // Based on the 24/7 information
    "priceRange": cafeData.price_range.display,
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": cafeData.coordinates.lat,
      "longitude": cafeData.coordinates.lng
    },
    "url": "https://nha24hcafe.vercel.app", // Update with your actual domain
    "sameAs": [
      cafeData.socials.facebook,
      cafeData.links.review
    ],
    "image": cafeData.images.filter(img => img.role === "gallery").map(img => img.url),
    "amenityFeature": cafeData.amenities.map(amenity => {
      // Map amenities to human-readable format
      const amenityMap: {[key: string]: string} = {
        "phong_hop_mien_phi": "Phòng họp miễn phí",
        "ban_lam_viec_rieng_tu": "Bàn làm việc riêng tư",
        "sleep_box_coffee_in_bed": "Coffee in bed",
        "khong_gian_rong_1000m2": "Không gian rộng 1000m²",
        "mo_24_7": "Mở cửa 24/7"
      };
      return amenityMap[amenity] || amenity;
    })
  };

  return JSON.stringify(jsonLd);
};

// --- MAIN COMPONENT ---
export default function HomePageClient() {
  const jsonLd = generateJsonLd();
  
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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: jsonLd }}
          />
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