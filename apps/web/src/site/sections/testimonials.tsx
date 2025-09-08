"use client";
import { motion } from "framer-motion";

export default function Testimonials() {
  const items = [
    {
      name: "Minh Anh",
      quote:
        "Không gian đen xám rất sang, ngồi làm việc cả ngày vẫn thấy dễ chịu.",
    },
    { name: "Trung Kiên", quote: "Phòng họp riêng miễn phí là điểm cộng lớn cho team mình." },
    { name: "Lan Phương", quote: "Sleep box lạ và thoải mái, buổi tối chill cực đã." },
  ];
  return (
    <section className="bg-zinc-950 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white">Khách nói về chúng tôi</h2>
          <p className="mt-2 text-neutral-400">Một vài cảm nhận nhanh từ khách ghé Nhà.24H</p>
        </div>
        <div className="relative overflow-hidden">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: [0, -600, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="flex gap-4"
          >
            {[...items, ...items].map((it, idx) => (
              <div
                key={idx}
                className="min-w-[320px] flex-1 rounded-lg border border-zinc-800 bg-zinc-900/60 p-5 text-neutral-200 yellow-edge-effect"
              >
                <div className="text-sm leading-relaxed">“{it.quote}”</div>
                <div className="mt-3 text-xs text-neutral-400">— {it.name}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

