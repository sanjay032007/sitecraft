"use client";

import React, { useState } from 'react';
import { Template } from '@/lib/data';
import { motion } from 'framer-motion';
import { Utensils, Clock, Award, Star, Check } from 'lucide-react';

export function RestaurantModern({ t }: { t: Template }) {
  const { primary, bg, text, secondary } = t.colorScheme;
  const [selectedTab, setSelectedTab] = useState("Mains");
  const [reserved, setReserved] = useState(false);

  const menuItems = {
    Starters: [
      { name: "Truffle Mushroom Bruschetta", price: "16", desc: "Toasted sourdough, wild seasonal mushrooms, white truffle oil essence." },
      { name: "Charred Octopus Carpaccio", price: "22", desc: "Thinly sliced octopus, caper berries, microgreens, citrus vinaigrette." }
    ],
    Mains: [
      { name: "Dry-Aged Angus Ribeye Steak", price: "48", desc: "12oz grass-fed beef, rosemary herb butter, charred asparagus." },
      { name: "Pan-Seared Sea Bass", price: "39", desc: "Local sea bass, saffron cauliflower puree, baby heirloom tomatoes." }
    ],
    Desserts: [
      { name: "Deconstructed Meyer Lemon Tart", price: "12", desc: "Lemon curd, toasted Italian meringue, graham cracker crumble." },
      { name: "Warm Valrhona Chocolate Fondant", price: "14", desc: "Molten dark chocolate core, Tahitian vanilla bean gelato." }
    ]
  };

  return (
    <div className="min-h-full flex flex-col bg-amber-50/20 @container relative overflow-hidden" style={{ color: text }}>
      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden">
      {/* Header */}
      <header className="px-6 py-4 border-b flex justify-between items-center bg-white sticky top-0 z-50" style={{ borderColor: secondary }}>
        <div className="flex items-center gap-1.5 font-bold tracking-tighter text-sm">
          <Utensils className="w-4.5 h-4.5 text-amber-700" />
          <span>SAVOR BISTRO</span>
        </div>
        <nav className="hidden @md:flex gap-6 text-[10px] uppercase tracking-wider font-bold text-neutral-500">
          <span className="hover:text-black cursor-pointer">Our Story</span>
          <span className="hover:text-black cursor-pointer">Culinary Menu</span>
          <span className="hover:text-black cursor-pointer">Reservations</span>
        </nav>
        <a href="#booking" className="text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded bg-amber-800 text-white hover:bg-amber-900 transition-colors">
          Book Table
        </a>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 text-center max-w-4xl mx-auto flex flex-col items-center">
        <span className="text-[8px] font-bold uppercase tracking-widest bg-amber-100 text-amber-800 px-3 py-1 rounded-full mb-4">
          Michelin Recommended Cuisine
        </span>
        <h1 className="text-3xl @md:text-5xl font-normal leading-tight mb-4">
          CRAFTED BY NATURE. <br />
          <span className="italic text-amber-800">Perfected by tradition.</span>
        </h1>
        <p className="text-xs text-neutral-500 max-w-lg mb-8 leading-relaxed">
          {t.description || "Savor Bistro combines farm-to-table organic ingredients with classic French culinary methods, creating a memorable dining experience."}
        </p>
        <div className="flex gap-3">
          <a href="#menu" className="text-[10px] font-bold uppercase tracking-wider px-5 py-2.5 rounded text-white" style={{ background: primary }}>
            View Dinner Menu
          </a>
          <a href="#booking" className="text-[10px] font-bold uppercase tracking-wider px-5 py-2.5 rounded bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50">
            Secure Table
          </a>
        </div>
      </section>

      {/* Chef Spotlight / Story Section */}
      <section className="px-6 py-12 max-w-4xl mx-auto w-full grid grid-cols-1 @md:grid-cols-2 gap-8 items-center border-y" style={{ borderColor: secondary }}>
        <div className="h-64 rounded-2xl bg-neutral-100 relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" ></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h4 className="text-xs font-bold">Chef Jean-Luc Vane</h4>
            <p className="text-[8px] uppercase tracking-wider text-slate-300">Executive Head Chef</p>
          </div>
          <Utensils className="w-12 h-12 text-neutral-300" />
        </div>
        
        <div>
          <span className="text-[8px] font-bold uppercase tracking-widest text-amber-800">Our Culinary Philosophy</span>
          <h2 className="text-xl font-bold mt-1 mb-3">Freshness is our foundation</h2>
          <p className="text-xs text-neutral-500 leading-relaxed mb-4">
            &ldquo;Every herb is picked from our private garden at dawn. Every cut of beef is dry-aged for 28 days on-site. We honor ingredients by keeping structures simple and profiles intense.&rdquo;
          </p>
          <div className="flex items-center gap-6 mt-6">
            <div className="text-center">
              <span className="text-sm font-bold block">3 Stars</span>
              <span className="text-[8px] text-neutral-400 uppercase">Michelin rating</span>
            </div>
            <div className="text-center">
              <span className="text-sm font-bold block">100%</span>
              <span className="text-[8px] text-neutral-400 uppercase">Organic Sourced</span>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section id="menu" className="px-6 py-12 max-w-3xl mx-auto w-full">
        <h2 className="text-center text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">Dinner Selection</h2>
        
        {/* Menu Tabs */}
        <div className="flex justify-center gap-6 mb-10 text-[10px] uppercase font-bold tracking-widest border-b pb-3" style={{ borderColor: secondary }}>
          {["Starters", "Mains", "Desserts"].map((tab) => (
            <span 
              key={tab} 
              className={`cursor-pointer pb-1.5 transition-all ${selectedTab === tab ? 'border-b-2 text-amber-800' : 'text-neutral-400 hover:text-black'}`}
              style={{ borderColor: selectedTab === tab ? primary : 'transparent' }}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </span>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-6">
          {menuItems[selectedTab as keyof typeof menuItems].map((item, idx) => (
            <div key={idx} className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h4 className="text-sm font-bold text-neutral-800">{item.name}</h4>
                <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">{item.desc}</p>
              </div>
              <span className="text-xs font-bold text-amber-800">${item.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Reservation Widget */}
      <section id="booking" className="px-6 py-12 bg-neutral-900 text-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-base font-bold uppercase tracking-wider mb-2">Reserve Your Table</h2>
          <p className="text-[10px] text-slate-400 mb-6">Enjoy curated sensory dining. Bookings open 30 days in advance.</p>
          
          <div className="grid grid-cols-1 @sm:grid-cols-3 gap-3 text-left">
            <div>
              <label className="text-[8px] font-extrabold uppercase text-slate-500 block mb-1">Guests</label>
              <select className="w-full text-[10px] border border-slate-700 bg-slate-800 rounded p-1.5 text-white">
                <option>2 Guests</option>
                <option>4 Guests</option>
                <option>6 Guests</option>
                <option>8+ Guests</option>
              </select>
            </div>
            <div>
              <label className="text-[8px] font-extrabold uppercase text-slate-500 block mb-1">Date</label>
              <input type="date" className="w-full text-[10px] border border-slate-700 bg-slate-800 rounded p-1.5 text-white" defaultValue="2026-06-10" />
            </div>
            <div className="flex items-end">
              <button 
                className="w-full text-[10px] font-bold py-2 rounded text-white transition-all text-center flex items-center justify-center gap-1"
                style={{ background: primary }}
                onClick={() => setReserved(true)}
              >
                {reserved ? <><Check className="w-3.5 h-3.5" /> Table Secured</> : "Book Table Now"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Food Photography Grid */}
      <section className="px-6 py-12 max-w-5xl mx-auto w-full">
        <h3 className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Ambience & Craft</h3>
        <div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-40 bg-neutral-100 rounded-xl flex items-center justify-center border hover:shadow-sm" style={{ borderColor: secondary }}>
              <Utensils className="w-6 h-6 text-slate-300" />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t bg-white py-6 px-6 text-[10px] text-slate-400 text-center uppercase tracking-widest" style={{ borderColor: secondary }}>
        &copy; {new Date().getFullYear()} Savor Culinary Bistro. All rights reserved.
      </footer>
      </div>
    </div>
  );
}
