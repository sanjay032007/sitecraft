"use client";

import React, { useState } from 'react';
import { Template } from '@/lib/data';
import { 
  Building2, 
  Cpu, 
  Activity, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export function BusinessGlass({ t }: { t: Template }) {
  const { primary, secondary, accent } = t.colorScheme;
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="@container w-full h-full relative overflow-hidden bg-[#070510] text-white">
      {/* VisionOS Style Ambient Mesh Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full filter blur-[120px] opacity-40 animate-pulse" 
          style={{ background: `radial-gradient(circle, ${primary || '#3b82f6'} 0%, transparent 70%)` }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full filter blur-[100px] opacity-30" 
          style={{ background: `radial-gradient(circle, ${accent || '#06b6d4'} 0%, transparent 70%)` }}
        />
        <div 
          className="absolute top-[40%] right-[20%] w-[35%] h-[35%] rounded-full filter blur-[110px] opacity-25" 
          style={{ background: `radial-gradient(circle, ${secondary || '#6366f1'} 0%, transparent 70%)` }}
        />
      </div>

      {/* Scroll Wrapper */}
      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden scrollbar-none pointer-events-auto">
        
        {/* Floating Glass Navbar */}
        <header className="sticky top-4 z-50 flex items-center justify-between mx-6 my-4 px-6 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-400" />
            <span className="font-extrabold text-sm tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">APEX ENTERPRISE</span>
          </div>
          <nav className="hidden @md:flex gap-6 text-xs font-semibold text-white/60">
            <a href="#features" className="hover:text-white transition-colors">Solutions</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Success</a>
          </nav>
          <button className="text-xs font-bold px-4 py-2 rounded-full border border-blue-500/30 bg-blue-950/40 text-blue-300 hover:bg-blue-900/40 transition-all">
            Contact Sales
          </button>
        </header>

        {/* Hero Section */}
        <section className="px-6 pt-16 pb-20 text-center max-w-4xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-1.5 text-[9px] font-bold tracking-wider uppercase border border-white/10 bg-white/5 text-blue-400 px-3.5 py-1 rounded-full mb-6 backdrop-blur-md">
            <Cpu className="w-3.5 h-3.5 text-blue-400" /> Enterprise Operations Orchestrated
          </span>
          <h1 className="text-4xl @md:text-6xl font-black tracking-tight leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
            Autonomous Systems.<br />Spatial Infrastructure.
          </h1>
          <p className="text-sm text-white/60 max-w-xl mx-auto mb-10 leading-relaxed font-light">
            {t.description || "Deploy enterprise-grade spatial data pipelines to monitor real-time infrastructure, automate complex business workflows, and protect assets with quantum-level security."}
          </p>
          <div className="flex justify-center gap-4 mb-16">
            <button className="text-xs font-bold px-6 py-3 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 transition-all shadow-lg shadow-blue-500/10">
              Get Started
            </button>
            <button className="text-xs font-bold px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              Book Demo
            </button>
          </div>

          {/* Hero Glass Card Mockup */}
          <div className="relative group rounded-2xl overflow-hidden p-[1px] transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 opacity-20 group-hover:opacity-40 blur-[2px] transition-opacity duration-500" />
            <div className="relative rounded-[15px] bg-[#070510]/80 border border-white/10 backdrop-blur-xl p-6 @md:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-blue-400" />
                  <span className="text-xs font-bold text-white/80">Command Center Status</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                </div>
              </div>

              <div className="grid grid-cols-1 @md:grid-cols-3 gap-6 text-left">
                <div className="p-4 border border-white/15 bg-white/5 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <span className="text-[10px] text-white/40 uppercase font-semibold">Active Compute Nodes</span>
                  <p className="text-2xl font-black text-white mt-1">1,204</p>
                  <div className="mt-2 text-[10px] text-green-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +12.4% this week
                  </div>
                </div>
                <div className="p-4 border border-white/15 bg-white/5 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <span className="text-[10px] text-white/40 uppercase font-semibold">Security Level</span>
                  <p className="text-2xl font-black text-cyan-400 mt-1">Optimal</p>
                  <div className="mt-2 text-[10px] text-white/40">Active Shields Up</div>
                </div>
                <div className="p-4 border border-white/15 bg-white/5 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                  <span className="text-[10px] text-white/40 uppercase font-semibold">Global Load Sync</span>
                  <p className="text-2xl font-black text-white mt-1">99.998%</p>
                  <div className="mt-2 text-[10px] text-white/40">Connected to 12 Edge hubs</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services / Features Section */}
        <section id="features" className="px-6 py-20 max-w-5xl mx-auto w-full relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-2xl @md:text-3xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              High-Fidelity Operations
            </h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Our automated architecture removes friction from physical and digital asset scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 @md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="relative group rounded-2xl overflow-hidden p-[1px] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity duration-500" />
              <div className="relative rounded-[15px] bg-[#070510]/90 border border-white/10 backdrop-blur-xl p-6 h-full w-full flex flex-col justify-between hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all">
                <div>
                  <div className="p-3 w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-6 group-hover:bg-blue-500/20 transition-all">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold mb-3 text-white">Real-Time Infrastructure</h3>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Track hardware endpoints, edge routers, and server instances with sub-millisecond precision.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-[10px] font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative group rounded-2xl overflow-hidden p-[1px] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity duration-500" />
              <div className="relative rounded-[15px] bg-[#070510]/90 border border-white/10 backdrop-blur-xl p-6 h-full w-full flex flex-col justify-between hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all">
                <div>
                  <div className="p-3 w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 mb-6 group-hover:bg-cyan-500/20 transition-all">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold mb-3 text-white">Predictive ML Operations</h3>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Train internal datasets with custom neural clusters to preempt resource exhaustion before it happens.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-[10px] font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative group rounded-2xl overflow-hidden p-[1px] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity duration-500" />
              <div className="relative rounded-[15px] bg-[#070510]/90 border border-white/10 backdrop-blur-xl p-6 h-full w-full flex flex-col justify-between hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all">
                <div>
                  <div className="p-3 w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-6 group-hover:bg-indigo-500/20 transition-all">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold mb-3 text-white">Quantum Ledger Security</h3>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Encrypt client metrics and data packets using next-generation post-quantum algorithmic cryptography.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-[10px] font-bold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="px-6 py-20 max-w-5xl mx-auto w-full relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl @md:text-3xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              Predictive Enterprise Tiers
            </h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto mb-8">
              Select the optimal bandwidth tier for your global workflows.
            </p>

            {/* Toggle Billing */}
            <div className="flex justify-center items-center gap-3">
              <span className={`text-[11px] font-bold ${!isAnnual ? 'text-white' : 'text-white/40'}`}>Monthly Billing</span>
              <button 
                className="w-10 h-6 rounded-full bg-white/10 relative p-1 transition-colors border border-white/10"
                onClick={() => setIsAnnual(!isAnnual)}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isAnnual ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
              <span className={`text-[11px] font-bold ${isAnnual ? 'text-blue-400' : 'text-white/40'} flex items-center gap-1`}>
                Annual Billing <span className="text-[9px] border border-blue-500/30 bg-blue-900/40 text-blue-300 px-2 py-0.5 rounded-full font-bold">Save 20%</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 @md:grid-cols-3 gap-8 text-left">
            {/* Tier 1 */}
            <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
              <div>
                <h3 className="text-base font-bold text-white">Startup</h3>
                <p className="text-xs text-white/50 mt-1">For validation & small edge nodes.</p>
                <div className="my-6">
                  <span className="text-3xl font-black">${isAnnual ? '79' : '99'}</span>
                  <span className="text-xs text-white/50"> / month</span>
                </div>
                <ul className="text-xs space-y-3 mb-8 text-white/70 border-t border-white/10 pt-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> 10 Active Edge Nodes</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> 24-Hour Sync Intervals</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Standard Ledger Protocol</li>
                </ul>
              </div>
              <button className="w-full text-xs font-bold py-3 border border-white/15 bg-white/5 hover:bg-white/10 rounded-xl text-white text-center transition-colors">
                Start Trial
              </button>
            </div>

            {/* Tier 2 (Highlighted) */}
            <div className="border border-blue-500 bg-white/10 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between relative shadow-[0_8px_32px_0_rgba(59,130,246,0.15)] shadow-blue-500/10">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-extrabold uppercase bg-blue-600 text-white px-3 py-1 rounded-full shadow-md">
                Recommended
              </span>
              <div>
                <h3 className="text-base font-bold text-white">Enterprise</h3>
                <p className="text-xs text-white/50 mt-1">For multi-region scaling platforms.</p>
                <div className="my-6">
                  <span className="text-3xl font-black">${isAnnual ? '239' : '299'}</span>
                  <span className="text-xs text-white/50"> / month</span>
                </div>
                <ul className="text-xs space-y-3 mb-8 text-white/70 border-t border-white/10 pt-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> 100 Active Edge Nodes</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Sub-second Sync Intervals</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Quantum Ledger Cryptography</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> 24/7 Phone & Email Advisory</li>
                </ul>
              </div>
              <button className="w-full text-xs font-bold py-3 rounded-xl text-white text-center border border-white/20 bg-blue-600 hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/25">
                Acquire Enterprise
              </button>
            </div>

            {/* Tier 3 */}
            <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
              <div>
                <h3 className="text-base font-bold text-white">Global Syndicate</h3>
                <p className="text-xs text-white/50 mt-1">For high-throughput requirements.</p>
                <div className="my-6">
                  <span className="text-3xl font-black">Custom</span>
                </div>
                <ul className="text-xs space-y-3 mb-8 text-white/70 border-t border-white/10 pt-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Unlimited Edge Nodes</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Dedicated Fiber Links</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Custom HSM Architectures</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Dedicated Solutions Director</li>
                </ul>
              </div>
              <button className="w-full text-xs font-bold py-3 border border-white/15 bg-white/5 hover:bg-white/10 rounded-xl text-white text-center transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="px-6 py-20 max-w-5xl mx-auto w-full relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-2xl @md:text-3xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              Trusted by Core Operators
            </h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              Real outcomes achieved by infrastructure divisions using APEX protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 @md:grid-cols-2 gap-8">
            <div className="border border-white/10 bg-white/5 backdrop-blur-xl p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
              <p className="text-xs text-white/80 leading-relaxed italic">
                &ldquo;APEX enabled us to coordinate real-time physical distribution with 100% server sync efficiency. The ledger security gives us absolute confidence.&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-[10px] text-white">
                  AM
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Arthur Morgan</h4>
                  <p className="text-[9px] text-white/40">VP Infrastructure, Vanguard Logistics</p>
                </div>
              </div>
            </div>

            <div className="border border-white/10 bg-white/5 backdrop-blur-xl p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
              <p className="text-xs text-white/80 leading-relaxed italic">
                &ldquo;The ML forecasting alerts alone saved our cloud operations squad over $2.4M in potential edge synchronization overage fees this fiscal quarter.&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center font-bold text-[10px] text-white">
                  SH
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Sarah Jenkins</h4>
                  <p className="text-[9px] text-white/40">Director of Compute, Sentinel Cloud</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-white/[0.02] py-10 px-6 relative z-10 text-xs text-white/40">
          <div className="max-w-5xl mx-auto flex flex-col @md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span className="font-extrabold text-xs tracking-wider text-white/60">APEX ENTERPRISE</span>
            </div>
            <div className="flex gap-6 text-[10px] uppercase font-bold tracking-widest text-white/30">
              <span className="hover:text-white cursor-pointer">SLA Agreement</span>
              <span className="hover:text-white cursor-pointer">Status Logs</span>
              <span className="hover:text-white cursor-pointer">Contact</span>
            </div>
            <p className="text-[10px]">
              &copy; {new Date().getFullYear()} APEX Enterprise Systems Inc. All rights reserved.
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
