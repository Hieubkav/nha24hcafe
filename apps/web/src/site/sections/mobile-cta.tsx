"use client";
import type { CafeData } from "@/site/types";
import { PhoneCall, MapPin, UtensilsCrossed } from "lucide-react";

export default function MobileCta({ cafe }: { cafe: CafeData }) {
  const phone = cafe.contact?.phone ?? cafe.contact?.phone_display;
  const map = cafe.contact?.map_url ?? cafe.links?.review;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/70 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-3 divide-x divide-white/10">
        <a
          href={phone ? `tel:${phone}` : "#"}
          className="flex items-center justify-center gap-2 px-4 py-3 text-sm text-white"
        >
          <PhoneCall className="h-4 w-4" /> Gọi
        </a>
        <a href="#menu" className="flex items-center justify-center gap-2 px-4 py-3 text-sm text-[var(--accent-foreground)]" style={{background: "var(--accent)"}}>
          <UtensilsCrossed className="h-4 w-4" /> Menu
        </a>
        <a
          href={map ?? "#"}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-3 text-sm text-white"
        >
          <MapPin className="h-4 w-4" /> Đường đi
        </a>
      </div>
    </div>
  );
}

