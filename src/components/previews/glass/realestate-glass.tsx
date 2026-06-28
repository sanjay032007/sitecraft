"use client";

import React, { useState } from 'react';
import { Template } from '@/lib/data';
import { motion } from 'framer-motion';
import { Home, Search, MapPin, BedDouble, Bath, Square, Phone, Mail } from 'lucide-react';

export function RealEstateGlass({ t }: { t: Template }) {
  const { primary, bg, text, secondary } = t.colorScheme;
  const [filterType, setFilterType] = useState("All");

  const listings = [
    { id: 1, name: "Sunset Hills Modern Villa", price: "$1,850,000", beds: 4, baths: 4.5, area: "4,200 sqft", type: "Villa", loc: "Los Angeles, CA" },
    { id: 2, name: "Minimalist Waterfront Penthouse", price: "$2,450,000", beds: 3, baths: 3, area: "2,800 sqft", type: "Penthouse", loc: "Miami, FL" },
    { id: 3, name: "Industrial Loft Apartment", price: "$890,000", beds: 2, baths: 2, area: "1,600 sqft", type: "Loft", loc: "Brooklyn, NY" },
    { id: 4, name: "Pacific Heights Mansion", price: "$5,200,000", beds: 5, baths: 6, area: "6,500 sqft", type: "Villa", loc: "San Francisco, CA" }
  ];

  const filteredListings = filterType === "All" ? listings : listings.filter(l => l.type === filterType);

  return (
    <div className="@container w-full h-full min-h-full flex flex-col relative overflow-hidden bg-[#04080f] text-white">
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-10%] left-[10%] w-[50%] h-[50%] rounded-full mix-blend-screen filter blur-[80px] opacity-20" style={{ background: '#f59e0b' }}></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] rounded-full mix-blend-screen filter blur-[80px] opacity-20" style={{ background: primary }}></div>

      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden scrollbar-none pointer-events-auto">
      {/* Header */}
      <header className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-[#04080f]/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-1.5">
          <Home className="w-5 h-5 text-amber-500" />
          <span className="font-extrabold text-sm tracking-tight text-white/90">Vista Luxury</span>
        </div>
        <nav className="hidden @md:flex gap-6 text-[11px] font-semibold text-white/50">
          <span className="hover:text-white cursor-pointer">Properties</span>
          <span className="hover:text-white cursor-pointer">Realtors</span>
          <span className="hover:text-white cursor-pointer">Neighborhood Guides</span>
        </nav>
        <button className="text-[10px] font-bold px-3.5 py-1.5 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 transition-all">
          Schedule Tour
        </button>
      </header>

      {/* Property Search Hero */}
      <section className="px-6 py-14 max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
        <span className="text-[8px] font-extrabold uppercase border border-amber-500/30 bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full mb-3 backdrop-blur-md">
          Luxury Housing Specialist
        </span>
        <h1 className="text-3xl @md:text-5xl font-extrabold tracking-tight leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
          Find your signature home.
        </h1>
        <p className="text-xs text-white/60 max-w-lg mx-auto mb-8 leading-relaxed">
          {t.description || "Prestige Realty represents the finest residential architectural gems on the market. Filter properties by location, type, and square footage."}
        </p>

        {/* Search Filter Widget */}
        <div className="w-full max-w-2xl border border-white/10 bg-white/5 backdrop-blur-xl rounded-xl shadow-2xl p-4 text-left">
          <div className="grid grid-cols-1 @md:grid-cols-3 gap-3">
            <div>
              <label className="text-[8px] font-extrabold uppercase text-white/40 block mb-1">Search Location</label>
              <div className="flex items-center border border-white/10 bg-white/5 rounded p-1.5 gap-1">
                <MapPin className="w-3.5 h-3.5 text-white/40" />
                <input type="text" placeholder="City, State, Zip..." className="bg-transparent text-[10px] text-white outline-none w-full" defaultValue="California" />
              </div>
            </div>
            <div>
              <label className="text-[8px] font-extrabold uppercase text-white/40 block mb-1">Property Category</label>
              <select 
                className="w-full text-[10px] border border-white/10 bg-white/5 text-white rounded p-2 outline-none"
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="All" className="bg-[#04080f]">All Categories</option>
                <option value="Villa" className="bg-[#04080f]">Villas</option>
                <option value="Penthouse" className="bg-[#04080f]">Penthouses</option>
                <option value="Loft" className="bg-[#04080f]">Industrial Lofts</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full text-[10px] font-bold py-2 rounded text-white border border-white/20 bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center gap-1.5 shadow-lg">
                <Search className="w-3.5 h-3.5" /> Find Listings
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Grid */}
      <section className="px-6 py-10 max-w-5xl mx-auto w-full relative z-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6 text-center">Featured Listings</h2>
        
        <div className="grid grid-cols-1 @md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredListings.map((list) => (
            <div key={list.id} className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-xl overflow-hidden hover:border-white/20 transition-all flex flex-col justify-between">
              <div className="h-40 bg-white/5 relative overflow-hidden flex items-center justify-center">
                <Home className="w-10 h-10 text-white/15" />
                <span className="absolute bottom-2 left-2 text-[8px] font-extrabold bg-black/60 border border-white/10 text-white px-2 py-0.5 rounded flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-red-400" /> {list.loc}
                </span>
              </div>

              <div className="p-3">
                <span className="text-[7px] font-bold uppercase text-amber-400 border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 rounded">{list.type}</span>
                <h4 className="text-[11px] font-bold text-white/90 line-clamp-1 mt-2">{list.name}</h4>
                <p className="text-xs font-black text-amber-400 mt-1">{list.price}</p>
                
                {/* Specs */}
                <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/10 text-[9px] text-white/40">
                  <span className="flex items-center gap-0.5"><BedDouble className="w-3.5 h-3.5" /> {list.beds} Beds</span>
                  <span className="flex items-center gap-0.5"><Bath className="w-3.5 h-3.5" /> {list.baths} Baths</span>
                  <span className="flex items-center gap-0.5"><Square className="w-3.5 h-3.5" /> {list.area}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="px-6 py-12 border-y border-white/5 bg-white/2 backdrop-blur-md relative z-10">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 @md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-[8px] font-bold uppercase tracking-widest text-amber-400">Map View</span>
            <h2 className="text-xl @md:text-2xl font-bold mt-2 mb-4">Interactive Neighborhood Maps</h2>
            <p className="text-xs text-white/60 leading-relaxed mb-6">
              Navigate listing locations on our active street maps. Discover local schools, hospital transit links, average weather indexes, and property valuation growth trajectories.
            </p>
            <button className="text-[10px] font-bold px-4 py-2 rounded border border-white/20 bg-white/10 hover:bg-white/15 text-white">
              Open Fullscreen Map
            </button>
          </div>

          {/* Map mockup */}
          <div className="h-56 border border-white/10 bg-white/5 rounded-xl relative overflow-hidden flex items-center justify-center">
            {/* Grid pattern mimicking roads */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-1/4 left-1/3 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
            <div className="absolute top-1/2 left-2/3 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
            <div className="absolute bottom-1/4 left-1/2 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
            
            {/* Map UI Panel overlay */}
            <div className="absolute bottom-3 right-3 border border-white/10 bg-slate-900/90 p-2.5 rounded-lg text-[9px] w-40 text-left">
              <span className="font-bold block text-white">Sunset Hills Villa</span>
              <span className="text-white/50 block mt-0.5">Valuation: $1.85M</span>
              <span className="text-[8px] text-amber-400 block mt-1 hover:underline cursor-pointer">View Details &rarr;</span>
            </div>
          </div>
        </div>
      </section>

      {/* Realtors / Agent Profiles Section */}
      <section className="px-6 py-14 max-w-5xl mx-auto w-full relative z-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-8 text-center">Expert Advisory Realtors</h2>
        <div className="grid grid-cols-1 @md:grid-cols-3 gap-6">
          {[
            { name: "Aveline Mercer", listings: "18 Active Properties", email: "aveline@prestige.com" },
            { name: "Robert Chen", listings: "12 Active Properties", email: "robert@prestige.com" },
            { name: "Elena Rostova", listings: "15 Active Properties", email: "elena@prestige.com" }
          ].map((agent, idx) => (
            <div key={idx} className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-xl p-4 text-center hover:border-white/20 transition-all">
              <div className="w-14 h-14 rounded-full bg-white/10 mx-auto flex items-center justify-center font-bold text-amber-400 mb-3">
                {agent.name.split(' ').map(n=>n[0]).join('')}
              </div>
              <h4 className="text-xs font-bold text-white">{agent.name}</h4>
              <p className="text-[9px] uppercase tracking-wider text-white/40 mt-1">{agent.listings}</p>
              <div className="mt-4 pt-3 border-t border-white/10 flex justify-center gap-4 text-[9px] text-white/40">
                <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> Call</span>
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Message</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 bg-white/2 py-6 px-6 text-xs text-white/40 text-center relative z-10">
        &copy; {new Date().getFullYear()} Vista Luxury Realtors. All rights reserved.
      </footer>
      </div>
    </div>
  );
}
