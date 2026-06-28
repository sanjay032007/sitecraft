"use client";

import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Float,
  Stars,
  Html
} from "@react-three/drei";
import { motion } from "framer-motion";
import { User, ShoppingCart, Search, Plus, Play, ChevronRight, ScanEye } from "lucide-react";
import * as THREE from "three";

// --- Ultra-Realistic Hand-Crafted VR Controllers ---
function VRController({ position, rotation, color, isLeft }: { position: [number, number, number], rotation: [number, number, number], color: string, isLeft: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Materials
  const matteBlack = <meshStandardMaterial color="#111111" roughness={0.7} metalness={0.2} />;
  const glossyBlack = <meshPhysicalMaterial color="#050505" roughness={0.1} metalness={0.8} clearcoat={1} clearcoatRoughness={0.1} envMapIntensity={2} />;
  const rubberGrip = <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.1} />;
  const glowingMaterial = <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />;

  // Animation for floating
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      const offset = isLeft ? 0 : Math.PI;
      groupRef.current.position.y = position[1] + Math.sin(t * 1.5 + offset) * 0.1;
      groupRef.current.rotation.x = rotation[0] + Math.sin(t * 1.2 + offset) * 0.05;
      groupRef.current.rotation.z = rotation[2] + Math.cos(t * 1.3 + offset) * 0.05;
    }
  });

  return (
    <group position={position} rotation={rotation} ref={groupRef} scale={1.2}>
      {/* 1. Main Handle (Ergonomic grip) */}
      <mesh position={[0, -0.6, 0]} rotation={[0, 0, isLeft ? 0.1 : -0.1]}>
        <capsuleGeometry args={[0.18, 0.8, 32, 32]} />
        {rubberGrip}
      </mesh>

      {/* 2. Top Thumb Surface (Angled plane for joystick and buttons) */}
      <mesh position={[0, 0.1, -0.1]} rotation={[-0.4, 0, 0]}>
        <cylinderGeometry args={[0.25, 0.22, 0.1, 32]} />
        {glossyBlack}
      </mesh>

      {/* 3. Tracking Ring (Sleek loop passing over the hand) */}
      <mesh position={[0, 0.15, 0.2]} rotation={[1.2, 0, 0]}>
        <torusGeometry args={[0.45, 0.06, 32, 100]} />
        {glossyBlack}
      </mesh>
      
      {/* Tracking Ring Inner Glow (IR LEDs) */}
      <mesh position={[0, 0.15, 0.2]} rotation={[1.2, 0, 0]}>
        <torusGeometry args={[0.43, 0.061, 32, 100]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.1} roughness={0.1} metalness={0.9} />
      </mesh>

      {/* 4. Joystick */}
      <group position={[isLeft ? 0.08 : -0.08, 0.18, -0.15]} rotation={[-0.4, 0, 0]}>
        {/* Stem */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.03, 0.04, 0.1, 16]} />
          {matteBlack}
        </mesh>
        {/* Cap */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.02, 32]} />
          {rubberGrip}
        </mesh>
      </group>

      {/* 5. Action Buttons */}
      <group position={[isLeft ? -0.1 : 0.1, 0.16, -0.05]} rotation={[-0.4, 0, 0]}>
        <mesh position={[0, 0.02, -0.06]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
          {glossyBlack}
        </mesh>
        <mesh position={[0, 0.02, 0.06]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
          {glossyBlack}
        </mesh>
      </group>

      {/* 6. System/Menu Button */}
      <mesh position={[isLeft ? 0.1 : -0.1, 0.15, -0.05]} rotation={[-0.4, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
        {matteBlack}
      </mesh>

      {/* 7. Front Trigger */}
      <mesh position={[0, -0.1, -0.2]} rotation={[-1.2, 0, 0]}>
        <capsuleGeometry args={[0.06, 0.15, 16, 16]} />
        {glossyBlack}
      </mesh>

      {/* 8. Side Grip Button */}
      <mesh position={[isLeft ? 0.16 : -0.16, -0.3, 0]} rotation={[0, 0, isLeft ? -0.1 : 0.1]}>
        <capsuleGeometry args={[0.05, 0.3, 16, 16]} />
        {matteBlack}
      </mesh>

      {/* 9. Glowing Accent Ring (Status Indicator) */}
      <mesh position={[0, -0.25, 0]} rotation={[0, 0, isLeft ? 0.1 : -0.1]}>
        <cylinderGeometry args={[0.185, 0.185, 0.02, 32]} />
        {glowingMaterial}
      </mesh>
    </group>
  );
}

function VRControllers({ color }: { color: string }) {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  const xOffset = isMobile ? 0 : -1.5;

  return (
    <group position={[xOffset, 0, 0]}>
      <VRController position={[-0.8, -0.2, 0]} rotation={[0.2, 0.4, 0.2]} color={color} isLeft={true} />
      <VRController position={[0.8, 0.2, -0.5]} rotation={[0.4, -0.6, -0.1]} color={color} isLeft={false} />
    </group>
  );
}

// --- Main Template Component ---
export default function VRGlassmorphism() {
  const [activeTab, setActiveTab] = useState('Credit Card');

  return (
    <div className="@container w-full h-full min-h-[600px] bg-[#0c0a09] text-white font-sans overflow-hidden relative flex flex-col">
      
      {/* Massive Ambient Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-amber-500 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse-slow z-0 pointer-events-none"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-red-600 rounded-full mix-blend-screen filter blur-[150px] opacity-20 z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] bg-amber-400 rounded-full mix-blend-overlay filter blur-[130px] opacity-20 z-0 pointer-events-none" style={{ animationDelay: '2s' }}></div>

      {/* --- Full Page Navbar --- */}
      <header className="w-full absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 @md:px-10 py-6 pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-red-500 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)]">
            <ScanEye className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-2xl tracking-wider">Duvera<span className="text-amber-500">.</span></span>
        </div>
        
        <nav className="hidden @2xl:flex items-center gap-10 text-xs font-semibold tracking-widest uppercase text-white/60">
          <a href="#" className="text-white hover:text-amber-400 transition-colors">Headset</a>
          <a href="#" className="hover:text-amber-400 transition-colors">Tech Specs</a>
          <a href="#" className="hover:text-amber-400 transition-colors">Accessories</a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden @md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 gap-2 backdrop-blur-md">
            <Search className="w-4 h-4 text-white/50" />
            <input type="text" placeholder="Search" className="bg-transparent border-none outline-none w-24 text-sm text-white placeholder-white/50" />
          </div>
          <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-colors backdrop-blur-md relative">
            <ShoppingCart className="w-4 h-4 text-white" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0c0a09]"></span>
          </button>
        </div>
      </header>

      {/* --- Huge Background Typography --- */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none opacity-40">
        <h1 className="text-[15vw] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent leading-none whitespace-nowrap overflow-hidden">
          IMMERSE
        </h1>
      </div>

      {/* --- Main Hero Content Area --- */}
      <div className="flex-1 w-full h-full relative z-20 flex flex-col @3xl:flex-row items-center justify-between px-6 @md:px-10 pt-24 pb-10">
        
        {/* Left Content / 3D Canvas Container */}
        <div className="absolute inset-0 w-full h-full z-10 pointer-events-auto">
          <Canvas frameloop="demand" camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.6} />
          <Suspense fallback={null}>
            <Environment preset="city" />
          </Suspense>
            <pointLight position={[5, 10, 5]} intensity={5} color="#facc15" />
            <pointLight position={[-5, 5, -5]} intensity={3} color="#dc2626" />
            <Stars radius={100} depth={50} count={2000} factor={4} saturation={1} fade speed={1} />
            
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
              <VRControllers color="#facc15" />
            </Float>

            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
          
          {/* Hero Left Text (Overlaying Canvas) */}
          <div className="absolute top-1/2 left-6 @2xl:left-16 -translate-y-1/2 pointer-events-none max-w-[280px] @2xl:max-w-md hidden @2xl:block">
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] @2xl:text-xs font-bold tracking-widest uppercase mb-4 @2xl:mb-6 backdrop-blur-md"
             >
               <Play className="w-3 h-3 fill-amber-500" /> Watch Trailer
             </motion.div>
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.1 }}
               className="text-5xl @2xl:text-6xl font-black leading-[1.1] tracking-tight mb-3 @2xl:mb-4 drop-shadow-2xl"
             >
               Reality,<br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-500">Perfected.</span>
             </motion.h2>
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="text-white/60 text-sm @2xl:text-lg leading-relaxed"
             >
               The most advanced spatial computing headset ever created. Experience zero-latency passthrough with micro-OLED displays.
             </motion.p>
          </div>
        </div>

        {/* Right Content / Glassmorphism Checkout Card */}
        <div className="w-[90%] @2xl:w-[400px] absolute right-1/2 translate-x-1/2 @2xl:translate-x-0 @2xl:right-10 top-[20%] @2xl:top-1/2 @2xl:-translate-y-1/2 z-30 pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full bg-white/10 backdrop-blur-3xl border border-white/20 rounded-[32px] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-end justify-between mb-8">
              <div>
                <h3 className="text-3xl font-bold text-white tracking-tight">Checkout</h3>
                <p className="text-xs text-white/50 uppercase tracking-widest mt-1">Duvera Spatial VR</p>
              </div>
              <span className="text-3xl font-black text-amber-500">$899</span>
            </div>

            {/* Payment Tabs */}
            <div className="flex gap-2 mb-6 p-1 bg-black/20 rounded-xl border border-white/5">
              {['Credit Card', 'PayPal', 'Crypto'].map(tab => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 text-[11px] font-bold uppercase tracking-widest rounded-lg transition-all ${activeTab === tab ? 'bg-white/20 text-white shadow-lg border border-white/10' : 'text-white/40 hover:text-white/80'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Cardholder Name" 
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-amber-500 transition-colors backdrop-blur-md"
              />
              
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Card Number" 
                  className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-amber-500 transition-colors backdrop-blur-md"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                   <div className="flex">
                     <div className="w-5 h-5 bg-red-500 rounded-full mix-blend-screen opacity-80"></div>
                     <div className="w-5 h-5 bg-amber-500 rounded-full mix-blend-screen opacity-80 -ml-2"></div>
                   </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 relative">
                   <label className="absolute -top-2 left-3 bg-[#1e1c1b] px-1 text-[9px] font-bold uppercase tracking-widest text-amber-500">Exp</label>
                   <input 
                    type="text" 
                    placeholder="MM/YY"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-amber-500 transition-colors backdrop-blur-md"
                  />
                </div>
                <div className="flex-1 relative">
                   <label className="absolute -top-2 left-3 bg-[#1e1c1b] px-1 text-[9px] font-bold uppercase tracking-widest text-amber-500">CVV</label>
                  <input 
                    type="text" 
                    placeholder="123"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-amber-500 transition-colors backdrop-blur-md"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <div className="flex justify-between text-sm text-white/50">
                <span>Subtotal</span>
                <span className="text-white/80">$800</span>
              </div>
              <div className="flex justify-between text-sm text-white/50">
                <span>Taxes & Fees</span>
                <span className="text-white/80">$99</span>
              </div>
              <div className="flex justify-between text-lg font-black text-white mt-4 pt-4 border-t border-white/10">
                <span>Total</span>
                <span>$899</span>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-black uppercase tracking-widest py-4 rounded-xl mt-8 transition-all shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 group">
              Complete Order
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
