"use client";

import React from 'react';
import { motion, easeOut } from 'framer-motion';
import { Coffee, CupSoda } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fadeInUp = { 
    initial: { opacity: 0, y: 30 }, 
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } } 
};

const staggerContainer = { 
    whileInView: { transition: { staggerChildren: 0.1 } } 
};

export default function SignatureDrinksSection() {
    const drinks = [
        { 
            name: "Blackout Cold Brew", 
            description: "Mạnh mẽ, đậm vị, đánh thức mọi giác quan.", 
            icon: Coffee 
        },
        { 
            name: "Golden Hour Latte", 
            description: "Êm dịu, ngọt ngào với lớp bọt sữa vàng óng.", 
            icon: CupSoda 
        },
        { 
            name: "Midnight Mocha", 
            description: "Sự kết hợp hoàn hảo giữa chocolate đắng và espresso.", 
            icon: Coffee 
        },
    ];
    
    return (
        <motion.section 
            id="drinks" 
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
                    <h2 className="text-base font-semibold leading-7 text-amber-400">MENU ĐẶC TRƯNG</h2>
                    <p className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                        Thức Uống Làm Nên Tên Tuổi
                    </p>
                </motion.div>
                
                <motion.div 
                    className="mx-auto mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
                    variants={staggerContainer}
                >
                    {drinks.map(drink => (
                        <motion.div 
                            key={drink.name} 
                            variants={fadeInUp}
                        >
                            <Card className="bg-zinc-900/50 border-zinc-800 text-center h-full yellow-edge-effect">
                                <CardHeader className="items-center">
                                    <div className="rounded-full bg-amber-400/10 p-4 border-2 border-amber-400/20">
                                        <drink.icon className="h-10 w-10 text-amber-400" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardTitle className="text-2xl font-bold text-white">
                                        {drink.name}
                                    </CardTitle>
                                    <p className="mt-2 text-neutral-300">
                                        {drink.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}