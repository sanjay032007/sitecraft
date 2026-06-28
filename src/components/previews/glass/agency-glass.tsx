"use client";

import React, { useState } from 'react';
import { Template } from '@/lib/data';
import { 
  Sparkles, 
  ArrowRight, 
  Palette, 
  Layers, 
  Target, 
  Award,
  CheckCircle2
} from 'lucide-react';

export function AgencyGlass({ t }: { t: Template }) {
  const { primary } = t.colorScheme;
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="@container w-full h-full relative overflow-hidden bg-neutral-950 text-white">
      {/* Background gradients */}
      <div 
        className="absolute top-[10%] left-[-20%] w-[50%] h-[50%] rounded-full filter blur-[100px] opacity-25" 
        style={{ background: `radial-gradient(circle, ${primary || '#ef4444'} 0%, transparent 70%)` }}
      />
      <div 
        className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] rounded-full filter blur-[100px] opacity-20" 
        style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)' }}
      />

      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden scrollbar-none pointer-events-auto">
        
        {/* Floating Navbar */}
        <header className="sticky top-4 z-50 flex items-center justify-between mx-6 my-4 px-6 py-4 rounded-2xl border border-white/10 bg-[#0a0a0a]/50 backdrop-blur-xl shadow-lg">
          <div className="flex items-center gap-1.5 font-black text-sm tracking-wider">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            CHROMA STU.
          </div>
          <nav className="hidden @md:flex gap-6 text-[10px] uppercase font-bold tracking-widest text-neutral-400">
            <a href="#work" className="hover:text-white cursor-pointer transition-colors">Work</a>
            <a href="#services" className="hover:text-white cursor-pointer transition-colors">Services</a>
            <a href="#pricing" className="hover:text-white cursor-pointer transition-colors">Pricing</a>
          </nav>
          <button className="text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 transition-all backdrop-blur-md">
            Start Project
          </button>
        </header>

        {/* Hero Section */}
        <section className="px-6 py-20 text-center max-w-4xl mx-auto flex flex-col items-center relative z-10">
          <div className="inline-flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-widest border border-white/10 bg-white/5 px-3 py-1 rounded-full mb-6 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-red-500" /> Award Winning Digital Agency
          </div>
          <h1 className="text-4xl @md:text-6xl font-black tracking-tight leading-none mb-6">
            We construct <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
              fearless digital products.
            </span>
          </h1>
          <p className="text-xs text-white/60 max-w-md mb-8 leading-relaxed font-light">
            {t.description || "Chroma Studio combines custom UI/UX design, Next.js engineering, and organic growth strategies to launch market-defining brand experiences."}
          </p>
          <button className="text-[10px] font-bold uppercase tracking-widest px-6 py-3 rounded-full text-white flex items-center gap-2 border border-white/25 bg-white/10 hover:bg-white/20 transition-all shadow-lg shadow-red-500/10">
            Explore Our Projects <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </section>

        {/* Services Section */}
        <section id="services" className="px-6 py-16 max-w-5xl mx-auto w-full relative z-10 border-t border-white/5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 text-center">Core Services</h2>
          <div className="grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-4 gap-6">
            <div className="border border-white/10 bg-white/5 backdrop-blur-xl p-5 rounded-2xl hover:border-white/20 transition-all shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
              <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-4">
                <Palette className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white mb-2 uppercase tracking-wide">Brand Architect</h3>
              <p className="text-[10px] text-white/50 leading-relaxed font-light">
                Tailored brand identities built through raw typographic exploration and modern design language.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 backdrop-blur-xl p-5 rounded-2xl hover:border-white/20 transition-all shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
              <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-4">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white mb-2 uppercase tracking-wide">Web3/WebGL UI</h3>
              <p className="text-[10px] text-white/50 leading-relaxed font-light">
                Translucent spatial layouts incorporating real-time WebGL canvas shaders.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 backdrop-blur-xl p-5 rounded-2xl hover:border-white/20 transition-all shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
              <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-4">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white mb-2 uppercase tracking-wide">Production Dev</h3>
              <p className="text-[10px] text-white/50 leading-relaxed font-light">
                Responsive Next.js edge builds with dynamic visual animations and complete SEO indexing.
              </p>
            </div>

            <div className="border border-white/10 bg-white/5 backdrop-blur-xl p-5 rounded-2xl hover:border-white/20 transition-all shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
              <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-4">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white mb-2 uppercase tracking-wide">Conversion</h3>
              <p className="text-[10px] text-white/50 leading-relaxed font-light">
                Continuous A/B user flow experiments mapped to conversion analytics.
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section id="work" className="px-6 py-12 max-w-5xl mx-auto w-full relative z-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6">Recent Work</h2>
          <div className="grid grid-cols-1 @md:grid-cols-3 gap-6">
            {/* Case 1 */}
            <div className="group cursor-pointer">
              <div className="h-48 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden flex items-center justify-center transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 to-transparent" />
                <div className="text-[11px] font-bold uppercase tracking-widest text-white/40">Fintech Platform</div>
              </div>
              <h3 className="text-sm font-bold mt-3 mb-1 group-hover:text-red-400 transition-colors">Nova Trade UI</h3>
              <p className="text-[10px] text-neutral-500">UX/UI Design & Frontend build</p>
            </div>
            {/* Case 2 */}
            <div className="group cursor-pointer">
              <div className="h-48 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden flex items-center justify-center transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                <div className="absolute inset-0 bg-gradient-to-bl from-red-900/20 to-transparent" />
                <div className="text-[11px] font-bold uppercase tracking-widest text-white/40">Brand Portal</div>
              </div>
              <h3 className="text-sm font-bold mt-3 mb-1 group-hover:text-red-400 transition-colors">Hyper Athletics</h3>
              <p className="text-[10px] text-neutral-500">Global ecommerce re-design</p>
            </div>
            {/* Case 3 */}
            <div className="group cursor-pointer">
              <div className="h-48 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl relative overflow-hidden flex items-center justify-center transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-transparent" />
                <div className="text-[11px] font-bold uppercase tracking-widest text-white/40">AI Platform</div>
              </div>
              <h3 className="text-sm font-bold mt-3 mb-1 group-hover:text-red-400 transition-colors">Cognitive Neural</h3>
              <p className="text-[10px] text-neutral-500">WebGL landing page + dashboard</p>
            </div>
          </div>
        </section>

        {/* Agency Process Timeline Section */}
        <section className="px-6 py-14 bg-white/2 border-y border-white/5 relative z-10">
          <div className="max-w-4xl mx-auto w-full">
            <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 text-center">How We Operate</h2>
            
            <div className="space-y-6">
              {[
                { step: "01", title: "Discovery & Strategy", desc: "We audit your existing products, analyze customer pain points, and define key technical milestones." },
                { step: "02", title: "Creative Interface Design", desc: "We design premium, brand-aligned high-fidelity Figma components that are tested for spatial usability." },
                { step: "03", title: "Next.js Production Coding", desc: "Our engineering squad codes clean, responsive, SEO-ready Next.js / TypeScript codebases." },
                { step: "04", title: "Launch & Growth Lifecycle", desc: "We launch with strict SLA guarantees, set up analytics charts, and monitor transaction pipelines." }
              ].map((p, idx) => (
                <div key={idx} className="flex gap-4 border-l-2 border-white/10 pl-4 relative hover:border-red-500 transition-colors">
                  <span className="text-xs font-black text-red-500 font-mono mt-0.5">{p.step}</span>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white/95">{p.title}</h4>
                    <p className="text-[11px] text-white/60 mt-1">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="px-6 py-20 max-w-5xl mx-auto w-full relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-2xl @md:text-3xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              Transparent Sprint Pricing
            </h2>
            <p className="text-xs text-white/50 max-w-sm mx-auto mb-8">
              Straightforward pricing mapped to dedicated design + next.js sprints.
            </p>

            {/* Toggle Billing */}
            <div className="flex justify-center items-center gap-3">
              <span className={`text-[10px] font-bold ${!isAnnual ? 'text-white' : 'text-white/40'}`}>Monthly Sprints</span>
              <button 
                className="w-10 h-6 rounded-full bg-white/10 relative p-1 transition-colors border border-white/10"
                onClick={() => setIsAnnual(!isAnnual)}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isAnnual ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
              <span className={`text-[10px] font-bold ${isAnnual ? 'text-red-400' : 'text-white/40'} flex items-center gap-1`}>
                Annual Sprints <span className="text-[8px] border border-red-500/30 bg-red-900/40 text-red-300 px-1.5 py-0.5 rounded-full font-bold">Save 20%</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 @md:grid-cols-3 gap-8 text-left">
            {/* Tier 1 */}
            <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-white/20 transition-all">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Design System Sprint</h3>
                <p className="text-[10px] text-white/50 mt-1">Unified UI/UX design components.</p>
                <div className="my-6">
                  <span className="text-2xl font-black">${isAnnual ? '3999' : '4999'}</span>
                  <span className="text-[10px] text-white/50"> / sprint</span>
                </div>
                <ul className="text-[10px] space-y-3 mb-8 text-white/70 border-t border-white/10 pt-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-red-500" /> UI Brand Identity Kit</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-red-500" /> Figma Design Tokens</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-red-500" /> 5 Custom Landing Screens</li>
                </ul>
              </div>
              <button className="w-full text-[10px] font-bold uppercase tracking-widest py-3 border border-white/15 bg-white/5 hover:bg-white/10 rounded-xl text-white text-center transition-colors">
                Book Sprint
              </button>
            </div>

            {/* Tier 2 (Highlighted) */}
            <div className="border border-red-500 bg-white/10 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between relative shadow-[0_8px_32px_0_rgba(239,68,68,0.15)] hover:shadow-[0_0_30px_rgba(239,68,68,0.25)] transition-all">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] font-extrabold uppercase bg-red-600 text-white px-2.5 py-0.5 rounded-full tracking-widest shadow-md">
                Most Popular
              </span>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Full MVP Launch</h3>
                <p className="text-[10px] text-white/50 mt-1">UX design + production-ready Next.js build.</p>
                <div className="my-6">
                  <span className="text-2xl font-black">${isAnnual ? '7999' : '9999'}</span>
                  <span className="text-[10px] text-white/50"> / sprint</span>
                </div>
                <ul className="text-[10px] space-y-3 mb-8 text-white/70 border-t border-white/10 pt-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-red-500" /> End-to-end UX/UI Design</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-red-500" /> Production-ready Next.js Edge</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-red-500" /> SEO and Analytics Setup</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-red-500" /> Slack Channel Daily Syncs</li>
                </ul>
              </div>
              <button className="w-full text-[10px] font-bold uppercase tracking-widest py-3 rounded-xl text-white text-center border border-white/20 bg-red-600 hover:bg-red-500 transition-colors shadow-lg shadow-red-500/25">
                Book MVP Sprint
              </button>
            </div>

            {/* Tier 3 */}
            <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-white/20 transition-all">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Enterprise Retainer</h3>
                <p className="text-[10px] text-white/50 mt-1">Dedicated capacity for scale.</p>
                <div className="my-6">
                  <span className="text-2xl font-black">Custom</span>
                </div>
                <ul className="text-[10px] space-y-3 mb-8 text-white/70 border-t border-white/10 pt-6">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-red-500" /> Dedicated UI/UX + Next.js Engineers</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-red-500" /> SLA Guaranteed Support</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-red-500" /> Custom Architecture Strategy</li>
                </ul>
              </div>
              <button className="w-full text-[10px] font-bold uppercase tracking-widest py-3 border border-white/15 bg-white/5 hover:bg-white/10 rounded-xl text-white text-center transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </section>

        {/* Creative Team Showcase */}
        <section className="px-6 py-14 max-w-5xl mx-auto w-full relative z-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 text-center">Chroma Talents</h2>
          
          <div className="grid grid-cols-2 @md:grid-cols-4 gap-6">
            {[
              { name: "Alara Thorne", title: "Lead UX Director", prev: "Ex-Frog Design" },
              { name: "Jin Woo Park", title: "VPE / Next.js Architect", prev: "Ex-Vercel Core" },
              { name: "Clara Vane", title: "Motion Specialist", prev: "Ex-Awwwards Judge" },
              { name: "Miles Davis", title: "Growth strategist", prev: "Ex-Linear advisor" }
            ].map((member, i) => (
              <div key={i} className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-xl p-4 text-center hover:border-white/20 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/10 mx-auto flex items-center justify-center font-black text-sm text-red-500 mb-3">
                  {member.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <h4 className="text-xs font-bold text-white">{member.name}</h4>
                <p className="text-[8px] text-white/40 uppercase tracking-widest mt-1">{member.title}</p>
                <p className="text-[9px] text-white/50 mt-1 italic">{member.prev}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 border-t border-white/5 bg-white/2 relative z-10">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 text-center">Kind Appraisals</h2>
            <div className="grid grid-cols-1 @md:grid-cols-2 gap-8 text-left">
              <div className="border border-white/10 bg-white/5 backdrop-blur-xl p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-white/20 transition-all">
                <p className="text-xs text-white/80 leading-relaxed italic">
                  &ldquo;Chroma Studio is not a vendor; they are a growth accelerator. They created a custom SaaS dashboard and landing flow that doubled our platform registration conversion within 30 days.&rdquo;
                </p>
                <span className="text-[8px] tracking-widest uppercase font-bold text-red-500 block mt-4 border-t border-white/5 pt-4">
                  — KATIA ALVAREZ, MARKETING DIR, NOVA FINANCE
                </span>
              </div>

              <div className="border border-white/10 bg-white/5 backdrop-blur-xl p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-white/20 transition-all">
                <p className="text-xs text-white/80 leading-relaxed italic">
                  &ldquo;The speed of execution was stellar. The visual designs were absolutely stunning, and the Next.js performance is the best we have seen.&rdquo;
                </p>
                <span className="text-[8px] tracking-widest uppercase font-bold text-red-500 block mt-4 border-t border-white/5 pt-4">
                  — TIMOTHY ROWE, FOUNDER, COGNITIVE NEURAL
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t border-white/5 py-6 px-6 text-[10px] text-white/45 uppercase tracking-widest text-center relative z-10">
          <div className="max-w-5xl mx-auto flex flex-col @md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-1.5 font-black text-xs tracking-wider">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              CHROMA STU.
            </div>
            <p className="text-[10px]">
              &copy; {new Date().getFullYear()} Chroma Agency Studio. All Rights Reserved.
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
