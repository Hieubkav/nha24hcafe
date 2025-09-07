import Image from "next/image";
import { pickHero } from "@/site/data/cafe";
import type { CafeData } from "@/site/types";
import { PhoneCall, MapPin } from "lucide-react";

export default function Hero({ cafe }: { cafe: CafeData & { images_mapped: any[] } }) {
  const hero = pickHero(cafe.images_mapped);

  return (
    <section className="relative isolate">
      {hero?.src ? (
        <div className="relative h-[68svh] w-full overflow-hidden">
          <Image
            src={hero.src}
            alt={hero.alt ?? cafe.name}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/10" />
        </div>
      ) : (
        <div className="h-[60svh] w-full bg-neutral-900" />
      )}

      <div className="absolute inset-0 flex items-end">
        <div className="container mx-auto max-w-6xl px-4 pb-12">
          <div className="backdrop-blur-[1px]">
            <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              {cafe.name}
            </h1>
            {cafe.short_description ? (
              <p className="mt-3 max-w-2xl text-pretty text-neutral-300">
                {cafe.short_description}
              </p>
            ) : null}
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {cafe.hours?.[0] && ((cafe.hours[0].note?.includes("24/7")) || (cafe.hours[0].open === "00:00" && cafe.hours[0].close === "24:00")) ? (
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-neutral-200">Mở cửa 24/7</span>
              ) : null}
              {typeof cafe.area_sqm === "number" ? (
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-neutral-200">~{cafe.area_sqm.toLocaleString("vi-VN")} m²</span>
              ) : null}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] transition hover:brightness-110"
              >
                Xem Menu
              </a>
              {cafe.contact?.phone_display || cafe.contact?.phone ? (
                <a
                  href={`tel:${cafe.contact?.phone ?? cafe.contact?.phone_display}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-neutral-200"
                >
                  <PhoneCall className="h-4 w-4" /> Gọi ngay
                </a>
              ) : null}
              {(cafe.contact?.map_url ?? cafe.links?.review) ? (
                <a
                  href={(cafe.contact?.map_url ?? cafe.links?.review) as string}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white transition hover:bg-white/20"
                >
                  <MapPin className="h-4 w-4" /> Chỉ đường
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
