"use client";

import React, { useState } from 'react';
import { Template } from '@/lib/data';
import { 
  Activity, 
  LayoutDashboard, 
  Globe, 
  ShieldAlert, 
  MessageSquare, 
  GitBranch, 
  Palette, 
  CheckCircle,
  ArrowRight
} from 'lucide-react';

export function SaaSGlass({ t }: { t: Template }) {
  const [isAnnual, setIsAnnual] = useState(false);
  const { primary, accent } = t.colorScheme;

  return (
    <div className="@container w-full h-full relative overflow-hidden bg-[#030712] text-white">
      {/* Dynamic Background Glows */}
      <div 
        className="absolute top-[-10%] left-[20%] w-[50%] h-[50%] rounded-full filter blur-[100px] opacity-25" 
        style={{ background: `radial-gradient(circle, ${primary || '#9333ea'} 0%, transparent 70%)` }}
      />
      <div 
        className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] rounded-full filter blur-[100px] opacity-20" 
        style={{ background: `radial-gradient(circle, ${accent || '#ec4899'} 0%, transparent 70%)` }}
      />

      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden scrollbar-none pointer-events-auto">
        
        {/* Floating Navbar */}
        <header className="sticky top-4 z-50 flex items-center justify-between mx-6 my-4 px-6 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-purple-600 flex items-center justify-center text-white font-black text-xs">S</div>
            <span className="font-bold text-sm tracking-tight text-white">SaaSFlow</span>
          </div>
          <nav className="hidden @md:flex gap-6 text-[11px] font-semibold text-white/50">
            <a href="#features" className="hover:text-white cursor-pointer transition-colors">Product</a>
            <a href="#pricing" className="hover:text-white cursor-pointer transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-white cursor-pointer transition-colors">Success</a>
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-white/60 cursor-pointer hover:text-white transition-colors">Sign In</span>
            <button className="text-[10px] font-bold px-3.5 py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 transition-all">
              Start Free Trial
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-6 pt-16 pb-12 text-center max-w-4xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-wider uppercase border border-white/15 bg-white/5 text-purple-400 px-3 py-1 rounded-full mb-4 backdrop-blur-md">
            <Activity className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> SaaSFlow v2.0 Release
          </span>
          <h1 className="text-3xl @md:text-5xl font-extrabold tracking-tight leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
            Your product analytics,<br />all in one unified stream.
          </h1>
          <p className="text-sm text-white/60 max-w-xl mx-auto mb-8 leading-relaxed font-light">
            {t.description || "Deploy SaaSFlow pipelines to monitor live user activity, transaction speed, and API performance. Built for modern product-led growth teams."}
          </p>
          <div className="flex justify-center gap-3 mb-12">
            <button className="text-[11px] font-bold px-5 py-2.5 rounded-xl text-white border border-white/25 bg-white/10 hover:bg-white/20 transition-all shadow-lg shadow-purple-500/10">
              Deploy Instantly
            </button>
            <button className="text-[11px] font-bold px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              Book Demo
            </button>
          </div>

          {/* Dashboard Preview Mockup */}
          <div className="w-full border border-white/15 bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-4 text-left relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              </div>
              <div className="border border-white/10 bg-white/5 px-4 py-1 rounded-md text-[10px] text-white/40 font-mono">
                analytics.saasflow.com/stream
              </div>
              <LayoutDashboard className="w-4 h-4 text-white/30" />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {/* Sidebar Mock */}
              <div className="col-span-1 hidden @md:flex flex-col gap-2 border-r border-white/10 pr-3">
                <div className="h-6 rounded bg-white/10 flex items-center px-2 text-[9px] font-bold text-white">Overview</div>
                <div className="h-6 rounded hover:bg-white/5 flex items-center px-2 text-[9px] text-white/40">Usage Analytics</div>
                <div className="h-6 rounded hover:bg-white/5 flex items-center px-2 text-[9px] text-white/40">API Gateway</div>
                <div className="h-6 rounded hover:bg-white/5 flex items-center px-2 text-[9px] text-white/40">Settings</div>
              </div>
              
              {/* Content Mock */}
              <div className="col-span-4 @md:col-span-3 space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 border border-white/10 bg-white/5 rounded-xl">
                    <span className="text-[8px] text-white/40 uppercase font-semibold">Active Streams</span>
                    <p className="text-sm @md:text-base font-bold text-white mt-1">1,402 / sec</p>
                  </div>
                  <div className="p-3 border border-white/10 bg-white/5 rounded-xl">
                    <span className="text-[8px] text-white/40 uppercase font-semibold">Response Time</span>
                    <p className="text-sm @md:text-base font-bold text-green-400 mt-1">12ms avg</p>
                  </div>
                  <div className="p-3 border border-white/10 bg-white/5 rounded-xl">
                    <span className="text-[8px] text-white/40 uppercase font-semibold">Uptime</span>
                    <p className="text-sm @md:text-base font-bold text-white mt-1">99.998%</p>
                  </div>
                </div>
                
                {/* Analytics Graph representation */}
                <div className="h-32 border border-white/10 bg-white/5 rounded-xl p-3 flex flex-col justify-between">
                  <span className="text-[8px] text-white/40 uppercase font-semibold">Live Traffic Load</span>
                  <div className="flex items-end gap-1.5 h-16 pt-2">
                    {[20, 35, 45, 30, 25, 60, 80, 50, 45, 55, 70, 90, 85, 60, 40, 50, 65, 75, 80, 95].map((val, i) => (
                      <div 
                        key={i} 
                        className="flex-1 rounded-t-sm bg-purple-500/20 hover:bg-purple-500 transition-colors cursor-pointer" 
                        style={{ height: `${val}%` }} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <section className="py-10 border-y border-white/10 text-center relative z-10 bg-white/2">
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-[9px] font-bold uppercase tracking-wider text-white/40 mb-6">Integrate with Your Ecosystem</p>
            <div className="grid grid-cols-3 @md:grid-cols-6 gap-4 items-center">
              {[
                { icon: <MessageSquare className="w-4 h-4 text-purple-400" />, text: "Slack" },
                { icon: <GitBranch className="w-4 h-4 text-white" />, text: "Github" },
                { icon: <Palette className="w-4 h-4 text-pink-400" />, text: "Figma" },
                { icon: <Globe className="w-4 h-4 text-cyan-400" />, text: "Vercel" },
                { icon: <Activity className="w-4 h-4 text-emerald-400" />, text: "Datadog" },
                { icon: <ShieldAlert className="w-4 h-4 text-red-400" />, text: "Sentry" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 justify-center p-2.5 border border-white/10 bg-white/5 rounded-xl">
                  {item.icon} <span className="text-[10px] font-semibold text-white/70">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features/Services Section */}
        <section id="features" className="px-6 py-20 max-w-5xl mx-auto w-full relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-2xl @md:text-3xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              Engineered for lightning pipelines
            </h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              SaaSFlow provides direct cloud sync to scale analytics without database lag.
            </p>
          </div>

          <div className="grid grid-cols-1 @md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="relative group rounded-2xl overflow-hidden p-[1px] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity duration-500" />
              <div className="relative rounded-[15px] bg-[#030712]/90 border border-white/10 backdrop-blur-xl p-6 h-full w-full flex flex-col justify-between hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all">
                <div>
                  <div className="p-3 w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-6 group-hover:bg-purple-500/20 transition-all">
                    <LayoutDashboard className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold mb-2 text-white">Live Orchestration</h3>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Route streams dynamically across cloud edge zones with absolute zero cold starts.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-[10px] font-bold text-purple-400 group-hover:text-purple-300 transition-colors">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative group rounded-2xl overflow-hidden p-[1px] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity duration-500" />
              <div className="relative rounded-[15px] bg-[#030712]/90 border border-white/10 backdrop-blur-xl p-6 h-full w-full flex flex-col justify-between hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all">
                <div>
                  <div className="p-3 w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-6 group-hover:bg-purple-500/20 transition-all">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold mb-2 text-white">Verified Analytics</h3>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Verify every event track request through local cryptographic key signatures.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-[10px] font-bold text-purple-400 group-hover:text-purple-300 transition-colors">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative group rounded-2xl overflow-hidden p-[1px] transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity duration-500" />
              <div className="relative rounded-[15px] bg-[#030712]/90 border border-white/10 backdrop-blur-xl p-6 h-full w-full flex flex-col justify-between hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] transition-all">
                <div>
                  <div className="p-3 w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-6 group-hover:bg-purple-500/20 transition-all">
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold mb-2 text-white">Adaptive Security</h3>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Block suspicious API usage immediately through automatic origin filtering logic.
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-[10px] font-bold text-purple-400 group-hover:text-purple-300 transition-colors">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SaaS Pricing Table */}
        <section id="pricing" className="px-6 py-20 max-w-5xl mx-auto w-full text-center relative z-10 bg-[#030712]">
          <h2 className="text-2xl @md:text-3xl font-black tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
            Flexible, scaling pricing plans
          </h2>
          <p className="text-xs text-white/50 mb-8 max-w-sm mx-auto">
            Start trial for free. No credit card required. Upgrade anytime.
          </p>
          
          {/* Toggle Billing */}
          <div className="flex justify-center items-center gap-3 mb-12">
            <span className={`text-[10px] font-bold ${!isAnnual ? 'text-white' : 'text-white/40'}`}>Monthly</span>
            <button 
              className="w-10 h-6 rounded-full bg-white/10 relative p-1 transition-colors border border-white/10"
              onClick={() => setIsAnnual(!isAnnual)}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isAnnual ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
            <span className={`text-[10px] font-bold ${isAnnual ? 'text-purple-400' : 'text-white/40'} flex items-center gap-1`}>
              Annual Billing <span className="text-[8px] border border-purple-500/30 bg-purple-900/40 text-purple-300 px-1.5 py-0.5 rounded-full font-bold">Save 20%</span>
            </span>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 @md:grid-cols-3 gap-8 text-left">
            {/* Card 1 */}
            <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:border-white/20 transition-all">
              <div>
                <h3 className="text-base font-bold text-white">Developer</h3>
                <p className="text-xs text-white/40 mt-1">For personal tools & prototypes.</p>
                <div className="my-6">
                  <span className="text-3xl font-black">${isAnnual ? '16' : '20'}</span>
                  <span className="text-xs text-white/45"> / month</span>
                </div>
                <ul className="text-xs space-y-3 mb-8 text-white/60 border-t border-white/10 pt-6">
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-purple-400" /> 10,000 metrics / month</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-purple-400" /> 3 dashboard presets</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-purple-400" /> 24h data log retention</li>
                </ul>
              </div>
              <button className="w-full text-xs font-bold py-3 border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl text-white text-center transition-colors">
                Start Free Trial
              </button>
            </div>

            {/* Card 2 (Highlight Pro) */}
            <div className="border border-purple-500 bg-white/10 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between relative shadow-[0_8px_32px_0_rgba(168,85,247,0.15)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(168,85,247,0.25)] transition-all">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] font-extrabold uppercase bg-purple-600 text-white px-2.5 py-1 rounded-full shadow-md">
                Most Popular
              </span>
              <div>
                <h3 className="text-base font-bold text-white">Growth</h3>
                <p className="text-xs text-white/40 mt-1">For scaling production apps.</p>
                <div className="my-6">
                  <span className="text-3xl font-black">${isAnnual ? '39' : '49'}</span>
                  <span className="text-xs text-white/45"> / month</span>
                </div>
                <ul className="text-xs space-y-3 mb-8 text-white/60 border-t border-white/10 pt-6">
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-purple-400" /> 250,000 metrics / month</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-purple-400" /> Unlimited dashboard panels</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-purple-400" /> 30 days data retention</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-purple-400" /> Team workspaces (5 seats)</li>
                </ul>
              </div>
              <button className="w-full text-xs font-bold py-3 rounded-xl text-white text-center border border-white/20 bg-purple-600 hover:bg-purple-500 transition-colors shadow-lg shadow-purple-500/25">
                Get Started
              </button>
            </div>

            {/* Card 3 */}
            <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl p-6 flex flex-col justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:border-white/20 transition-all">
              <div>
                <h3 className="text-base font-bold text-white">Enterprise</h3>
                <p className="text-xs text-white/40 mt-1">For secure, high-volume teams.</p>
                <div className="my-6">
                  <span className="text-3xl font-black">Custom</span>
                </div>
                <ul className="text-xs space-y-3 mb-8 text-white/60 border-t border-white/10 pt-6">
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-purple-400" /> Unlimited metrics</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-purple-400" /> Dedicated database storage</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-purple-400" /> SSO/SAML secure login</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-purple-400" /> 24/7 dedicated phone advisory</li>
                </ul>
              </div>
              <button className="w-full text-xs font-bold py-3 border border-white/10 bg-white/5 hover:bg-white/10 rounded-xl text-white text-center transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="px-6 py-20 max-w-5xl mx-auto w-full relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-2xl @md:text-3xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
              Trusted by Growth Leaders
            </h2>
            <p className="text-sm text-white/50 max-w-lg mx-auto">
              See how modern product teams are accelerating user onboarding with SaaSFlow.
            </p>
          </div>

          <div className="grid grid-cols-1 @md:grid-cols-2 gap-8 text-left">
            <div className="border border-white/10 bg-white/5 backdrop-blur-xl p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-white/20 transition-all">
              <p className="text-xs text-white/80 leading-relaxed italic">
                &ldquo;SaaSFlow integrated with our Vercel and Datadog streams in under 5 minutes. Live tracking has resolved dozens of API bottlenecks before our clients noticed.&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-[10px] text-white">
                  AM
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Alex Mercer</h4>
                  <p className="text-[9px] text-white/40">VP of Product, CloudScale</p>
                </div>
              </div>
            </div>

            <div className="border border-white/10 bg-white/5 backdrop-blur-xl p-6 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:border-white/20 transition-all">
              <p className="text-xs text-white/80 leading-relaxed italic">
                &ldquo;The event sync intervals are blazingly fast. We tracked over 14 million daily requests with zero database lag and zero cold starts.&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-indigo-500 flex items-center justify-center font-bold text-[10px] text-white">
                  JN
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Jessica Nova</h4>
                  <p className="text-[9px] text-white/40">Lead Engineer, NovaTrade</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t border-white/10 bg-white/2 py-8 px-6 text-xs text-white/40 text-center relative z-10">
          <div className="max-w-5xl mx-auto flex flex-col @md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-purple-600 flex items-center justify-center text-white font-black text-[10px]">S</div>
              <span className="font-bold text-xs tracking-tight text-white/60">SaaSFlow</span>
            </div>
            <p className="text-[10px]">
              &copy; {new Date().getFullYear()} SaaSFlow Platform Inc. All rights reserved.
            </p>
          </div>
        </footer>

      </div>
    </div>
  );
}
