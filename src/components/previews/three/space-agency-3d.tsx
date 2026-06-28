"use client";

import React, { useRef, useState, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Float, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { 
  Rocket, 
  Globe, 
  Sliders, 
  Navigation, 
  Compass, 
  Zap, 
  Activity, 
  Gauge, 
  ExternalLink,
  MapPin,
  Calendar,
  HelpCircle,
  ChevronRight,
  Send
} from 'lucide-react';

// Planetary configurations
const PLANETS = {
  habitable: {
    name: "Kepler-186f",
    color: "#10b981",
    emissive: "#047857",
    glow: "#34d399",
    roughness: 0.8,
    metalness: 0.1,
    hasRings: false,
    desc: "A lush, earth-like exoplanet with liquid surface water and nitrogen-oxygen atmosphere."
  },
  gasgiant: {
    name: "Chronos-9",
    color: "#f59e0b",
    emissive: "#b45309",
    glow: "#fbbf24",
    roughness: 0.3,
    metalness: 0.9,
    hasRings: true,
    desc: "A massive neon gas giant with complex hydrocarbon storms and brilliant crystalline rings."
  },
  iceworld: {
    name: "Frost-X",
    color: "#38bdf8",
    emissive: "#0369a1",
    glow: "#7dd3fc",
    roughness: 0.1,
    metalness: 0.5,
    hasRings: false,
    desc: "A freezing super-earth locked in perpetual ice, coated with high-albedo silicate crystals."
  }
};

// Procedural exhaust particles
function ThrusterParticles({ active }: { active: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 40;
  
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.15; // spread in X
      pos[i * 3 + 1] = -0.05 + (Math.random() - 0.5) * 0.15; // spread in Y
      pos[i * 3 + 2] = 0.7 + Math.random() * 0.5; // start at exhaust
      spd[i] = 1.8 + Math.random() * 2.5; // velocity
    }
    return [pos, spd];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    if (!posAttr) return;
    
    for (let i = 0; i < count; i++) {
      let z = posAttr.getZ(i);
      // Particles shoot backward (-Z is forward, so +Z is backward)
      z += speeds[i] * delta * (active ? 6 : 2);
      
      // Reset particle when it goes too far
      if (z > (active ? 4.0 : 1.5)) {
        posAttr.setX(i, (Math.random() - 0.5) * 0.1);
        posAttr.setY(i, -0.05 + (Math.random() - 0.5) * 0.1);
        z = 0.7 + Math.random() * 0.2;
      }
      posAttr.setZ(i, z);
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
        color={active ? "#06b6d4" : "#f43f5e"} 
        size={0.06} 
        transparent 
        opacity={0.8} 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Interactive Spacecraft Model
function Spacecraft({ 
  speed, 
  warpActive, 
  rotationY 
}: { 
  speed: number; 
  warpActive: boolean; 
  rotationY: number; 
}) {
  const groupRef = useRef<THREE.Group>(null);
  const thrusterRef = useRef<THREE.Mesh>(null);

  // Orbit parameters (elliptical orbit around the planet)
  const radiusX = 4.5;
  const radiusZ = 3.5;
  const planetCenter = [2.5, -0.2, -1]; // Planet coordinates

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Orbit path calculation (0.01 rad/frame base, scaled by speed and warp)
    const orbitalSpeed = warpActive ? 0.45 : 0.08;
    const angle = time * orbitalSpeed * speed;
    
    const x = planetCenter[0] + Math.cos(angle) * radiusX;
    const z = planetCenter[2] + Math.sin(angle) * radiusZ;
    // Hover amplitude overlayed on top of path
    const y = planetCenter[1] + Math.sin(time * 2.0) * 0.12 + 0.35;

    groupRef.current.position.set(x, y, z);

    // Tangent angle calculation to align heading facing forward along path
    const dx = -Math.sin(angle) * radiusX;
    const dz = Math.cos(angle) * radiusZ;
    const tangentHeading = Math.atan2(-dz, dx);

    // Align rotation + user heading offset
    groupRef.current.rotation.y = tangentHeading + rotationY;

    // Thruster pulsing effect
    if (thrusterRef.current) {
      const pulse = 1.0 + Math.sin(time * 25) * 0.25;
      const baseScale = warpActive ? 2.5 : 1.0;
      thrusterRef.current.scale.set(pulse, pulse * baseScale, pulse);
    }
  });

  return (
    <group ref={groupRef} rotation={[0.3, 0, 0]} scale={0.7}>
      {/* Fuselage / Main Body */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 1.4, 16]} />
        <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Cockpit / Nose Cone */}
      <mesh position={[0, 0, -0.9]} rotation={[-Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.2, 0.4, 16]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.1} />
      </mesh>

      {/* Left Wing */}
      <mesh position={[-0.5, -0.1, 0.2]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.8, 0.05, 0.4]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Right Wing */}
      <mesh position={[0.5, -0.1, 0.2]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.8, 0.05, 0.4]} />
        <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Vertical Stabilizer (Tail Fin) */}
      <mesh position={[0, 0.35, 0.4]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.04, 0.6, 0.3]} />
        <meshStandardMaterial color="#3b82f6" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Jet Thrusters */}
      <mesh position={[0, -0.05, 0.72]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.15, 12]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} />
      </mesh>

      {/* Thruster Engine Flame */}
      <mesh ref={thrusterRef} position={[0, -0.05, 1.1]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.08, 0.6, 12]} />
        <meshBasicMaterial 
          color={warpActive ? "#06b6d4" : "#f43f5e"} 
          toneMapped={false} 
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Procedural Engine Particles */}
      <ThrusterParticles active={warpActive} />
    </group>
  );
}

