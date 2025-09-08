"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Users, 
    MonitorPlay, 
    BedDouble, 
    Coffee, 
    Clock 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import cafeData from "../../../../../data/nha24h.json";

const fadeInUp = { 
    initial: { opacity: 0, y: 30 }, 
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } 
};

const staggerContainer = { 
    whileInView: { transition: { staggerChildren: 0.1 } } 
};

type AmenityKey = "phong_hop_mien_phi" | "ban_lam_viec_rieng_tu" | "sleep_box_coffee_in_bed" | "khong_gian_rong_1000m2" | "mo_24_7";

const amenityDetails: Record<AmenityKey, { icon: React.ElementType; text: string; description: string }> = {
    phong_hop_mien_phi: { 
        icon: Users, 
        text: "Phòng họp miễn phí", 
        description: "Không gian chuyên nghiệp cho các cuộc họp nhóm và thảo luận hiệu quả." 
    },
    ban_lam_viec_rieng_tu: { 
        icon: MonitorPlay, 
        text: "Bàn làm việc riêng tư", 
        description: "Góc làm việc yên tĩnh, đầy đủ tiện nghi để bạn tập trung cao độ." 
    },
    sleep_box_coffee_in_bed: { 
        icon: BedDouble, 
        text: "Coffee in Bed", 
        description: "Trải nghiệm mô hình sleep box độc đáo, thư giãn và nạp lại năng lượng." 
    },
    khong_gian_rong_1000m2: { 
        icon: Coffee, 
        text: "Không gian 1000m²", 
        description: "Diện tích rộng lớn, thoáng đãng với nhiều khu vực chức năng riêng biệt." 
    },
    mo_24_7: { 
        icon: Clock, 
        text: "Mở cửa 24/7", 
        description: "Luôn sẵn sàng chào đón và phục vụ bạn bất kể ngày hay đêm." 
    },
};

export default function AmenitiesSection() {
    return (
        <motion.section 
            id="amenities" 
            className="bg-black py-24 sm:py-32"
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div 
                    className="mx-auto max-w-2xl lg:text-center" 
                    variants={fadeInUp}
                >
                    <h2 className="text-base font-semibold leading-7 text-amber-400">ĐIỀU GÌ LÀM NÊN NHÀ.24H</h2>
                    <p className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                        Không Gian Của Sự Sáng Tạo & Thư Giãn
                    </p>
                </motion.div>
                
                <motion.div 
                    className="mx-auto mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
                    variants={staggerContainer}
                >
                    {(cafeData.amenities as AmenityKey[]).map((amenity) => {
                        const details = amenityDetails[amenity];
                        if (!details) return null;
                        
                        return (
                            <motion.div 
                                key={details.text} 
                                variants={fadeInUp} 
                                className="h-full"
                            >
                                <Card className="bg-zinc-900/50 border-zinc-800 hover:border-amber-400/50 hover:bg-zinc-900 transition-all duration-300 transform hover:-translate-y-2 h-full yellow-edge-effect">
                                    <CardHeader className="flex flex-row items-center gap-4">
                                        <div className="rounded-lg bg-amber-400/10 p-3">
                                            <details.icon className="h-8 w-8 flex-none text-amber-400" />
                                        </div>
                                        <CardTitle className="text-xl font-bold text-white">
                                            {details.text}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-neutral-300">{details.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </motion.section>
    );
}