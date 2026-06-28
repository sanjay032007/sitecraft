"use client";

import React, { useState } from 'react';
import { Template } from '@/lib/data';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, ShieldCheck, Truck, RefreshCw, Eye } from 'lucide-react';

export function EcommerceModern({ t }: { t: Template }) {
  const { primary, bg, text, secondary } = t.colorScheme;
  const [cartCount, setCartCount] = useState(0);

  const products = [
    { id: 1, name: "Studio Reference Headphones", price: 199, rating: 4.8, category: "Audio", tag: "Hot" },
    { id: 2, name: "Minimalist Mechanical Keyboard", price: 149, rating: 4.7, category: "Tech", tag: "New" },
    { id: 3, name: "Aluminum Laptop Stand", price: 59, rating: 4.9, category: "Office", tag: "" },
    { id: 4, name: "MagSafe Charging Desk Mat", price: 89, rating: 4.5, category: "Tech", tag: "Sale" }
  ];

  return (
    <div className="min-h-full flex flex-col bg-white @container relative overflow-hidden" style={{ color: text }}>
      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden">
      {/* Shop Header */}
      <header className="px-6 py-4 border-b flex justify-between items-center bg-white sticky top-0 z-50" style={{ borderColor: secondary }}>
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-emerald-600" />
          <span className="font-bold text-sm tracking-tight">VISTA SHOP</span>
        </div>
        <div className="flex gap-4 text-[10px] uppercase tracking-wider font-bold opacity-60">
          <span className="hover:opacity-100 cursor-pointer">New Arrivals</span>
          <span className="hover:opacity-100 cursor-pointer">Collections</span>
          <span className="hover:opacity-100 cursor-pointer">Deals</span>
        </div>
        <button 
          className="relative text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border bg-neutral-950 text-white flex items-center gap-2 hover:bg-neutral-800 transition-colors"
          onClick={() => setCartCount(c => c + 1)}
        >
          Cart
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-[8px] font-black text-white">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {/* Hero Banner Promo */}
      <section className="px-6 py-14 bg-emerald-50 border-b flex flex-col @md:flex-row items-center justify-between gap-6" style={{ borderColor: secondary }}>
        <div className="max-w-md">
          <span className="text-[8px] font-extrabold uppercase bg-emerald-600 text-white px-2 py-0.5 rounded-full mb-3 inline-block">
            Limited Summer Offer
          </span>
          <h1 className="text-2xl @md:text-4xl font-extrabold tracking-tight leading-tight mb-3">
            Enhance your creative desk setup.
          </h1>
          <p className="text-xs text-slate-500 mb-6 leading-relaxed">
            {t.description || "Vista Minimalist E-Commerce offers a catalog of premium mechanical keyboards, reference audio monitors, and ergonomic setups with 2-day delivery."}
          </p>
          <button className="text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg text-white" style={{ background: primary }}>
            Shop Collection
          </button>
        </div>
        
        {/* Abstract promo visual */}
        <div className="w-full @md:w-64 h-44 rounded-2xl bg-white border shadow-sm p-4 flex flex-col justify-between" style={{ borderColor: secondary }}>
          <div className="flex justify-between items-center">
            <span className="text-[8px] font-bold uppercase bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded">Tech Collection</span>
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          </div>
          <div className="my-2 text-center font-bold text-sm">vista.kbd // mechanical</div>
          <div className="flex justify-between items-center border-t pt-2 mt-2" style={{ borderColor: secondary }}>
            <span className="text-xs font-black text-emerald-600">$149.00</span>
            <span className="text-[8px] text-slate-400">Add to Cart</span>
          </div>
        </div>
      </section>

      {/* Featured Collections Category Cards */}
      <section className="px-6 py-10 max-w-5xl mx-auto w-full">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 text-center">Featured Collections</h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          {["Desk Accessories", "Premium Audio", "Mechanical Gear"].map((cat, i) => (
            <div key={i} className="p-4 border rounded-xl hover:shadow-sm cursor-pointer hover:border-neutral-400 transition-all" style={{ borderColor: secondary }}>
              <div className="text-[11px] font-bold text-neutral-800">{cat}</div>
              <span className="text-[8px] text-slate-400 mt-1 uppercase font-bold inline-block hover:underline">Shop Category</span>
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-6 py-10 max-w-5xl mx-auto w-full">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 text-center">Desk Essentials</h2>
        
        <div className="grid grid-cols-2 @md:grid-cols-4 gap-6">
          {products.map((prod) => (
            <div key={prod.id} className="border rounded-xl p-3 flex flex-col justify-between hover:shadow-md transition-shadow relative" style={{ borderColor: secondary }}>
              {prod.tag && (
                <span className="absolute top-2 left-2 text-[7px] font-extrabold uppercase bg-red-500 text-white px-2 py-0.5 rounded-full z-10">
                  {prod.tag}
                </span>
              )}
              
              <div className="h-32 bg-slate-50 rounded-lg flex items-center justify-center relative group overflow-hidden mb-3">
                <ShoppingBag className="w-8 h-8 text-slate-300 group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-neutral-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button 
                    className="p-1.5 bg-white rounded-full text-slate-800 hover:text-black shadow-sm"
                    onClick={() => setCartCount(c => c + 1)}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 bg-white rounded-full text-slate-800 hover:text-black shadow-sm">
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <span className="text-[8px] font-bold text-slate-400 uppercase">{prod.category}</span>
                <h4 className="text-[11px] font-bold text-neutral-800 line-clamp-1 mt-0.5">{prod.name}</h4>
                
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-[9px] font-bold text-slate-600">{prod.rating}</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-t pt-2.5 mt-3" style={{ borderColor: secondary }}>
                <span className="text-xs font-black text-emerald-600">${prod.price}</span>
                <button 
                  className="text-[8px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 px-2 py-1 rounded hover:bg-emerald-100 transition-colors"
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
      <section className="py-8 bg-slate-50 border-t border-b" style={{ borderColor: secondary }}>
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 @md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <Truck className="w-5 h-5 text-emerald-600 mb-2" />
            <h4 className="text-xs font-bold">Free Shipping Worldwide</h4>
            <p className="text-[10px] text-slate-400 mt-1">Enjoy complimentary express delivery on orders over $150.</p>
          </div>
          <div className="flex flex-col items-center">
            <RefreshCw className="w-5 h-5 text-emerald-600 mb-2" />
            <h4 className="text-xs font-bold">30-Day Free Returns</h4>
            <p className="text-[10px] text-slate-400 mt-1">Send it back within 30 days for a full hassle-free refund.</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-5 h-5 text-emerald-600 mb-2" />
            <h4 className="text-xs font-bold">2-Year Solid Warranty</h4>
            <p className="text-[10px] text-slate-400 mt-1">Full replacement warranty covers any mechanical failure.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t bg-slate-100 py-6 px-6 text-xs text-slate-400 text-center" style={{ borderColor: secondary }}>
        &copy; {new Date().getFullYear()} Vista Minimalist Commerce. All rights reserved.
      </footer>
      </div>
    </div>
  );
}