// Interactive Planet Model
function CelestialPlanet({ 
  config, 
  sensorSweepActive,
  planetType
}: { 
  config: typeof PLANETS.habitable; 
  sensorSweepActive: boolean;
  planetType: string;
}) {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const sweepRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  // Load exoplanet textures
  const textures = useTexture({
    map: '/textures/earth_color.jpg',
    specular: '/textures/earth_specular.jpg',
    clouds: '/textures/earth_clouds.png'
  });

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (planetRef.current) {
      planetRef.current.rotation.y = time * 0.05;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = time * 0.065;
      cloudsRef.current.rotation.x = time * 0.01;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -time * 0.02;
    }
    if (sweepRef.current && sensorSweepActive) {
      sweepRef.current.position.y = Math.sin(time * 1.5) * 2.8;
    }
  });

  // Render high-fidelity material based on category
  const renderMaterial = () => {
    switch (planetType) {
      case 'habitable':
        return (
          <meshStandardMaterial 
            map={textures.map}
            roughnessMap={textures.specular}
            roughness={0.7}
            metalness={0.15}
            emissive={config.emissive}
            emissiveIntensity={0.15}
          />
        );
      case 'gasgiant':
        // Gorgeous gas-giant created by colorizing earth textures with golden/amber hues
        return (
          <meshStandardMaterial 
            map={textures.map}
            color={config.color}
            emissive={config.emissive}
            emissiveIntensity={0.4}
            roughness={config.roughness}
            metalness={config.metalness}
          />
        );
      case 'iceworld':
        // Blue icy exoplanet texture mapping
        return (
          <meshStandardMaterial 
            map={textures.map}
            color="#a5f3fc"
            roughness={0.2}
            metalness={0.5}
            emissive={config.emissive}
            emissiveIntensity={0.25}
          />
        );
      default:
        return <meshStandardMaterial color={config.color} />;
    }
  };

  return (
    <group position={[2.5, -0.2, -1]} scale={1.25}>
      {/* Planet Sphere */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[2.0, 64, 64]} />
        {renderMaterial()}
      </mesh>

      {/* Floating Cloud Layer (Habitable and Iceworlds) */}
      {(planetType === 'habitable' || planetType === 'iceworld') && (
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[2.03, 64, 64]} />
          <meshStandardMaterial 
            alphaMap={textures.clouds}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            opacity={planetType === 'habitable' ? 0.6 : 0.3}
            color={planetType === 'iceworld' ? "#cffafe" : "#ffffff"}
          />
        </mesh>
      )}

      {/* Holographic Planet Wireframe Overlay (lights up when sensor sweep is toggled) */}
      <mesh>
        <sphereGeometry args={[2.02, 32, 32]} />
        <meshBasicMaterial 
          color={config.glow} 
          wireframe 
          transparent 
          opacity={sensorSweepActive ? 0.35 : 0.08} 
        />
      </mesh>

      {/* Planetary Rings (Chronos-9 Gas Giant only) */}
      {config.hasRings && (
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0.4, 0]}>
          <ringGeometry args={[2.8, 4.4, 64]} />
          <meshStandardMaterial 
            color="#fbbf24" 
            transparent 
            opacity={0.5} 
            side={THREE.DoubleSide} 
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      )}

      {/* Glowing Atmosphere Shell */}
      <mesh>
        <sphereGeometry args={[2.15, 32, 32]} />
        <meshBasicMaterial 
          color={config.glow} 
          transparent 
          opacity={0.04} 
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Sensor Sweep Ring Visualizer */}
      {sensorSweepActive && (
        <group ref={sweepRef} position={[0, 0, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.04, 2.14, 64]} />
            <meshBasicMaterial color="#06b6d4" transparent opacity={0.7} toneMapped={false} />
          </mesh>
        </group>
      )}
    </group>
  );
}

