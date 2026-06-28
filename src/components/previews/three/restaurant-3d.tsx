/* eslint-disable @typescript-eslint/no-unused-vars, react-hooks/immutability, react/no-unescaped-entities */
"use client";

import React, { useRef, useState, useMemo, Suspense } from 'react';
import { Template } from '@/lib/data';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Utensils, Star, Check, Sparkles, Clock, ShieldCheck, Heart } from 'lucide-react';
import * as THREE from 'three';

// Deterministic pseudo-random helper to avoid hydration mismatches
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Particle System for glowing gold culinary smoke/embers
function DishParticles({ count = 25 }) {
  const pointsRef = useRef<THREE.Points>(null);
  
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = seededRandom(i * 12 + 1) * Math.PI * 2;
      const radius = seededRandom(i * 24 + 2) * 0.35;
      
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = seededRandom(i * 36 + 3) * 0.4 + 0.1;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      
      vel[i * 3] = (seededRandom(i * 48 + 4) - 0.5) * 0.04;
      vel[i * 3 + 1] = seededRandom(i * 60 + 5) * 0.12 + 0.1; // rise velocity
      vel[i * 3 + 2] = (seededRandom(i * 72 + 6) - 0.5) * 0.04;
    }
    return [pos, vel];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    if (!posAttr) return;

    const array = posAttr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      // Rise up
      array[i * 3 + 1] += velocities[i * 3 + 1] * delta * 1.5;
      // Drift slightly
      array[i * 3] += velocities[i * 3] * delta * 0.6;
      array[i * 3 + 2] += velocities[i * 3 + 2] * delta * 0.6;

      // Reset when particle goes too high
      if (array[i * 3 + 1] > 1.5) {
        const timeVal = Math.round(state.clock.getElapsedTime() * 10) / 10;
        const angle = seededRandom(i * 12 + timeVal) * Math.PI * 2;
        const radius = seededRandom(i * 24 + 1.5) * 0.25;
        array[i * 3] = Math.cos(angle) * radius;
        array[i * 3 + 1] = 0.05;
        array[i * 3 + 2] = Math.sin(angle) * radius;
      }
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#f59e0b"
        size={0.06}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Glowing signature core inside the plate
function CulinaryCore({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const coreRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.4;
      coreRef.current.rotation.x += delta * 0.15;
      
      const elapsed = state.clock.getElapsedTime();
      coreRef.current.position.y = 0.45 + Math.sin(elapsed * 2.2) * 0.04;
      
      // Reveal scale based on scroll
      const scale = Math.min(1.0, scrollProgress.current * 1.5);
      coreRef.current.scale.setScalar(scale);
    }
    
    // Rotate orbits
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.8;
      ring1Ref.current.rotation.y += delta * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.5;
      ring2Ref.current.rotation.z += delta * 0.4;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z += delta * 0.6;
      ring3Ref.current.rotation.x -= delta * 0.2;
    }
  });

  return (
    <group ref={coreRef} scale={0}>
      {/* Faceted Core Gold Star */}
      <mesh>
        <icosahedronGeometry args={[0.32, 1]} />
        <meshPhysicalMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={2.0}
          roughness={0.05}
          metalness={0.95}
        />
      </mesh>
      
      {/* Outer Cage */}
      <mesh scale={1.22}>
        <octahedronGeometry args={[0.3, 0]} />
        <meshPhysicalMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Orbit Rings */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[0.62, 0.012, 8, 48]} />
        <meshPhysicalMaterial color="#d4af37" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 4, Math.PI / 3, 0]}>
        <torusGeometry args={[0.72, 0.01, 8, 48]} />
        <meshPhysicalMaterial color="#f59e0b" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[Math.PI / 1.6, -Math.PI / 4, 0]}>
        <torusGeometry args={[0.82, 0.008, 8, 48]} />
        <meshPhysicalMaterial color="#ffffff" roughness={0.05} metalness={0.95} />
      </mesh>

      <DishParticles count={25} />
    </group>
  );
}

