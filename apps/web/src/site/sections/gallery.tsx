"use client";
import Image from "next/image";
import { pickGallery } from "@/site/data/cafe";
import type { CafeData } from "@/site/types";
import { useState, useCallback, useEffect } from "react";

export default function Gallery({ cafe }: { cafe: CafeData & { images_mapped: any[] } }) {
  const gallery = pickGallery(cafe.images_mapped).slice(0, 12);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const openAt = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + gallery.length) % gallery.length), [gallery.length]);
  const next = useCallback(() => setIndex((i) => (i + 1) % gallery.length), [gallery.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, prev, next]);

  if (gallery.length === 0) return null;

  return (
    <section className="container mx-auto max-w-6xl px-4 py-10">
      <h2 className="mb-4 text-xl font-semibold tracking-tight">Không gian</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {gallery.map((img, i) => (
          <button
            type="button"
            key={img.name + i}
            className="group relative overflow-hidden rounded-lg border border-white/10 focus:outline-none"
            onClick={() => openAt(i)}
          >
            {img.src ? (
              <Image
                src={img.src}
                alt={img.alt ?? "Gallery image"}
                width={600}
                height={400}
                className="h-40 w-full object-cover transition duration-300 group-hover:scale-105 md:h-48"
              />
            ) : (
              <div className="h-40 w-full bg-neutral-800 md:h-48" />
            )}
          </button>
        ))}
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-neutral-200 hover:bg-white/20" onClick={close}>Đóng</button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-neutral-200 hover:bg-white/20" onClick={prev}>
            ←
          </button>
          <div className="relative h-[70svh] w-full max-w-5xl">
            {gallery[index]?.src ? (
              <Image
                src={gallery[index].src}
                alt={gallery[index].alt ?? ""}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            ) : null}
          </div>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-neutral-200 hover:bg-white/20" onClick={next}>
            →
          </button>
        </div>
      ) : null}
    </section>
  );
}
