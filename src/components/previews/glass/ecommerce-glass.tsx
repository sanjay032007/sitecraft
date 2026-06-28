"use client";

import React, { useState } from 'react';
import { Template } from '@/lib/data';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, ShieldCheck, Truck, RefreshCw, Eye } from 'lucide-react';

export function EcommerceGlass({ t }: { t: Template }) {
  const { primary, bg, text, secondary } = t.colorScheme;
  const [cartCount, setCartCount] = useState(0);

  const products = [
    { id: 1, name: "Studio Reference Headphones", price: 199, rating: 4.8, category: "Audio", tag: "Hot" },
    { id: 2, name: "Minimalist Mechanical Keyboard", price: 149, rating: 4.7, category: "Tech", tag: "New" },
    { id: 3, name: "Aluminum Laptop Stand", price: 59, rating: 4.9, category: "Office", tag: "" },
    { id: 4, name: "MagSafe Charging Desk Mat", price: 89, rating: 4.5, category: "Tech", tag: "Sale" }
  ];

  return (
    <div className="@container w-full h-full min-h-full flex flex-col bg-[#080808] text-white relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full mix-blend-screen filter blur-[80px] opacity-25" style={{ background: '#d97706' }}></div>
      <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] rounded-full mix-blend-screen filter blur-[80px] opacity-15" style={{ background: '#f59e0b' }}></div>

      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden scrollbar-none pointer-events-auto">
      {/* Shop Header */}
      <header className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-[#080808]/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-amber-500" />
          <span className="font-bold text-sm tracking-tight text-white/90">Luxe Store</span>
        </div>
        <div className="flex gap-4 text-[10px] uppercase tracking-wider font-bold text-white/55">
          <span className="hover:text-white cursor-pointer">New Arrivals</span>
          <span className="hover:text-white cursor-pointer">Collections</span>
          <span className="hover:text-white cursor-pointer">Deals</span>
        </div>
        <button 
          className="relative text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center gap-2"
          onClick={() => setCartCount(c => c + 1)}
        >
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center text-[8px] font-black text-black">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {/* Hero Banner Promo */}
      <section className="px-6 py-14 border-b border-white/5 flex flex-col @md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="max-w-md">
          <span className="text-[8px] font-extrabold uppercase border border-amber-500/30 bg-amber-500/10 text-amber-400 px-2.5 py-0.5 rounded-full mb-3 inline-block">
            Limited Summer Offer
          </span>
          <h1 className="text-2xl @md:text-4xl font-extrabold tracking-tight leading-tight mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
            Enhance your creative desk setup.
          </h1>
          <p className="text-xs text-white/60 mb-6 leading-relaxed">
            {t.description || "Vista Minimalist E-Commerce offers a catalog of premium mechanical keyboards, reference audio monitors, and ergonomic setups with 2-day delivery."}
          </p>
          <button className="text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg border border-amber-500 bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 transition-all">
            Shop Collection
          </button>
        </div>
        
        {/* Abstract promo visual */}
        <div className="w-full @md:w-64 h-44 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-4 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-[8px] font-bold uppercase border border-white/10 bg-white/5 text-white/55 px-2 py-0.5 rounded">Tech Collection</span>
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          </div>
          <div className="my-2 text-center font-bold text-sm text-white/95">luxe.kbd // mechanical</div>
          <div className="flex justify-between items-center border-t border-white/10 pt-2 mt-2">
            <span className="text-xs font-black text-amber-400">$149.00</span>
            <span className="text-[8px] text-white/45">Add to Cart</span>
          </div>
        </div>
      </section>

      {/* Featured Collections Category Cards */}
      <section className="px-6 py-10 max-w-5xl mx-auto w-full relative z-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-white/45 mb-4 text-center">Featured Collections</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          {["Desk Accessories", "Premium Audio", "Mechanical Gear"].map((cat, i) => (
            <div key={i} className="p-4 border border-white/10 bg-white/5 backdrop-blur-xl rounded-xl hover:border-white/20 transition-all cursor-pointer">
              <div className="text-[11px] font-bold text-white/80">{cat}</div>
              <span className="text-[8px] text-amber-400 mt-1 uppercase font-bold inline-block hover:underline">Shop Category</span>
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 py-10 max-w-5xl mx-auto w-full relative z-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-white/45 mb-6 text-center">Desk Essentials</h2>
        
        <div className="grid grid-cols-2 @md:grid-cols-4 gap-6">
          {products.map((prod) => (
            <div key={prod.id} className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-xl p-3 flex flex-col justify-between hover:border-white/20 transition-all relative">
              {prod.tag && (
                <span className="absolute top-2 left-2 text-[7px] font-extrabold uppercase bg-amber-500 text-black px-2 py-0.5 rounded z-10">
                  {prod.tag}
                </span>
              )}
              
              <div className="h-32 bg-white/5 rounded-lg flex items-center justify-center relative group overflow-hidden mb-3">
                <ShoppingBag className="w-8 h-8 text-white/20 group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button 
                    className="p-1.5 bg-white/10 rounded-full text-white hover:bg-white/20 border border-white/15"
                    onClick={() => setCartCount(c => c + 1)}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 bg-white/10 rounded-full text-white hover:bg-white/20 border border-white/15">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[8px] font-bold text-white/40 uppercase">{prod.category}</span>
                <h4 className="text-[11px] font-bold text-white/90 line-clamp-1 mt-0.5">{prod.name}</h4>
                
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-[9px] font-bold text-white/60">{prod.rating}</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-white/10 pt-2.5 mt-3">
                <span className="text-xs font-black text-amber-400">${prod.price}</span>
                <button 
                  className="text-[8px] font-bold uppercase tracking-wider border border-amber-500/20 bg-amber-500/10 text-amber-400 px-2 py-1 rounded hover:bg-amber-500/20 transition-all"
                  onClick={() => setCartCount(c => c + 1)}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shopping benefits */}
      <section className="py-8 border-t border-b border-white/5 bg-white/2 relative z-10">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 @md:grid-cols-3 gap-6 text-center text-white/70">
          <div className="flex flex-col items-center">
            <Truck className="w-5 h-5 text-amber-500 mb-2" />
            <h4 className="text-xs font-bold text-white">Free Shipping Worldwide</h4>
            <p className="text-[10px] text-white/45 mt-1">Enjoy complimentary express delivery on orders over $150.</p>
          </div>
          <div className="flex flex-col items-center">
            <RefreshCw className="w-5 h-5 text-amber-500 mb-2" />
            <h4 className="text-xs font-bold text-white">30-Day Free Returns</h4>
            <p className="text-[10px] text-white/45 mt-1">Send it back within 30 days for a full hassle-free refund.</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-5 h-5 text-amber-500 mb-2" />
            <h4 className="text-xs font-bold text-white">2-Year Solid Warranty</h4>
            <p className="text-[10px] text-white/45 mt-1">Full replacement warranty covers any mechanical failure.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 bg-white/2 py-6 px-6 text-xs text-white/40 text-center relative z-10">
        &copy; {new Date().getFullYear()} Vista Luxe E-Commerce. All rights reserved.
      </footer>
      </div>
    </div>
  );
}
