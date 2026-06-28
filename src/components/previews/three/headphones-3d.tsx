"use client";

import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  OrbitControls,
  Float,
  RoundedBox,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Star,
  ShieldCheck,
  Truck,
  CreditCard,
  ChevronRight,
} from "lucide-react";

// --- 3D Headphones Model ---
function Headphones({ color }: { color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  // Rotate slowly over time
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.3;
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[-0.5, 0, 0]} scale={0.75}>
      {/* Left Earcup */}
      <group position={[-1.2, 0, 0]} rotation={[0, -Math.PI / 8, 0]}>
        {/* Aluminum Shell */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.9, 0.4, 32, 64]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.8}
            roughness={0.15}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        </mesh>
        {/* Cushion */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[0.3, 0, 0]}>
          <capsuleGeometry args={[0.85, 0.3, 32, 64]} />
          <meshStandardMaterial color="#1e293b" roughness={0.9} />
        </mesh>
        {/* Inner Mesh */}
        <mesh rotation={[0, Math.PI / 2, 0]} position={[0.45, 0, 0]}>
          <planeGeometry args={[1.5, 1.5]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {/* Stem Connector */}
        <mesh position={[0, 1.2, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.8, 32]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Right Earcup */}
      <group position={[1.2, 0, 0]} rotation={[0, Math.PI / 8, 0]}>
        {/* Aluminum Shell */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.9, 0.4, 32, 64]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.8}
            roughness={0.15}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        </mesh>
        {/* Cushion */}
        <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.3, 0, 0]}>
          <capsuleGeometry args={[0.85, 0.3, 32, 64]} />
          <meshStandardMaterial color="#1e293b" roughness={0.9} />
        </mesh>
        {/* Inner Mesh */}
        <mesh rotation={[0, -Math.PI / 2, 0]} position={[-0.45, 0, 0]}>
          <planeGeometry args={[1.5, 1.5]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        {/* Stem Connector */}
        <mesh position={[0, 1.2, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.8, 32]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Headband Canopy */}
      <group position={[0, 1.5, 0]} rotation={[0, 0, 0]}>
        {/* Top Arch */}
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[1.2, 0.15, 32, 100, Math.PI]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.4} />
        </mesh>
        {/* Mesh Canopy */}
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[1.18, 0.16, 16, 100, Math.PI]} />
          <meshStandardMaterial color={color} wireframe opacity={0.6} transparent />
        </mesh>
      </group>
    </group>
  );
}

// --- Main Template Component ---
export default function Headphones3D() {
  const [selectedColor, setSelectedColor] = useState("#f43f5e");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const colors = [
    { name: "Rose Gold", value: "#f43f5e" },
    { name: "Space Gray", value: "#334155" },
    { name: "Sky Blue", value: "#38bdf8" },
    { name: "Sage Green", value: "#34d399" },
    { name: "Silver", value: "#f1f5f9" },
  ];

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => {
      setCartCount((prev) => prev + 1);
      setIsAddingToCart(false);
    }, 800);
  };

  return (
    <div className="w-full h-full bg-[#0f172a] text-white font-sans overflow-hidden relative flex flex-col @container">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-6 py-4 absolute top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer group">
          <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-slate-300 hidden @sm:inline">Back to Shop</span>
        </div>
        <div className="text-2xl font-black tracking-tighter text-white">SONIC.</div>
        <div className="flex items-center gap-6">
          <button className="hidden @md:block text-slate-300 hover:text-white font-medium">Log in</button>
          <div className="relative">
            <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md shadow-sm flex items-center justify-center border border-white/20">
              <ShoppingCart className="w-4 h-4 text-white" />
            </button>
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
                >
                  {cartCount}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Main Content Split Layout */}
      <div className="flex-1 flex flex-col @md:flex-row w-full h-full pt-16">
        
        {/* Left Side: 3D Canvas */}
        <div className="w-full @md:w-[55%] h-[40%] @md:h-full relative flex items-center justify-center cursor-grab active:cursor-grabbing">
          {/* Background Decor */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <div className="text-[25vw] font-black tracking-tighter leading-none select-none text-white">MAX</div>
          </div>
          
          <Canvas frameloop="demand" camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.8} />
            <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2} castShadow />
          <Suspense fallback={null}>
            <Environment preset="city" />
          </Suspense>
            
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
              <Headphones color={selectedColor} />
            </Float>

            <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2} far={4} color="#000" />
            <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} />
          </Canvas>

          {/* Drag Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-50 hidden @md:flex">
            <div className="w-10 h-10 rounded-full border border-slate-500 flex items-center justify-center bg-black/20 backdrop-blur-sm">
              <span className="text-[10px] font-medium text-white">Drag</span>
            </div>
          </div>
        </div>

        {/* Right Side: Dribbble Inspired Checkout UI */}
        <div className="w-full @md:w-[45%] h-full flex flex-col justify-center items-center @md:items-start px-4 @md:pr-12 pb-6 @md:pb-0 z-10 relative">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-sm bg-white rounded-[1.5rem] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.2)] border border-slate-100"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Sonic Max</h1>
                <p className="text-xs text-slate-500 font-medium">Over-Ear Wireless Headphones</p>
              </div>
              <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                <Heart className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Reviews */}
            <div className="flex items-center gap-1.5 mb-4">
              <div className="flex items-center text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current" />
                <Star className="w-3.5 h-3.5 fill-current opacity-50" />
              </div>
              <span className="text-[11px] text-slate-500 font-medium">(128 Reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold tracking-tighter text-slate-900">$549</span>
              <span className="text-base text-slate-400 line-through font-medium">$599</span>
            </div>

            <hr className="border-slate-100 mb-6" />

            {/* Color Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-slate-900">Color</h3>
                <span className="text-xs font-medium text-slate-500">
                  {colors.find(c => c.value === selectedColor)?.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.value)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      selectedColor === c.value ? "ring-2 ring-offset-2 ring-slate-900 scale-110" : "hover:scale-110 ring-1 ring-slate-200"
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-full shadow-inner"
                      style={{ backgroundColor: c.value }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Features list */}
            <ul className="space-y-2.5 mb-6">
              <li className="flex items-center gap-2.5 text-xs font-medium text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                2 Year Premium Warranty
              </li>
              <li className="flex items-center gap-2.5 text-xs font-medium text-slate-600">
                <Truck className="w-4 h-4 text-emerald-500" />
                Free Express Delivery
              </li>
              <li className="flex items-center gap-2.5 text-xs font-medium text-slate-600">
                <CreditCard className="w-4 h-4 text-slate-400" />
                Pay in 4 interest-free installments
              </li>
            </ul>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5">
              <button 
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-3 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 h-12"
              >
                {isAddingToCart ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </>
                )}
              </button>
              
              <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 text-sm font-semibold py-3 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                Checkout Now
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
}
