"use client";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <div className="border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-2">
        <Link href="/" className="text-sm font-semibold tracking-wider text-neutral-200">
          Nhà.24H Coffee
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
