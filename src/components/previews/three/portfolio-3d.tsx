/* eslint-disable react/no-unescaped-entities, @typescript-eslint/no-unused-vars */
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Template } from '@/lib/data';
import { Search, User, Menu } from 'lucide-react';

interface Portfolio3DProps {
  t: Template;
}

export const Portfolio3D: React.FC<Portfolio3DProps> = ({ t }) => {
  return (
    <div
      className="@container w-full relative overflow-hidden text-white font-sans"
      style={{ minHeight: '600px', backgroundColor: '#050505' }}
    >
      {/* Background red glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-0 opacity-75"
        style={{ width: 'min(80%, 480px)', height: 'min(80%, 480px)', backgroundColor: '#dc2626', filter: 'blur(2px)' }}
      />

      {/* Giant background title - scales with container */}
      <div className="absolute top-[22%] left-0 w-full text-center z-10 pointer-events-none px-2">
        <motion.h1
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-black tracking-tighter text-white select-none drop-shadow-2xl leading-none"
          style={{ fontSize: 'clamp(36px, 13cqw, 160px)', WebkitTextStroke: "2px rgba(255,255,255,0.07)" }}
        >
          SHINCHAN
        </motion.h1>
      </div>

      {/* ── Navbar ── */}
      <nav className="absolute top-0 left-0 w-full px-4 @md:px-6 py-4 flex justify-between items-center z-30 uppercase text-xs tracking-widest font-bold">
        {/* Logo */}
        <span className="text-base @md:text-xl tracking-tighter flex-shrink-0">
          TOON<span className="text-red-500">DAILY</span>
        </span>

        {/* Desktop links – only @md+ */}
        <div className="hidden @md:flex items-center gap-4 @lg:gap-8 text-neutral-400">
          <span className="hover:text-white cursor-pointer transition-colors">Top Casts</span>
          <span className="text-red-500">•</span>
          <span className="hover:text-white cursor-pointer transition-colors">Production</span>
          <span className="text-red-500 hidden @lg:inline">•</span>
          <span className="hover:text-white cursor-pointer transition-colors hidden @lg:inline">Box Office</span>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-2 @md:gap-3">
          <Search className="w-4 h-4 cursor-pointer hover:text-red-400 transition-colors" />
          <User className="w-4 h-4 cursor-pointer hover:text-red-400 transition-colors hidden @sm:block" />
          <Menu className="w-5 h-5 cursor-pointer hover:text-red-400 transition-colors" />
        </div>
      </nav>

      {/* Tag pills */}
      <div className="absolute top-14 @md:top-[4.5rem] left-0 w-full px-4 @md:px-8 flex justify-between items-center z-30">
        <div className="flex gap-1.5">
          <span className="border border-neutral-600 px-2 py-0.5 rounded-full text-[9px] tracking-widest uppercase bg-black/50 backdrop-blur-md">Comedy</span>
          <span className="border border-neutral-600 px-2 py-0.5 rounded-full text-[9px] tracking-widest uppercase bg-black/50 backdrop-blur-md hidden @sm:block">Slice of Life</span>
          <span className="border border-neutral-600 px-2 py-0.5 rounded-full text-[9px] tracking-widest uppercase bg-black/50 backdrop-blur-md hidden @md:block">Animation</span>
        </div>
        <div className="text-[9px] tracking-widest uppercase text-neutral-400 hidden @sm:block">
          Release (July 20, 2026)
        </div>
      </div>

      {/* Cast names row – @xl only */}
      <div className="absolute top-28 left-0 w-full px-8 @xl:px-12 justify-between items-center z-30 uppercase text-xs tracking-widest font-bold hidden @xl:flex">
        <span>Hiroshi</span>
        <span>Misae</span>
        <span className="text-2xl font-serif text-red-500 mx-6">III</span>
        <span>Himawari</span>
        <span>Shiro</span>
      </div>

      {/* Character image */}
      <motion.div
        initial={{ y: "100%", x: "-50%", opacity: 0, rotate: -5 }}
        animate={{ y: "-3%", x: "-50%", opacity: 1, rotate: 0 }}
        transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
        className="absolute bottom-0 left-1/2 z-40 pointer-events-none"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <img
            src="/images/shinchan.png"
            alt="Shinchan"
            className="drop-shadow-2xl pointer-events-none block"
            style={{ width: 'clamp(140px, 45cqw, 340px)', height: 'auto' }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom bar */}
      <div className="absolute bottom-3 @md:bottom-6 left-0 w-full px-3 @md:px-8 flex justify-between items-end z-50 gap-3">
        {/* Story card – @sm+ */}
        <div className="hidden @sm:block max-w-[160px] @md:max-w-[250px] bg-black/60 backdrop-blur-md p-2.5 @md:p-4 rounded-xl border border-white/10 flex-shrink-0">
          <h3 className="text-red-500 font-bold text-[9px] tracking-widest uppercase mb-1 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Shinchan III Story
          </h3>
          <p className="text-[9px] @md:text-[10px] text-neutral-300 leading-relaxed line-clamp-2 @md:line-clamp-3">
            PART A. The storm-calling five-year-old joins the "merc with a mouth" in the third installment.
          </p>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 @md:gap-4 ml-auto">
          <button className="border border-white hover:bg-white hover:text-black transition-colors px-3 @md:px-5 py-1.5 @md:py-2.5 rounded-full text-[9px] @md:text-[10px] font-bold tracking-widest uppercase bg-black/30 backdrop-blur-md whitespace-nowrap">
            Book Now ↗
          </button>
          <div className="w-8 h-8 @md:w-11 @md:h-11 rounded-full bg-red-950 border border-red-500 flex items-center justify-center text-[7px] @md:text-[9px] font-black -rotate-12 uppercase flex-shrink-0">
            CINE
          </div>
        </div>
      </div>
    </div>
  );
};
