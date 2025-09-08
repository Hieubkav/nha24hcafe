"use client";

import React, { useRef } from 'react';
import Image from "next/image";
import { motion, useScroll, useTransform } from 'framer-motion';
import { BedDouble } from "lucide-react";
import cafeData from "../../../../../data/nha24h.json";

const getPublicImage = (image: { local: string; alt: string; role: string; name: string }) => {
    if (image.local.includes("fb/")) return `/nha24h/fb/${image.name}`;
    return `/nha24h/${image.name}`;
};

export default function CoffeeInBedSection() {
    const featureImage = cafeData.images.find(img => img.name === "giuong-coffee-in-bed-01.jpg");
    const sectionRef = useRef(null);
    
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // WOW-EFFECT: Hiệu ứng rèm cửa đa lớp
    const leftCurtainLayer1 = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
    const leftCurtainLayer2 = useTransform(scrollYProgress, [0.05, 0.45], [1, 0]);
    const rightCurtainLayer1 = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
    const rightCurtainLayer2 = useTransform(scrollYProgress, [0.05, 0.45], [1, 0]);

    // Hiệu ứng mờ dần và hiện rõ nội dung đồng bộ với rèm
    const contentOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
    const contentScale = useTransform(scrollYProgress, [0.2, 0.4], [0.95, 1]);

    return (
        <section 
            id="experience" 
            ref={sectionRef}
            className="relative bg-zinc-950 h-[150vh] py-24 sm:py-32 overflow-hidden"
        >
            <div className="sticky top-0 h-screen flex items-center justify-center">
                {/* Nội dung chính */}
                <motion.div 
                    className="mx-auto max-w-7xl px-6 lg:px-8 relative z-30"
                    style={{ opacity: contentOpacity, scale: contentScale }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Hình ảnh */}
                        <div className="relative w-full h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-2xl shadow-amber-950/30">
                            {featureImage && (
                                <Image 
                                    src={getPublicImage(featureImage)} 
                                    alt={featureImage.alt} 
                                    fill 
                                    className="object-cover" 
                                />
                            )}
                        </div>
                        
                        {/* Nội dung văn bản */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <BedDouble className="h-5 w-5 text-amber-400" />
                                <span className="text-sm font-semibold text-amber-400">TRẢI NGHIỆM ĐỘC NHẤT</span>
                            </div>
                            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl mb-6">
                                Mô Hình &quot;Coffee in Bed&quot;
                            </h2>
                            <p className="text-lg leading-8 text-neutral-300">
                                Tại Nhà.24H, chúng tôi mang đến trải nghiệm &quot;sleep box&quot; lần đầu tiên xuất hiện, 
                                cho phép bạn ngả lưng thư giãn trong một không gian riêng tư ngay tại quán cà phê. 
                                Dù bạn cần một giấc ngủ ngắn để nạp năng lượng hay một góc yên tĩnh tuyệt đối để tập trung, 
                                &quot;Coffee in Bed&quot; là giải pháp hoàn hảo.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Rèm cửa - Lớp 2 (trong cùng) */}
            <motion.div className="absolute top-0 left-0 h-full w-1/2 bg-zinc-900 origin-left z-40" style={{ scaleX: leftCurtainLayer2 }} />
            <motion.div className="absolute top-0 right-0 h-full w-1/2 bg-zinc-900 origin-right z-40" style={{ scaleX: rightCurtainLayer2 }} />

            {/* Rèm cửa - Lớp 1 (ngoài cùng) */}
            <motion.div className="absolute top-0 left-0 h-full w-1/2 bg-black origin-left z-50" style={{ scaleX: leftCurtainLayer1 }} />
            <motion.div className="absolute top-0 right-0 h-full w-1/2 bg-black origin-right z-50" style={{ scaleX: rightCurtainLayer1 }} />
        </section>
    );
}