// Dome cloche that lifts up on scroll
function Cloche({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const clocheRef = useRef<THREE.Group>(null);
  const spotlightRef = useRef<THREE.SpotLight>(null);

  useFrame((state) => {
    if (clocheRef.current) {
      // closed Y = 0.12, fully open Y = 3.3
      const targetY = 0.12 + scrollProgress.current * 3.3;
      clocheRef.current.position.y = THREE.MathUtils.lerp(clocheRef.current.position.y, targetY, 0.08);

      // Tilts backward slightly as it is lifted
      const targetRotX = scrollProgress.current * 0.36;
      const targetRotZ = scrollProgress.current * -0.16;
      clocheRef.current.rotation.x = THREE.MathUtils.lerp(clocheRef.current.rotation.x, targetRotX, 0.08);
      clocheRef.current.rotation.z = THREE.MathUtils.lerp(clocheRef.current.rotation.z, targetRotZ, 0.08);
    }

    if (spotlightRef.current) {
      // Dramatic reveal light! Intense spotlight from above that focuses on the dish as cloche lifts
      const targetIntensity = scrollProgress.current > 0.02 ? scrollProgress.current * 12 : 0;
      spotlightRef.current.intensity = THREE.MathUtils.lerp(spotlightRef.current.intensity, targetIntensity, 0.1);
    }
  });

  return (
    <group>
      {/* Downward reveal spotlight */}
      <spotLight
        ref={spotlightRef}
        position={[0, 6, 0]}
        angle={Math.PI / 6.5}
        penumbra={0.9}
        intensity={0}
        color="#ffe2b3"
        castShadow
      />

      <group ref={clocheRef} position={[0, 0.12, 0]}>
        {/* Silver Dome */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.22, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshPhysicalMaterial
            color="#fcfcfc"
            metalness={0.98}
            roughness={0.06}
            clearcoat={1.0}
            clearcoatRoughness={0.04}
            reflectivity={0.95}
          />
        </mesh>

        {/* Gold Trim Ring */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.22, 0.035, 12, 64]} />
          <meshPhysicalMaterial
            color="#d4af37"
            metalness={0.95}
            roughness={0.12}
          />
        </mesh>

        {/* Top Handle Stem */}
        <mesh position={[0, 1.24, 0]}>
          <cylinderGeometry args={[0.13, 0.18, 0.07, 32]} />
          <meshPhysicalMaterial
            color="#d4af37"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Top Handle Ring */}
        <mesh position={[0, 1.36, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.09, 0.025, 12, 32]} />
          <meshPhysicalMaterial
            color="#d4af37"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
}

// Circular marble table and white ceramic plate
function TableAndPlate() {
  return (
    <group>
      {/* Luxury Dark Marble Table top */}
      <mesh position={[0, -0.66, 0]} receiveShadow>
        <cylinderGeometry args={[5.2, 5.2, 1.2, 64]} />
        <meshPhysicalMaterial
          color="#0d0d0d"
          roughness={0.1}
          metalness={0.2}
          clearcoat={1.0}
          clearcoatRoughness={0.04}
        />
      </mesh>

      {/* Pristine Ceramic Plate */}
      <group position={[0, 0, 0]}>
        {/* Main Base */}
        <mesh position={[0, 0.02, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[1.78, 1.7, 0.05, 64]} />
          <meshPhysicalMaterial
            color="#faf9f6"
            roughness={0.15}
            metalness={0.02}
            clearcoat={0.9}
            clearcoatRoughness={0.05}
          />
        </mesh>
        
        {/* Gold Outer Rim */}
        <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.77, 0.015, 8, 64]} />
          <meshPhysicalMaterial
            color="#d4af37"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>

        {/* Plate Well */}
        <mesh position={[0, 0.035, 0]} receiveShadow>
          <cylinderGeometry args={[1.32, 1.32, 0.02, 64]} />
          <meshPhysicalMaterial
            color="#f5f4f0"
            roughness={0.18}
            metalness={0.0}
            clearcoat={0.7}
          />
        </mesh>
      </group>
    </group>
  );
}

