"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookOpen, Expand } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from '@/components/ui/dialog';

export default function SignatureDrinksSection() {
  return (
    <section id="menu" className="relative bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-amber-400" />
              <span className="text-sm font-semibold text-amber-400">THỰC ĐƠN</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Menu Của Nhà
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-300">
              Tại Nhà, mỗi thức uống là một câu chuyện. Chúng tôi tự hào mang đến những hạt cà phê Robusta & Arabica chất lượng cao, được rang xay tỉ mỉ để giữ trọn hương vị đậm đà, nguyên bản.
            </p>
            <p className="mt-4 text-lg leading-8 text-neutral-300">
              Bên cạnh đó là menu đa dạng các loại trà, nước ép và đá xay, tất cả đều được pha chế từ nguyên liệu tươi mới nhất. Hãy khám phá và tìm cho mình một hương vị đặc trưng tại Nhà.24H.
            </p>
          </motion.div>

          {/* Menu Image Trigger */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
            className="lg:order-first"
          >
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden group cursor-pointer yellow-edge-effect">
                  <Image 
                    src="/nha24h/menu-nha24h.jpg"
                    alt="Menu Nhà.24H Coffee"
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-3 rounded-full bg-black/60 px-6 py-3 backdrop-blur-sm">
                      <Expand className="h-6 w-6 text-white" />
                      <span className="font-semibold text-white">Xem Toàn Bộ Menu</span>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="bg-transparent border-0 p-4 w-full max-w-7xl h-[90vh] flex items-center justify-center">
                <DialogTitle className="sr-only">Menu Nhà 24H</DialogTitle>
                <div className="relative w-full h-full">
                  <Image 
                    src="/nha24h/menu-nha24h.jpg"
                    alt="Menu Nhà.24H Coffee"
                    fill
                    className="object-contain"
                    sizes="90vw"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </div>
      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" />
    </section>
  );
}
