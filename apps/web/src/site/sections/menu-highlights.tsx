import Image from "next/image";
import type { CafeData } from "@/site/types";
import { getMenuHighlights } from "@/site/data/cafe.server";
import type { MenuHighlight } from "@/site/data/cafe";

function Card({ item }: { item: MenuHighlight }) {
  const src = item.image?.local
    ? "/" + item.image.local.replace(/\\/g, "/").split("data/").pop()?.replace(/^images\//, "nha24h/")
    : undefined;
  return (
    <div className="group rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
      {src ? (
        <div className="relative mb-3 h-36 w-full overflow-hidden rounded-lg">
          <Image src={src} alt={item.image?.alt ?? item.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-300 group-hover:scale-105" />
        </div>
      ) : null}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-medium text-white/95">{item.name}</div>
          {item.description ? (
            <div className="text-sm text-neutral-300 line-clamp-2">{item.description}</div>
          ) : null}
        </div>
        {typeof item.price === "number" ? (
          <div className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-[var(--accent-foreground)]">
            {item.price.toLocaleString("vi-VN")} {item.currency ?? "đ"}
          </div>
        ) : null}
      </div>
      {item.tag ? (
        <div className="mt-2 inline-flex rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-neutral-200">
          {item.tag}
        </div>
      ) : null}
    </div>
  );
}

export default async function MenuHighlights({ cafe }: { cafe: CafeData }) {
  const highlights = await getMenuHighlights();
  return (
    <section id="menu" className="container mx-auto max-w-6xl px-4 py-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold tracking-tight">Menu nổi bật</h2>
        <a href="#" className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-neutral-200 hover:bg-white/20">
          Xem toàn bộ menu
        </a>
      </div>

      {highlights && highlights.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {highlights.slice(0, 6).map((item, i) => (
            <Card key={item.name + i} item={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-neutral-300">
          Đang cập nhật món nổi bật. Hãy quay lại sau!
        </div>
      )}
    </section>
  );
}
