/* eslint-disable react/no-unescaped-entities, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client";

import React, { useRef, useState, Suspense } from 'react';
import { Template } from '@/lib/data';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox, Html, Environment, Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { ScanEye, RotateCw, ShoppingBag, Star, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Ultra-Realistic Custom 3D Headset ---
function SpatialHeadset({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  const scale = isMobile ? 0.8 : 1.2;

  // Float and rotate slowly to show off angles
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.4;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.15 + 0.2;
    }
  });

  return (
    <group scale={scale} ref={groupRef} position={[isMobile ? 0 : 1.5, 0.2, 0]}>
      {/* --- Front Glass Visor (Capsule for smooth rounded edges) --- */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0.8]}>
        <capsuleGeometry args={[0.7, 1.8, 32, 64]} />
        <meshPhysicalMaterial 
          color="#000000" 
          metalness={0.8} 
          roughness={0.0} 
          transmission={1} 
          thickness={2.5}
          ior={1.5} 
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={3}
          transparent={true}
          opacity={0.9}
        />
      </mesh>

      {/* --- Internal Frame (Inside the glass) --- */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0.65]}>
        <capsuleGeometry args={[0.65, 1.75, 32, 64]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.2} envMapIntensity={0.5} />
      </mesh>
      
      {/* --- Glowing Sensors/Lenses inside the frame --- */}
      <group position={[0, 0, 1.25]}>
         {/* Left Eye */}
         <mesh position={[-0.6, 0, 0]} rotation={[Math.PI/2, 0, 0]}>
  <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
           <meshBasicMaterial color={color} />
         </mesh>
         <mesh position={[-0.6, 0, -0.05]} rotation={[Math.PI/2, 0, 0]}>
  <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
           <meshStandardMaterial color="#000" />
         </mesh>
         
         {/* Right Eye */}
         <mesh position={[0.6, 0, 0]} rotation={[Math.PI/2, 0, 0]}>
  <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
           <meshBasicMaterial color={color} />
         </mesh>
         <mesh position={[0.6, 0, -0.05]} rotation={[Math.PI/2, 0, 0]}>
  <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
           <meshStandardMaterial color="#000" />
         </mesh>
      </group>

      {/* --- Main Aluminum Chassis (Behind the glass) --- */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0.4]}>
        <capsuleGeometry args={[0.7, 1.8, 32, 64]} />
        <meshStandardMaterial color="#9ca3af" metalness={0.9} roughness={0.3} envMapIntensity={2} />
      </mesh>

      {/* --- Fabric Light Seal (Touching the face) --- */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, -0.1]}>
        <capsuleGeometry args={[0.72, 1.7, 32, 64]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1.0} />
      </mesh>

      {/* --- Headband Loop (Torus with Woven Overlay Trick) --- */}
      <group position={[0, 0, -1.5]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.5, 0.4, 64, 128]} />
          <meshStandardMaterial color={color} roughness={0.9} metalness={0.1} />
        </mesh>
        {/* Wireframe overlay to simulate woven fabric texture */}
        <mesh>
          <torusGeometry args={[1.505, 0.405, 32, 100]} />
          <meshStandardMaterial color="#000000" wireframe={true} transparent opacity={0.25} />
        </mesh>
      </group>

      {/* --- Side Straps connecting chassis to headband --- */}
      <RoundedBox args={[0.1, 0.6, 1.4]} position={[1.65, 0, -0.3]} radius={0.05}>
         <meshStandardMaterial color="#f3f4f6" metalness={0.5} roughness={0.3} envMapIntensity={1.5} />
      </RoundedBox>
      <RoundedBox args={[0.1, 0.6, 1.4]} position={[-1.65, 0, -0.3]} radius={0.05}>
         <meshStandardMaterial color="#f3f4f6" metalness={0.5} roughness={0.3} envMapIntensity={1.5} />
      </RoundedBox>
      
      {/* --- Digital Crown --- */}
      <group position={[1.2, 0.7, 0.2]}>
        <mesh rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
          <meshStandardMaterial color="#ffffff" metalness={1.0} roughness={0.1} envMapIntensity={3} />
        </mesh>
        <mesh rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.155, 0.155, 0.08, 32]} />
          <meshStandardMaterial color="#888" wireframe={true} transparent opacity={0.5} />
        </mesh>
        <mesh position={[0, 0.06, 0]} rotation={[Math.PI/2, 0, 0]}>
          <ringGeometry args={[0.08, 0.12, 32]} />
          <meshBasicMaterial color={color} />
        </mesh>
      </group>

      {/* --- 3D HTML Annotations --- */}
      {/* Fixed: distanceFactor reduced drastically to prevent giant annotations */}
      <Html position={[0.8, 1.2, 0.2]} center distanceFactor={2.5} zIndexRange={[100, 0]}>
        <div className="flex items-center gap-2 pointer-events-none transition-all duration-300">
          <div className="w-12 h-[1px] bg-white/60 -rotate-12 origin-left" />
          <div className="px-2 py-1 rounded-full bg-black/80 border border-white/20 backdrop-blur-md text-[8px] font-bold tracking-widest uppercase text-white shadow-[0_0_20px_rgba(0,0,0,0.8)] whitespace-nowrap">
            Haptic Crown
          </div>
        </div>
      </Html>

      <Html position={[-1.2, 0, 1.0]} center distanceFactor={2.5} zIndexRange={[100, 0]}>
        <div className="flex items-center gap-2 pointer-events-none flex-row-reverse transition-all duration-300">
          <div className="w-8 h-[1px] bg-white/60" />
          <div className="px-2 py-1 rounded-full bg-black/80 border border-white/20 backdrop-blur-md text-[8px] font-bold tracking-widest uppercase text-white shadow-[0_0_20px_rgba(0,0,0,0.8)] whitespace-nowrap">
            Micro-OLED Visor
          </div>
        </div>
      </Html>

      <Html position={[0, -1.0, -1.5]} center distanceFactor={2.5} zIndexRange={[100, 0]}>
        <div className="flex flex-col items-center gap-2 pointer-events-none transition-all duration-300">
          <div className="h-8 w-[1px] bg-white/60" />
          <div className="px-2 py-1 rounded-full bg-black/80 border border-white/20 backdrop-blur-md text-[8px] font-bold tracking-widest uppercase text-white shadow-[0_0_20px_rgba(0,0,0,0.8)] whitespace-nowrap">
            Woven Audio Band
          </div>
        </div>
      </Html>
    </group>
  );
}

