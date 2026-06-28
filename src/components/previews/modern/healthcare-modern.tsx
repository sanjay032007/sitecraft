"use client";

import React, { useState } from 'react';
import { Template } from '@/lib/data';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Heart, User, Calendar, Stethoscope, ChevronRight, Check } from 'lucide-react';

export function HealthcareModern({ t }: { t: Template }) {
  const { primary, bg, text, secondary } = t.colorScheme;
  const [booked, setBooked] = useState(false);

  return (
    <div className="min-h-full flex flex-col bg-slate-50 @container relative overflow-hidden" style={{ color: text }}>
      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden">
      {/* Header */}
      <header className="px-6 py-3 bg-white border-b flex items-center justify-between sticky top-0 z-50" style={{ borderColor: secondary }}>
        <div className="flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-sky-600" />
          <span className="font-bold text-sm tracking-tight text-slate-800">MEDICARE PRO</span>
        </div>
        <nav className="hidden @md:flex gap-6 text-[11px] font-semibold text-slate-500">
          <span className="hover:text-black cursor-pointer">Services</span>
          <span className="hover:text-black cursor-pointer">Doctors</span>
          <span className="hover:text-black cursor-pointer">Health Portal</span>
          <span className="hover:text-black cursor-pointer">Support</span>
        </nav>
        <button className="text-[10px] font-bold px-3 py-1.5 rounded-lg text-white" style={{ background: primary }}>
          Emergency Call
        </button>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-14 max-w-4xl mx-auto text-center">
        <span className="inline-flex items-center gap-1.5 text-[8px] font-extrabold uppercase bg-sky-50 text-sky-600 px-3 py-1 rounded-full mb-3">
          <ShieldCheck className="w-3.5 h-3.5" /> HIPAA Compliant Medical Systems
        </span>
        <h1 className="text-3xl @md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
          Trusted clinical care,<br />empowered by technology.
        </h1>
        <p className="text-xs text-slate-500 max-w-lg mx-auto mb-8 leading-relaxed">
          {t.description || "Medicare Pro provides comprehensive healthcare services, direct appointments booking, and remote patient portal analytics for continuous health tracking."}
        </p>
        
        {/* Quick Booking Form Card */}
        <div className="w-full bg-white rounded-xl shadow-md border p-4 text-left max-w-2xl mx-auto" style={{ borderColor: secondary }}>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Instant Appointment Booking</h3>
          
          <div className="grid grid-cols-1 @md:grid-cols-3 gap-3">
            <div>
              <label className="text-[8px] font-extrabold uppercase text-slate-400 block mb-1">Select Department</label>
              <select className="w-full text-[10px] border rounded p-1.5 bg-slate-50">
                <option>General Medicine</option>
                <option>Cardiology</option>
                <option>Pediatrics</option>
                <option>Diagnostics</option>
              </select>
            </div>
            <div>
              <label className="text-[8px] font-extrabold uppercase text-slate-400 block mb-1">Preferred Date</label>
              <input type="date" className="w-full text-[10px] border rounded p-1.5 bg-slate-50" defaultValue="2026-06-10" />
            </div>
            <div className="flex items-end">
              <button 
                className="w-full text-[10px] font-bold py-2 rounded text-white transition-all text-center flex items-center justify-center gap-1"
                style={{ background: primary }}
                onClick={() => setBooked(true)}
              >
                {booked ? <><Check className="w-3 h-3"/> Booked!</> : "Confirm Appointment"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="px-6 py-10 max-w-5xl mx-auto w-full">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 text-center">Clinical Services</h2>
        <div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
          {[
            { title: "General Care", desc: "Routine checkups, physical exams, and immunizations." },
            { title: "Cardiology", desc: "Electrocardiograms, heart health diagnostics and treatment." },
            { title: "Pediatrics", desc: "Specialized clinical attention for infants, children, and teens." },
            { title: "Diagnostics", desc: "Precision blood tests, X-rays, and MRI scans." }
          ].map((srv, idx) => (
            <div key={idx} className="p-4 bg-white border rounded-xl hover:shadow-sm" style={{ borderColor: secondary }}>
              <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center mb-3">
                <Stethoscope className="w-4 h-4 text-sky-600" />
              </div>
              <h4 className="text-xs font-bold text-neutral-800">{srv.title}</h4>
              <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">{srv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Medical Analytics Patient Dashboard Preview */}
      <section className="px-6 py-12 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 @md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-[8px] font-bold uppercase tracking-widest text-sky-400">Medicare Portal</span>
            <h2 className="text-xl @md:text-2xl font-bold mt-2 mb-4">Remote Patient Vitals Monitoring</h2>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Empower patients to connect smart devices directly to Medicare. Track heart rate variability, sleep cycles, and daily step milestones, instantly sharing telemetry records with your primary doctor.
            </p>
            <div className="flex gap-2">
              <button className="text-[10px] font-bold px-4 py-2 rounded bg-sky-600 text-white hover:bg-sky-500">
                Access Patient Login
              </button>
            </div>
          </div>

          {/* Interactive Medical Dashboard mock */}
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
            <div className="flex justify-between items-center border-b border-slate-700 pb-2.5 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center font-bold text-[10px]">JD</div>
                <span className="text-[10px] font-bold">John Doe (Active Patient)</span>
              </div>
              <span className="text-[8px] uppercase tracking-wider text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" /> Connected
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="p-3 bg-slate-900 rounded-lg">
                <span className="text-[7px] text-slate-400 uppercase font-semibold flex items-center gap-1"><Heart className="w-3 h-3 text-red-500" /> Heart Rate</span>
                <p className="text-base font-bold text-white mt-1">72 bpm</p>
                <span className="text-[7px] text-slate-500">Normal Range</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-lg">
                <span className="text-[7px] text-slate-400 uppercase font-semibold flex items-center gap-1"><Activity className="w-3 h-3 text-sky-500" /> Blood Oxygen</span>
                <p className="text-base font-bold text-white mt-1">98% SpO2</p>
                <span className="text-[7px] text-slate-500">Excellent</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900 rounded-lg">
              <span className="text-[7px] text-slate-400 uppercase font-semibold block">Blood Glucose History (24h)</span>
              <div className="flex items-end gap-1 h-12 pt-2">
                {[60, 50, 45, 55, 65, 80, 100, 95, 85, 75, 70, 80].map((val, idx) => (
                  <div key={idx} className="flex-1 rounded-t bg-sky-500/20 hover:bg-sky-500 transition-colors" style={{ height: `${val}%` }} ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Profiles Section */}
      <section className="px-6 py-14 max-w-5xl mx-auto w-full">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 text-center">Dedicated Specialists</h2>
        <div className="grid grid-cols-1 @md:grid-cols-3 gap-6">
          {[
            { name: "Dr. Sarah Jenkins", specialty: "Cardiologist", exp: "MD - 14 Yrs Exp", rating: "4.9/5" },
            { name: "Dr. Robert Chen", specialty: "Pediatrician", exp: "MD - 10 Yrs Exp", rating: "4.8/5" },
            { name: "Dr. Elena Rostova", specialty: "General Physician", exp: "MD - 8 Yrs Exp", rating: "4.9/5" }
          ].map((doc, idx) => (
            <div key={idx} className="bg-white border rounded-xl p-4 text-center hover:shadow-md transition-all" style={{ borderColor: secondary }}>
              <div className="w-14 h-14 rounded-full bg-slate-100 mx-auto flex items-center justify-center font-bold text-sky-600 mb-3">
                {doc.name.split(' ').slice(1).map(n => n[0]).join('')}
              </div>
              <h4 className="text-xs font-bold">{doc.name}</h4>
              <p className="text-[9px] uppercase tracking-wider text-slate-400 mt-1">{doc.specialty}</p>
              <p className="text-[10px] text-slate-500 mt-1">{doc.exp}</p>
              <div className="mt-3 inline-flex items-center gap-1 bg-sky-50 px-2 py-0.5 rounded text-[8px] font-bold text-sky-700">
                ★ {doc.rating} Rating
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t bg-slate-100 py-6 px-6 text-xs text-slate-400 text-center" style={{ borderColor: secondary }}>
        &copy; {new Date().getFullYear()} Medicare Professional. All rights reserved.
      </footer>
      </div>
    </div>
  );
}
