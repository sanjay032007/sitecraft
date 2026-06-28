"use client";

import React from 'react';
import { Template } from '@/lib/data';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, ArrowUpRight } from 'lucide-react';

export function PortfolioModern({ t }: { t: Template }) {
  const { primary, bg, text, secondary } = t.colorScheme;

  return (
    <div className="min-h-full flex flex-col relative @container overflow-hidden" style={{ background: bg, color: text }}>
      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden">
      {/* Header */}
      <header className="px-6 py-6 border-b flex justify-between items-center" style={{ borderColor: secondary }}>
        <div className="font-bold text-lg tracking-tighter" style={{ color: primary }}>MK. STUDIO</div>
        <div className="flex gap-4 text-[10px] uppercase tracking-widest font-medium opacity-60">
          <span className="hover:opacity-100 cursor-pointer">Projects</span>
          <span className="hover:opacity-100 cursor-pointer">Philosophy</span>
          <span className="hover:opacity-100 cursor-pointer">About</span>
        </div>
        <a href="#contact" className="text-[10px] uppercase tracking-widest font-bold border-b pb-0.5" style={{ borderColor: primary }}>
          Let&apos;s Talk
        </a>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full">
        <h1 className="text-4xl @md:text-6xl font-light tracking-tight leading-none mb-6 text-balance">
          Designing minimal digital <span className="italic opacity-60">masterpieces</span>.
        </h1>
        <p className="text-sm opacity-70 max-w-md mb-8 leading-relaxed">
          {t.description || "Minimalist creative portfolio with editorial typography, showcasing interactive brand experiences and clean product interfaces."}
        </p>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-60 cursor-pointer">
          Scroll to view projects <ArrowDown className="w-3.5 h-3.5" />
        </div>
      </section>

      {/* Masonry / Bento Portfolio Grid */}
      <section className="px-6 py-10 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 @md:grid-cols-2 gap-8">
          
          <div className="flex flex-col gap-6">
            {/* Project 1 */}
            <div className="group cursor-pointer">
              <div className="h-72 rounded-xl bg-neutral-100 relative overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:shadow-lg flex items-center justify-center">
                {/* Visual mesh representation */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-200/50 to-orange-100/50" ></div>
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" ></div>
                <div className="text-[10px] uppercase font-bold tracking-widest opacity-35 bg-white px-3 py-1.5 rounded-full shadow-sm">
                  Identity Design
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div>
                  <h3 className="text-sm font-bold">Aura Branding Project</h3>
                  <p className="text-[10px] text-neutral-400 mt-0.5">Visual Identity, Packaging</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors" />
              </div>
            </div>

            {/* Project 2 */}
            <div className="group cursor-pointer">
              <div className="h-56 rounded-xl bg-neutral-100 relative overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:shadow-lg flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/40 to-blue-200/40" ></div>
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" ></div>
                <div className="text-[10px] uppercase font-bold tracking-widest opacity-35 bg-white px-3 py-1.5 rounded-full shadow-sm">
                  Mobile UI
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div>
                  <h3 className="text-sm font-bold">Kinetics Exercise App</h3>
                  <p className="text-[10px] text-neutral-400 mt-0.5">App Design, Interaction</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 @md:pt-12">
            {/* Project 3 */}
            <div className="group cursor-pointer">
              <div className="h-56 rounded-xl bg-neutral-100 relative overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:shadow-lg flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-bl from-pink-200/40 to-teal-100/40" ></div>
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" ></div>
                <div className="text-[10px] uppercase font-bold tracking-widest opacity-35 bg-white px-3 py-1.5 rounded-full shadow-sm">
                  E-Commerce
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div>
                  <h3 className="text-sm font-bold">Loom Premium Apparel</h3>
                  <p className="text-[10px] text-neutral-400 mt-0.5">Digital Storefront Design</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors" />
              </div>
            </div>

            {/* Project 4 */}
            <div className="group cursor-pointer">
              <div className="h-72 rounded-xl bg-neutral-100 relative overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:shadow-lg flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100/50 to-indigo-100/50" ></div>
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" ></div>
                <div className="text-[10px] uppercase font-bold tracking-widest opacity-35 bg-white px-3 py-1.5 rounded-full shadow-sm">
                  Editorial Web
                </div>
              </div>
              <div className="flex justify-between items-center mt-3">
                <div>
                  <h3 className="text-sm font-bold">Chroma Journal</h3>
                  <p className="text-[10px] text-neutral-400 mt-0.5">Creative Blog Platform</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Testimonial Quote */}
      <section className="px-6 py-16 bg-neutral-50 border-y" style={{ borderColor: secondary }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg @md:text-xl font-normal leading-relaxed italic text-neutral-700">
            &ldquo;MK. Studio brought a rare sense of clarity and modern editorial restraint to our digital presence. They didn&apos;t just build a website; they structured our brand vision.&rdquo;
          </p>
          <div className="mt-4 text-[10px] uppercase tracking-widest font-bold opacity-60">
            — HECTOR VALES, DESIGN DIRECTOR AT AURA
          </div>
        </div>
      </section>

      {/* Minimalist Contact Section */}
      <section id="contact" className="px-6 py-20 text-center max-w-xl mx-auto flex flex-col items-center">
        <h2 className="text-2xl font-light mb-4">Let&apos;s craft something memorable.</h2>
        <p className="text-xs opacity-70 mb-8 max-w-sm leading-relaxed">
          Currently taking selective commissions for Q3/Q4 projects. Get in touch to discuss your ideas.
        </p>
        <a href="mailto:hello@mkstudio.com" className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full border border-black hover:bg-black hover:text-white transition-colors">
          <Mail className="w-4 h-4" /> hello@mkstudio.com
        </a>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t text-center text-[10px] tracking-widest uppercase opacity-45 mt-auto" style={{ borderColor: secondary }}>
        &copy; {new Date().getFullYear()} MK. Studio. Built with Restraint.
      </footer>
      </div>
    </div>
  );
}