// --- Main Page Component ---
export const Ecommerce3D = ({ t }: { t: Template }) => {
  const [activeColor, setActiveColor] = useState('#8b5cf6'); // Purple default
  const [cartCount, setCartCount] = useState(0);

  const colorways = [
    { name: "Nebula Purple", hex: "#8b5cf6" },
    { name: "Cyber Pink", hex: "#ec4899" },
    { name: "Void Black", hex: "#000000" },
    { name: "Stellar White", hex: "#ffffff" },
  ];

  const products = [
    { id: 1, name: "Spatial Audio Pods", price: 249, rating: 4.8, category: "Audio", tag: "Hot" },
    { id: 2, name: "Haptic Feedback Gloves", price: 399, rating: 4.9, category: "VR Gear", tag: "New" },
    { id: 3, name: "Wireless Charging Dock", price: 89, rating: 4.6, category: "Accessories", tag: "" },
    { id: 4, name: "Travel Protection Case", price: 59, rating: 4.5, category: "Accessories", tag: "Sale" }
  ];

  return (
    <div className="@container w-full h-full relative bg-[#030205] text-slate-200 overflow-hidden font-sans flex flex-col overflow-y-auto scrollbar-none">
      
      {/* Deep blurred purple orb backgrounds (CSS) */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[0%] right-[10%] w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Top Navbar Area */}
      <header className="absolute top-0 w-full z-50 pointer-events-auto p-6 flex justify-between items-center max-w-7xl mx-auto left-0 right-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            <ScanEye className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-white text-xl tracking-tighter">SPATIAL<span className="text-purple-400">.</span></span>
        </div>
        
        <nav className="hidden sm:flex items-center gap-8 text-xs font-bold tracking-widest text-slate-400 uppercase">
          <a href="#" className="text-white hover:text-purple-400 transition-colors">Vision</a>
          <a href="#" className="hover:text-white transition-colors">Accessories</a>
          <a href="#" className="hover:text-white transition-colors">Specs</a>
        </nav>

        <button 
          onClick={() => setCartCount(c => c + 1)}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md px-5 py-2.5 rounded-full text-xs font-bold text-white transition-all shadow-lg relative"
        >
          <ShoppingBag className="w-4 h-4" />
          CART
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-[0_0_10px_rgba(139,92,246,0.8)]">
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {/* 3D Background Canvas */}
      <div className="absolute top-0 left-0 right-0 h-full min-h-[600px] z-10 pointer-events-auto">
        <Canvas frameloop="demand" camera={{ position: [0, 0, 5.5], fov: 45 }} resize={{ offsetSize: true }}>
          <ambientLight intensity={0.5} />
          {/* Environment provides ultra-realistic reflections on the glass visor */}
          <Suspense fallback={null}>
            <Environment preset="city" />
          </Suspense>
          
          <pointLight position={[5, 5, 2]} intensity={4} color="#a855f7" />
          <pointLight position={[-5, -5, 5]} intensity={3} color="#ec4899" />
          <pointLight position={[0, -2, -5]} intensity={2} color="#ffffff" />
          <Stars radius={100} depth={50} count={1500} factor={4} saturation={1} fade speed={0.5} />
          
          <SpatialHeadset color={activeColor} />
          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI/1.5} minPolarAngle={Math.PI/3} />
        </Canvas>
      </div>

      {/* Foreground UI Overlays */}
      <div className="relative z-20 pointer-events-none flex flex-col @md:flex-row items-center justify-between px-6 @md:px-16 pt-24 pb-12 h-full min-h-[600px] max-w-7xl mx-auto w-full">
        
        {/* Left-side Hero Text */}
        <div className="w-full @md:w-1/2 flex flex-col justify-center items-start h-full pt-10 @md:pt-0 pointer-events-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-2 mb-6 bg-white/5 backdrop-blur-md"
          >
             <span className="text-[9px] font-bold tracking-[0.2em] text-white uppercase">Available Now</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl @sm:text-6xl @md:text-7xl font-black tracking-tighter leading-[1.1] text-white pb-2"
          >
            Reality,<br />
            <span className="text-purple-400">Reimagined.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-slate-400 text-sm max-w-sm leading-relaxed"
          >
            Experience the next generation of spatial computing. Featuring ultra-high-resolution micro-OLED displays and zero-latency passthrough.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center gap-4 mt-10"
          >
            <button 
              onClick={() => setCartCount(c => c + 1)}
              className="bg-white text-black font-bold text-xs px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-[0_10px_20px_rgba(255,255,255,0.2)] pointer-events-auto"
            >
              BUY NOW - $3,499
            </button>
            <button className="flex items-center gap-2 border border-white/20 text-white font-bold text-xs px-6 py-4 rounded-full hover:bg-white/10 transition-colors pointer-events-auto">
              VIEW DEMO
            </button>
          </motion.div>
        </div>



      </div>

      {/* --- Accessories Grid Section --- */}
      <div className="w-full bg-[#030205] pt-12 pb-24 px-8 relative z-20 mt-[10vh]">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-2">Essential Gear</h2>
              <p className="text-white/50 text-sm">Elevate your spatial experience.</p>
            </div>
            <button className="text-[10px] font-bold uppercase tracking-widest text-purple-400 hover:text-purple-300">
              View All Accessories &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 @md:grid-cols-4 gap-6">
            {products.map((prod) => (
              <div key={prod.id} className="group relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all">
                {prod.tag && (
                  <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-md bg-purple-500 text-[9px] font-black uppercase tracking-widest text-white shadow-[0_0_10px_rgba(139,92,246,0.5)]">
                    {prod.tag}
                  </div>
                )}
                
                <div className="h-48 w-full bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm z-20">
                    <button 
                      className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
                      onClick={() => setCartCount(c => c + 1)}
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                  <BoxIcon className="w-16 h-16 text-white/20 group-hover:scale-110 transition-transform duration-500" />
                </div>

                <div className="p-5 border-t border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-sm text-white/90 leading-tight">{prod.name}</h3>
                    <div className="flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded text-[10px] font-bold">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{prod.rating}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-4">{prod.category}</p>
                  <div className="text-lg font-black text-purple-400">${prod.price}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Trust badges */}
          <div className="mt-24 grid grid-cols-1 @md:grid-cols-3 gap-8 border-t border-white/10 pt-16">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                <Truck className="w-5 h-5 text-purple-400" />
              </div>
              <h4 className="font-bold mb-2">Overnight Shipping</h4>
              <p className="text-xs text-white/50 leading-relaxed max-w-[200px]">Free overnight shipping on all Vision orders. Tracked and insured.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
              </div>
              <h4 className="font-bold mb-2">AppleCare+ Included</h4>
              <p className="text-xs text-white/50 leading-relaxed max-w-[200px]">2 years of accidental damage protection and priority support.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                <RefreshCw className="w-5 h-5 text-purple-400" />
              </div>
              <h4 className="font-bold mb-2">14-Day Trial</h4>
              <p className="text-xs text-white/50 leading-relaxed max-w-[200px]">Experience spatial computing. Return it if you're not mind-blown.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Custom icon placeholder for products
function BoxIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>
  );
}
