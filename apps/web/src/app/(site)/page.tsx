"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import {
  ArrowRight, MapPin, Phone, Coffee, Users, BedDouble, MonitorPlay, Clock, Sun, Moon, Briefcase, Lightbulb, X, Menu as MenuIcon, CupSoda
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import cafeData from "../../../../../data/nha24h.json";
import Footer from "@/site/sections/footer";
import Contact from "@/site/sections/contact";
import Testimonials from "@/site/sections/testimonials";

// --- TYPE DEFINITIONS ---
type ImageType = { local: string; alt: string; role: string; name: string };
type AmenityKey = "phong_hop_mien_phi" | "ban_lam_viec_rieng_tu" | "sleep_box_coffee_in_bed" | "khong_gian_rong_1000m2" | "mo_24_7";

// --- DATA & CONFIG ---
const amenityDetails: Record<AmenityKey, { icon: React.ElementType; text: string; description: string }> = {
  phong_hop_mien_phi: { icon: Users, text: "Phòng họp miễn phí", description: "Không gian chuyên nghiệp cho các cuộc họp nhóm và thảo luận hiệu quả." },
  ban_lam_viec_rieng_tu: { icon: MonitorPlay, text: "Bàn làm việc riêng tư", description: "Góc làm việc yên tĩnh, đầy đủ tiện nghi để bạn tập trung cao độ." },
  sleep_box_coffee_in_bed: { icon: BedDouble, text: "Coffee in Bed", description: "Trải nghiệm mô hình sleep box độc đáo, thư giãn và nạp lại năng lượng." },
  khong_gian_rong_1000m2: { icon: Coffee, text: "Không gian 1000m²", description: "Diện tích rộng lớn, thoáng đãng với nhiều khu vực chức năng riêng biệt." },
  mo_24_7: { icon: Clock, text: "Mở cửa 24/7", description: "Luôn sẵn sàng chào đón và phục vụ bạn bất kể ngày hay đêm." },
};

const getPublicImage = (image: ImageType) => {
    if (image.local.includes("fb/")) return `/nha24h/fb/${image.name}`;
    return `/nha24h/${image.name}`;
}

// --- ANIMATION VARIANTS ---
const fadeInUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const staggerContainer = { whileInView: { transition: { staggerChildren: 0.1 } } };

// --- LAYOUT & UI COMPONENTS ---

const FullscreenMenu = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const navLinks = [ { name: "Trang chủ", href: "#home" }, { name: "Tiện ích", href: "#amenities" }, { name: "Trải nghiệm", href: "#experience" }, { name: "Không gian", href: "#spaces" }, { name: "Thức uống", href: "#drinks" } ];
    const menuVariants: Variants = { open: { clipPath: "circle(150% at 100% 0)", transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] } }, closed: { clipPath: "circle(0% at 100% 0)", transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1], delay: 0.3 } } };
    const linkVariants = { open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }, closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } } };
    const linkItemVariants = { open: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }, closed: { opacity: 0, y: 50 } };

    return (
        <motion.div variants={menuVariants} initial="closed" animate={isOpen ? "open" : "closed"} className="fixed inset-0 bg-black z-40 flex items-center justify-center">
            <motion.nav variants={linkVariants} className="flex flex-col items-center gap-8">
                {navLinks.map(link => (
                    <motion.a key={link.href} href={link.href} onClick={onClose} className="text-5xl font-bold text-neutral-300 hover:text-white transition-colors" variants={linkItemVariants}>{link.name}</motion.a>
                ))}
            </motion.nav>
        </motion.div>
    );
}

const Header = ({ isMenuOpen, onMenuClick }: { isMenuOpen: boolean, onMenuClick: () => void }) => {
    const logoImage = cafeData.images.find(img => img.name === "logo-nha-24h-tren-nen-trang.jpg");
    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 text-white h-24">
            <Link href="#home" className="relative w-28 h-full">
                {logoImage && <Image src={getPublicImage(logoImage)} alt="Logo Nhà.24H" fill className="object-contain" />}
            </Link>
            <Button onClick={onMenuClick} size="icon" variant="ghost" className="w-12 h-12">
                <AnimatePresence mode="wait">
                    <motion.div key={isMenuOpen ? "x" : "menu"} initial={{ opacity: 0, rotate: 45 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -45 }} transition={{ duration: 0.3 }}>
                        {isMenuOpen ? <X className="h-8 w-8" /> : <MenuIcon className="h-8 w-8" />}
                    </motion.div>
                </AnimatePresence>
            </Button>
        </header>
    );
}

