"use client";

import React from 'react';
import { Template } from '@/lib/data';
import { motion } from 'framer-motion';
import { Building2, ArrowUpRight, Shield, Award, Users, Globe, ChevronRight } from 'lucide-react';

export function BusinessModern({ t }: { t: Template }) {
  const { primary, bg, text, secondary, accent } = t.colorScheme;

  return (
    <div className="min-h-full flex flex-col @container relative overflow-hidden" style={{ background: bg, color: text }}>
      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden">
      {/* Navbar */}
      <header className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-50 flex items-center justify-between px-6 py-3" style={{ borderColor: secondary }}>
        <div className="flex items-center gap-2">
          <Building2 className="w-5 h-5" style={{ color: primary }} />
          <span className="font-extrabold text-sm tracking-tight">NEXUS CORP</span>
        </div>
        <nav className="hidden @md:flex gap-6 text-[11px] font-semibold opacity-70">
          <span className="hover:opacity-100 cursor-pointer">Solutions</span>
          <span className="hover:opacity-100 cursor-pointer">Case Studies</span>
          <span className="hover:opacity-100 cursor-pointer">About Us</span>
          <span className="hover:opacity-100 cursor-pointer">Careers</span>
        </nav>
        <button className="text-[10px] font-bold px-3 py-1.5 rounded-lg text-white transition-opacity hover:opacity-90" style={{ background: primary }}>
          Contact Sales
        </button>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 text-center max-w-4xl mx-auto flex flex-col items-center">
        <span className="text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4" style={{ background: secondary, color: primary }}>
          Enterprise Management Platform
        </span>
        <h1 className="text-3xl @md:text-5xl font-black tracking-tight leading-tight mb-4 max-w-3xl">
          Scale your enterprise operations with certainty.
        </h1>
        <p className="text-sm opacity-70 max-w-xl mb-8 leading-relaxed">
          {t.description || "Nexus Corporate provides industry-leading solutions for corporate efficiency, compliance, and technological integration across global subsidiaries."}
        </p>
        <div className="flex gap-3">
          <button className="text-[11px] font-bold px-5 py-2.5 rounded-lg text-white shadow-md transition-transform hover:-translate-y-0.5" style={{ background: primary }}>
            Request Consultation
          </button>
          <button className="text-[11px] font-bold px-5 py-2.5 rounded-lg border transition-colors hover:bg-neutral-50" style={{ borderColor: primary, color: primary }}>
            Read Whitepaper
          </button>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="py-6 border-y text-center" style={{ borderColor: secondary, background: '#f8fafc' }}>
        <p className="text-[9px] font-semibold tracking-wider text-slate-400 uppercase mb-4">Trusted by Market Leaders</p>
        <div className="flex flex-wrap justify-center gap-8 @md:gap-12 items-center opacity-40">
          <span className="font-extrabold text-xs tracking-widest">VERTEX</span>
          <span className="font-bold text-xs tracking-wide">APEX GROUP</span>
          <span className="font-semibold text-xs tracking-wider">PRIME INC</span>
          <span className="font-black text-xs">VANGUARD</span>
          <span className="font-medium text-xs tracking-widest">NUCLEUS</span>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="px-6 py-14 max-w-5xl mx-auto w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-xl font-bold">Featured Case Studies</h2>
            <p className="text-xs opacity-60 mt-1">How we guide enterprises through digital transformation.</p>
          </div>
          <span className="text-[10px] font-bold flex items-center gap-1 cursor-pointer hover:underline" style={{ color: primary }}>
            All cases <ChevronRight className="w-3 h-3" />
          </span>
        </div>

        <div className="grid grid-cols-1 @md:grid-cols-2 gap-6">
          <div className="border rounded-xl p-5 flex flex-col justify-between hover:shadow-md transition-shadow" style={{ borderColor: secondary }}>
            <div>
              <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">Financial Technology</span>
              <h3 className="text-base font-bold mt-2 mb-3">Modernizing global treasury operations for Apex Group</h3>
              <p className="text-xs opacity-70 leading-relaxed mb-6">
                Reduced multi-currency transaction delays by 42% through automated liquidity routing pipelines and local banking integration.
              </p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: secondary }}>
              <div>
                <span className="text-sm font-extrabold" style={{ color: primary }}>42%</span>
                <span className="text-[8px] block uppercase text-slate-400">Delay Reduction</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="border rounded-xl p-5 flex flex-col justify-between hover:shadow-md transition-shadow" style={{ borderColor: secondary }}>
            <div>
              <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">Logistics & Supply</span>
              <h3 className="text-base font-bold mt-2 mb-3">Supply chain risk mitigation for Prime Incorporated</h3>
              <p className="text-xs opacity-70 leading-relaxed mb-6">
                Deployed ML forecasting models to predict hardware parts delays, resulting in $12M saved in operational disruptions.
              </p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: secondary }}>
              <div>
                <span className="text-sm font-extrabold" style={{ color: primary }}>$12M</span>
                <span className="text-[8px] block uppercase text-slate-400">Operational Savings</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Revenue & Growth Metrics Section */}
      <section className="py-12 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 @md:grid-cols-4 gap-6">
          <div className="p-4">
            <h4 className="text-2xl font-black text-white">$450M+</h4>
            <p className="text-[8px] uppercase tracking-wider text-slate-400 mt-1">Annual Client Transaction Volume</p>
          </div>
          <div className="p-4">
            <h4 className="text-2xl font-black text-white">99.98%</h4>
            <p className="text-[8px] uppercase tracking-wider text-slate-400 mt-1">SLA Uptime Commitment Guarantee</p>
          </div>
          <div className="p-4">
            <h4 className="text-2xl font-black text-white">120+</h4>
            <p className="text-[8px] uppercase tracking-wider text-slate-400 mt-1">Global Corporate Entities Managed</p>
          </div>
          <div className="p-4">
            <h4 className="text-2xl font-black text-white">15+ Yrs</h4>
            <p className="text-[8px] uppercase tracking-wider text-slate-400 mt-1">Combined Advisory Excellence</p>
          </div>
        </div>
      </section>

      {/* Executive Leadership Section */}
      <section className="px-6 py-14 max-w-5xl mx-auto w-full">
        <h2 className="text-xl font-bold mb-2 text-center">Executive Leadership</h2>
        <p className="text-xs opacity-60 text-center mb-8">Dedicated expertise driving corporate governance and strategy.</p>
        
        <div className="grid grid-cols-1 @sm:grid-cols-3 gap-6">
          <div className="border rounded-xl p-4 text-center hover:shadow-sm transition-shadow" style={{ borderColor: secondary }}>
            <div className="w-16 h-16 rounded-full bg-slate-100 mx-auto flex items-center justify-center font-bold text-lg mb-3" style={{ color: primary }}>
              SK
            </div>
            <h4 className="text-sm font-bold">Sanjay Kumar</h4>
            <p className="text-[9px] uppercase tracking-wider text-slate-400 mb-2">Chief Executive Officer</p>
            <p className="text-[10px] opacity-75 leading-relaxed">Prior Partner at McKinsey & Co, 18 years in executive enterprise advisory.</p>
          </div>

          <div className="border rounded-xl p-4 text-center hover:shadow-sm transition-shadow" style={{ borderColor: secondary }}>
            <div className="w-16 h-16 rounded-full bg-slate-100 mx-auto flex items-center justify-center font-bold text-lg mb-3" style={{ color: primary }}>
              AM
            </div>
            <h4 className="text-sm font-bold">Aveline Mercer</h4>
            <p className="text-[9px] uppercase tracking-wider text-slate-400 mb-2">VP of Strategy & Growth</p>
            <p className="text-[10px] opacity-75 leading-relaxed">Ex-Head of Corporate Development at Stripe. Focuses on global M&A.</p>
          </div>

          <div className="border rounded-xl p-4 text-center hover:shadow-sm transition-shadow" style={{ borderColor: secondary }}>
            <div className="w-16 h-16 rounded-full bg-slate-100 mx-auto flex items-center justify-center font-bold text-lg mb-3" style={{ color: primary }}>
              DR
            </div>
            <h4 className="text-sm font-bold">Dr. David Rhee</h4>
            <p className="text-[9px] uppercase tracking-wider text-slate-400 mb-2">Director of Compliance</p>
            <p className="text-[10px] opacity-75 leading-relaxed">Doctor of Law from Harvard. Expert in international trade and compliance rules.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t bg-slate-50 py-8 px-6 text-xs text-slate-500" style={{ borderColor: secondary }}>
        <div className="max-w-5xl mx-auto flex flex-col @md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-1.5 font-bold text-slate-800">
            <Building2 className="w-4 h-4 text-slate-600" />
            <span>NEXUS CORP</span>
          </div>
          <div className="flex gap-4">
            <span className="hover:text-slate-800 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-800 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-800 cursor-pointer">Sitemap</span>
          </div>
          <p className="text-[10px]">&copy; {new Date().getFullYear()} Nexus Corp. All rights reserved.</p>
        </div>
      </footer>
      </div>
    </div>
  );
}
