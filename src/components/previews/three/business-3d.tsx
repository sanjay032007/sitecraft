"use client";

import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Template } from '@/lib/data';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Float, useTexture } from '@react-three/drei';
import { Building2, ArrowUpRight, ChevronRight } from 'lucide-react';
import * as THREE from 'three';

// Realistic Photorealistic Earth Globe
function Earth() {
  const globeRef = useRef<THREE.Group>(null);
  
  // Use locally hosted textures to prevent network/CORS crashes
  const colorMap = useTexture('/textures/earth_color.jpg');
  const specularMap = useTexture('/textures/earth_specular.jpg');
  const cloudsMap = useTexture('/textures/earth_clouds.png');

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.05;
      
      const clouds = globeRef.current.children[1];
      if (clouds) {
        clouds.rotation.y += delta * 0.02;
      }
    }
  });

  return (
    <group ref={globeRef} rotation={[0.2, 0, 0]}>
      {/* The Earth */}
      <mesh>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial 
          map={colorMap} 
          roughnessMap={specularMap} 
          roughness={0.7} 
          metalness={0.2}
          emissive="#0a1526" // Slight ambient glow to prevent total darkness on dark side
          emissiveIntensity={0.6}
        />
      </mesh>
      
      {/* The Atmosphere / Clouds */}
      <mesh scale={1.01}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial 
          map={cloudsMap} 
          transparent 
          opacity={0.8} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
        />
      </mesh>
      
      {/* Outer Atmosphere Glow */}
      <mesh scale={1.04}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshStandardMaterial 
          color="#0ea5e9"
          emissive="#0ea5e9"
          emissiveIntensity={0.6}
          transparent 
          opacity={0.2} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false} 
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

// Fallback sphere while loading textures
function EarthFallback() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.5;
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshStandardMaterial color="#0ea5e9" wireframe opacity={0.3} transparent />
    </mesh>
  );
}

function EarthScene({ scrollY }: { scrollY: number }) {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  const mobileYOffset = isMobile ? -2.5 : -1.5;
  const scale = isMobile ? 0.6 : 1;

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[0, 5, 5]} intensity={4.5} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#7c3aed" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <group 
        position={[0, Math.min(scrollY * 0.002, 2) + mobileYOffset, -1]} 
        rotation={[scrollY * 0.001, 0, 0]}
        scale={scale}
      >
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <Suspense fallback={<EarthFallback />}>
            <Earth />
          </Suspense>
        </Float>
      </group>
    </>
  );
}

export function Business3D({ t }: { t: Template }) {
  const { primary, bg, text, secondary, accent } = t.colorScheme;
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollY(e.currentTarget.scrollTop);
  };

  return (
    <div className="@container w-full h-full relative bg-[#020617] text-white overflow-hidden">
      
      {/* Background Canvas perfectly constrained to the container */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas frameloop="demand" camera={{ position: [0, 0, 5], fov: 45 }} resize={{ offsetSize: true }}>
          <EarthScene scrollY={scrollY} />
        </Canvas>
      </div>

      {/* Internal Scrolling Container */}
      <div 
        className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden scrollbar-none pointer-events-auto"
        onScroll={handleScroll}
      >
        {/* Fixed Navbar (sticky relative to the scroll container) */}
        <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-6 bg-transparent">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-sky-400" />
            <span className="font-black text-sm tracking-widest text-white uppercase">ORBIT</span>
          </div>
          <button className="text-xs font-bold px-4 py-2 rounded-full border border-sky-500/30 bg-sky-950/80 text-sky-300 hover:bg-sky-900 transition-colors uppercase tracking-wider shadow-[0_0_15px_rgba(14,165,233,0.3)] backdrop-blur-md">
            Enter Portal
          </button>
        </header>
        
        {/* Page 1: Hero */}
        <section className="min-h-full flex flex-col items-center justify-center text-center px-6 pt-10 pb-20">
          <span 
            className="text-[10px] font-bold tracking-[0.3em] uppercase mb-6 drop-shadow-md"
            style={{ color: t.colorScheme.accent }}
          >
            Spatial Intelligence
          </span>
          <h1 className="text-4xl @md:text-7xl font-black tracking-tighter leading-none mb-6 max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 drop-shadow-lg">
            Navigate the future of global enterprise.
          </h1>
          <p 
            className="text-sm @md:text-base max-w-lg mx-auto leading-relaxed mb-12 drop-shadow"
            style={{ color: t.colorScheme.text }}
          >
            Orbit integrates real-time WebGL data flows into corporate governance, offering immersive spatial insights.
          </p>
          <div className="flex flex-col items-center gap-2 animate-bounce mt-12" style={{ color: t.colorScheme.secondary }}>
            <span className="text-[9px] uppercase tracking-widest font-bold">Scroll to explore</span>
            <div 
              className="w-px h-12 shadow-[0_0_10px_rgba(56,189,248,0.5)]"
              style={{ background: `linear-gradient(to bottom, ${t.colorScheme.accent}, transparent)` }}
            ></div>
          </div>
        </section>

        {/* Page 2: Spatial Data / Metrics */}
        <section className="min-h-full py-20 flex items-center justify-center px-6 @md:px-24">
          <div className="w-full max-w-md backdrop-blur-xl bg-slate-950/60 border border-slate-700/50 p-6 @md:p-8 rounded-3xl shadow-[0_0_30px_rgba(14,165,233,0.15)]">
            <h2 className="text-2xl @md:text-3xl font-bold mb-4 text-white">Global Topology</h2>
            <p className="text-xs text-slate-300 leading-relaxed mb-8">
              Our interconnected nodes span 120+ corporate entities worldwide, ensuring 99.98% SLA uptime with zero-latency spatial syncing.
            </p>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs mb-2 font-bold">
                  <span className="text-slate-200">Transaction Volume</span>
                  <span className="text-sky-400">$450M+</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-sky-600 to-cyan-400 w-[85%] shadow-[0_0_10px_rgba(56,189,248,0.8)]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-2 font-bold">
                  <span className="text-slate-200">Data Redundancy</span>
                  <span className="text-indigo-400">Level 4</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-400 w-[100%] shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Page 3: Case Studies Grid */}
        <section className="min-h-full flex flex-col justify-center px-6 @md:px-24 pb-20 mt-10">
          <h2 className="text-3xl font-black mb-12 text-center w-full drop-shadow-md">Featured Deployments</h2>
          <div className="grid grid-cols-1 @md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
            
            <div className="group relative overflow-hidden rounded-3xl bg-slate-900/60 border border-slate-700/50 backdrop-blur-xl p-8 hover:bg-slate-800/80 transition-colors cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 group-hover:-translate-y-4">
                <ArrowUpRight className="w-8 h-8 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-sky-400 font-bold mb-4 block drop-shadow">FinTech</span>
              <h3 className="text-xl font-bold mb-4 pr-12 text-white">Apex Group Treasury</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Reduced multi-currency transaction delays by 42% through automated liquidity routing pipelines and local banking integration.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-3xl bg-slate-900/60 border border-slate-700/50 backdrop-blur-xl p-8 hover:bg-slate-800/80 transition-colors cursor-pointer shadow-[0_0_20px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 group-hover:-translate-y-4">
                <ArrowUpRight className="w-8 h-8 text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-sky-400 font-bold mb-4 block drop-shadow">Logistics</span>
              <h3 className="text-xl font-bold mb-4 pr-12 text-white">Prime Inc Supply Chain</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Deployed ML forecasting models to predict hardware parts delays, resulting in $12M saved in operational disruptions.
              </p>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
