"use client";

import React, { useRef, useState, Suspense } from 'react';
import { Template } from '@/lib/data';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Float, Environment, RoundedBox, Html, Stars } from '@react-three/drei';
import { Play, MapPin, CheckCircle2, RotateCcw, Brain, Check } from 'lucide-react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// --- Abstract Background 3D Shape ---
function AbstractBackgroundShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[1, 1, -3]} scale={2}>
        <torusGeometry args={[1, 0.6, 64, 100]} />
        <meshPhysicalMaterial 
          color="#6d28d9" 
          emissive="#4c1d95"
          emissiveIntensity={0.2}
          roughness={0.2}
          metalness={0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
}

// --- Custom 3D Smartphone Model ---
function Smartphone() {
  const meshRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  const scale = isMobile ? 0.8 : 1.1;

  useFrame((state) => {
    if (meshRef.current) {
      // Facing forward with a very gentle float
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.05;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05;
      meshRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.02;
    }
  });

  return (
    <group ref={meshRef} scale={scale} position={[0, -0.1, 0]}>
      {/* Phone Body (Rounded Box) */}
      <RoundedBox args={[2.4, 4.8, 0.2]} radius={0.25} smoothness={8}>
        <meshStandardMaterial color="#0a0a0f" roughness={0.1} metalness={0.9} />
      </RoundedBox>

      {/* Screen Bezel / Screen Area */}
      <mesh position={[0, 0, 0.105]}>
        <planeGeometry args={[2.25, 4.65]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Interactive HTML Screen Overlay */}
      <group position={[0, 0, 0.12]}>
        <Html 
          transform 
          distanceFactor={2.4}
        >
          <div className="w-[320px] h-[660px] bg-[#0a0a0f] rounded-[38px] overflow-hidden p-5 text-white font-sans flex flex-col relative shadow-[inset_0_0_40px_rgba(0,0,0,0.9)] border border-white/5">
          {/* Dynamic Island / Camera cutout */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-50 shadow-[0_2px_10px_rgba(0,0,0,0.5)]"></div>

          {/* Deep Purple Glow in the screen background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 blur-[60px] rounded-full pointer-events-none"></div>

          {/* Top Bar */}
          <div className="flex justify-between items-center mt-8 px-1 z-10 relative">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-500 border-2 border-[#100f16] overflow-hidden shadow-lg">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80" alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                   <div className="text-[10px] text-slate-400">Good morning,</div>
                   <div className="text-sm font-semibold">Sarah Jenkins</div>
                </div>
             </div>
             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 backdrop-blur-md">
                <Check className="w-4 h-4 text-white" />
             </div>
          </div>

          {/* Main Stat & Progress Ring */}
          <div className="mt-8 flex items-center justify-between px-2 z-10 relative">
             <div>
               <div className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mb-1">Activity Score</div>
               <div className="text-[56px] font-medium leading-none tracking-tighter">89<span className="text-3xl text-slate-500">%</span></div>
             </div>
             <div className="w-20 h-20 relative flex items-center justify-center drop-shadow-xl">
                <svg className="w-full h-full transform -rotate-90">
                   <circle cx="40" cy="40" r="34" fill="none" stroke="#1a1824" strokeWidth="6" />
                   <circle cx="40" cy="40" r="34" fill="none" stroke="#a855f7" strokeWidth="6" strokeDasharray="213" strokeDashoffset="24" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                   <Play className="w-6 h-6 text-purple-400 fill-purple-400 ml-1 drop-shadow-md" />
                </div>
             </div>
          </div>

          {/* Cards List */}
          <div className="flex flex-col gap-3 mt-8 z-10 relative">
             {/* Card 1: Horizontal Pill */}
             <div className="bg-[#15141b]/80 backdrop-blur-xl border border-white/5 rounded-[24px] p-4 flex items-center gap-4 shadow-lg">
                <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                   <Brain className="w-5 h-5 text-rose-400" />
                </div>
                <div className="flex-1">
                   <div className="text-sm font-medium text-white">Mental Clarity</div>
                   <div className="flex items-center gap-2 mt-1">
                      <div className="h-1 flex-1 bg-black/40 rounded-full overflow-hidden">
                         <div className="h-full bg-rose-500 w-[74%] rounded-full shadow-[0_0_8px_rgba(244,63,94,0.5)]"></div>
                      </div>
                      <span className="text-[10px] font-bold text-rose-400">74%</span>
                   </div>
                </div>
             </div>

             {/* Card 2: Horizontal Pill */}
             <div className="bg-[#15141b]/80 backdrop-blur-xl border border-white/5 rounded-[24px] p-4 flex items-center gap-4 shadow-lg">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                   <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="flex-1">
                   <div className="text-sm font-medium text-white">Daily Tasks</div>
                   <div className="text-[11px] text-slate-400 mt-0.5">5 of 14 completed</div>
                </div>
                <button className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-medium px-3 py-1.5 rounded-full transition-colors">
                  View
                </button>
             </div>

             {/* Card 3: Horizontal Pill */}
             <div className="bg-[#15141b]/80 backdrop-blur-xl border border-white/5 rounded-[24px] p-4 flex items-center gap-4 shadow-lg">
                <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                   <RotateCcw className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="flex-1">
                   <div className="text-sm font-medium text-white">Reframe Thoughts</div>
                   <div className="text-[11px] text-slate-400 mt-0.5">15 min daily exercise</div>
                </div>
             </div>
          </div>

          {/* Bottom Nav Hint */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full"></div>
        </div>
      </Html>
      </group>
    </group>
  );
}

// --- Main Page Component ---

export const SaaS3D = ({ t }: { t: Template }) => {
  return (
    <div className="@container w-full h-full relative bg-[#030206] text-slate-200 overflow-hidden font-sans">
      
      {/* Deep blurred purple orb backgrounds (CSS) */}
      <div className="absolute top-[0%] left-[20%] w-[600px] h-[600px] bg-indigo-600 opacity-20 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[10%] w-[800px] h-[800px] bg-purple-700 opacity-20 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Top Navbar Area - Floating above the 3D canvas */}
      <header className="absolute top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <motion.nav 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-[24px] bg-[#1a1824]/60 border border-white/5 backdrop-blur-2xl shadow-2xl whitespace-nowrap"
        >
           {/* Logo Icon */}
           <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center border border-white/20">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
           </div>
           <a href="#" className="text-[11px] font-medium text-white tracking-wide">About</a>
           <a href="#" className="text-[11px] font-medium text-slate-400 hover:text-white transition-colors tracking-wide">How it Works</a>
           <a href="#" className="text-[11px] font-medium text-slate-400 hover:text-white transition-colors tracking-wide">For Whom</a>
           <a href="#" className="text-[11px] font-medium text-slate-400 hover:text-white transition-colors tracking-wide">Contacts</a>
        </motion.nav>
      </header>

      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <Canvas frameloop="demand" camera={{ position: [0, 0, 5], fov: 45 }} resize={{ offsetSize: true }}>
          <ambientLight intensity={1} />
          {/* Environment for stunning metallic reflections on the phone chassis */}
          <Suspense fallback={null}>
            <Environment preset="city" />
          </Suspense>
          <pointLight position={[5, 5, 2]} intensity={5} color="#c084fc" />
          <pointLight position={[-5, -5, 5]} intensity={4} color="#4f46e5" />
          <pointLight position={[0, -2, -5]} intensity={4} color="#db2777" />
          <Stars radius={100} depth={50} count={1500} factor={4} saturation={1} fade speed={1.5} />
          <Suspense fallback={null}>
            {/* The abstract shape floats slowly behind the phone */}
            <AbstractBackgroundShape />
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
              <Smartphone />
            </Float>
            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI/1.5} minPolarAngle={Math.PI/3} />
          </Suspense>
        </Canvas>
      </div>
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        
        {/* Right-side Waitlist Pill - Positioned explicitly to avoid flex conflicts */}
        <motion.div 
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)' }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-2 sm:pl-6 rounded-[28px] bg-[#1a1824]/60 border border-white/5 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] pointer-events-auto"
        >
          <div>
             <h3 className="text-xs font-semibold text-white tracking-wide">Coming in beta Spring 2025</h3>
             <p className="text-[10px] text-slate-400 mt-0.5">Join the Waitlist Today</p>
          </div>
          <button className="whitespace-nowrap bg-white text-black font-semibold text-[11px] px-5 py-2.5 rounded-[20px] hover:bg-slate-200 transition-colors shadow-lg">
             Join Waitlist
          </button>
        </motion.div>
      </div>
    </div>
  );
};
