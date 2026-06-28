"use client";

import React, { useState } from 'react';
import { Template } from '@/lib/data';
import { motion } from 'framer-motion';
import { Utensils, Clock, Award, Star, Check } from 'lucide-react';

export function RestaurantGlass({ t }: { t: Template }) {
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
    <div className="@container w-full h-full min-h-full flex flex-col bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full mix-blend-screen filter blur-[80px] opacity-20" style={{ background: '#dc2626' }}></div>
      <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] rounded-full mix-blend-screen filter blur-[80px] opacity-15" style={{ background: '#d97706' }}></div>

      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden scrollbar-none pointer-events-auto">
      {/* Header */}
      <header className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-[#0a0a0a]/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-1.5 font-bold tracking-tighter text-sm">
          <Utensils className="w-4.5 h-4.5 text-amber-500" />
          <span className="text-white">Noir Kitchen</span>
        </div>
        <nav className="hidden @md:flex gap-6 text-[10px] uppercase tracking-wider font-bold text-white/50">
          <span className="hover:text-white cursor-pointer">Our Story</span>
          <span className="hover:text-white cursor-pointer">Culinary Menu</span>
          <span className="hover:text-white cursor-pointer">Reservations</span>
        </nav>
        <a href="#booking" className="text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors">
          Book Table
        </a>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 text-center max-w-4xl mx-auto flex flex-col items-center relative z-10">
        <span className="text-[8px] font-bold uppercase tracking-widest border border-white/10 bg-white/5 text-amber-500 px-3 py-1 rounded-full mb-4 backdrop-blur-md">
          Michelin Recommended Cuisine
        </span>
        <h1 className="text-3xl @md:text-5xl font-normal leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
          CRAFTED BY NATURE. <br />
          <span className="italic text-amber-500">Perfected by tradition.</span>
        </h1>
        <p className="text-xs text-white/60 max-w-lg mb-8 leading-relaxed">
          {t.description || "Noir Kitchen combines farm-to-table organic ingredients with classic French culinary methods, creating an immersive sensory dining experience."}
        </p>
        <div className="flex gap-3">
          <a href="#menu" className="text-[10px] font-bold uppercase tracking-wider px-5 py-2.5 rounded border border-amber-500 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-all">
            View Dinner Menu
          </a>
          <a href="#booking" className="text-[10px] font-bold uppercase tracking-wider px-5 py-2.5 rounded border border-white/10 bg-white/5 hover:bg-white/10 text-white">
            Secure Table
          </a>
        </div>
      </section>

      {/* Chef Spotlight / Story Section */}
      <section className="px-6 py-12 max-w-4xl mx-auto w-full grid grid-cols-1 @md:grid-cols-2 gap-8 items-center border-y border-white/5 relative z-10">
        <div className="h-64 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <h4 className="text-xs font-bold text-white">Chef Jean-Luc Vane</h4>
            <p className="text-[8px] uppercase tracking-wider text-white/45">Executive Head Chef</p>
          </div>
          <Utensils className="w-12 h-12 text-white/20" />
        </div>
        
        <div>
          <span className="text-[8px] font-bold uppercase tracking-widest text-amber-500">Our Culinary Philosophy</span>
          <h2 className="text-xl font-bold mt-1 mb-3 text-white">Freshness is our foundation</h2>
          <p className="text-xs text-white/60 leading-relaxed mb-4">
            &ldquo;Every herb is picked from our private garden at dawn. Every cut of beef is dry-aged for 28 days on-site. We honor ingredients by keeping structures simple and profiles intense.&rdquo;
          </p>
          <div className="flex items-center gap-6 mt-6">
            <div className="text-center">
              <span className="text-sm font-bold block text-white">3 Stars</span>
              <span className="text-[8px] text-white/40 uppercase">Michelin rating</span>
            </div>
            <div className="text-center">
              <span className="text-sm font-bold block text-white">100%</span>
              <span className="text-[8px] text-white/40 uppercase">Organic Sourced</span>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section id="menu" className="px-6 py-12 max-w-3xl mx-auto w-full relative z-10">
        <h2 className="text-center text-xs font-bold uppercase tracking-widest text-white/45 mb-6">Dinner Selection</h2>
        
        {/* Menu Tabs */}
        <div className="flex justify-center gap-6 mb-10 text-[10px] uppercase font-bold tracking-widest border-b border-white/5 pb-3">
          {["Starters", "Mains", "Desserts"].map((tab) => (
            <span 
              key={tab} 
              className={`cursor-pointer pb-1.5 transition-all ${selectedTab === tab ? 'border-b-2 text-amber-500' : 'text-white/45 hover:text-white'}`}
              style={{ borderColor: selectedTab === tab ? '#d97706' : 'transparent' }}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </span>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-6">
          {menuItems[selectedTab as keyof typeof menuItems].map((item, idx) => (
            <div key={idx} className="flex justify-between items-start gap-4 border border-white/5 bg-white/2 backdrop-blur-xl p-4 rounded-xl hover:border-white/10">
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white/95">{item.name}</h4>
                <p className="text-[11px] text-white/50 mt-1 leading-relaxed">{item.desc}</p>
              </div>
              <span className="text-xs font-bold text-amber-400">${item.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Reservation Widget */}
      <section id="booking" className="px-6 py-12 border-t border-white/5 bg-white/2 backdrop-blur-md text-center relative z-10">
        <div className="max-w-xl mx-auto">
          <h2 className="text-base font-bold uppercase tracking-wider mb-2 text-white">Reserve Your Table</h2>
          <p className="text-[10px] text-white/45 mb-6">Enjoy curated sensory dining. Bookings open 30 days in advance.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <div>
              <label className="text-[8px] font-extrabold uppercase text-white/40 block mb-1">Guests</label>
              <select className="w-full text-[10px] border border-white/10 bg-white/5 rounded p-1.5 text-white outline-none">
                <option className="bg-[#0a0a0a] text-white">2 Guests</option>
                <option className="bg-[#0a0a0a] text-white">4 Guests</option>
                <option className="bg-[#0a0a0a] text-white">6 Guests</option>
                <option className="bg-[#0a0a0a] text-white">8+ Guests</option>
              </select>
            </div>
            <div>
              <label className="text-[8px] font-extrabold uppercase text-white/40 block mb-1">Date</label>
              <input type="date" className="w-full text-[10px] border border-white/10 bg-white/5 rounded p-1.5 text-white outline-none" defaultValue="2026-06-10" />
            </div>
            <div className="flex items-end">
              <button 
                className="w-full text-[10px] font-bold py-2 rounded text-white border border-white/20 bg-white/10 hover:bg-white/20 transition-all text-center flex items-center justify-center gap-1"
                onClick={() => setReserved(true)}
              >
                {reserved ? <><Check className="w-3.5 h-3.5" /> Table Secured</> : "Book Table Now"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Food Photography Grid */}
      <section className="px-6 py-12 max-w-5xl mx-auto w-full relative z-10">
        <h3 className="text-center text-xs font-bold uppercase tracking-widest text-white/40 mb-6">Ambience & Craft</h3>
        <div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-40 border border-white/5 bg-white/5 rounded-xl flex items-center justify-center">
              <Utensils className="w-6 h-6 text-white/10" />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 bg-white/2 py-6 px-6 text-[10px] text-white/35 text-center uppercase tracking-widest relative z-10">
        &copy; {new Date().getFullYear()} Savor Culinary Bistro. All rights reserved.
      </footer>
      </div>
    </div>
  );
}
