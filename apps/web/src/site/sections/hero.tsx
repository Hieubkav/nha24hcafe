"use client";

import React from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import cafeData from "../../../../../data/nha24h.json";

const getPublicImage = (image: { local: string; alt: string; role: string; name: string }) => {
    if (image.local.includes("fb/")) return `/nha24h/fb/${image.name}`;
    return `/nha24h/${image.name}`;
};

const fadeInUp = { 
    initial: { opacity: 0, y: 30 }, 
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } 
};

const staggerContainer = { 
    whileInView: { transition: { staggerChildren: 0.1 } } 
};

export default function HeroSection() {
    const heroImage = cafeData.images.find((img) => img.role === "hero");
    
    return (
        <section id="home" className="relative h-screen min-h-[700px] w-full">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/20 z-10" />
                {heroImage && (
                    <Image 
                        src={getPublicImage(heroImage)} 
                        alt={heroImage.alt} 
                        fill 
                        className="object-cover" 
                        priority 
                    />
                )}
            </div>
            
            <motion.div 
                className="relative z-20 flex h-full flex-col items-center justify-center text-center text-white px-4"
                initial="initial"
                animate="whileInView"
                variants={staggerContainer}
            >
                <motion.h1 
                    className="font-heading text-5xl font-extrabold tracking-tighter md:text-7xl lg:text-8xl mt-8"
                    variants={fadeInUp}
                >
                    {cafeData.name}
                </motion.h1>
                <motion.p 
                    className="mt-6 max-w-3xl text-lg text-neutral-200 md:text-xl"
                    variants={fadeInUp}
                >
                    {cafeData.short_description}
                </motion.p>
            </motion.div>
        </section>
    );
}