"use client";

import React from 'react';
import Image from "next/image";
import { motion, easeOut } from 'framer-motion';
import { Sun, Users, Moon } from "lucide-react";
import cafeData from "../../../../../data/nha24h.json";

const getPublicImage = (image: { local: string; alt: string; role: string; name: string }) => {
    if (image.local.includes("fb/")) return `/nha24h/fb/${image.name}`;
    return `/nha24h/${image.name}`;
};

const fadeInUp = { 
    initial: { opacity: 0, y: 30 }, 
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } } 
};

const staggerContainer = { 
    whileInView: { transition: { staggerChildren: 0.1 } } 
};

export default function DayTimelineSection() {
    const timelineData = [
        { 
            icon: Sun, 
            time: "Buổi Sáng", 
            title: "Khởi đầu Năng suất", 
            description: "Bắt đầu ngày mới trong một không gian yên tĩnh, lý tưởng để tập trung làm việc và học tập.", 
            image: cafeData.images.find(i => i.name === 'ban-lam-viec-dai-01.jpg') 
        },
        { 
            icon: Users, 
            time: "Buổi Chiều", 
            title: "Hợp tác & Sáng tạo", 
            description: "Gặp gỡ đối tác hoặc học nhóm trong các khu vực chung rộng rãi hoặc phòng họp riêng tư.", 
            image: cafeData.images.find(i => i.name === 'day-ban-lam-viec-vach-kinh-01.jpg') 
        },
        { 
            icon: Moon, 
            time: "Buổi Tối", 
            title: "Thư giãn & Trò chuyện", 
            description: "Thả mình trong không gian ấm cúng, trò chuyện cùng bạn bè và tận hưởng những giây phút yên bình.", 
            image: cafeData.images.find(i => i.name === 'goc-khong-gian-am-03.jpg') 
        },
    ];
    
    return (
        <section className="bg-black py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div 
                    className="mx-auto max-w-2xl lg:text-center"
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                >
                    <h2 className="text-base font-semibold leading-7 text-amber-400">DÒNG THỜI GIAN</h2>
                    <p className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                        Một Ngày Tại Nhà.24H
                    </p>
                </motion.div>
                
                <div className="mt-16 flow-root">
                    <motion.ul 
                        className="-mb-8"
                        initial="initial"
                        whileInView="whileInView"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={staggerContainer}
                    >
                        {timelineData.map((item, itemIdx) => (
                            <li key={item.time}>
                                <motion.div 
                                    className="relative pb-8"
                                    variants={fadeInUp}
                                >
                                    {itemIdx !== timelineData.length - 1 ? (
                                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-zinc-700" />
                                    ) : null}
                                    
                                    <div className="relative flex space-x-4 md:space-x-8">
                                        <div className="flex-shrink-0">
                                            <span className="h-8 w-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center yellow-edge-effect">
                                                <item.icon className="h-5 w-5 text-amber-400" />
                                            </span>
                                        </div>
                                        
                                        <div className="min-w-0 flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                            <div>
                                                <p className="text-sm font-semibold text-amber-400">{item.time}</p>
                                                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                                <p className="mt-2 text-neutral-300">{item.description}</p>
                                            </div>
                                            
                                            {item.image && (
                                                <div className="relative w-full h-48 rounded-lg overflow-hidden yellow-edge-effect">
                                                    <Image 
                                                        src={getPublicImage(item.image)} 
                                                        alt={item.title} 
                                                        fill 
                                                        className="object-cover" 
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </li>
                        ))}
                    </motion.ul>
                </div>
            </div>
        </section>
    );
}