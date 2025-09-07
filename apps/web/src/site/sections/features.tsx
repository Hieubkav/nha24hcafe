import type { CafeData } from "@/site/types";
import { Clock, Users, Ruler, Computer } from "lucide-react";

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc?: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center gap-3">
        <div className="rounded-lg border border-white/20 bg-white/10 p-2 text-white/90">{icon}</div>
        <div>
          <div className="font-medium text-white/95">{title}</div>
          {desc ? <div className="text-sm text-neutral-300">{desc}</div> : null}
        </div>
      </div>
    </div>
  );
}

export default function Features({ cafe }: { cafe: CafeData }) {
  const price =
    cafe.price_range?.display ??
    (cafe.price_range?.min || cafe.price_range?.max
      ? `${cafe.price_range?.min?.toLocaleString("vi-VN")} - ${cafe.price_range?.max?.toLocaleString("vi-VN")} đ`
      : undefined);

  const hours = cafe.hours?.[0]
    ? `${cafe.hours[0].days}: ${cafe.hours[0].open} - ${cafe.hours[0].close}${cafe.hours[0].note ? ` · ${cafe.hours[0].note}` : ""}`
    : undefined;

  const amenityVN = new Map<string, string>([
    ["phong_hop_mien_phi", "Phòng họp miễn phí"],
    ["ban_lam_viec_rieng_tu", "Bàn làm việc riêng tư"],
    ["sleep_box_coffee_in_bed", "Sleep box / Coffee in bed"],
    ["khong_gian_rong_1000m2", "Không gian rộng 1000m²"],
    ["mo_24_7", "Mở cửa 24/7"],
  ]);

  return (
    <section className="container mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-4 md:grid-cols-3">
        <Feature
          icon={<Clock className="h-5 w-5" />}
          title="Giờ mở cửa"
          desc={hours ?? ""}
        />
        <Feature
          icon={<Ruler className="h-5 w-5" />}
          title="Không gian"
          desc={typeof cafe.area_sqm === "number" ? `~${cafe.area_sqm.toLocaleString("vi-VN")} m²` : undefined}
        />
        <Feature
          icon={<Users className="h-5 w-5" />}
          title="Khoảng giá"
          desc={price}
        />
      </div>

      {cafe.amenities && cafe.amenities.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {cafe.amenities.map((a) => (
            <span key={a} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-300">
              {amenityVN.get(a) ?? a.replaceAll("_", " ")}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  );
}
