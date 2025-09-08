"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const NUM_RAYS = 20;

export default function LightOverlay() {
  const [isOn, setIsOn] = useState(false);
  const controls = useAnimation();
  const rayControls = useAnimation();
  const flareControls = useAnimation();

  useEffect(() => {
    const isInitiallyOn = document.documentElement.classList.contains("bulb-on");
    setIsOn(isInitiallyOn);
    if (isInitiallyOn) {
      controls.set({ opacity: 1 });
    } else {
      controls.set({ opacity: 0 });
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const target = mutation.target as HTMLElement;
          const nextIsOn = target.classList.contains("bulb-on");
          if (nextIsOn !== isOn) {
            setIsOn(nextIsOn);
          }
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, [isOn, controls]);

  useEffect(() => {
    if (isOn) {
      const sequence = async () => {
        flareControls.start({
          opacity: [0, 1, 0],
          scale: [0, 1.5, 0],
          transition: { duration: 0.3, times: [0, 0.5, 1], ease: "easeOut" },
        });
        
        await controls.start({
          opacity: 1,
          transition: { duration: 1.2, ease: [0.2, 0.6, 0.8, 1] },
        });

        await rayControls.start({
          opacity: [0, 0.4, 0],
          scaleY: [0, 1, 0.8],
          transition: { duration: 0.8, ease: "easeOut", delay: 0.1 },
        });
      };
      sequence();
    } else {
      controls.start({
        opacity: 0,
        transition: { duration: 0.8, ease: "easeOut" },
      });
      rayControls.start({ opacity: 0 });
      flareControls.start({ opacity: 0 });
    }
  }, [isOn, controls, rayControls, flareControls]);

  return (
    <div id="light-overlay-container" className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {/* Container cho hiệu ứng tại vị trí bóng đèn */}
      <div className="absolute bottom-5 right-5 h-11 w-11">
        {/* 1. Flare - Đặt tại vị trí bóng đèn */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-64 w-64 rounded-full bg-amber-200/80"
          style={{ 
            mixBlendMode: "screen", 
            filter: "blur(60px)",
            transform: "translate(-50%, -50%)"
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={flareControls}
        />

        {/* 3. Rays - Đặt tại vị trí bóng đèn */}
        <div className="absolute left-1/2 top-1/2 h-full w-full">
          {Array.from({ length: NUM_RAYS }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-0 h-[400px] w-px origin-top bg-gradient-to-b from-amber-300/20 via-amber-300/05 to-transparent"
              style={{
                rotate: `${(360 / NUM_RAYS) * i - 90}deg`,
                transformOrigin: '0 0',
                mixBlendMode: "screen",
              }}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={rayControls}
            />
          ))}
        </div>
      </div>

      {/* 2. Main Glow - Vẫn lan tỏa toàn màn hình nhưng tâm thay đổi */}
      <motion.div
        id="light-overlay"
        className="h-full w-full"
        style={{
          backgroundImage:
            "radial-gradient(1500px 1000px at 95% 95%, rgba(212,162,97,0.15), transparent 50%), radial-gradient(1000px 700px at 90% 90%, rgba(212,162,97,0.1), transparent 60%), radial-gradient(800px 500px at 95% 95%, rgba(255,220,160,0.1), transparent 60%), repeating-linear-gradient( to bottom, rgba(255,255,255,0.015) 0 1px, transparent 1px 8px )",
          mixBlendMode: "screen",
        }}
        initial={{ opacity: 0 }}
        animate={controls}
      />
    </div>
  );
}
