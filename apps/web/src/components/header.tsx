"use client";
import Image from "next/image";
import Link from "next/link";

// Header glass + logo lớn + nav gọn
export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/55 backdrop-blur supports-[backdrop-filter]:bg-black/40">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-3">
          <span className="relative block h-8 w-28">
            <Image
              src="/nha24h/fb/logo-nha-24h-tren-nen-trang.jpg"
              alt="Nhà.24H Coffee"
              fill
              sizes="112px"
              className="object-contain"
              priority
            />
          </span>
          <span className="hidden text-sm font-semibold tracking-wide text-neutral-200 sm:block">
            Nhà.24H Coffee
          </span>
        </Link>

        {/* Nav tối giản */}
        <nav className="hidden items-center gap-6 text-sm text-neutral-300 md:flex">
          <a href="#amenities" className="hover:text-white">Tiện ích</a>
          <a href="#experience" className="hover:text-white">Trải nghiệm</a>
          <a href="#spaces" className="hover:text-white">Không gian</a>
          <a href="#contact" className="hover:text-white">Liên hệ</a>
        </nav>

        {/* CTA gọi điện */}
        <a
          href="tel:0928770999"
          className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-neutral-200 shadow-sm transition hover:bg-white/10"
        >
          Gọi 0928.770.999
        </a>
      </div>
    </header>
  );
}