// Flickering romantic candle
function FlickeringCandle({ position }: { position: [number, number, number] }) {
  const lightRef = useRef<THREE.PointLight>(null);
  const flameRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (lightRef.current) {
      const flicker =
        Math.sin(elapsed * 10.0) * 0.12 +
        Math.cos(elapsed * 23.0) * 0.07 +
        Math.sin(elapsed * 4.3) * 0.05;
      lightRef.current.intensity = 1.8 + flicker;
    }
    if (flameRef.current) {
      const scaleVal = 1.0 + Math.sin(elapsed * 18.0) * 0.04;
      flameRef.current.scale.set(scaleVal, scaleVal * 1.15, scaleVal);
    }
  });

  return (
    <group position={position}>
      {/* Candle Glass Holder */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.3, 32]} />
        <meshPhysicalMaterial
          color="#151515"
          roughness={0.05}
          metalness={0.9}
          clearcoat={1.0}
        />
      </mesh>

      {/* Wax Body */}
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.18, 32]} />
        <meshStandardMaterial color="#fffbe6" roughness={0.65} />
      </mesh>

      {/* Flame */}
      <mesh ref={flameRef} position={[0, 0.4, 0]}>
        <coneGeometry args={[0.04, 0.13, 16]} />
        <meshBasicMaterial color="#ff9500" />
      </mesh>

      {/* Flame PointLight */}
      <pointLight
        ref={lightRef}
        position={[0, 0.4, 0]}
        color="#ff7300"
        intensity={1.8}
        distance={7}
        decay={2.0}
        castShadow
      />
    </group>
  );
}

// Camera control tied to scroll
function SceneCamera({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { camera } = useThree();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const currentScroll = scrollProgress.current;

    // Normal position: [0, 2.3, 5.0]
    // Scroll open position: [0.7, 3.6, 3.8] (tilts down, moves slightly right for menu layout)
    const targetX = currentScroll * 0.7 + Math.sin(elapsed * 0.25) * 0.15;
    const targetY = 2.3 + currentScroll * 1.6 + Math.cos(elapsed * 0.15) * 0.04;
    const targetZ = 5.0 - currentScroll * 1.1;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);

    // Look at center plate, pan up slightly on scroll
    const targetLookY = 0.22 + currentScroll * 0.18;
    camera.lookAt(0, targetLookY, 0);
  });

  return null;
}

