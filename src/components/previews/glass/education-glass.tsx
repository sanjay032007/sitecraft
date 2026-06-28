"use client";

import React, { useState } from 'react';
import { Template } from '@/lib/data';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Clock, Star, Play, CheckCircle } from 'lucide-react';

export function EducationGlass({ t }: { t: Template }) {
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
    <div className="@container w-full h-full min-h-full flex flex-col relative overflow-hidden bg-[#0c0c1a] text-white">
      {/* Dynamic Background Glows */}
      <div className="absolute top-[-10%] left-[20%] w-[50%] h-[50%] rounded-full mix-blend-screen filter blur-[80px] opacity-25" style={{ background: '#7c3aed' }}></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] rounded-full mix-blend-screen filter blur-[80px] opacity-20" style={{ background: '#f59e0b' }}></div>

      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden scrollbar-none pointer-events-auto">
      {/* Header */}
      <header className="px-6 py-3 border-b border-white/5 flex items-center justify-between sticky top-0 z-50 bg-[#0c0c1a]/50 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-purple-400" />
          <span className="font-bold text-sm tracking-tight text-white/90">Luminary Academy</span>
        </div>
        <nav className="hidden @md:flex gap-6 text-[11px] font-semibold text-white/50">
          <span className="hover:text-white cursor-pointer">Courses</span>
          <span className="hover:text-white cursor-pointer">Instructors</span>
          <span className="hover:text-white cursor-pointer">LMS Portal</span>
          <span className="hover:text-white cursor-pointer">Pricing</span>
        </nav>
        <button className="text-[10px] font-bold px-3.5 py-1.5 rounded-lg border border-white/20 bg-white/10 hover:bg-white/20 transition-all">
          Student Dashboard
        </button>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-14 max-w-4xl mx-auto text-center flex flex-col items-center relative z-10">
        <span className="text-[9px] font-bold tracking-widest uppercase border border-white/15 bg-white/5 text-purple-300 px-3 py-1 rounded-full mb-4 backdrop-blur-md">
          World Class E-Learning Platform
        </span>
        <h1 className="text-3xl @md:text-5xl font-extrabold tracking-tight leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
          Learn design, coding,<br />and business skills.
        </h1>
        <p className="text-sm text-white/60 max-w-lg mx-auto mb-8 leading-relaxed">
          {t.description || "Luminary Academy provides self-paced premium video courses, interactive learning maps, and frosted student analytics dashboard panels."}
        </p>

        {/* Course Search Box */}
        <div className="w-full max-w-md border border-white/10 bg-white/5 rounded-lg shadow-2xl p-2 flex gap-2 backdrop-blur-xl">
          <input type="text" placeholder="Search web development, Figma..." className="flex-1 text-[11px] px-3 py-1.5 outline-none bg-white/5 rounded text-white" />
          <button className="text-[10px] font-bold px-4 py-2 rounded border border-white/20 bg-white/15 hover:bg-white/25 transition-all text-white">
            Search Courses
          </button>
        </div>
      </section>

      {/* Student Metrics Section */}
      <section className="py-8 border-y border-white/5 bg-white/2 backdrop-blur-md text-center relative z-10">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 @md:grid-cols-4 gap-6">
          <div className="p-2">
            <h4 className="text-2xl font-black text-white">15,000+</h4>
            <p className="text-[8px] uppercase tracking-wider text-white/40 mt-1">Active Students Enrolled</p>
          </div>
          <div className="p-2">
            <h4 className="text-2xl font-black text-white">450+</h4>
            <p className="text-[8px] uppercase tracking-wider text-white/40 mt-1">Professional Courses</p>
          </div>
          <div className="p-2">
            <h4 className="text-2xl font-black text-white">94.8%</h4>
            <p className="text-[8px] uppercase tracking-wider text-white/40 mt-1">Course Completion Ratio</p>
          </div>
          <div className="p-2">
            <h4 className="text-2xl font-black text-white">100%</h4>
            <p className="text-[8px] uppercase tracking-wider text-white/40 mt-1">Self-Paced Flexible Schedules</p>
          </div>
        </div>
      </section>

      {/* Course Catalog Grid */}
      <section className="px-6 py-12 max-w-5xl mx-auto w-full relative z-10">
        <div className="flex flex-col @md:flex-row justify-between items-center gap-4 mb-8">
          <div>
            <h2 className="text-base font-bold text-white">Featured Courses</h2>
            <p className="text-xs text-white/45 mt-0.5">Learn from industry veterans.</p>
          </div>
          
          {/* Filters */}
          <div className="flex gap-2 text-[9px] font-bold uppercase tracking-wider">
            {["All", "Development", "Design", "Business"].map((cat) => (
              <button 
                key={cat} 
                className={`px-3 py-1 rounded-full border transition-all ${selectedCat === cat ? 'bg-purple-600 text-white border-purple-600' : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'}`}
                onClick={() => setSelectedCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Catalog */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-xl p-3.5 flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <span className="text-[8px] font-bold uppercase border border-white/10 bg-white/5 text-purple-300 px-2 py-0.5 rounded">
                  {course.cat}
                </span>
                <h4 className="text-xs font-bold text-white/90 mt-3 line-clamp-2 leading-snug">{course.name}</h4>
                <p className="text-[10px] text-white/45 mt-1">By {course.instructor}</p>
                
                <div className="flex items-center gap-2 mt-4 text-[9px] text-white/50">
                  <span className="flex items-center gap-0.5"><Clock className="w-3.5 h-3.5" /> {course.hours} hrs</span>
                  <span className="opacity-30">|</span>
                  <span>{course.level}</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-white/10 pt-3 mt-4">
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-[10px] font-bold text-white/70">{course.rating}</span>
                </div>
                <button className="text-[9px] font-bold uppercase tracking-wider text-purple-300 flex items-center gap-0.5 hover:underline">
                  Join <Play className="w-2.5 h-2.5 fill-purple-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Student Progress Dashboard Mockup */}
      <section className="px-6 py-12 border-t border-white/5 bg-white/2 backdrop-blur-md relative z-10">
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 @md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-[8px] font-bold uppercase tracking-widest text-purple-400">EduPath Portal</span>
            <h2 className="text-xl @md:text-2xl font-bold mt-2 mb-4">Track your skill acquisition</h2>
            <p className="text-xs text-white/60 leading-relaxed mb-6">
              Every course comes with interactive code sandboxes and project uploads. Monitor your grade progress, active learning minutes, and unlock verified certificates directly on LinkedIn.
            </p>
            <button className="text-[10px] font-bold px-4 py-2 rounded border border-white/20 bg-white/10 hover:bg-white/15 text-white">
              Access Student Portal
            </button>
          </div>

          {/* Student Dashboard Mock */}
          <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-xl p-4 shadow-2xl text-[10px]">
            <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
              <span className="font-bold">Student Progress: Sarah Jenkins</span>
              <span className="border border-purple-500/30 bg-purple-900/40 text-purple-200 px-2 py-0.5 rounded text-[8px] font-bold">Pro Account</span>
            </div>

            <div className="space-y-4">
              {/* Course 1 */}
              <div>
                <div className="flex justify-between text-[9px] mb-1">
                  <span className="font-bold">Advanced Web Dev: React & Next.js</span>
                  <span className="text-purple-300">72% Completed</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '72%' }} />
                </div>
              </div>
              
              {/* Course 2 */}
              <div>
                <div className="flex justify-between text-[9px] mb-1">
                  <span className="font-bold">Intro to UI/UX Design Principles</span>
                  <span className="text-purple-300">45% Completed</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>

              {/* Achievements row */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[9px]">
                <div className="p-2 border border-white/10 bg-white/5 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <span>2 Certificates</span>
                </div>
                <div className="p-2 border border-white/10 bg-white/5 rounded-lg">
                  <Clock className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                  <span>34h Logged</span>
                </div>
                <div className="p-2 border border-white/10 bg-white/5 rounded-lg">
                  <GraduationCap className="w-4 h-4 text-sky-400 mx-auto mb-1" />
                  <span>Grade A avg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Showcase */}
      <section className="px-6 py-14 max-w-5xl mx-auto w-full text-center relative z-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-8">Expert Mentors</h2>
        <div className="grid grid-cols-2 @md:grid-cols-4 gap-6">
          {[
            { name: "Alara Thorne", title: "UX Specialist", courses: "8 Design Courses" },
            { name: "Jin Woo Park", title: "Next.js Core dev", courses: "12 Dev Courses" },
            { name: "Sanjay Kumar", title: "Business Consultant", courses: "6 Management Courses" },
            { name: "Clara Vane", title: "Motion Animator", courses: "4 Graphics Courses" }
          ].map((inst, i) => (
            <div key={i} className="p-4 border border-white/10 bg-white/5 backdrop-blur-xl rounded-xl">
              <div className="w-12 h-12 rounded-full bg-white/10 mx-auto flex items-center justify-center font-black text-purple-400 mb-3">
                {inst.name.split(' ').map(n=>n[0]).join('')}
              </div>
              <h4 className="text-xs font-bold text-white">{inst.name}</h4>
              <p className="text-[8px] text-white/40 uppercase tracking-wider mt-1">{inst.title}</p>
              <p className="text-[9px] text-white/50 mt-2 font-semibold">{inst.courses}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/10 bg-white/2 py-6 px-6 text-xs text-white/40 text-center relative z-10">
        &copy; {new Date().getFullYear()} Luminary Academy. All rights reserved.
      </footer>
      </div>
    </div>
  );
}
