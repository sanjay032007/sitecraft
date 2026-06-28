"use client";

import React, { useState } from 'react';
import { Template } from '@/lib/data';
import { 
  ArrowDown, 
  Mail, 
  ArrowUpRight, 
  Palette, 
  Layers, 
  Eye, 
  CheckCircle2 
} from 'lucide-react';

export function PortfolioGlass({ t }: { t: Template }) {
  const { primary } = t.colorScheme;
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="@container w-full h-full relative overflow-hidden bg-[#0d0218] text-white">
      {/* Dynamic Background Glows */}
      <div 
        className="absolute top-[20%] left-[-20%] w-[60%] h-[60%] rounded-full filter blur-[100px] opacity-40 animate-pulse" 
        style={{ background: `radial-gradient(circle, ${primary || '#a855f7'} 0%, transparent 70%)` }}
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full filter blur-[100px] opacity-35" 
        style={{ background: 'radial-gradient(circle, #ec4899 0%, transparent 70%)' }}
      />

      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden scrollbar-none pointer-events-auto">
        
        {/* Floating Glass Navbar */}
        <header className="sticky top-4 z-50 flex items-center justify-between mx-6 my-4 px-6 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg">
          <div className="font-bold text-sm tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">MK. STUDIO</div>
          <nav className="hidden @md:flex gap-6 text-[10px] uppercase tracking-widest font-semibold text-white/50">
            <a href="#projects" className="hover:text-white cursor-pointer transition-colors">Projects</a>
            <a href="#services" className="hover:text-white cursor-pointer transition-colors">Philosophy</a>
            <a href="#pricing" className="hover:text-white cursor-pointer transition-colors">Retainers</a>
          </nav>
          <a href="#contact" className="text-[10px] uppercase tracking-widest font-bold border border-white/20 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white/80 hover:text-white">
            Let&apos;s Talk
          </a>
        </header>

        {/* Hero Section */}
        <section className="px-6 py-20 flex flex-col justify-center max-w-4xl mx-auto w-full relative z-10 text-center @md:text-left">
          <h1 className="text-4xl @md:text-6xl font-light tracking-tight leading-none mb-6 text-balance bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60">
            Designing minimal digital <span className="italic opacity-60">masterpieces</span>.
          </h1>
          <p className="text-sm text-white/60 max-w-md mb-8 leading-relaxed font-light mx-auto @md:mx-0">
            {t.description || "Vivid glassmorphism creative portfolio with mesh gradients and translucent project panels showing bold editorial layouts."}
          </p>
          <a href="#projects" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white/50 hover:text-white transition-colors mx-auto @md:mx-0">
            Scroll to view projects <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </section>

        {/* Services / Philosophy Section */}
        <section id="services" className="px-6 py-16 max-w-5xl mx-auto w-full relative z-10 border-t border-white/5">
          <div className="grid grid-cols-1 @md:grid-cols-3 gap-8">
            <div className="border border-white/10 bg-white/5 backdrop-blur-xl p-6 rounded-2xl hover:border-white/20 transition-all shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
                <Palette className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">Interaction Design</h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                High-fidelity user interface prototyping centered on physics-based spatial micro-motions.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 backdrop-blur-xl p-6 rounded-2xl hover:border-white/20 transition-all shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">Next.js Production</h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Pixel-perfect Next.js code structures built with TypeScript, absolute layout hygiene, and SEO performance.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 backdrop-blur-xl p-6 rounded-2xl hover:border-white/20 transition-all shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">Art Direction</h3>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                Unified branding strategies encompassing raw typography hierarchies, photography filters, and assets.
              </p>
            </div>
          </div>
        </section>

        {/* Masonry / Bento Portfolio Grid */}
        <section id="projects" className="px-6 py-10 max-w-5xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 @md:grid-cols-2 gap-8">
            
            <div className="flex flex-col gap-6">
              {/* Project 1 */}
              <div className="group cursor-pointer">
                <div className="h-72 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-2xl flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  <div className="text-[10px] uppercase font-bold tracking-widest text-white/60 bg-white/10 border border-white/25 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md">
                    Identity Design
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">Aura Branding Project</h3>
                    <p className="text-[10px] text-white/45 mt-0.5">Visual Identity, Packaging</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/45 group-hover:text-white transition-colors" />
                </div>
              </div>

              {/* Project 2 */}
              <div className="group cursor-pointer">
                <div className="h-56 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-2xl flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-blue-500/20" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  <div className="text-[10px] uppercase font-bold tracking-widest text-white/60 bg-white/10 border border-white/25 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md">
                    Mobile UI
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">Kinetics Exercise App</h3>
                    <p className="text-[10px] text-white/45 mt-0.5">App Design, Interaction</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/45 group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 @md:pt-12">
              {/* Project 3 */}
              <div className="group cursor-pointer">
                <div className="h-56 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-2xl flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-bl from-pink-500/20 to-teal-500/10" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  <div className="text-[10px] uppercase font-bold tracking-widest text-white/60 bg-white/10 border border-white/25 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md">
                    E-Commerce
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">Loom Premium Apparel</h3>
                    <p className="text-[10px] text-white/45 mt-0.5">Digital Storefront Design</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/45 group-hover:text-white transition-colors" />
                </div>
              </div>

              {/* Project 4 */}
              <div className="group cursor-pointer">
                <div className="h-72 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-2xl flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-indigo-500/20" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  <div className="text-[10px] uppercase font-bold tracking-widest text-white/60 bg-white/10 border border-white/25 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md">
                    Editorial Web
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div>
                    <h3 className="text-sm font-bold text-white">Chroma Journal</h3>
                    <p className="text-[10px] text-white/45 mt-0.5">Creative Blog Platform</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/45 group-hover:text-white transition-colors" />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Retainer Pricing Section */}
        <section id="pricing" className="px-6 py-20 max-w-5xl mx-auto w-full relative z-10 border-t border-white/5">
          <div className="text-center mb-12">
            <h2 className="text-2xl @md:text-3xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              Creative Retainer Schemes
            </h2>
            <p className="text-xs text-white/50 max-w-sm mx-auto mb-8">
              Predictable agency capacity allocated to your product roadmap.
            </p>

            {/* Toggle Billing */}
            <div className="flex justify-center items-center gap-3">
              <span className={`text-[10px] font-bold ${!isAnnual ? 'text-white' : 'text-white/40'}`}>Monthly Retainer</span>
              <button 
                className="w-10 h-6 rounded-full bg-white/10 relative p-1 transition-colors border border-white/10"
                onClick={() => setIsAnnual(!isAnnual)}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isAnnual ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
              <span className={`text-[10px] font-bold ${isAnnual ? 'text-purple-400' : 'text-white/40'} flex items-center gap-1`}>
                Annual Retainer <span className="text-[8px] border border-purple-500/30 bg-purple-900/40 text-purple-300 px-1.5 py-0.5 rounded-full font-bold">Save 20%</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 @md:grid-cols-3 gap-8 text-left">
            {/* Consultation Sprint */}
            <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-white/20 transition-all">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Consultation Sprint</h3>
                <p className="text-[10px] text-white/50 mt-1">Audit UI architecture & visual debt.</p>
                <div className="my-6">
                  <span className="text-2xl font-black">${isAnnual ? '1599' : '1999'}</span>
                  <span className="text-[10px] text-white/50"> / project</span>
                </div>
                <ul className="text-[10px] space-y-3 mb-8 text-white/70 border-t border-white/10 pt-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Full UX Usability Audit</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Visual System Audit Report</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> 1-on-1 Engineering Debrief</li>
                </ul>
              </div>
              <button className="w-full text-[10px] font-bold uppercase tracking-widest py-3 border border-white/15 bg-white/5 hover:bg-white/10 rounded-xl text-white text-center transition-colors">
                Book Sprint
              </button>
            </div>

            {/* Product Design Retainer (Highlighted) */}
            <div className="border border-purple-500 bg-white/10 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between relative shadow-[0_8px_32px_0_rgba(168,85,247,0.15)] hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] transition-all">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] font-extrabold uppercase bg-purple-600 text-white px-2.5 py-1 rounded-full tracking-widest shadow-md">
                Active Tier
              </span>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Product Design</h3>
                <p className="text-[10px] text-white/50 mt-1">Ongoing product UI design cycles.</p>
                <div className="my-6">
                  <span className="text-2xl font-black">${isAnnual ? '3999' : '4999'}</span>
                  <span className="text-[10px] text-white/50"> / month</span>
                </div>
                <ul className="text-[10px] space-y-3 mb-8 text-white/70 border-t border-white/10 pt-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Dedicated UX Designer</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Figma Component Systems</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Weekly Design Review Syncs</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Slack Channel Co-working</li>
                </ul>
              </div>
              <button className="w-full text-[10px] font-bold uppercase tracking-widest py-3 rounded-xl text-white text-center border border-white/20 bg-purple-600 hover:bg-purple-500 transition-colors shadow-lg shadow-purple-500/25">
                Acquire Retainer
              </button>
            </div>

            {/* Full Stack Production */}
            <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-white/20 transition-all">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Full Stack Build</h3>
                <p className="text-[10px] text-white/50 mt-1">Dedicated design + Next.js build.</p>
                <div className="my-6">
                  <span className="text-2xl font-black">${isAnnual ? '7999' : '9999'}</span>
                  <span className="text-[10px] text-white/50"> / month</span>
                </div>
                <ul className="text-[10px] space-y-3 mb-8 text-white/70 border-t border-white/10 pt-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> UX Design + Next.js Coding</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Dedicated Frontend Architect</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> CI/CD Edge Deployment Setup</li>
                </ul>
              </div>
              <button className="w-full text-[10px] font-bold uppercase tracking-widest py-3 border border-white/15 bg-white/5 hover:bg-white/10 rounded-xl text-white text-center transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-6 py-20 border-t border-white/5 bg-white/2 backdrop-blur-md relative z-10">
          <div className="max-w-5xl mx-auto w-full">
            <h2 className="text-[10px] uppercase tracking-widest font-bold text-white/30 text-center mb-12">Client Appraisals</h2>
            <div className="grid grid-cols-1 @md:grid-cols-2 gap-8 text-left">
              <div className="border border-white/10 bg-white/5 backdrop-blur-xl p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-white/20 transition-all">
                <p className="text-xs text-white/80 leading-relaxed italic">
                  &ldquo;MK. Studio brought a rare sense of clarity and modern editorial restraint to our digital presence. They didn&apos;t just build a website; they structured our brand vision.&rdquo;
                </p>
                <div className="mt-4 text-[9px] uppercase tracking-widest font-bold text-white/50 border-t border-white/10 pt-4">
                  — HECTOR VALES, DESIGN DIRECTOR AT AURA
                </div>
              </div>

              <div className="border border-white/10 bg-white/5 backdrop-blur-xl p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-white/20 transition-all">
                <p className="text-xs text-white/80 leading-relaxed italic">
                  &ldquo;Their Next.js structure and Figma precision cut our engineering integration timeline in half. An absolute masterpiece of digital execution.&rdquo;
                </p>
                <div className="mt-4 text-[9px] uppercase tracking-widest font-bold text-white/50 border-t border-white/10 pt-4">
                  — CARLA VANCE, CTO AT LOOM APPAREL
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="px-6 py-20 max-w-3xl mx-auto w-full relative z-10">
          <div className="border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.01] backdrop-blur-xl p-8 @md:p-12 rounded-3xl shadow-xl text-center flex flex-col items-center">
            <h2 className="text-2xl font-light mb-4">Let&apos;s craft something memorable.</h2>
            <p className="text-xs text-white/60 mb-8 max-w-sm leading-relaxed font-light">
              Currently taking selective commissions for Q3/Q4 projects. Get in touch to discuss your ideas.
            </p>
            <a href="mailto:hello@mkstudio.com" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xl border border-white/25 bg-white/5 hover:bg-white/15 transition-all backdrop-blur-md">
              <Mail className="w-4 h-4 text-purple-400" /> hello@mkstudio.com
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-8 border-t border-white/10 text-center text-[10px] tracking-widest uppercase text-white/30 mt-auto relative z-10">
          &copy; {new Date().getFullYear()} MK. Studio. Built with Restraint.
        </footer>

      </div>
    </div>
  );
}
