"use client";
import { useEffect, useState } from "react";
import { Lamp } from "lucide-react";

// Nút đèn cố định góc phải, bật/tắt hiệu ứng ánh sáng vàng
export default function BulbToggle() {
  const [on, setOn] = useState<boolean>(false);

  // Khởi tạo từ localStorage
  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("bulb") : null;
    const isOn = saved === "on"; // mặc định không bật (web vẫn có màu)
    setOn(isOn);
    applyClasses(isOn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function applyClasses(isOn: boolean) {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    html.classList.toggle("bulb-on", isOn);
  }

  function toggle() {
    const next = !on;
    setOn(next);
    localStorage.setItem("bulb", next ? "on" : "off");
    applyClasses(next);
  }

  return (
    <button
      aria-label="Bật/tắt ánh sáng vàng"
      onClick={toggle}
      className="fixed bottom-5 right-5 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/70 text-amber-300 shadow-xl backdrop-blur transition hover:bg-black/60"
    >
      <Lamp className={`h-5 w-5 transition-all duration-300 ${on ? "fill-amber-300/20" : ""}`} />
    </button>
  );
}
