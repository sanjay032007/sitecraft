"use client";

import React, { useState } from 'react';
import { Template } from '@/lib/data';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Heart, Stethoscope, Calendar, Check } from 'lucide-react';

export function HealthcareGlass({ t }: { t: Template }) {
  const { primary, bg, text, secondary } = t.colorScheme;
  const [booked, setBooked] = useState(false);

  return (
    <div className="@container w-full h-full min-h-full flex flex-col relative overflow-hidden bg-[#03111c] text-white">
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-10%] left-[20%] w-[50%] h-[50%] rounded-full mix-blend-screen filter blur-[80px] opacity-25" style={{ background: '#06b6d4' }}></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] rounded-full mix-blend-screen filter blur-[80px] opacity-20" style={{ background: primary }}></div>

      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden scrollbar-none pointer-events-auto">
      {/* Header */}
      <header className="px-6 py-3 border-b border-white/5 flex items-center justify-between sticky top-0 z-50 bg-[#03111c]/50 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-cyan-400" />
          <span className="font-bold text-sm tracking-tight text-white/90">Vitalix Health</span>
        </div>
        <nav className="hidden @md:flex gap-6 text-[11px] font-semibold text-white/50">
          <span className="hover:text-white cursor-pointer">Services</span>
          <span className="hover:text-white cursor-pointer">Doctors</span>
          <span className="hover:text-white cursor-pointer">Health Portal</span>
          <span className="hover:text-white cursor-pointer">Support</span>
        </nav>
        <button className="text-[10px] font-bold px-3 py-1.5 rounded-lg border border-red-500/30 bg-red-950/20 text-red-400 hover:bg-red-950/40">
          Emergency Call
        </button>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-14 max-w-4xl mx-auto text-center relative z-10">
        <span className="inline-flex items-center gap-1.5 text-[8px] font-extrabold uppercase border border-white/10 bg-white/5 text-cyan-400 px-3 py-1 rounded-full mb-3 backdrop-blur-md">
          <ShieldCheck className="w-3.5 h-3.5" /> HIPAA Compliant Medical Systems
        </span>
        <h1 className="text-3xl @md:text-5xl font-extrabold tracking-tight leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
          Trusted clinical care,<br />empowered by technology.
        </h1>
        <p className="text-xs text-white/60 max-w-lg mx-auto mb-8 leading-relaxed">
          {t.description || "Medicare Pro provides comprehensive healthcare services, direct appointments booking, and remote patient portal analytics for continuous health tracking."}
        </p>
        
        {/* Quick Booking Form Card */}
        <div className="w-full border border-white/10 bg-white/5 backdrop-blur-xl rounded-xl shadow-2xl p-4 text-left max-w-2xl mx-auto">
          <h3 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">Instant Appointment Booking</h3>
          
          <div className="grid grid-cols-1 @md:grid-cols-3 gap-3">
            <div>
              <label className="text-[8px] font-extrabold uppercase text-white/45 block mb-1">Select Department</label>
              <select className="w-full text-[10px] border border-white/10 bg-white/5 text-white rounded p-1.5 outline-none">
                <option className="bg-[#03111c] text-white">General Medicine</option>
                <option className="bg-[#03111c] text-white">Cardiology</option>
                <option className="bg-[#03111c] text-white">Pediatrics</option>
                <option className="bg-[#03111c] text-white">Diagnostics</option>
              </select>
            </div>
            <div>
              <label className="text-[8px] font-extrabold uppercase text-white/45 block mb-1">Preferred Date</label>
              <input type="date" className="w-full text-[10px] border border-white/10 bg-white/5 text-white rounded p-1.5 outline-none" defaultValue="2026-06-10" />
            </div>
            <div className="flex items-end">
              <button 
                className="w-full text-[10px] font-bold py-2 rounded text-white border border-white/20 bg-white/10 hover:bg-white/20 transition-all text-center flex items-center justify-center gap-1"
                onClick={() => setBooked(true)}
              >
                {booked ? <><Check className="w-3 h-3"/> Booked!</> : "Confirm Appointment"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="px-6 py-10 max-w-5xl mx-auto w-full relative z-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6 text-center">Clinical Services</h2>
        <div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
          {[
            { title: "General Care", desc: "Routine checkups, physical exams, and immunizations." },
            { title: "Cardiology", desc: "Electrocardiograms, heart health diagnostics and treatment." },
            { title: "Pediatrics", desc: "Specialized clinical attention for infants, children, and teens." },
            { title: "Diagnostics", desc: "Precision blood tests, X-rays, and MRI scans." }
          ].map((srv, idx) => (
            <div key={idx} className="p-4 border border-white/10 bg-white/5 backdrop-blur-xl rounded-xl hover:border-white/25 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center mb-3">
                <Stethoscope className="w-4 h-4 text-cyan-400" />
              </div>
              <h4 className="text-xs font-bold text-white/95">{srv.title}</h4>
              <p className="text-[10px] text-white/50 mt-1 leading-relaxed">{srv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Medical Analytics Patient Dashboard Preview */}
      <section className="px-6 py-12 border-y border-white/5 bg-white/2 backdrop-blur-md relative z-10">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 @md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-[8px] font-bold uppercase tracking-widest text-cyan-400">Medicare Portal</span>
            <h2 className="text-xl @md:text-2xl font-bold mt-2 mb-4">Remote Patient Vitals Monitoring</h2>
            <p className="text-xs text-white/65 leading-relaxed mb-6">
              Empower patients to connect smart devices directly to Medicare. Track heart rate variability, sleep cycles, and daily step milestones, instantly sharing telemetry records with your primary doctor.
            </p>
            <div className="flex gap-2">
              <button className="text-[10px] font-bold px-4 py-2 rounded border border-white/20 bg-white/10 hover:bg-white/15 text-white">
                Access Patient Login
              </button>
            </div>
          </div>

          {/* Interactive Medical Dashboard mock */}
          <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-xl p-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center font-bold text-[10px]">JD</div>
                <span className="text-[10px] font-bold text-white/90">John Doe (Active Patient)</span>
              </div>
              <span className="text-[8px] uppercase tracking-wider text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" /> Connected
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="p-3 border border-white/10 bg-white/5 rounded-lg">
                <span className="text-[7px] text-white/40 uppercase font-semibold flex items-center gap-1"><Heart className="w-3 h-3 text-red-500" /> Heart Rate</span>
                <p className="text-base font-bold text-white mt-1">72 bpm</p>
                <span className="text-[7px] text-white/45">Normal Range</span>
              </div>
              <div className="p-3 border border-white/10 bg-white/5 rounded-lg">
                <span className="text-[7px] text-white/40 uppercase font-semibold flex items-center gap-1"><Activity className="w-3 h-3 text-cyan-400" /> Blood Oxygen</span>
                <p className="text-base font-bold text-white mt-1">98% SpO2</p>
                <span className="text-[7px] text-white/45">Excellent</span>
              </div>
            </div>

            <div className="p-3 border border-white/10 bg-white/5 rounded-lg">
              <span className="text-[7px] text-white/40 uppercase font-semibold block">Blood Glucose History (24h)</span>
              <div className="flex items-end gap-1 h-12 pt-2">
                {[60, 50, 45, 55, 65, 80, 100, 95, 85, 75, 70, 80].map((val, idx) => (
                  <div key={idx} className="flex-1 rounded-t bg-cyan-500/20 hover:bg-cyan-500 transition-colors" style={{ height: `${val}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Profiles Section */}
      <section className="px-6 py-14 max-w-5xl mx-auto w-full relative z-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6 text-center">Dedicated Specialists</h2>
        <div className="grid grid-cols-1 @md:grid-cols-3 gap-6">
          {[
            { name: "Dr. Sarah Jenkins", specialty: "Cardiologist", exp: "MD - 14 Yrs Exp", rating: "4.9/5" },
            { name: "Dr. Robert Chen", specialty: "Pediatrician", exp: "MD - 10 Yrs Exp", rating: "4.8/5" },
            { name: "Dr. Elena Rostova", specialty: "General Physician", exp: "MD - 8 Yrs Exp", rating: "4.9/5" }
          ].map((doc, idx) => (
            <div key={idx} className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-xl p-4 text-center hover:border-white/20 transition-all">
              <div className="w-14 h-14 rounded-full bg-white/10 mx-auto flex items-center justify-center font-bold text-cyan-400 mb-3">
                {doc.name.split(' ').slice(1).map(n => n[0]).join('')}
              </div>
              <h4 className="text-xs font-bold text-white">{doc.name}</h4>
              <p className="text-[9px] uppercase tracking-wider text-white/40 mt-1">{doc.specialty}</p>
              <p className="text-[10px] text-white/50 mt-1">{doc.exp}</p>
              <div className="mt-3 inline-flex items-center gap-1 border border-white/10 bg-white/5 px-2 py-0.5 rounded text-[8px] font-bold text-cyan-400">
                ★ {doc.rating} Rating
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 bg-white/2 py-6 px-6 text-xs text-white/40 text-center relative z-10">
        &copy; {new Date().getFullYear()} Vitalix Health Professional. All rights reserved.
      </footer>
      </div>
    </div>
  );
}
