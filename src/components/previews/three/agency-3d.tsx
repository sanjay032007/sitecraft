/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useRef, Suspense, useMemo } from 'react';
import { Template } from '@/lib/data';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Float, useGLTF, Html, RoundedBox, Cylinder, Text, Environment } from '@react-three/drei';
import { Award, Zap, Code2, ArrowRight, Sparkles } from 'lucide-react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Lightweight abstract shape
function AbstractShape() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.x = s.clock.getElapsedTime() * 0.1;
      ref.current.rotation.y = s.clock.getElapsedTime() * 0.15;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={ref} position={[3.5, 1.2, -3]} scale={1.0}>
        <torusKnotGeometry args={[1.4, 0.38, 56, 12]} />
        <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.35} roughness={0.15} metalness={0.8} />
      </mesh>
    </Float>
  );
}

// Highly performant InstancedMesh Keyboard
function Keyboard() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const count = 75; // Max keys
  const dummy = useMemo(() => new THREE.Object3D(), []);

  React.useEffect(() => {
    if (!meshRef.current) return;
    let i = 0;
    const rows = [14, 14, 14, 14, 13];
    const keyW = 0.26;
    const keyD = 0.26;
    const spacing = 0.02;
    
    rows.forEach((numKeys, rowIdx) => {
      for (let col = 0; col < numKeys; col++) {
        let w = 1;
        // Spacebar logic
        if (rowIdx === 4 && col === 5) {
            w = 4;
        } else if (rowIdx === 4 && col > 5 && col < 8) {
            continue; // Skip keys under spacebar
        }
        
        const xPos = (col - numKeys / 2) * (keyW + spacing) + (w > 1 ? (w*keyW)/2 - keyW/2 : 0) + 0.1;
        const zPos = (rowIdx - 2.5) * (keyD + spacing);
        
        dummy.position.set(xPos, 0, zPos);
        dummy.scale.set(w, 1, 1);
        dummy.updateMatrix();
        if (meshRef.current) {
          meshRef.current.setMatrixAt(i++, dummy.matrix);
        }
      }
    });
    if (meshRef.current) {
      meshRef.current.count = i;
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [dummy]);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} position={[0, 0.015, 1.1]}>
      <boxGeometry args={[0.26, 0.02, 0.26]} />
      <meshStandardMaterial color="#1a1a1a" roughness={0.9} metalness={0.1} />
    </instancedMesh>
  );
}