// Main 3D Space Tourism Template Component
export function SpaceAgency3D({ t }: { t?: any }) {
  const [planetType, setPlanetType] = useState<keyof typeof PLANETS>('habitable');
  const [warpActive, setWarpActive] = useState(false);
  const [warpSpeed, setWarpSpeed] = useState(1.0);
  const [sensorSweep, setSensorSweep] = useState(false);
  const [shipRotation, setShipRotation] = useState(0);

  // HUD active tab selection
  const [activeTab, setActiveTab] = useState<'flightDeck' | 'destinations' | 'pricing' | 'timeline' | 'booking'>('flightDeck');

  // Fluctuating HUD Telemetry data
  const [telemetry, setTelemetry] = useState({
    velocity: "1.02c",
    shieldLevel: 100.0,
    engineTemp: 320,
    warpCorePower: 45
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry(prev => {
        const shieldNoise = Math.random() * 0.15;
        const speedMultiplier = warpActive ? warpSpeed * 3.5 : warpSpeed;
        const tempMultiplier = warpActive ? 4.8 : 1.0;

        return {
          velocity: (speedMultiplier * 1.02 + Math.random() * 0.05).toFixed(2) + "c",
          shieldLevel: parseFloat(Math.max(88, prev.shieldLevel - shieldNoise + (Math.random() > 0.6 ? 0.2 : 0)).toFixed(1)),
          engineTemp: Math.floor(320 + speedMultiplier * 125 * tempMultiplier + Math.random() * 20),
          warpCorePower: warpActive ? Math.min(100, Math.floor(80 + Math.random() * 20)) : Math.floor(40 + Math.random() * 10)
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [warpActive, warpSpeed]);

  const activePlanet = PLANETS[planetType];

  // Booking Form State
  const [bookingPlanet, setBookingPlanet] = useState('Kepler-186f');
  const [bookingDate, setBookingDate] = useState('2026-10-12');
  const [bookingClass, setBookingClass] = useState('explorer');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  return (
    <div className="relative w-full h-full min-h-[620px] lg:min-h-0 lg:h-[750px] bg-[#03000a] rounded-3xl overflow-y-auto lg:overflow-hidden shadow-2xl font-mono border border-blue-500/10 flex flex-col justify-between select-none scrollbar-none">
      {/* Cyberpunk Scanline Scan Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:100%_6px] pointer-events-none z-10" />

      {/* 3D WebGL Canvas Area */}
      <div className="relative lg:absolute lg:inset-0 w-full flex-1 min-h-[280px] sm:min-h-[350px] lg:h-full z-0">
        <Canvas frameloop="demand" camera={{ position: [0, 0, 8], fov: 45 }}>
          <color attach="background" args={["#03000a"]} />
          <ambientLight intensity={0.5} />
          
          <pointLight position={[5, 10, 5]} intensity={1.8} color="#06b6d4" />
          <pointLight position={[-10, -5, -5]} intensity={0.6} color="#c084fc" />
          
          <Suspense fallback={null}>
            <Stars 
              radius={100} 
              depth={60} 
              count={warpActive ? 4000 : 1200} 
              factor={warpActive ? 12 : 5} 
              saturation={0.7} 
              fade 
              speed={warpActive ? warpSpeed * 6.5 : 1.2} 
            />
            
            <Spacecraft 
              speed={warpSpeed} 
              warpActive={warpActive} 
              rotationY={shipRotation} 
            />
            
            <CelestialPlanet 
              config={activePlanet} 
              sensorSweepActive={sensorSweep} 
              planetType={planetType}
            />
          </Suspense>

          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            maxPolarAngle={Math.PI / 2 + 0.1}
            minPolarAngle={Math.PI / 2 - 0.2}
          />

          <EffectComposer>
            <Bloom luminanceThreshold={0.2} intensity={warpActive ? 2.5 : 1.2} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* HUD Layer Overlays */}
      <div className="relative lg:absolute lg:inset-0 z-10 flex flex-col justify-end lg:justify-between p-4 md:p-6 pointer-events-none w-full lg:h-full">
        
        {/* Header HUD panel */}
        <div className="hidden lg:flex justify-between items-center pointer-events-auto w-full">
          <div className="flex items-center gap-3 bg-black/50 border border-blue-500/20 px-4 py-2 rounded-xl backdrop-blur-md">
            <Rocket className="w-5 h-5 text-blue-400 animate-pulse" />
            <div>
              <h1 className="text-white font-black text-xs md:text-sm tracking-widest uppercase">ASTROVOYAGE</h1>
              <p className="text-[7px] md:text-[8px] text-blue-400 font-bold tracking-wider uppercase">Deep Space Expedition Hub</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 text-[9px] text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Warp Core Stabilized
            </span>
            <button 
              onClick={() => setActiveTab('booking')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl border border-blue-400/20 shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all flex items-center gap-2 pointer-events-auto"
            >
              Book Charter <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mid-screen Grid/Crosshair overlay */}
        <div className="hidden lg:flex mx-auto my-auto w-24 h-24 border border-blue-500/10 rounded-full items-center justify-center pointer-events-none opacity-40">
          <div className="w-1 h-8 bg-blue-500/20 absolute" />
          <div className="w-8 h-1 bg-blue-500/20 absolute" />
          <div className="w-10 h-10 border border-blue-500/20 border-dashed rounded-full" />
        </div>

        {/* Bottom Control & Info Deck Area */}
        <div className="flex flex-col w-full mt-4 lg:mt-auto pointer-events-auto">
          
          {/* Sci-Fi Navigation Tabs */}
          <div className="flex flex-wrap gap-1 bg-black/75 border border-blue-500/20 p-1 rounded-2xl backdrop-blur-md w-full mb-3 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            {[
              { id: 'flightDeck', label: 'FLIGHT DECK' },
              { id: 'destinations', label: 'DESTINATIONS' },
              { id: 'pricing', label: 'EXPEDITIONS' },
              { id: 'timeline', label: 'LAUNCH PLAN' },
              { id: 'booking', label: 'CHARTER & FAQ' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 min-w-[90px] py-2.5 rounded-xl text-[9px] font-black tracking-widest transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600/30 text-blue-200 border border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                    : 'text-white/40 border border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Conditional Tab Rendering */}
          {activeTab === 'flightDeck' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-stretch w-full">
              
              {/* Deck panel 1: Navigation & Selector */}
              <div className="bg-black/75 border border-blue-500/20 rounded-2xl p-4 backdrop-blur-md flex flex-col justify-between space-y-3 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[10px] text-blue-400 font-extrabold flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-400" /> PLANETARY SYSTEMS SELECTOR
                  </span>
                  <span className="text-[8px] bg-blue-500/20 text-blue-200 px-2 py-0.5 rounded font-bold uppercase">
                    3 Found
                  </span>
                </div>

                <div className="space-y-2">
                  {(Object.keys(PLANETS) as Array<keyof typeof PLANETS>).map((key) => {
                    const active = planetType === key;
                    const planet = PLANETS[key];
                    return (
                      <button 
                        key={key}
                        onClick={() => setPlanetType(key)}
                        className={`w-full text-left p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                          active 
                            ? 'bg-blue-500/20 border-blue-400 text-white shadow-[0_0_12px_rgba(59,130,246,0.25)]' 
                            : 'bg-white/5 border-white/10 text-white/50 hover:bg-white/10'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span 
                            className="w-2.5 h-2.5 rounded-full" 
                            style={{ backgroundColor: planet.color }} 
                          />
                          {planet.name}
                        </span>
                        <span className="text-[9px] opacity-75">{planet.hasRings ? 'Ring System' : 'Standard'}</span>
                      </button>
                    );
                  })}
                </div>
                
                <p className="text-[10px] text-white/50 leading-relaxed font-light mt-1">
                  {activePlanet.desc}
                </p>
              </div>

              {/* Deck panel 2: Spacecraft HUD Controls */}
              <div className="bg-black/75 border border-blue-500/20 rounded-2xl p-4 backdrop-blur-md flex flex-col justify-between space-y-3 shadow-xl">
                <div className="flex items-center gap-2 border-b border-white/10 pb-2">
                  <Sliders className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[10px] text-blue-400 font-extrabold uppercase">SPACECRAFT CONTROLLER</span>
                </div>

                <div className="space-y-3 my-auto">
                  {/* Slipstream/Warp Speed Input */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] text-white/50 font-bold uppercase">
                      <span>Warp Factor Engine</span>
                      <span className="text-blue-400">{warpSpeed.toFixed(1)}x Factor</span>
                    </div>
                    <input 
                      type="range"
                      min="0.5"
                      max="3.0"
                      step="0.1"
                      value={warpSpeed}
                      onChange={(e) => setWarpSpeed(parseFloat(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  {/* Spacecraft rotation slider */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] text-white/50 font-bold uppercase">
                      <span>Orbit Alignment</span>
                      <span className="text-blue-400">{Math.floor((shipRotation / (Math.PI * 2)) * 360)}° Heading</span>
                    </div>
                    <input 
                      type="range"
                      min={-Math.PI}
                      max={Math.PI}
                      step="0.05"
                      value={shipRotation}
                      onChange={(e) => setShipRotation(parseFloat(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  {/* Toggles */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setWarpActive(!warpActive)}
                      className={`py-2 px-3 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                        warpActive 
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.25)]' 
                          : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      Warp Drive
                    </button>

                    <button
                      onClick={() => setSensorSweep(!sensorSweep)}
                      className={`py-2 px-3 rounded-xl border text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                        sensorSweep 
                          ? 'bg-blue-500/20 border-blue-400 text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.25)]' 
                          : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'
                      }`}
                    >
                      <Compass className="w-3.5 h-3.5" />
                      Sensors
                    </button>
                  </div>
                </div>
              </div>

              {/* Deck panel 3: System Telemetry HUD */}
              <div className="bg-black/75 border border-blue-500/20 rounded-2xl p-4 backdrop-blur-md flex flex-col justify-between space-y-2.5 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-[10px] text-blue-400 font-extrabold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 animate-pulse text-blue-400" /> SYSTEM TELEMETRY
                  </span>
                  <Navigation className="w-3.5 h-3.5 text-white/30 animate-spin" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Stat 1 */}
                  <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                    <span className="text-[8px] text-white/40 block mb-0.5 font-bold uppercase">Ship Velocity</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-black text-white">{telemetry.velocity}</span>
                    </div>
                  </div>

                  {/* Stat 2 */}
                  <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                    <span className="text-[8px] text-white/40 block mb-0.5 font-bold uppercase">Deflector Shield</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-black text-emerald-400">{telemetry.shieldLevel}%</span>
                    </div>
                  </div>

                  {/* Stat 3 */}
                  <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                    <span className="text-[8px] text-white/40 block mb-0.5 font-bold uppercase">Warp Core Temp</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-black text-rose-400">{telemetry.engineTemp} K</span>
                    </div>
                  </div>

                  {/* Stat 4 */}
                  <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                    <span className="text-[8px] text-white/40 block mb-0.5 font-bold uppercase">Slipstream Flow</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-black text-indigo-400">{telemetry.warpCorePower}%</span>
                    </div>
                  </div>
                </div>

                {/* Bottom mini-bar */}
                <div className="bg-blue-950/20 border border-blue-500/10 p-2 rounded-xl flex items-center justify-between text-[9px] text-blue-300">
                  <span className="flex items-center gap-1.5">
                    <Gauge className="w-3.5 h-3.5 text-blue-400" />
                    <span>NaviComputer Online</span>
                  </span>
                  <span className="font-extrabold uppercase text-[8px] bg-blue-500/25 px-2 py-0.5 rounded text-blue-200">
                    Active
                  </span>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'destinations' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
              {[
                { name: 'Kepler-186f', tag: 'HABITABLE ZONE', temp: '272 K', gravity: '1.1g', type: 'habitable', desc: 'A gorgeous biological sanctuary featuring liquid oceans and dense chlorophyllic forests. Perfect for ecological safaris.', color: 'text-emerald-400' },
                { name: 'Chronos-9', tag: 'NEON GAS GIANT', temp: '540 K', gravity: '2.8g', type: 'gasgiant', desc: 'An orbital spectacle surrounded by sparkling debris fields and hydrogen cloud colors. Features extreme high-velocity cruise lanes.', color: 'text-amber-400' },
                { name: 'Frost-X', tag: 'CRYSTALLINE ICEWORLD', temp: '110 K', gravity: '0.8g', type: 'iceworld', desc: 'A silent, frozen waste containing immense subterranean cryo-canyons and mirror-like silicate flats. Home to mineral research outposts.', color: 'text-cyan-400' }
              ].map(dest => (
                <div key={dest.name} className="bg-black/80 border border-blue-500/20 rounded-2xl p-4 backdrop-blur-md flex flex-col justify-between space-y-3 shadow-xl">
                  <div className="flex justify-between items-start border-b border-white/10 pb-2">
                    <div>
                      <h3 className="font-black text-sm text-white tracking-wide">{dest.name}</h3>
                      <span className="text-[7px] text-blue-400 font-extrabold tracking-wider">{dest.tag}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setPlanetType(dest.type as any);
                        setActiveTab('flightDeck');
                      }}
                      className="text-[7px] bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 font-bold border border-blue-500/30 px-2 py-1 rounded"
                    >
                      ORBIT VIEW
                    </button>
                  </div>
                  <p className="text-[10px] text-white/60 leading-relaxed font-light">{dest.desc}</p>
                  <div className="grid grid-cols-2 gap-2 text-[8px] bg-white/5 p-2 rounded-xl border border-white/5 font-bold">
                    <div>
                      <span className="text-white/40 block">MEAN TEMP</span>
                      <span className={dest.color}>{dest.temp}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block">GRAVITY LOAD</span>
                      <span className="text-white">{dest.gravity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
              {[
                { name: 'ORBITAL PASS', price: '$249K', dur: '4 Hours', altitude: '420 KM', inclusions: ['LEO Centrifugal Cruise', 'Space Walk Simulation', 'Zero-G Toast', 'Expedition Suit Suit-Up'] },
                { name: 'DEEP SPACE VOYAGE', price: '$2.8M', dur: '5 Days', altitude: '2.5M KM', inclusions: ['Exoplanet Centering Cruise', 'Slipstream Flight Deck Access', 'Chronos Crystalline Fly-by', 'Deep Bio-Suit Isolation'] },
                { name: 'GALACTIC ODYSSEY', price: '$11.8M', dur: '14 Days', altitude: '25.8B KM', inclusions: ['Interstellar Warp Crossing', 'Frost-X Cryo Landing', 'Bio-Dome Research Outpost', 'Full Ship command simulation'] }
              ].map(pkg => (
                <div key={pkg.name} className="bg-black/80 border border-blue-500/20 rounded-2xl p-4 backdrop-blur-md flex flex-col justify-between space-y-3 shadow-xl">
                  <div className="border-b border-white/10 pb-2 text-center">
                    <span className="text-[8px] text-blue-400 font-black tracking-widest">{pkg.name}</span>
                    <div className="text-xl font-black text-white mt-1">{pkg.price}</div>
                  </div>
                  <div className="space-y-1.5 flex-1 py-1">
                    {pkg.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[8px] text-white/70">
                        <span className="w-1 h-1 rounded-full bg-blue-400 shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-[8px] pt-2 border-t border-white/10 font-bold">
                    <div>
                      <span className="text-white/40">DURATION: </span>
                      <span className="text-white">{pkg.dur}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setBookingPlanet(pkg.name === 'ORBITAL PASS' ? 'Low Earth Orbit' : pkg.name === 'DEEP SPACE VOYAGE' ? 'Chronos-9' : 'Frost-X');
                        setBookingClass(pkg.name === 'ORBITAL PASS' ? 'explorer' : pkg.name === 'DEEP SPACE VOYAGE' ? 'commander' : 'legend');
                        setActiveTab('booking');
                      }}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold uppercase px-3 py-1.5 rounded-lg text-[7px]"
                    >
                      RESERVE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="bg-black/80 border border-blue-500/20 rounded-2xl p-4 backdrop-blur-md shadow-xl w-full">
              <div className="flex items-center gap-2 border-b border-white/10 pb-2 mb-3">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[10px] text-blue-400 font-extrabold uppercase">LAUNCH PROTOCOL AND PREPARATION TIMELINE</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { step: '01', title: 'MED-CLEARANCE', desc: 'Genomic vetting and hyperbaric tolerance testing at L-30 days.' },
                  { step: '02', title: 'CENTRIFUGE DRILL', desc: 'Sustained 4.5g atmospheric reentry acceleration drills at L-14 days.' },
                  { step: '03', title: 'WARP SIMULATION', desc: 'Virtual neural slipstream navigation and emergency warp core vent procedures.' },
                  { step: '04', title: 'DEPARTURE CORES', desc: 'Boarding capsule stabilization, thruster preheat, and launch ignition.' }
                ].map(step => (
                  <div key={step.step} className="bg-white/5 border border-white/5 p-3 rounded-xl relative">
                    <span className="absolute top-2 right-3 text-lg font-black text-blue-500/30">{step.step}</span>
                    <h4 className="text-[9px] font-black text-white mb-1.5 tracking-wider">{step.title}</h4>
                    <p className="text-[9px] text-white/50 leading-relaxed font-light">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'booking' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full">
              
              {/* Left Column: Form */}
              <div className="lg:col-span-7 bg-black/80 border border-blue-500/20 rounded-2xl p-4 backdrop-blur-md flex flex-col justify-between shadow-xl">
                <div className="flex items-center gap-1.5 border-b border-white/10 pb-2 mb-3">
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[10px] text-blue-400 font-extrabold uppercase">SECURE CHARTER BOOKING MODULE</span>
                </div>
                
                {bookingSubmitted ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-6 text-center space-y-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 font-bold">✓</div>
                    <div>
                      <h4 className="text-white text-xs font-bold">RESERVATION TRANSMITTED</h4>
                      <p className="text-[8px] text-emerald-400 font-semibold mt-1">SECURE TOKEN: AV-{Math.floor(Math.random()*900000+100000)}</p>
                      <p className="text-[9px] text-white/50 max-w-xs mt-2 font-sans">Expedition clearance team will transmit biometric verification requirements to your terminal within 12 standard cycles.</p>
                    </div>
                    <button 
                      onClick={() => setBookingSubmitted(false)}
                      className="text-[8px] border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 px-3 py-1 rounded-lg"
                    >
                      Submit Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setBookingSubmitted(true); }} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[8px] text-white/40 block font-bold">DESTINATION</label>
                        <select 
                          value={bookingPlanet} 
                          onChange={(e) => setBookingPlanet(e.target.value)}
                          className="w-full bg-[#050510] border border-white/10 rounded-lg p-2 text-[10px] text-white focus:outline-none focus:border-blue-400"
                        >
                          <option value="Kepler-186f">Kepler-186f (Habitable)</option>
                          <option value="Chronos-9">Chronos-9 (Neon Gas)</option>
                          <option value="Frost-X">Frost-X (Ice World)</option>
                          <option value="Low Earth Orbit">Low Earth Orbit</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[8px] text-white/40 block font-bold">LAUNCH WINDOW</label>
                        <input 
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full bg-[#050510] border border-white/10 rounded-lg p-1.5 text-[10px] text-white focus:outline-none focus:border-blue-400 font-mono"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[8px] text-white/40 block font-bold">SECURITY CLASS</label>
                        <select 
                          value={bookingClass}
                          onChange={(e) => setBookingClass(e.target.value)}
                          className="w-full bg-[#050510] border border-white/10 rounded-lg p-2 text-[10px] text-white focus:outline-none focus:border-blue-400"
                        >
                          <option value="explorer">Cabin Passenger (Explorer)</option>
                          <option value="commander">Flight Deck Copilot (Commander)</option>
                          <option value="legend">Mission Director (Legend)</option>
                        </select>
                      </div>
                      <div className="space-y-1 flex flex-col justify-end">
                        <button 
                          type="submit"
                          className="w-full h-9 bg-blue-600 hover:bg-blue-500 text-white font-extrabold uppercase rounded-lg text-[9px] tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(59,130,246,0.35)]"
                        >
                          <Send className="w-3 h-3" /> TRANSMIT CHARTER
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* Right Column: FAQ */}
              <div className="lg:col-span-5 bg-black/80 border border-blue-500/20 rounded-2xl p-4 backdrop-blur-md flex flex-col justify-between shadow-xl">
                <div className="flex items-center gap-1.5 border-b border-white/10 pb-2 mb-2">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-[10px] text-blue-400 font-extrabold uppercase">FREQUENT QUESTIONS</span>
                </div>
                <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1 text-[8px] leading-relaxed">
                  {[
                    { q: 'Is warp speed safe for human cells?', a: 'All passengers are sealed in cryogenic slipstream pods. Deflector shields buffer 100% of relativistic shear, ensuring no molecular disintegration.' },
                    { q: 'What is the centrifuge G-force limit?', a: 'Drills max out at 4.5g. Real reentry peaks at 5.2g for 35 seconds. Medical screening filters out cardiovascular anomalies.' },
                    { q: 'Can I cancel my charter window?', a: 'Warp windows must be booked 30 cycles in advance. Cancellations trigger a 20% propellant restocking fee.' }
                  ].map((faq, idx) => (
                    <div key={idx} className="bg-[#050510] border border-white/5 p-2 rounded-xl">
                      <div className="font-extrabold text-blue-300 flex items-center gap-1">
                        <ChevronRight className="w-2.5 h-2.5 shrink-0 text-blue-400" /> {faq.q}
                      </div>
                      <div className="text-white/60 font-light mt-0.5 font-sans">{faq.a}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