export function Restaurant3D({ t }: { t: Template }) {
  const [selectedTab, setSelectedTab] = useState<"Starters" | "Mains" | "Desserts">("Mains");
  const [reserved, setReserved] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const maxScroll = target.scrollHeight - target.clientHeight;
    if (maxScroll > 0) {
      // Clamp between 0 and 1
      scrollProgress.current = Math.min(1, Math.max(0, target.scrollTop / maxScroll));
    }
  };

  const menuItems = {
    Starters: [
      { name: "Charred Octopus Carpaccio", price: "24", desc: "Thinly sliced octopus, caper berries, microgreens, citrus vinaigrette, saffron oil." },
      { name: "Truffle Mushroom Gnocchi", price: "28", desc: "Hand-rolled potato gnocchi, wild forest mushrooms, shaved black winter truffles, aged parmesan foam." }
    ],
    Mains: [
      { name: "A5 Miyazaki Wagyu Striploin", price: "95", desc: "4oz pan-seared A5 wagyu, smoked parsnip puree, glazed baby heirloom carrots, red wine jus." },
      { name: "Glacier 51 Toothfish", price: "68", desc: "Patagonian toothfish, sea succulent emulsion, finger lime caviar, sea-spray foam." }
    ],
    Desserts: [
      { name: "Deconstructed Meyer Lemon Spheres", price: "18", desc: "Lemon curd filled cocoa butter globes, toasted Italian meringue, wild honey crumble." },
      { name: "Grand Cru Valrhona Soufflé", price: "22", desc: "Warm molten dark chocolate core, madagascar vanilla bean gelato, gold leaf flakes." }
    ]
  };

  return (
    <div className="@container w-full h-full relative overflow-hidden bg-[#060606] text-white">
      {/* 3D Scene Background Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas frameloop="demand" shadows camera={{ position: [0, 2.3, 5.0], fov: 42 }}>
          {/* Ambient Lighting */}
          <ambientLight intensity={0.12} />
          
          {/* Subtle mood lights */}
          <directionalLight position={[5, 12, 5]} intensity={2.5} color="#ffe8cc" castShadow />
          <directionalLight position={[-6, 3, -6]} intensity={0.8} color="#90b0ef" />
          
          {/* Flickering candle on the side of the table */}
          <FlickeringCandle position={[-2.4, 0, -1.8]} />

          {/* R3F Environment night reflections */}
          <Suspense fallback={null}>
            <Environment preset="night" />
          </Suspense>

          {/* Core scene components */}
          <TableAndPlate />
          <CulinaryCore scrollProgress={scrollProgress} />
          <Cloche scrollProgress={scrollProgress} />

          <SceneCamera scrollProgress={scrollProgress} />

          {/* Bloom Post Processing */}
          <EffectComposer>
            <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.8} intensity={1.5} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* Luxury Decorative Left Sidebar */}
      <div className="absolute top-0 bottom-0 left-0 w-[80px] border-r border-amber-950/20 bg-black/45 backdrop-blur-xl hidden @3xl:flex flex-col items-center justify-between py-8 z-30 select-none">
        <span className="text-[10px] tracking-[0.4em] font-serif uppercase text-amber-500/60 rotate-270 whitespace-nowrap mt-4">
          SA V O I R
        </span>
        <div className="flex flex-col gap-1 text-amber-500/80">
          <Star className="w-3.5 h-3.5 fill-current" />
          <Star className="w-3.5 h-3.5 fill-current animate-pulse" />
          <Star className="w-3.5 h-3.5 fill-current" />
        </div>
        <span className="text-[8px] tracking-[0.2em] font-mono uppercase text-white/30 rotate-270 whitespace-nowrap mb-4">
          MICHELIN EXPERIENCE
        </span>
      </div>

      {/* Luxury Decorative Right Sidebar */}
      <div className="absolute top-0 bottom-0 right-0 w-[80px] border-l border-amber-950/20 bg-black/45 backdrop-blur-xl hidden @3xl:flex flex-col items-center justify-between py-8 z-30 select-none">
        <span className="text-[10px] tracking-[0.4em] font-serif uppercase text-amber-500/60 rotate-90 whitespace-nowrap mt-4">
          G A S T R O N O M I E
        </span>
        <div className="w-[1px] h-20 bg-amber-950/30" />
        <span className="text-[8px] tracking-[0.2em] font-mono uppercase text-white/30 rotate-90 whitespace-nowrap mb-4">
          EST. 2026
        </span>
      </div>

      {/* Main Scrollable Interface Overlay */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden scrollbar-none pointer-events-auto flex flex-col"
      >
        {/* Sticky Header */}
        <header className="px-8 py-5 border-b border-amber-950/10 flex justify-between items-center bg-black/60 backdrop-blur-xl sticky top-0 z-50">
          <div className="flex items-center gap-2 font-serif font-bold tracking-widest text-base text-amber-100">
            <Utensils className="w-4.5 h-4.5 text-amber-500" />
            <span>SAVOIR</span>
          </div>
          <nav className="hidden @md:flex gap-8 text-[9px] uppercase tracking-[0.2em] font-bold text-white/50 font-sans">
            <a href="#philosophy" className="hover:text-amber-300 transition-colors">Philosophy</a>
            <a href="#menu-select" className="hover:text-amber-300 transition-colors">Menu Selection</a>
            <a href="#booking" className="hover:text-amber-300 transition-colors">Reservations</a>
          </nav>
          <a 
            href="#booking" 
            className="text-[9px] font-sans font-bold uppercase tracking-wider px-4 py-2 rounded border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 text-amber-200 transition-all duration-300"
          >
            Reserve Table
          </a>
        </header>

        {/* Hero Section (Covering the Canvas initially) */}
        <section className="relative min-h-[90vh] shrink-0 w-full flex flex-col justify-end p-8 @3xl:pl-28 @3xl:pr-28 pointer-events-none">
          <div className="max-w-xl pointer-events-auto mb-16">
            <span className="inline-flex items-center gap-1.5 text-[8px] font-sans font-bold uppercase tracking-[0.2em] border border-amber-500/30 bg-amber-500/10 text-amber-400 px-3.5 py-1.5 rounded-full mb-4 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Interactive Spatial Gastronomy
            </span>
            <h1 className="text-3xl @md:text-5xl font-serif font-light tracking-wider leading-tight mb-3 text-amber-100">
              Savour the Spatial.
            </h1>
            <p className="text-xs text-white/60 mb-6 leading-relaxed font-sans font-light">
              Interact with our Michelin culinary innovation. Scroll down to lift the silver cloche and reveal tonight's signature chef's degustation.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#menu-select" 
                className="inline-block text-[9px] font-sans font-bold uppercase tracking-wider px-6 py-3 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg shadow-amber-950/20 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Explore Menu
              </a>
              <span className="text-[9px] text-amber-400/80 font-mono tracking-widest animate-bounce">
                ↓ Scroll to reveal
              </span>
            </div>
          </div>
        </section>

        {/* Chef Philosophy */}
        <section id="philosophy" className="px-6 py-20 shrink-0 w-full @3xl:pl-28 @3xl:pr-28 border-y border-amber-950/10 bg-black/80 backdrop-blur-md relative">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-[8px] font-mono tracking-[0.35em] text-amber-500/60 uppercase block mb-3">
              - Culinary Artistry -
            </span>
            <h2 className="text-2xl @md:text-3xl font-serif font-light tracking-wide text-amber-100 mb-6">
              Crafting The Unseen
            </h2>
            <p className="text-xs text-white/70 leading-relaxed font-light mb-6 font-sans">
              At Savoir, we believe dining is not merely sustenance, but an exploration of spatial design, culinary art, and ambient atmosphere. Every dish is a sculpture, every flavor a coordinates in our sensory universe. By coupling digital projection, spatial acoustics, and culinary physics, we invite you to experience gastronomy with all five senses.
            </p>
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-amber-950/20 text-center">
              <div>
                <p className="text-[14px] font-serif font-light text-amber-400">14.2°C</p>
                <p className="text-[7px] font-mono text-white/40 uppercase tracking-widest mt-1">Cellar Temp</p>
              </div>
              <div>
                <p className="text-[14px] font-serif font-light text-amber-400">7 Courses</p>
                <p className="text-[7px] font-mono text-white/40 uppercase tracking-widest mt-1">Degustation</p>
              </div>
              <div>
                <p className="text-[14px] font-serif font-light text-amber-400">18 Tables</p>
                <p className="text-[7px] font-mono text-white/40 uppercase tracking-widest mt-1">Daily Seating</p>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Selection */}
        <section id="menu-select" className="px-6 py-20 shrink-0 w-full @3xl:pl-28 @3xl:pr-28 bg-gradient-to-b from-black/80 to-[#0c0a08]/95 backdrop-blur-md">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-center text-[8px] font-mono font-bold uppercase tracking-[0.35em] text-amber-500/70 mb-4">
              Tonight's Tasting Collection
            </h2>
            <h3 className="text-center text-xl @md:text-3xl font-serif font-light tracking-wider text-amber-100 mb-10">
              The Degustation Menu
            </h3>
            
            {/* Tabs */}
            <div className="flex justify-center gap-8 mb-12 border-b border-amber-950/20 pb-4">
              {(["Starters", "Mains", "Desserts"] as const).map((tab) => (
                <button 
                  key={tab} 
                  className={`text-[10px] font-sans font-bold uppercase tracking-widest pb-1 transition-all duration-300 ${selectedTab === tab ? 'text-amber-400 border-b border-amber-400' : 'text-white/40 hover:text-white'}`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Menu Items list */}
            <div className="space-y-8">
              {menuItems[selectedTab].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex justify-between items-start gap-6 border border-amber-950/15 bg-black/40 backdrop-blur-xl p-5 rounded-2xl hover:border-amber-500/30 hover:bg-black/60 transition-all duration-300 group"
                >
                  <div className="flex-1">
                    <h4 className="text-sm font-serif text-amber-200 group-hover:text-amber-100 transition-colors">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-white/50 mt-1.5 leading-relaxed font-sans font-light">
                      {item.desc}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-3 text-[7px] font-mono text-amber-500/70 uppercase tracking-widest">
                      <Sparkles className="w-2.5 h-2.5" /> Wine pairing recommended
                    </span>
                  </div>
                  <span className="text-sm font-serif font-light text-amber-400">${item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reservation Form */}
        <section id="booking" className="px-6 py-20 shrink-0 w-full @3xl:pl-28 @3xl:pr-28 border-t border-amber-950/10 bg-[#060606] relative z-20 text-center">
          <div className="max-w-xl mx-auto bg-black/50 border border-amber-950/20 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
            <h2 className="text-lg font-serif font-light tracking-wider mb-2 text-amber-100">Reserve Your Experience</h2>
            <p className="text-[10px] text-white/40 mb-8 font-sans font-light">Bookings open 30 days in advance. A culinary journey awaits.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div>
                <label className="text-[7px] font-mono font-bold uppercase text-white/40 block mb-1.5 tracking-wider">Party Size</label>
                <select className="w-full text-[10px] border border-amber-950/30 bg-black/60 rounded-lg p-2.5 text-white outline-none focus:border-amber-500/50 font-sans">
                  <option className="bg-[#0c0a08] text-white">2 Guests</option>
                  <option className="bg-[#0c0a08] text-white">4 Guests</option>
                  <option className="bg-[#0c0a08] text-white">6 Guests</option>
                  <option className="bg-[#0c0a08] text-white">Chef's Table (8+)</option>
                </select>
              </div>
              <div>
                <label className="text-[7px] font-mono font-bold uppercase text-white/40 block mb-1.5 tracking-wider">Desired Date</label>
                <input 
                  type="date" 
                  className="w-full text-[10px] border border-amber-950/30 bg-black/60 rounded-lg p-2 text-white outline-none focus:border-amber-500/50 font-sans" 
                  defaultValue="2026-06-20" 
                />
              </div>
              <div className="flex items-end">
                <button 
                  className={`w-full text-[10px] font-sans font-bold py-2.5 rounded-lg text-white border border-amber-500/40 bg-gradient-to-b from-amber-600/30 to-amber-700/30 hover:from-amber-600/50 hover:to-amber-700/50 hover:border-amber-400 transition-all duration-300 flex items-center justify-center gap-1.5`}
                  onClick={() => setReserved(true)}
                >
                  {reserved ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      Secured
                    </>
                  ) : (
                    "Secure Table"
                  )}
                </button>
              </div>
            </div>
            {reserved && (
              <div className="mt-6 p-3 bg-green-950/20 border border-green-500/20 rounded-xl flex items-center gap-2.5 justify-center text-[10px] text-green-400 font-sans animate-fade-in">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <span>Reservation confirmed. A confirmation code has been generated.</span>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t border-amber-950/10 bg-[#040404] py-8 px-6 text-[8px] font-mono text-white/30 text-center uppercase tracking-[0.25em] relative z-20">
          &copy; {new Date().getFullYear()} SAVOIR SPATIAL BISTRO. ALL RIGHTS RESERVED.
        </footer>
      </div>
    </div>
  );
}