// Responsive laptop - scales based on viewport
function AgencyLaptop() {
  const ref = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const scale = viewport.width < 3.5 ? 0.42 : viewport.width < 5.5 ? 0.62 : 0.88;

  useFrame((s) => {
    if (ref.current) {
      const t = s.clock.getElapsedTime();
      ref.current.rotation.y = Math.sin(t * 0.3) * 0.05;
      ref.current.rotation.x = Math.sin(t * 0.2) * 0.05 + 0.1;
    }
  });

  const aluminumMaterial = <meshStandardMaterial color="#e5e7eb" roughness={0.3} metalness={0.5} />;
  const blackMaterial = <meshStandardMaterial color="#111111" roughness={0.8} metalness={0.2} />;
  const glossyBlack = <meshStandardMaterial color="#111111" roughness={0.1} metalness={0.5} />;
  const trackpadMaterial = <meshStandardMaterial color="#8b919a" roughness={0.3} metalness={0.6} />;

  return (
    <group ref={ref} scale={scale} position={[0, -0.5, 0]}>
      {/* Base Chassis */}
      <RoundedBox args={[4.8, 0.12, 3.2]} radius={0.04} smoothness={4} position={[0, -0.06, 1.6]}>{aluminumMaterial}</RoundedBox>
      <Cylinder args={[0.06, 0.06, 3.8, 16]} rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1f1f1f" roughness={0.6} metalness={0.5} />
      </Cylinder>
      
      {/* Trackpad */}
      <mesh position={[0, 0.002, 2.4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.6, 1.0]} />{trackpadMaterial}
      </mesh>
      
      {/* Keyboard Well */}
      <mesh position={[0, 0.002, 1.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.0, 1.4]} />{blackMaterial}
      </mesh>
      
      {/* Hardware Keyboard (Replaces heavy HTML) */}
      <Keyboard />

      {/* Screen */}
      <group position={[0, 0, 0]} rotation={[-0.2, 0, 0]}>
        {/* Lid */}
        <RoundedBox args={[4.8, 3.1, 0.06]} radius={0.04} smoothness={4} position={[0, 1.55, -0.03]}>{aluminumMaterial}</RoundedBox>
        {/* Bezel */}
        <mesh position={[0, 1.55, 0.001]}><planeGeometry args={[4.7, 3.0]} />{glossyBlack}</mesh>
        {/* Camera Notch */}
        <mesh position={[0, 2.97, 0.002]}><planeGeometry args={[0.6, 0.15]} /><meshBasicMaterial color="#050505" /></mesh>
        <mesh position={[0, 2.97, 0.003]}><circleGeometry args={[0.02, 16]} /><meshBasicMaterial color="#1a2b3c" /></mesh>
        <Text position={[0, 0.15, 0.003]} fontSize={0.06} color="#4a4a4a" anchorX="center" anchorY="middle" letterSpacing={0.1}>MacBook Pro</Text>
        
        {/* Screen content */}
        <group position={[0, 1.58, 0.003]}>
          <Html transform distanceFactor={3.6} zIndexRange={[100, 0]}>
            {/* Removed heavy blur, used CSS radial gradient for performance */}
            <div className="w-[840px] h-[490px] bg-[#050505] overflow-hidden p-8 text-white font-sans flex flex-col relative"
                 style={{ background: 'radial-gradient(circle at center, #3d1c00 0%, #050505 70%)' }}>
              <div className="w-full flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full" />
                  <span className="font-bold text-xl tracking-wider">PARALLAX<span className="font-light">HOME</span></span>
                </div>
                <div className="flex gap-8 text-sm tracking-widest font-medium text-white/60">
                  <span className="text-white">SHOWREEL</span><span>AGENCY</span>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center relative z-10">
                <div className="border border-amber-500/30 px-6 py-2 rounded-full flex items-center gap-2 mb-8 bg-[#1a0f05]">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold tracking-widest text-amber-500 uppercase">Award Winning 3D Agency</span>
                </div>
                <h2 className="text-6xl font-black tracking-tighter text-center leading-[0.9]">
                  <span className="block text-white">Fearless</span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600">Digital Products.</span>
                </h2>
              </div>
            </div>
          </Html>
        </group>
      </group>
    </group>
  );
}

