"use client";

export default function AnnouncementBar() {
  return (
    <div className="w-full border-b border-white/10 bg-black/70 py-1.5 text-center text-xs text-neutral-300">
      <span className="opacity-90">Mở cửa 24/7 • Phòng họp miễn phí • Gọi </span>
      <a href="tel:0928770999" className="font-semibold text-white hover:underline">0928.770.999</a>
    </div>
  );
}