const YellowEdgeEffect = ({ isActivated }: { isActivated: boolean }) => (
    <AnimatePresence>
        {isActivated && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 2, delay: 0.5 } }}
                className="pointer-events-none fixed inset-0 z-30"
            >
                <motion.div 
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 20, opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="absolute inset-0 bg-[radial-gradient(circle,oklch(0.9_0.25_80/0.3),transparent_40%)]"
                />
            </motion.div>
        )}
    </AnimatePresence>
);

// --- PAGE SECTIONS ---

const HeroSection = ({ onLightActivate }: { onLightActivate: () => void }) => {
  const heroImage = cafeData.images.find((img) => img.role === "hero");
  const [isActivated, setIsActivated] = useState(false);

  const handleActivate = () => {
      if (isActivated) return;
      setIsActivated(true);
      onLightActivate();
  }

  return (
    <section id="home" className="relative h-screen min-h-[700px] w-full">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/20 z-10" />
        {heroImage && <Image src={getPublicImage(heroImage)} alt={heroImage.alt} fill className="object-cover" priority />}
      </div>
      <motion.div className="relative z-20 flex h-full flex-col items-center justify-center text-center text-white px-4" initial="initial" animate="whileInView" variants={staggerContainer}>
        {!isActivated && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1 } }}>
                <Button onClick={handleActivate} variant="ghost" className="flex items-center gap-3 text-amber-200/80 hover:text-amber-200 hover:bg-white/5 rounded-full px-6 py-4 text-lg">
                    <Lightbulb className="h-6 w-6" />
                    <span>Bật đèn</span>
                </Button>
            </motion.div>
        )}
        <motion.h1 className="font-heading text-5xl font-extrabold tracking-tighter md:text-7xl lg:text-8xl mt-8" variants={fadeInUp}>{cafeData.name}</motion.h1>
        <motion.p className="mt-6 max-w-3xl text-lg text-neutral-200 md:text-xl" variants={fadeInUp}>{cafeData.short_description}</motion.p>
      </motion.div>
    </section>
  );
};