// â”€â”€ Main Component â”€â”€
export function Agency3D({ t }: { t: Template }) {
  return (
    <div className="@container w-full h-full relative bg-[#050508] text-neutral-200 overflow-hidden font-sans" style={{ minHeight: '600px' }}>

      {/* Background orbs */}
      <div className="absolute top-[10%] left-[10%] w-[250px] @md:w-[400px] h-[250px] @md:h-[400px] bg-orange-600 opacity-10 rounded-full blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[5%] w-[350px] @md:w-[600px] h-[350px] @md:h-[600px] bg-amber-600 opacity-10 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* â”€â”€ Navbar â”€â”€ */}
      <header className="absolute top-3 @md:top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto w-[calc(100%-1.5rem)] @md:w-auto">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex items-center justify-between @md:justify-start @md:gap-4 px-4 py-2.5 rounded-[20px] bg-[#121212]/70 border border-white/5 backdrop-blur-md shadow-2xl"
        >
          <div className="flex items-center gap-1.5 font-black text-[11px] tracking-widest @md:mr-3 flex-shrink-0">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
            PRLX.
          </div>
          <div className="hidden @sm:flex items-center gap-3 @md:gap-4">
            <a href="#" className="text-[11px] font-medium text-white tracking-wide">Work</a>
            <a href="#" className="text-[11px] font-medium text-neutral-400 hover:text-white transition-colors tracking-wide">Process</a>
            <a href="#" className="text-[11px] font-medium text-neutral-400 hover:text-white transition-colors tracking-wide hidden @md:inline">Studio</a>
          </div>
          <button className="text-[10px] font-bold px-2.5 @md:px-3 py-1 @md:py-1.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30 transition-colors whitespace-nowrap flex-shrink-0 @md:ml-3">
            Let's Talk
          </button>
        </motion.nav>
      </header>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10 pointer-events-auto">
        <Canvas frameloop="demand"
          camera={{ position: [0, 0, 6], fov: 45 }}
          resize={{ offsetSize: true }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 2]} intensity={3.5} color="#f59e0b" />
          <pointLight position={[-5, -5, 5]} intensity={2.5} color="#ea580c" />
          <pointLight position={[0, -2, -5]} intensity={2} color="#fcd34d" />
          <Environment preset="city" />
          <Stars radius={100} depth={50} count={400} factor={4} saturation={1} fade speed={1} />
          <Suspense fallback={null}>
            <AbstractShape />
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
              <AgencyLaptop />
            </Float>
            <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
          </Suspense>
        </Canvas>
      </div>

      {/* Foreground overlay UI */}
      <div className="absolute inset-0 z-20 pointer-events-none">

        {/* Stats card â€” only @md+ */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute left-3 @md:left-[4%] top-1/2 -translate-y-1/2 pointer-events-auto hidden @md:flex flex-col bg-[#121212]/85 backdrop-blur-md rounded-[18px] p-3 @lg:p-5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-amber-500/10 w-[180px] @lg:w-[230px]"
        >
          <div className="flex items-center gap-2 mb-3 @lg:mb-5">
            <div className="w-7 h-7 @lg:w-9 @lg:h-9 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/30 flex-shrink-0">
              <Award className="w-3 h-3 @lg:w-4 @lg:h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-[8px] @lg:text-[9px] text-neutral-400 uppercase tracking-widest">Awwwards</div>
              <div className="text-[11px] @lg:text-xs font-bold text-white">Site of the Day</div>
            </div>
          </div>
          <div className="space-y-2 @lg:space-y-3">
            {[{ Icon: Code2, label: 'Frontend Build', color: 'bg-emerald-400', glow: 'rgba(52,211,153,0.5)', w: '85%' },
              { Icon: Zap, label: 'Performance', color: 'bg-amber-500', glow: 'rgba(245,158,11,0.5)', w: '92%' }].map(({ Icon, label, color, glow, w }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="w-6 h-6 @lg:w-7 @lg:h-7 rounded-full bg-neutral-800 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-2.5 h-2.5 @lg:w-3 @lg:h-3 text-neutral-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="h-1 @lg:h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full`} style={{ width: w, boxShadow: `0 0 6px ${glow}` }} />
                  </div>
                  <div className="text-[8px] @lg:text-[9px] text-neutral-500 mt-0.5 uppercase tracking-widest">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA pill â€” always visible */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute right-3 @md:right-[4%] bottom-6 @md:bottom-[12%] flex flex-col items-center gap-2 p-3 rounded-[22px] bg-[#121212]/85 border border-white/5 backdrop-blur-md shadow-[0_20px_40px_rgba(0,0,0,0.5)] pointer-events-auto"
        >
          <button className="w-9 h-9 @md:w-11 @md:h-11 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_16px_rgba(245,158,11,0.4)]">
            <ArrowRight className="w-3.5 h-3.5 @md:w-4 @md:h-4 text-white" />
          </button>
          <div className="text-center">
            <h3 className="text-[9px] @md:text-[10px] font-bold text-white tracking-widest uppercase">Start Project</h3>
            <p className="text-[7px] @md:text-[8px] text-neutral-500 mt-0.5">Q3 2026</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

useGLTF.preload('/models/laptop.glb');

