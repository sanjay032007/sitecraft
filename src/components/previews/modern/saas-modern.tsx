"use client";

import React, { useState } from 'react';
import { Template } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  LayoutDashboard, 
  Globe, 
  ShieldAlert, 
  MessageSquare, 
  GitBranch, 
  Palette, 
  CheckCircle, 
  Menu, 
  X, 
  Zap, 
  Shield, 
  Cpu, 
  Users, 
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

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}



export function SaaSModern({ t }: { t: Template }) {
  const { primary, text, secondary } = t.colorScheme;
  const [isAnnual, setIsAnnual] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-full flex flex-col bg-slate-50 @container relative overflow-hidden" style={{ color: text }}>
      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden flex flex-col">
        {/* Navbar */}
        <header className="px-6 py-3 bg-white border-b flex items-center justify-between sticky top-0 z-50" style={{ borderColor: secondary }}>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center text-white font-black text-xs">S</div>
            <span className="font-bold text-sm tracking-tight text-slate-900">SaaSFlow</span>
          </div>
          
          <nav className="hidden @md:flex gap-6 text-[11px] font-semibold text-slate-500">
            <span className="hover:text-black cursor-pointer transition-colors">Product</span>
            <span className="hover:text-black cursor-pointer transition-colors">Integrations</span>
            <span className="hover:text-black cursor-pointer transition-colors">Pricing</span>
            <span className="hover:text-black cursor-pointer transition-colors">Docs</span>
          </nav>
          
          <div className="flex items-center gap-3">
            <div className="hidden @md:flex items-center gap-3">
              <span className="text-[11px] font-semibold text-slate-600 cursor-pointer hover:text-black transition-colors">Sign In</span>
              <button className="text-[10px] font-bold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-90" style={{ background: primary }}>
                Start Free Trial
              </button>
            </div>
            
            {/* Hamburger Button */}
            <button 
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all @md:hidden"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Sliding Mobile Drawer Overlay */}
        <AnimatePresence>
          {isDrawerOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsDrawerOpen(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 @md:hidden"
              />
              {/* Drawer Content */}
              <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 right-0 w-64 bg-white shadow-2xl z-50 p-6 flex flex-col @md:hidden text-slate-900"
              >
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center text-white font-black text-xs">S</div>
                    <span className="font-bold text-sm tracking-tight">SaaSFlow</span>
                  </div>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <nav className="flex flex-col gap-4 py-6 text-xs font-semibold text-slate-600">
                  <span className="hover:text-black cursor-pointer py-1 transition-colors" onClick={() => setIsDrawerOpen(false)}>Product</span>
                  <span className="hover:text-black cursor-pointer py-1 transition-colors" onClick={() => setIsDrawerOpen(false)}>Integrations</span>
                  <span className="hover:text-black cursor-pointer py-1 transition-colors" onClick={() => setIsDrawerOpen(false)}>Pricing</span>
                  <span className="hover:text-black cursor-pointer py-1 transition-colors" onClick={() => setIsDrawerOpen(false)}>Docs</span>
                </nav>
                
                <div className="mt-auto pt-6 border-t border-slate-100 flex flex-col gap-3">
                  <span className="text-xs font-semibold text-slate-600 cursor-pointer text-center py-2 hover:bg-slate-50 rounded-lg transition-colors" onClick={() => setIsDrawerOpen(false)}>Sign In</span>
                  <button 
                    className="text-[10px] font-bold py-2.5 rounded-lg text-white text-center transition-opacity hover:opacity-90 shadow-sm" 
                    style={{ background: primary }} 
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Start Free Trial
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section className="px-6 pt-16 pb-12 text-center max-w-4xl mx-auto w-full">
          <motion.span 
            className="inline-flex items-center gap-1.5 text-[9px] font-bold tracking-wider uppercase bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Activity className="w-3.5 h-3.5" /> SaaSFlow v2.0 Release
          </motion.span>
          <motion.h1 
            className="text-3xl @md:text-5xl font-extrabold tracking-tight leading-tight mb-4 text-slate-900"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Your product analytics,<br />all in one unified stream.
          </motion.h1>
          <motion.p 
            className="text-sm text-slate-500 max-w-xl mx-auto mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t.description || "Deploy SaaSFlow pipelines to monitor live user activity, transaction speed, and API performance. Built for modern product-led growth teams."}
          </motion.p>
          <motion.div 
            className="flex justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <button className="text-[11px] font-bold px-5 py-2.5 rounded-lg text-white shadow-lg transition-opacity hover:opacity-90" style={{ background: primary }}>
              Deploy Instantly
            </button>
            <button className="text-[11px] font-bold px-5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
              Book Demo
            </button>
          </motion.div>

          {/* Dashboard Preview Mockup */}
          <motion.div 
            className="w-full bg-white rounded-2xl shadow-xl border p-4 text-left relative overflow-hidden" 
            style={{ borderColor: secondary }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center justify-between border-b pb-3 mb-4" style={{ borderColor: secondary }}>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" ></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" ></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" ></div>
              </div>
              <div className="bg-slate-50 px-4 py-1 rounded-md text-[10px] text-slate-400 border font-mono">
                analytics.saasflow.com/stream
              </div>
              <LayoutDashboard className="w-4 h-4 text-slate-300" />
            </div>

            <div className="grid grid-cols-4 gap-4">
              {/* Sidebar Mock */}
              <div className="col-span-1 hidden @sm:flex flex-col gap-2 border-r pr-3" style={{ borderColor: secondary }}>
                <div className="h-6 rounded bg-indigo-50/80 flex items-center px-2 text-[9px] font-bold text-indigo-700">Overview</div>
                {["Usage Analytics", "API Gateway", "Settings"].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="h-6 rounded hover:bg-slate-50 flex items-center px-2 text-[9px] text-slate-400 cursor-pointer transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    {item}
                  </motion.div>
                ))}
              </div>
              
              {/* Content Mock */}
              <div className="col-span-4 @sm:col-span-3 space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: "Active Streams", value: "1,402 / sec", color: "text-slate-800" },
                    { label: "Response Time", value: "12ms avg", color: "text-green-600" },
                    { label: "Uptime", value: "99.998%", color: "text-indigo-600" }
                  ].map((stat, i) => (
                    <motion.div 
                      key={i}
                      className="p-3 border rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200" 
                      style={{ borderColor: secondary }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.05 }}
                      whileHover={{ y: -2, scale: 1.02 }}
                    >
                      <span className="text-[8px] text-slate-400 uppercase font-semibold">{stat.label}</span>
                      <p className={`text-xs @sm:text-sm font-bold mt-1 ${stat.color}`}>{stat.value}</p>
                    </motion.div>
                  ))}
                </div>
                
                {/* Analytics Graph representation */}
                <div className="h-32 border rounded-xl p-3 flex flex-col justify-between" style={{ borderColor: secondary }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] text-slate-400 uppercase font-semibold">Live Traffic Load</span>
                    <span className="text-[8px] font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">Real-time</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-16 pt-2">
                    {[20, 35, 45, 30, 25, 60, 80, 50, 45, 55, 70, 90, 85, 60, 40, 50, 65, 75, 80, 95].map((val, i) => (
                      <motion.div 
                        key={i} 
                        className="flex-1 rounded-t-sm bg-indigo-600/25 cursor-pointer relative group" 
                        initial={{ height: 0 }}
                        animate={{ height: `${val}%` }}
                        transition={{ 
                          type: "spring", 
                          duration: 0.8, 
                          delay: 0.3 + i * 0.02, 
                          bounce: 0.25 
                        }}
                        whileHover={{ 
                          scaleY: 1.15,
                          backgroundColor: primary || "#4f46e5",
                          transition: { duration: 0.1 }
                        }}
                        style={{ originY: 1 }}
                      >
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-slate-800 text-white text-[8px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md z-20">
                          {val * 12} req/s
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Integrations Section */}
        <section className="py-10 bg-white border-y text-center" style={{ borderColor: secondary }}>
          <div className="max-w-3xl mx-auto px-6">
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-6">Integrate with Your Ecosystem</p>
            <div className="grid grid-cols-3 @md:grid-cols-6 gap-4 items-center">
              {[
                { icon: MessageSquare, label: "Slack" },
                { icon: GitBranch, label: "GitHub" },
                { icon: Palette, label: "Figma" },
                { icon: Globe, label: "Vercel" },
                { icon: Activity, label: "Datadog" },
                { icon: ShieldAlert, label: "Sentry" }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="flex items-center gap-1.5 justify-center p-2.5 border rounded-xl bg-white shadow-sm hover:shadow-md cursor-pointer transition-shadow" 
                  style={{ borderColor: secondary }}
                  whileHover={{ y: -2, scale: 1.03 }}
                >
                  <item.icon className="w-4 h-4 text-slate-700" /> 
                  <span className="text-[10px] font-semibold text-slate-700">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features/Services Section */}
        <section className="px-6 py-16 bg-slate-50 border-b w-full" style={{ borderColor: secondary }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                Features
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-800 mt-4 mb-3">
                Engineered for modern engineering teams
              </h2>
              <p className="text-xs text-slate-500">
                Get complete visibility into every stack, transaction, and user interaction. Scale effortlessly without operational overhead.
              </p>
            </div>
            
            <div className="grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-3 gap-6 text-slate-900">
              {[
                {
                  icon: Zap,
                  title: "Real-time Ingestion",
                  description: "Stream millions of events per second with sub-millisecond latency. Zero bottlenecks."
                },
                {
                  icon: Shield,
                  title: "Advanced Security",
                  description: "Enterprise-grade encryption, role-based access control (RBAC), and SOC2 compliance."
                },
                {
                  icon: Cpu,
                  title: "Intelligent Routing",
                  description: "Configure dynamic event filters and pipeline transformations directly from the UI."
                },
                {
                  icon: LayoutDashboard,
                  title: "Interactive Dashboards",
                  description: "Build bespoke monitoring layouts with our rich collection of responsive panels."
                },
                {
                  icon: Users,
                  title: "Team Collaboration",
                  description: "Share analytics views, coordinate incident responses, and manage permissions smoothly."
                },
                {
                  icon: Globe,
                  title: "Universal API Gateway",
                  description: "Integrate programmatically with full OpenAPI specs, webhooks, and official client SDKs."
                }
              ].map((feat, i) => (
                <motion.div
                  key={i}
                  className="bg-white p-5 rounded-2xl border shadow-sm flex flex-col gap-3 transition-colors duration-300"
                  style={{ borderColor: secondary }}
                  whileHover={{ 
                    y: -6, 
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
                    borderColor: primary 
                  }}
                >
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <feat.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-800">{feat.title}</h3>
                    <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{feat.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SaaS Pricing Table */}
        <section className="px-6 py-16 max-w-4xl mx-auto w-full text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Flexible, scaling pricing plans</h2>
          <p className="text-xs text-slate-500 mb-8">Start trial for free. No credit card required. Upgrade anytime.</p>
          
          {/* Toggle Billing - Premium Sliding Toggle */}
          <div className="inline-flex p-1 bg-slate-100 rounded-full border mb-10 relative" style={{ borderColor: secondary }}>
            <div className="flex relative">
              {/* Sliding background */}
              <motion.div
                className="absolute top-0 bottom-0 rounded-full shadow-sm bg-white"
                initial={false}
                animate={{
                  left: isAnnual ? "50%" : "0%",
                  width: "50%"
                }}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
              <button
                onClick={() => setIsAnnual(false)}
                className={`relative z-10 px-4 py-1.5 rounded-full text-[10px] font-bold transition-colors duration-200 w-24 ${
                  !isAnnual ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`relative z-10 px-4 py-1.5 rounded-full text-[10px] font-bold transition-colors duration-200 w-28 flex items-center justify-center gap-1.5 ${
                  isAnnual ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Annually
                <span className="text-[8px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-full font-bold">
                  -20%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 @md:grid-cols-3 gap-6 text-left text-slate-900">
            
            {/* Card 1 */}
            <motion.div 
              className="bg-white border rounded-2xl p-5 flex flex-col justify-between relative shadow-sm" 
              style={{ borderColor: secondary }}
              whileHover={{ y: -4, boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.02)" }}
            >
              {isAnnual && (
                <span className="absolute top-3 right-3 text-[8px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">
                  Save $48/yr
                </span>
              )}
              <div>
                <h3 className="text-sm font-bold text-slate-800">Developer</h3>
                <p className="text-[10px] text-slate-400 mt-1">For personal tools & prototypes.</p>
                <div className="my-5 flex items-baseline gap-1">
                  <span className="text-2xl font-black">${isAnnual ? '16' : '20'}</span>
                  {isAnnual && (
                    <span className="text-[9px] line-through text-slate-400 ml-1">$20</span>
                  )}
                  <span className="text-[10px] text-slate-400"> / month</span>
                </div>
                <ul className="text-[10px] space-y-2 mb-8 text-slate-500">
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-indigo-500" /> 10,000 metrics / month</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-indigo-500" /> 3 dashboard presets</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-indigo-500" /> 24h data log retention</li>
                </ul>
              </div>
              <button className="w-full text-[10px] font-bold py-2 border rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 text-center transition-colors">
                Start Free Trial
              </button>
            </motion.div>

            {/* Card 2 (Highlight Pro) */}
            <motion.div 
              className="bg-white border-2 rounded-2xl p-5 flex flex-col justify-between relative shadow-md" 
              style={{ borderColor: primary }}
              whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
            >
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] font-extrabold uppercase bg-indigo-600 text-white px-2.5 py-0.5 rounded-full shadow-sm">
                Most Popular
              </span>
              {isAnnual && (
                <span className="absolute top-3 right-3 text-[8px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">
                  Save $120/yr
                </span>
              )}
              <div>
                <h3 className="text-sm font-bold text-slate-800">Growth</h3>
                <p className="text-[10px] text-slate-400 mt-1">For scaling production apps.</p>
                <div className="my-5 flex items-baseline gap-1">
                  <span className="text-2xl font-black">${isAnnual ? '39' : '49'}</span>
                  {isAnnual && (
                    <span className="text-[9px] line-through text-slate-400 ml-1">$49</span>
                  )}
                  <span className="text-[10px] text-slate-400"> / month</span>
                </div>
                <ul className="text-[10px] space-y-2 mb-8 text-slate-500">
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-indigo-500" /> 250,000 metrics / month</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-indigo-500" /> Unlimited dashboard panels</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-indigo-500" /> 30 days data retention</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-indigo-500" /> Team workspaces (5 seats)</li>
                </ul>
              </div>
              <button className="w-full text-[10px] font-bold py-2 rounded-lg text-white text-center hover:opacity-95 transition-opacity shadow-md" style={{ background: primary }}>
                Get Started
              </button>
            </motion.div>

            {/* Card 3 */}
            <motion.div 
              className="bg-white border rounded-2xl p-5 flex flex-col justify-between relative shadow-sm" 
              style={{ borderColor: secondary }}
              whileHover={{ y: -4, boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.02)" }}
            >
              <div>
                <h3 className="text-sm font-bold text-slate-800">Enterprise</h3>
                <p className="text-[10px] text-slate-400 mt-1">For secure, high-volume teams.</p>
                <div className="my-5">
                  <span className="text-2xl font-black">Custom</span>
                </div>
                <ul className="text-[10px] space-y-2 mb-8 text-slate-500">
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-indigo-500" /> Unlimited metrics</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-indigo-500" /> Dedicated database storage</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-indigo-500" /> SSO/SAML secure login</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-3.5 h-3.5 text-indigo-500" /> 24/7 dedicated support</li>
                </ul>
              </div>
              <button className="w-full text-[10px] font-bold py-2 border rounded-lg text-slate-700 bg-slate-50 hover:bg-slate-100 text-center transition-colors">
                Contact Sales
              </button>
            </motion.div>

          </div>
        </section>

        {/* Testimonials Section */}
        <section className="px-6 py-16 bg-white border-t w-full" style={{ borderColor: secondary }}>
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                Testimonials
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-800 mt-4 mb-3">
                Trusted by builders worldwide
              </h2>
              <p className="text-xs text-slate-500">
                Here is what founders, developers, and product managers say about SaaSFlow.
              </p>
            </div>
            
            <div className="grid grid-cols-1 @sm:grid-cols-2 @md:grid-cols-3 gap-6 text-slate-900">
              {[
                {
                  quote: "SaaSFlow cut our API latency monitoring setup from weeks to just under ten minutes. The live traffic graphs are incredibly responsive.",
                  author: "Sarah Chen",
                  role: "VP of Engineering at CloudScale",
                  initials: "SC",
                  colorClass: "bg-amber-100 text-amber-700"
                },
                {
                  quote: "Being able to see user stream analytics in real-time has completely changed how we handle feature rollouts and performance optimization.",
                  author: "Alex Mercer",
                  role: "Lead Developer at DevStream",
                  initials: "AM",
                  colorClass: "bg-emerald-100 text-emerald-700"
                },
                {
                  quote: "The billing integrations and dashboard flexibility are unmatched. We run our entire usage-based metric aggregation through SaaSFlow.",
                  author: "Elena Rostova",
                  role: "Product Director at PayFlow",
                  initials: "ER",
                  colorClass: "bg-sky-100 text-sky-700"
                }
              ].map((review, i) => (
                <motion.div 
                  key={i}
                  className="bg-slate-50 p-5 rounded-2xl border flex flex-col justify-between shadow-sm"
                  style={{ borderColor: secondary }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <p className="text-[11px] text-slate-600 italic leading-relaxed mb-6">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 select-none ${review.colorClass}`}>
                      {review.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{review.author}</h4>
                      <p className="text-[9px] text-slate-400">{review.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Refactored Footer */}
        <footer className="mt-auto border-t bg-slate-50 py-12 px-6" style={{ borderColor: secondary }}>
          <div className="max-w-4xl mx-auto grid grid-cols-2 @md:grid-cols-4 gap-8 mb-8 text-left text-slate-900">
            <div>
              <h4 className="text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-3">Product</h4>
              <ul className="space-y-2 text-[10px] text-slate-500">
                <li><span className="hover:text-indigo-600 cursor-pointer transition-colors">Features</span></li>
                <li><span className="hover:text-indigo-600 cursor-pointer transition-colors">Integrations</span></li>
                <li><span className="hover:text-indigo-600 cursor-pointer transition-colors">Pricing</span></li>
                <li><span className="hover:text-indigo-600 cursor-pointer transition-colors">Changelog</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-3">Resources</h4>
              <ul className="space-y-2 text-[10px] text-slate-500">
                <li><span className="hover:text-indigo-600 cursor-pointer transition-colors">Documentation</span></li>
                <li><span className="hover:text-indigo-600 cursor-pointer transition-colors">API Reference</span></li>
                <li><span className="hover:text-indigo-600 cursor-pointer transition-colors">Status</span></li>
                <li><span className="hover:text-indigo-600 cursor-pointer transition-colors">Community</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-3">Company</h4>
              <ul className="space-y-2 text-[10px] text-slate-500">
                <li><span className="hover:text-indigo-600 cursor-pointer transition-colors">About Us</span></li>
                <li><span className="hover:text-indigo-600 cursor-pointer transition-colors">Careers</span></li>
                <li><span className="hover:text-indigo-600 cursor-pointer transition-colors">Press Kit</span></li>
                <li><span className="hover:text-indigo-600 cursor-pointer transition-colors">Contact</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-slate-800 uppercase tracking-wider mb-3">Legal</h4>
              <ul className="space-y-2 text-[10px] text-slate-500">
                <li><span className="hover:text-indigo-600 cursor-pointer transition-colors">Privacy Policy</span></li>
                <li><span className="hover:text-indigo-600 cursor-pointer transition-colors">Terms of Service</span></li>
                <li><span className="hover:text-indigo-600 cursor-pointer transition-colors">Security</span></li>
                <li><span className="hover:text-indigo-600 cursor-pointer transition-colors">SLA Agreement</span></li>
              </ul>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto pt-6 border-t flex flex-col @sm:flex-row items-center justify-between gap-4" style={{ borderColor: secondary }}>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-indigo-600 flex items-center justify-center text-white font-black text-xs">S</div>
              <span className="text-[10px] font-bold text-slate-500">
                &copy; {new Date().getFullYear()} SaaSFlow Platform Inc. All rights reserved.
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              {[
                { icon: GitHubIcon, href: "https://github.com" },
                { icon: TwitterIcon, href: "https://twitter.com" },
                { icon: LinkedinIcon, href: "https://linkedin.com" },
                { icon: YoutubeIcon, href: "https://youtube.com" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-slate-400 hover:text-indigo-600 hover:scale-110 transition-all duration-200"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