const SignatureDrinksSection = () => {
    const drinks = [
        { name: "Blackout Cold Brew", description: "Mạnh mẽ, đậm vị, đánh thức mọi giác quan.", icon: Coffee },
        { name: "Golden Hour Latte", description: "Êm dịu, ngọt ngào với lớp bọt sữa vàng óng.", icon: CupSoda },
        { name: "Midnight Mocha", description: "Sự kết hợp hoàn hảo giữa chocolate đắng và espresso.", icon: Coffee },
    ];
    return (
        <motion.section id="drinks" className="bg-black py-24 sm:py-32" initial="initial" whileInView="whileInView" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div className="mx-auto max-w-2xl lg:text-center" variants={fadeInUp}><h2 className="text-base font-semibold leading-7 text-amber-400">MENU ĐẶC TRƯNG</h2><p className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Thức Uống Làm Nên Tên Tuổi</p></motion.div>
                <motion.div className="mx-auto mt-16 grid grid-cols-1 gap-8 md:grid-cols-3" variants={staggerContainer}>
                    {drinks.map(drink => (
                        <motion.div key={drink.name} variants={fadeInUp}>
                            <Card className="bg-zinc-900/50 border-zinc-800 text-center h-full yellow-edge-effect"><CardHeader className="items-center"><div className="rounded-full bg-amber-400/10 p-4 border-2 border-amber-400/20"><drink.icon className="h-10 w-10 text-amber-400" /></div></CardHeader><CardContent><CardTitle className="text-2xl font-bold text-white">{drink.name}</CardTitle><p className="mt-2 text-neutral-300">{drink.description}</p></CardContent></Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
}

// --- Other sections remain the same, but with the yellow-edge-effect class for the light effect ---
const AmenitiesSection = () => (
  <motion.section id="amenities" className="bg-black py-24 sm:py-32" initial="initial" whileInView="whileInView" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <motion.div className="mx-auto max-w-2xl lg:text-center" variants={fadeInUp}><h2 className="text-base font-semibold leading-7 text-amber-400">ĐIỀU GÌ LÀM NÊN NHÀ.24H</h2><p className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Không Gian Của Sự Sáng Tạo & Thư Giãn</p></motion.div>
      <motion.div className="mx-auto mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3" variants={staggerContainer}>
        {(cafeData.amenities as AmenityKey[]).map((amenity) => {
          const details = amenityDetails[amenity]; if (!details) return null;
          return (<motion.div key={details.text} variants={fadeInUp} className="h-full"><Card className="bg-zinc-900/50 border-zinc-800 hover:border-amber-400/50 hover:bg-zinc-900 transition-all duration-300 transform hover:-translate-y-2 h-full yellow-edge-effect"><CardHeader className="flex flex-row items-center gap-4"><div className="rounded-lg bg-amber-400/10 p-3"><details.icon className="h-8 w-8 flex-none text-amber-400" /></div><CardTitle className="text-xl font-bold text-white">{details.text}</CardTitle></CardHeader><CardContent><p className="text-neutral-300">{details.description}</p></CardContent></Card></motion.div>);
        })}
      </motion.div>
    </div>
  </motion.section>
);
const CoffeeInBedSection = () => {
    const featureImage = cafeData.images.find(img => img.name === "giuong-coffee-in-bed-01.jpg");
    return (
        <motion.section id="experience" className="bg-zinc-950 py-24 sm:py-32" initial="initial" whileInView="whileInView" viewport={{ once: true, amount: 0.3 }} variants={staggerContainer}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div variants={fadeInUp} className="relative w-full h-96 lg:h-[500px] rounded-xl overflow-hidden yellow-edge-effect">{featureImage && <Image src={getPublicImage(featureImage)} alt={featureImage.alt} fill className="object-cover" />}</motion.div>
                <motion.div variants={fadeInUp}><h2 className="text-base font-semibold leading-7 text-amber-400">TRẢI NGHIỆM ĐỘC NHẤT</h2><p className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Mô Hình "Coffee in Bed"</p><p className="mt-6 text-lg leading-8 text-neutral-300">Tại Nhà.24H, chúng tôi mang đến trải nghiệm "sleep box" lần đầu tiên xuất hiện, cho phép bạn ngả lưng thư giãn trong một không gian riêng tư ngay tại quán cà phê. Dù bạn cần một giấc ngủ ngắn để nạp năng lượng hay một góc yên tĩnh tuyệt đối để tập trung, "Coffee in Bed" là giải pháp hoàn hảo.</p></motion.div>
            </div></div>
        </motion.section>
    );
}
const DayTimelineSection = () => {
    const timelineData = [
        { icon: Sun, time: "Buổi Sáng", title: "Khởi đầu Năng suất", description: "Bắt đầu ngày mới trong một không gian yên tĩnh, lý tưởng để tập trung làm việc và học tập.", image: cafeData.images.find(i => i.name === 'ban-lam-viec-dai-01.jpg') },
        { icon: Users, time: "Buổi Chiều", title: "Hợp tác & Sáng tạo", description: "Gặp gỡ đối tác hoặc học nhóm trong các khu vực chung rộng rãi hoặc phòng họp riêng tư.", image: cafeData.images.find(i => i.name === 'day-ban-lam-viec-vach-kinh-01.jpg') },
        { icon: Moon, time: "Buổi Tối", title: "Thư giãn & Trò chuyện", description: "Thả mình trong không gian ấm cúng, trò chuyện cùng bạn bè và tận hưởng những giây phút yên bình.", image: cafeData.images.find(i => i.name === 'goc-khong-gian-am-03.jpg') },
    ];
    return (
        <section className="bg-black py-24 sm:py-32"><div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div className="mx-auto max-w-2xl lg:text-center" initial="initial" whileInView="whileInView" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp}><h2 className="text-base font-semibold leading-7 text-amber-400">DÒNG THỜI GIAN</h2><p className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Một Ngày Tại Nhà.24H</p></motion.div>
            <div className="mt-16 flow-root"><motion.ul className="-mb-8" initial="initial" whileInView="whileInView" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
                {timelineData.map((item, itemIdx) => (<li key={item.time}><motion.div className="relative pb-8" variants={fadeInUp}>{itemIdx !== timelineData.length - 1 ? <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-zinc-700" /> : null}<div className="relative flex space-x-4 md:space-x-8"><div className="flex-shrink-0"><span className="h-8 w-8 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center yellow-edge-effect"><item.icon className="h-5 w-5 text-amber-400" /></span></div><div className="min-w-0 flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"><div><p className="text-sm font-semibold text-amber-400">{item.time}</p><h3 className="text-xl font-bold text-white">{item.title}</h3><p className="mt-2 text-neutral-300">{item.description}</p></div>{item.image && <div className="relative w-full h-48 rounded-lg overflow-hidden yellow-edge-effect"><Image src={getPublicImage(item.image)} alt={item.title} fill className="object-cover" /></div>}</div></div></motion.div></li>))}
            </motion.ul></div>
        </div></section>
    );
}
const SpacesSection = () => {
    const spaceImages = {
        meet: cafeData.images.find(img => img.name === "khong-gian-chinh-cau-thang-01.jpg"),
        study: cafeData.images.find(img => img.name === "khu-may-tinh-va-tu-do-01.jpg"),
        relax: cafeData.images.find(img => img.name === "tran-den-va-cay-xanh-01.jpg"),
    }
    const [activeTab, setActiveTab] = useState("study");
    return (
        <motion.section id="spaces" className="bg-zinc-950 py-24 sm:py-32" initial="initial" whileInView="whileInView" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div className="mx-auto max-w-2xl lg:text-center" variants={fadeInUp}><h2 className="text-base font-semibold leading-7 text-amber-400">KHÔNG GIAN ĐA DẠNG</h2><p className="mt-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Mỗi Góc Nhỏ, Một Trải Nghiệm</p></motion.div>
                <motion.div variants={fadeInUp}><Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mt-16"><TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 bg-zinc-900/80 border-zinc-800"><TabsTrigger value="study">Góc Học Tập</TabsTrigger><TabsTrigger value="meet">Phòng Họp</TabsTrigger><TabsTrigger value="relax">Góc Thư Giãn</TabsTrigger></TabsList><div className="mt-8 relative overflow-hidden"><AnimatePresence mode="wait"><motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                    {activeTab === "study" && spaceImages.study && <SpaceTabContent image={spaceImages.study} title="Góc Học Tập & Làm Việc" description="Khu vực bàn dài lý tưởng cho việc học nhóm hoặc làm việc độc lập, với đầy đủ ánh sáng và không gian yên tĩnh." />}
                    {activeTab === "meet" && spaceImages.meet && <SpaceTabContent image={spaceImages.meet} title="Phòng Họp Chuyên Nghiệp" description="Phòng họp riêng tư, miễn phí, được trang bị đầy đủ để buổi thảo luận của bạn diễn ra hiệu quả nhất." />}
                    {activeTab === "relax" && spaceImages.relax && <SpaceTabContent image={spaceImages.relax} title="Góc Thư Giãn Ấm Cúng" description="Nơi bạn có thể thả mình trên những chiếc ghế sofa êm ái, đọc sách hoặc trò chuyện cùng bạn bè." />}
                </motion.div></AnimatePresence></div></Tabs></motion.div>
            </div>
        </motion.section>
    )
}
const SpaceTabContent = ({ image, title, description }: { image: ImageType, title: string, description: string }) => (<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"><div className="relative h-96 lg:h-[450px] w-full rounded-xl overflow-hidden yellow-edge-effect"><Image src={getPublicImage(image!)} alt={image!.alt} fill className="object-cover" /></div><div className="text-white"><h3 className="text-3xl font-bold tracking-tight">{title}</h3><p className="mt-4 text-lg text-neutral-300">{description}</p></div></div>)
const FooterLegacy = () => (<footer className="bg-black border-t border-zinc-900"><div className="mx-auto max-w-7xl px-6 py-12 lg:px-8"><div className="flex justify-center space-x-6"><a href={cafeData.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors"><span className="sr-only">Facebook</span><svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg></a></div><p className="mt-8 text-center text-sm text-neutral-500">&copy; {new Date().getFullYear()} {cafeData.name}. All rights reserved.</p></div></footer>);

// --- MAIN COMPONENT ---
export default function HomePage() {
  const [isLit, setIsLit] = useState(false);

  // Lenis smooth scroll setup
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => { lenis.destroy(); }
  }, []);

  return (
    <div className={cn("bg-black text-white", isLit && "has-yellow-edges")}>
        <style jsx global>{`
            html { scroll-behavior: smooth; }
            .has-yellow-edges .yellow-edge-effect {
                border: 1px solid oklch(0.9 0.25 80 / 0.5);
                box-shadow: 0 0 25px oklch(0.9 0.25 80 / 0.2);
                transition: border 1s ease-out, box-shadow 1s ease-out;
                transition-delay: 0.5s;
            }
        `}</style>
        <YellowEdgeEffect isActivated={isLit} />
        <main>
            <HeroSection onLightActivate={() => setIsLit(true)} />
            <AmenitiesSection />
            <CoffeeInBedSection />
            <DayTimelineSection />
            <SignatureDrinksSection />
            <SpacesSection />
            <Testimonials />
            <div id="contact">
              <Contact cafe={cafeData as any} />
            </div>
        </main>
        <Footer cafe={cafeData as any} />
    </div>
  );
}
