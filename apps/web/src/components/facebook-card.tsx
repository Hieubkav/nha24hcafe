"use client";

import React from 'react';
import { motion } from 'framer-motion';

const FacebookCard = ({ 
  url, 
  title = "Nhà.24H Coffee",
  description = "Theo dõi chúng tôi trên Facebook để cập nhật tin tức & khuyến mãi mới nhất."
}: { 
  url: string; 
  title?: string;
  description?: string;
}) => {
  return (
    <motion.div 
      className="mt-5 overflow-hidden rounded-xl border border-amber-400/20 bg-zinc-900/50 backdrop-blur-sm yellow-edge-effect"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className="p-6">
        <motion.div 
          className="flex items-center gap-4 mb-4"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/20"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-amber-400">Facebook</h3>
            <p className="text-neutral-400 text-sm">{title}</p>
          </div>
        </motion.div>
        
        <motion.p 
          className="text-neutral-300 mb-5 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {description}
        </motion.p>
        
        <motion.a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 w-full bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-400 px-5 py-3.5 rounded-xl transition-all duration-300 group"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: "0 10px 25px rgba(251, 191, 36, 0.15)"
          }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span className="font-semibold">Theo dõi Fanpage</span>
          <motion.svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </motion.svg>
        </motion.a>
      </div>
    </motion.div>
  );
};

export default FacebookCard;