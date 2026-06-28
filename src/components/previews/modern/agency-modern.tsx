"use client";

import React from 'react';
import { Template } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Monitor, 
  Layers, 
  ShieldCheck, 
  Menu, 
  X, 
} from 'lucide-react';

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}


const TESTIMONIALS = [
  {
    quote: "Chroma Studio is not a vendor; they are a growth accelerator. They created a custom SaaS dashboard and landing flow that doubled our platform registration conversion within 30 days.",
    author: "KATIA ALVAREZ",
    role: "MARKETING DIR, NOVA FINANCE",
    avatar: "KA"
  },
  {
    quote: "The speed and execution quality is unmatched. Having Jin Woo as our Next.js architect felt like having a direct line to Vercel's engineering core.",
    author: "LIAM GARRISON",
    role: "CTO, HYPER ATHLETICS",
    avatar: "LG"
  },
  {
    quote: "Our brand identity went from standard startup layout to award-winning digital interface. Our seed round closed in weeks thanks to their stunning design system.",
    author: "SOPHIE CHEN",
    role: "FOUNDER, COGNITIVE NEURAL",
    avatar: "SC"
  }
];

export function AgencyModern({ t }: { t: Template }) {
  const { primary } = t.colorScheme;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [billingPeriod, setBillingPeriod] = React.useState<'monthly' | 'annually'>('monthly');
  const [activeTestimonial, setActiveTestimonial] = React.useState(0);
  const safeIndex = activeTestimonial % TESTIMONIALS.length;
  const currentTestimonial = TESTIMONIALS[safeIndex] ?? TESTIMONIALS[0];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-full flex flex-col bg-neutral-950 text-white @container relative overflow-hidden">
      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden flex flex-col">
        {/* Header */}
        <header className="px-6 py-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-950/90 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-1.5 font-black text-sm tracking-wider">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            CHROMA STU.
          </div>
          
          <nav className="hidden @md:flex gap-6 text-[10px] uppercase font-bold tracking-widest text-neutral-400">
            <span className="hover:text-white cursor-pointer transition-colors">Work</span>
            <span className="hover:text-white cursor-pointer transition-colors">Capabilities</span>
            <span className="hover:text-white cursor-pointer transition-colors">Process</span>
            <span className="hover:text-white cursor-pointer transition-colors">Pricing</span>
          </nav>
          
          <div className="flex items-center gap-4">
            <button className="hidden @md:block text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 transition-colors">
              Start Project
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="block @md:hidden text-neutral-400 hover:text-white p-1 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm @md:hidden"
              />
              {/* Drawer Container */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 z-50 w-64 bg-neutral-950 border-l border-neutral-800 p-6 flex flex-col gap-6 @md:hidden shadow-2xl"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5 font-black text-sm tracking-wider">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    CHROMA STU.
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="text-neutral-400 hover:text-white transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="flex flex-col gap-6 text-xs uppercase font-bold tracking-widest text-neutral-400 mt-8">
                  <span className="hover:text-white cursor-pointer transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Work</span>
                  <span className="hover:text-white cursor-pointer transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Capabilities</span>
                  <span className="hover:text-white cursor-pointer transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Process</span>
                  <span className="hover:text-white cursor-pointer transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Pricing</span>
                </nav>
                <button 
                  className="mt-auto text-[10px] font-bold uppercase tracking-widest px-3 py-3 rounded-full border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 transition-colors w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Start Project
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section className="px-6 py-20 text-center max-w-4xl mx-auto flex flex-col items-center w-full">
          <div className="inline-flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-widest bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full mb-6">
            <Sparkles className="w-3.5 h-3.5 text-red-500 animate-pulse" /> Award Winning Digital Agency
          </div>
          <h1 className="text-4xl @md:text-6xl font-black tracking-tight leading-none mb-6">
            We construct <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
              fearless digital products.
            </span>
          </h1>
          <p className="text-xs text-neutral-400 max-w-md mb-8 leading-relaxed font-light">
            {t.description || "Chroma Studio combines custom UI/UX design, Next.js engineering, and organic growth strategies to launch market-defining brand experiences."}
          </p>
          <button 
            className="text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded-full text-white flex items-center gap-2 hover:opacity-90 transition-opacity mb-12 shadow-lg hover:scale-105 duration-200 transform" 
            style={{ background: primary }}
          >
            Explore Our Projects <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Hero Interactive Collage / Mockup */}
          <div className="w-full grid grid-cols-1 @md:grid-cols-3 gap-6 text-left mt-4">
            {/* Card 1: Interactive Brand Card */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden group shadow-lg"
            >
              <div className="absolute -right-12 -top-12 w-36 h-36 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all duration-300" />
              <div className="text-[9px] uppercase tracking-widest text-red-500 font-bold mb-4">Branding & Identity</div>
              <h3 className="text-xl font-bold mb-2 text-white">Vortex Core</h3>
              <p className="text-[11px] text-neutral-400 mb-6 leading-relaxed">Reimagining spatial computing identities for next-generation hardware platforms.</p>
              <div className="w-full h-32 rounded-lg bg-gradient-to-tr from-neutral-950 to-neutral-900 border border-neutral-800/80 flex items-center justify-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center text-white font-black text-lg shadow-lg group-hover:rotate-12 transition-transform duration-500">
                  V
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[8px] uppercase tracking-widest text-neutral-500">
                  <span>© 2026</span>
                  <span>Concept Alpha</span>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Live UI Widget */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden group shadow-lg"
            >
              <div className="absolute -right-12 -top-12 w-36 h-36 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all duration-300" />
              <div className="text-[9px] uppercase tracking-widest text-orange-500 font-bold mb-4">SaaS Engineering</div>
              <h3 className="text-xl font-bold mb-2 text-white">Metrics Engine</h3>
              <p className="text-[11px] text-neutral-400 mb-6 leading-relaxed">Custom real-time data visualizer with sub-millisecond query pipelines.</p>
              
              {/* Live Widget UI */}
              <div className="w-full h-32 rounded-lg bg-neutral-950 border border-neutral-800/80 p-3 flex flex-col justify-between">
                <div className="flex justify-between items-center text-[8px] text-neutral-400 uppercase tracking-widest">
                  <span>Uptime Rate</span>
                  <span className="text-green-500 font-bold">99.99%</span>
                </div>
                <div className="flex items-end gap-1.5 h-16 pt-2">
                  {[40, 65, 35, 80, 50, 95, 75, 110, 85].map((val, i) => (
                    <div key={i} className="flex-1 bg-neutral-800 rounded-t-sm relative group/bar" style={{ height: `${(val / 110) * 100}%` }}>
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: '100%' }}
                        transition={{ delay: i * 0.05, duration: 0.5 }}
                        className="absolute inset-0 bg-gradient-to-t from-orange-600 to-yellow-500 rounded-t-sm group-hover/bar:from-orange-500 group-hover/bar:to-yellow-400"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 3: Mobile Layout Collage */}
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-6 relative overflow-hidden group shadow-lg"
            >
              <div className="absolute -right-12 -top-12 w-36 h-36 bg-yellow-500/10 rounded-full blur-2xl group-hover:bg-yellow-500/20 transition-all duration-300" />
              <div className="text-[9px] uppercase tracking-widest text-yellow-500 font-bold mb-4">Web3 Ecosystem</div>
              <h3 className="text-xl font-bold mb-2 text-white">Aero Wallet</h3>
              <p className="text-[11px] text-neutral-400 mb-6 leading-relaxed">Biometric-secured multi-chain explorer optimized for mobile platforms.</p>
              
              <div className="w-full h-32 rounded-lg bg-gradient-to-br from-neutral-950 to-neutral-900 border border-neutral-800/80 flex items-center justify-center relative overflow-hidden">
                <div className="w-24 h-28 bg-neutral-900 rounded-t-lg border-t border-x border-neutral-800 p-2 flex flex-col gap-1.5 shadow-inner">
                  <div className="w-full h-4 bg-neutral-950 rounded flex justify-between items-center px-1">
                    <span className="text-[5px] text-neutral-600">Aero</span>
                    <span className="text-[5px] text-green-500 font-mono">$4,921</span>
                  </div>
                  <div className="h-0.5 w-full bg-neutral-800" />
                  <div className="flex gap-1">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-yellow-500 to-red-500 flex items-center justify-center text-[6px] text-black font-black">A</div>
                    <div className="flex-1 flex flex-col justify-center">
                      <span className="text-[5px] font-bold text-neutral-200">Avatar NFT</span>
                      <span className="text-[4px] text-neutral-500">Minted #804</span>
                    </div>
                  </div>
                  <div className="w-full h-12 bg-neutral-950 rounded border border-neutral-800/50 flex flex-col justify-center items-center gap-1">
                    <span className="text-[4px] text-neutral-600">TRANSACTION COMPLETED</span>
                    <span className="text-[6px] font-bold text-white tracking-widest font-mono">0x4F...79B2</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services Grid Section */}
        <section className="px-6 py-16 max-w-5xl mx-auto w-full border-t border-neutral-900">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">Core Capabilities</h2>
            <p className="text-2xl font-black tracking-tight text-white">
              We deliver end-to-end design & technology systems.
            </p>
          </div>
          <div className="grid grid-cols-1 @md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ y: -6, boxShadow: "0 10px 30px -10px rgba(220, 38, 38, 0.2)" }}
              className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-6 transition-all duration-300 hover:border-neutral-700 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 mb-4 border border-red-500/20">
                <Monitor className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Brand & Interface Design</h3>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                High-fidelity design languages, custom design systems, and award-winning user experiences engineered for spatial and interactive clarity.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -6, boxShadow: "0 10px 30px -10px rgba(239, 68, 68, 0.2)" }}
              className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-6 transition-all duration-300 hover:border-neutral-700 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-4 border border-orange-500/20">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Next.js & Cloud Architecture</h3>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                Scalable frontends powered by Next.js, static-site generation, robust edge computing, and complex database integrations.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -6, boxShadow: "0 10px 30px -10px rgba(234, 179, 8, 0.2)" }}
              className="bg-neutral-900/50 border border-neutral-800/80 rounded-2xl p-6 transition-all duration-300 hover:border-neutral-700 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 mb-4 border border-yellow-500/20">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">Optimization & SLA Support</h3>
              <p className="text-[11px] text-neutral-400 leading-relaxed font-light">
                Uncompromising security audits, load testing, performance tuning, and 24/7 dedicated support to guarantee maximum performance.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="px-6 py-16 max-w-5xl mx-auto w-full border-t border-neutral-900">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6">Recent Work</h2>
          <div className="grid grid-cols-1 @md:grid-cols-3 gap-6">
            {/* Case 1 */}
            <div className="group cursor-pointer">
              <div className="h-48 rounded-xl bg-neutral-900 border border-neutral-800 relative overflow-hidden flex items-center justify-center transition-all duration-300 hover:border-neutral-700">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 to-transparent" />
                <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">Fintech Platform</div>
              </div>
              <h3 className="text-sm font-bold mt-3 mb-1 group-hover:text-red-500 transition-colors">Nova Trade UI</h3>
              <p className="text-[10px] text-neutral-500">UX/UI Design & Frontend build</p>
            </div>
            {/* Case 2 */}
            <div className="group cursor-pointer">
              <div className="h-48 rounded-xl bg-neutral-900 border border-neutral-800 relative overflow-hidden flex items-center justify-center transition-all duration-300 hover:border-neutral-700">
                <div className="absolute inset-0 bg-gradient-to-bl from-red-900/30 to-transparent" />
                <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">Brand Portal</div>
              </div>
              <h3 className="text-sm font-bold mt-3 mb-1 group-hover:text-red-500 transition-colors">Hyper Athletics</h3>
              <p className="text-[10px] text-neutral-500">Global ecommerce re-design</p>
            </div>
            {/* Case 3 */}
            <div className="group cursor-pointer">
              <div className="h-48 rounded-xl bg-neutral-900 border border-neutral-800 relative overflow-hidden flex items-center justify-center transition-all duration-300 hover:border-neutral-700">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 to-transparent" />
                <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">AI Platform</div>
              </div>
              <h3 className="text-sm font-bold mt-3 mb-1 group-hover:text-red-500 transition-colors">Cognitive Neural</h3>
              <p className="text-[10px] text-neutral-500">WebGL landing page + dashboard</p>
            </div>
          </div>
        </section>

        {/* Agency Process Timeline Section */}
        <section className="px-6 py-16 bg-neutral-900/40 border-y border-neutral-900">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 text-center">How We Operate</h2>
            
            <div className="space-y-6">
              {[
                { step: "01", title: "Discovery & Strategy", desc: "We audit your existing products, analyze customer pain points, and define key technical milestones." },
                { step: "02", title: "Creative Interface Design", desc: "We design premium, brand-aligned high-fidelity Figma components that are tested for spatial usability." },
                { step: "03", title: "Next.js Production Coding", desc: "Our engineering squad codes clean, responsive, SEO-ready Next.js / TypeScript codebases." },
                { step: "04", title: "Launch & Growth Lifecycle", desc: "We launch with strict SLA guarantees, set up analytics charts, and monitor transaction pipelines." }
              ].map((p, idx) => (
                <div key={idx} className="flex gap-4 border-l-2 border-neutral-800 pl-4 relative hover:border-red-500 transition-colors group">
                  <span className="text-xs font-black text-red-500 font-mono mt-0.5">{p.step}</span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider group-hover:text-white transition-colors">{p.title}</h4>
                    <p className="text-[11px] text-neutral-400 mt-1">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Creative Team Showcase */}
        <section className="px-6 py-16 max-w-5xl mx-auto w-full">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 text-center">Chroma Talents</h2>
          
          <div className="grid grid-cols-2 @md:grid-cols-4 gap-6">
            {[
              { name: "Alara Thorne", title: "Lead UX Director", prev: "Ex-Frog Design" },
              { name: "Jin Woo Park", title: "VPE / Next.js Architect", prev: "Ex-Vercel Core" },
              { name: "Clara Vane", title: "Motion Specialist", prev: "Ex-Awwwards Judge" },
              { name: "Miles Davis", title: "Growth strategist", prev: "Ex-Linear advisor" }
            ].map((member, i) => (
              <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 text-center hover:border-neutral-700 transition-colors">
                <div className="w-12 h-12 rounded-full bg-neutral-800 mx-auto flex items-center justify-center font-black text-sm text-red-500 mb-3">
                  {member.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <h4 className="text-xs font-bold">{member.name}</h4>
                <p className="text-[8px] text-neutral-400 uppercase tracking-widest mt-1">{member.title}</p>
                <p className="text-[9px] text-neutral-500 mt-1 italic">{member.prev}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="px-6 py-16 bg-neutral-900/20 border-t border-neutral-900 w-full">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3">Simple Retainers</h2>
              <p className="text-2xl font-black tracking-tight text-white mb-6">
                Predictable pricing. Zero overhead.
              </p>
              
              {/* Billing Toggle */}
              <div className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-800 p-1 rounded-full">
                <button 
                  onClick={() => setBillingPeriod('monthly')}
                  className={`text-[9px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-full transition-all duration-200 ${billingPeriod === 'monthly' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                >
                  Monthly
                </button>
                <button 
                  onClick={() => setBillingPeriod('annually')}
                  className={`text-[9px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-full transition-all duration-200 ${billingPeriod === 'annually' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                >
                  Annually <span className="text-red-500 text-[8px] font-black ml-0.5">Save 20%</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 @md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Plan 1 */}
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-8 flex flex-col justify-between hover:border-neutral-700 transition-all duration-300 relative group">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400">Design Retainer</h3>
                      <p className="text-[10px] text-neutral-500 mt-1">Ongoing UX/UI & Brand requests</p>
                    </div>
                  </div>
                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">
                      ${billingPeriod === 'monthly' ? '4,999' : '3,999'}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">/ month</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {[
                      "One request at a time",
                      "Average 48-hour delivery",
                      "Unlimited UI revisions",
                      "Figma source files delivered",
                      "Dedicated Slack channel"
                    ].map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[11px] text-neutral-400">
                        <span className="w-1 h-1 bg-red-500 rounded-full" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="w-full text-[10px] font-bold uppercase tracking-widest py-3 rounded-full border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-white transition-colors">
                  Subscribe Now
                </button>
              </div>

              {/* Plan 2 */}
              <div className="bg-neutral-900/80 border-2 border-red-500/50 rounded-2xl p-8 flex flex-col justify-between hover:border-red-500 transition-all duration-300 relative group shadow-[0_0_30px_rgba(220,38,38,0.15)]">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                  Most Popular
                </div>
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-white">Product Squad</h3>
                      <p className="text-[10px] text-red-400 mt-1 font-bold">Design + Next.js Engineering</p>
                    </div>
                  </div>
                  <div className="mb-6 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">
                      ${billingPeriod === 'monthly' ? '8,999' : '7,499'}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">/ month</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {[
                      "Two active requests at a time",
                      "Dedicated designer + frontend dev",
                      "Next.js/TypeScript code ownership",
                      "Continuous deployment set up",
                      "Priority 24hr emergency SLA"
                    ].map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[11px] text-neutral-200 font-medium">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <button 
                  className="w-full text-[10px] font-bold uppercase tracking-widest py-3 rounded-full text-white transition-colors"
                  style={{ background: primary }}
                >
                  Secure Retainer
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-neutral-900/60 border-t border-neutral-900 w-full relative overflow-hidden">
          <div className="max-w-3xl mx-auto px-6 text-center flex flex-col items-center min-h-[220px] justify-center">
            <div className="text-red-500 text-3xl font-serif mb-4">&ldquo;</div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                <p className="text-sm @md:text-base italic text-neutral-200 leading-relaxed font-light mb-6 px-4">
                  {currentTestimonial.quote}
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-[10px] font-black text-red-500">
                    {currentTestimonial.avatar}
                  </div>
                  <div className="text-left">
                    <span className="text-[9px] tracking-widest uppercase font-bold text-white block">
                      {currentTestimonial.author}
                    </span>
                    <span className="text-[8px] tracking-widest uppercase text-neutral-500 block mt-0.5">
                      {currentTestimonial.role}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide Navigation Dots */}
            <div className="flex gap-2 mt-8">
              {TESTIMONIALS.map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeTestimonial === i ? 'w-4 bg-red-500' : 'bg-neutral-700 hover:bg-neutral-500'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t border-neutral-900 bg-neutral-950/80 pt-16 pb-8 px-6 w-full text-[11px] text-neutral-500 tracking-wide">
          <div className="max-w-5xl mx-auto grid grid-cols-1 @md:grid-cols-4 gap-8 mb-12 text-left">
            {/* Column 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 font-black text-sm tracking-wider text-white">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                CHROMA STU.
              </div>
              <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">FEARLESS DIGITAL PRODUCTS</p>
              <p className="text-neutral-500 leading-relaxed max-w-[200px]">
                Combining premium user experience design with high-performance Next.js engineering.
              </p>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">Capabilities</h4>
              <ul className="space-y-2.5">
                <li className="hover:text-white transition-colors cursor-pointer">Brand Identity</li>
                <li className="hover:text-white transition-colors cursor-pointer">UI/UX Design Systems</li>
                <li className="hover:text-white transition-colors cursor-pointer">Next.js Development</li>
                <li className="hover:text-white transition-colors cursor-pointer">Conversion Optimization</li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">Directory</h4>
              <ul className="space-y-2.5">
                <li className="hover:text-white transition-colors cursor-pointer">Recent Work</li>
                <li className="hover:text-white transition-colors cursor-pointer">Operational Process</li>
                <li className="hover:text-white transition-colors cursor-pointer">Talent Directory</li>
                <li className="hover:text-white transition-colors cursor-pointer">Pricing Retainers</li>
              </ul>
            </div>

            {/* Column 4 */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-neutral-300">Connect</h4>
              <p className="text-neutral-500 leading-relaxed">
                Get in touch to scope your custom enterprise digital product.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-neutral-400 hover:text-white transition-colors" aria-label="Twitter">
                  <TwitterIcon className="w-4 h-4" />
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors" aria-label="LinkedIn">
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors" aria-label="GitHub">
                  <GitHubIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto border-t border-neutral-900 pt-8 flex flex-col @md:flex-row justify-between items-center gap-4 text-center @md:text-left text-[9px] uppercase tracking-widest text-neutral-600">
            <div>
              &copy; {new Date().getFullYear()} CHROMA AGENCY STUDIO. ALL RIGHTS RESERVED.
            </div>
            <div className="flex gap-4">
              <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-neutral-400 cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
