"use client";

import React, { useState } from 'react';
import { Template } from '@/lib/data';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, UserCheck, Star, Play, CheckCircle, Clock } from 'lucide-react';

export function EducationModern({ t }: { t: Template }) {
  const { primary, bg, text, secondary } = t.colorScheme;
  const [selectedCat, setSelectedCat] = useState("All");

  const courses = [
    { id: 1, name: "Advanced Web Dev: React & Next.js", instructor: "Jin Woo Park", level: "Intermediate", rating: 4.9, hours: 24, cat: "Development" },
    { id: 2, name: "Intro to UI/UX Design Principles", instructor: "Alara Thorne", level: "Beginner", rating: 4.8, hours: 16, cat: "Design" },
    { id: 3, name: "Corporate Financial Analysis 101", instructor: "Sanjay Kumar", level: "Beginner", rating: 4.7, hours: 12, cat: "Business" },
    { id: 4, name: "Motion Graphic design Masterclass", instructor: "Clara Vane", level: "Advanced", rating: 4.9, hours: 20, cat: "Design" }
  ];

  const filteredCourses = selectedCat === "All" ? courses : courses.filter(c => c.cat === selectedCat);

  return (
    <div className="min-h-full flex flex-col bg-slate-50 @container relative overflow-hidden" style={{ color: text }}>
      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden">
      {/* Header */}
      <header className="px-6 py-3 bg-white border-b flex items-center justify-between sticky top-0 z-50" style={{ borderColor: secondary }}>
        <div className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-purple-600" />
          <span className="font-bold text-sm tracking-tight text-slate-800">EDUPATH LMS</span>
        </div>
        <nav className="hidden @md:flex gap-6 text-[11px] font-semibold text-slate-500">
          <span className="hover:text-black cursor-pointer">Courses</span>
          <span className="hover:text-black cursor-pointer">Instructors</span>
          <span className="hover:text-black cursor-pointer">LMS Portal</span>
          <span className="hover:text-black cursor-pointer">Pricing</span>
        </nav>
        <button className="text-[10px] font-bold px-3.5 py-1.5 rounded-lg text-white" style={{ background: primary }}>
          Student Dashboard
        </button>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-14 max-w-4xl mx-auto text-center flex flex-col items-center">
        <span className="text-[9px] font-bold tracking-widest uppercase bg-purple-50 text-purple-600 px-3 py-1 rounded-full mb-4">
          World Class E-Learning Platform
        </span>
        <h1 className="text-3xl @md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
          Learn design, coding,<br />and business skills.
        </h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto mb-8 leading-relaxed">
          {t.description || "EduPath is a feature-rich learning management portal offering self-paced premium courses, student analytics dashboards, and direct mentoring."}
        </p>

        {/* Course Search Box */}
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm border p-2 flex gap-2" style={{ borderColor: secondary }}>
          <input type="text" placeholder="Search web development, Figma..." className="flex-1 text-[11px] px-3 py-1.5 outline-none bg-slate-50 rounded" />
          <button className="text-[10px] font-bold px-4 py-2 rounded text-white" style={{ background: primary }}>
            Search Courses
          </button>
        </div>
      </section>

      {/* Student Metrics Section */}
      <section className="py-8 bg-purple-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 @md:grid-cols-4 gap-6">
          <div className="p-2">
            <h4 className="text-2xl font-black">15,000+</h4>
            <p className="text-[8px] uppercase tracking-wider text-purple-200 mt-1">Active Students Enrolled</p>
          </div>
          <div className="p-2">
            <h4 className="text-2xl font-black">450+</h4>
            <p className="text-[8px] uppercase tracking-wider text-purple-200 mt-1">Professional Courses</p>
          </div>
          <div className="p-2">
            <h4 className="text-2xl font-black">94.8%</h4>
            <p className="text-[8px] uppercase tracking-wider text-purple-200 mt-1">Course Completion Ratio</p>
          </div>
          <div className="p-2">
            <h4 className="text-2xl font-black">100%</h4>
            <p className="text-[8px] uppercase tracking-wider text-purple-200 mt-1">Self-Paced Flexible Schedules</p>
          </div>
        </div>
      </section>

      {/* Course Catalog Grid */}
      <section className="px-6 py-12 max-w-5xl mx-auto w-full">
        <div className="flex flex-col @md:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h2 className="text-base font-bold">Featured Courses</h2>
            <p className="text-xs text-slate-400 mt-0.5">Learn from industry veterans.</p>
          </div>
          
          {/* Filters */}
          <div className="flex gap-2 text-[9px] font-bold uppercase tracking-wider">
            {["All", "Development", "Design", "Business"].map((cat) => (
              <button 
                key={cat} 
                className={`px-3 py-1 rounded-full border transition-all ${selectedCat === cat ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}
                onClick={() => setSelectedCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog */}
        <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white border rounded-xl p-3.5 flex flex-col justify-between hover:shadow-md transition-shadow" style={{ borderColor: secondary }}>
              <div>
                <span className="text-[8px] font-bold uppercase bg-purple-50 text-purple-600 px-2 py-0.5 rounded">
                  {course.cat}
                </span>
                <h4 className="text-xs font-bold text-neutral-800 mt-3 line-clamp-2 leading-snug">{course.name}</h4>
                <p className="text-[10px] text-slate-400 mt-1">By {course.instructor}</p>
                
                <div className="flex items-center gap-2 mt-4 text-[9px] text-slate-500">
                  <span className="flex items-center gap-0.5"><Clock className="w-3.5 h-3.5" /> {course.hours} hrs</span>
                  <span className="opacity-30">|</span>
                  <span>{course.level}</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-t pt-3 mt-4" style={{ borderColor: secondary }}>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-[10px] font-bold text-slate-700">{course.rating}</span>
                </div>
                <button className="text-[9px] font-bold uppercase tracking-wider text-purple-600 flex items-center gap-0.5 hover:underline">
                  Join <Play className="w-2.5 h-2.5 fill-purple-600" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Student Progress Dashboard Mockup */}
      <section className="px-6 py-12 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 @md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-[8px] font-bold uppercase tracking-widest text-purple-400">EduPath Portal</span>
            <h2 className="text-xl @md:text-2xl font-bold mt-2 mb-4">Track your skill acquisition</h2>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Every course comes with interactive code sandboxes and project uploads. Monitor your grade progress, active learning minutes, and unlock verified certificates directly on LinkedIn.
            </p>
            <button className="text-[10px] font-bold px-4 py-2 rounded bg-purple-600 hover:bg-purple-500">
              Access Student Portal
            </button>
          </div>

          {/* Student Dashboard Mock */}
          <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 text-left text-[10px]">
            <div className="flex justify-between items-center border-b border-slate-700 pb-3 mb-4">
              <span className="font-bold">Student Progress: Sarah Jenkins</span>
              <span className="bg-purple-900/60 text-purple-200 px-2 py-0.5 rounded text-[8px] font-bold">Pro Account</span>
            </div>

            <div className="space-y-4">
              {/* Course 1 */}
              <div>
                <div className="flex justify-between text-[9px] mb-1">
                  <span className="font-bold">Advanced Web Dev: React & Next.js</span>
                  <span className="text-purple-300">72% Completed</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '72%' }} ></div>
                </div>
              </div>
              
              {/* Course 2 */}
              <div>
                <div className="flex justify-between text-[9px] mb-1">
                  <span className="font-bold">Intro to UI/UX Design Principles</span>
                  <span className="text-purple-300">45% Completed</span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '45%' }} ></div>
                </div>
              </div>

              {/* Achievements row */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[9px]">
                <div className="p-2 bg-slate-900 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <span>2 Certificates</span>
                </div>
                <div className="p-2 bg-slate-900 rounded-lg">
                  <Clock className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                  <span>34h Logged</span>
                </div>
                <div className="p-2 bg-slate-900 rounded-lg">
                  <GraduationCap className="w-4 h-4 text-sky-400 mx-auto mb-1" />
                  <span>Grade A avg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Showcase */}
      <section className="px-6 py-14 max-w-5xl mx-auto w-full text-center">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">Expert Mentors</h2>
        <div className="grid grid-cols-2 @md:grid-cols-4 gap-6">
          {[
            { name: "Alara Thorne", title: "UX Specialist", courses: "8 Design Courses" },
            { name: "Jin Woo Park", title: "Next.js Core dev", courses: "12 Dev Courses" },
            { name: "Sanjay Kumar", title: "Business Consultant", courses: "6 Management Courses" },
            { name: "Clara Vane", title: "Motion Animator", courses: "4 Graphics Courses" }
          ].map((inst, i) => (
            <div key={i} className="p-4 border bg-white rounded-xl" style={{ borderColor: secondary }}>
              <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto flex items-center justify-center font-black text-purple-600 mb-3">
                {inst.name.split(' ').map(n=>n[0]).join('')}
              </div>
              <h4 className="text-xs font-bold">{inst.name}</h4>
              <p className="text-[8px] text-slate-400 uppercase tracking-wider mt-1">{inst.title}</p>
              <p className="text-[9px] text-slate-500 mt-2 font-semibold">{inst.courses}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t bg-slate-100 py-6 px-6 text-xs text-slate-400 text-center" style={{ borderColor: secondary }}>
        &copy; {new Date().getFullYear()} EduPath LMS. All rights reserved.
      </footer>
      </div>
    </div>
  );
}
