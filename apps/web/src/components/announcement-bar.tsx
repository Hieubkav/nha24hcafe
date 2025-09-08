"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, X } from 'lucide-react';
import Link from 'next/link';
import cafeData from '../../../../data/nha24h.json';
import { cn } from '@/lib/utils';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isBulbOn, setIsBulbOn] = useState(false);
  const { text, link, enabled } = cafeData.announcement;

  useEffect(() => {
    const checkBulbStatus = () => {
      const bulbStatus = document.documentElement.classList.contains('bulb-on');
      setIsBulbOn(bulbStatus);
    };

    checkBulbStatus(); // Check on initial mount

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          checkBulbStatus();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    if (enabled) {
      const isDismissed = sessionStorage.getItem('announcementDismissed');
      if (!isDismissed) {
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
      }
    }

    return () => observer.disconnect();
  }, [enabled]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('announcementDismissed', 'true');
  };

  if (!enabled) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'relative z-40 mx-auto -mt-12 mb-12 max-w-4xl rounded-full border',
            isBulbOn
              ? 'border-amber-400/20 bg-amber-950/30 text-amber-200'
              : 'border-neutral-700/50 bg-neutral-900/30 text-neutral-300',
            'backdrop-blur-md transition-all duration-500'
          )}
        >
          <div className="mx-auto flex items-center justify-between gap-3 px-6 py-2.5">
            <div className="flex items-center gap-3">
              <Megaphone className={cn(
                'h-5 w-5 flex-shrink-0',
                isBulbOn ? 'text-amber-400' : 'text-neutral-400'
              )} />
              <p className="text-sm">
                <Link href={link} className="hover:underline focus:outline-none focus:ring-2 focus:ring-amber-400/50 rounded-sm">
                  {text}
                </Link>
              </p>
            </div>
            <button
              onClick={handleDismiss}
              aria-label="Đóng thông báo"
              className={cn(
                'rounded-full p-1 transition-colors',
                isBulbOn
                  ? 'text-amber-300/80 hover:bg-white/10'
                  : 'text-neutral-400 hover:bg-white/10'
              )}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {isBulbOn && (
            <div className="absolute inset-0 -z-10 rounded-full bg-amber-500/10 blur-xl" />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}