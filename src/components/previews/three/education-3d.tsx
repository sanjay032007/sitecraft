/* eslint-disable @typescript-eslint/no-unused-vars, react-hooks/immutability, @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useMemo, Suspense } from 'react';
import { Template } from '@/lib/data';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Line, Text, Stars, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// --- ANIMATED GALAXY ---
function AnimatedGalaxy({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.03;
      groupRef.current.rotation.z += delta * 0.01;
      
      const targetY = scrollProgress.current * -30;
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05);
      
      const targetRotationX = scrollProgress.current * 0.5;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={2} />
    </group>
  );
}


function DetailedRocket({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const exhaustRef = useRef<THREE.Group>(null);
  const fireRef = useRef<THREE.Group>(null);
  const plasmaRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const targetY = scrollProgress.current * 40; 
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08);
      
      // Intense launch vibration
      if (scrollProgress.current > 0.01) {
        const t = state.clock.getElapsedTime() * 50; // fast vibration
        const intensity = scrollProgress.current > 0.1 ? 0.03 : scrollProgress.current * 0.3;
        groupRef.current.position.x = Math.sin(t * 2.1) * intensity;
        groupRef.current.position.z = Math.cos(t * 1.7) * intensity;
      }
    }
    
    const time = state.clock.getElapsedTime();
    
    // Animate Atmospheric Plasma Glow
    if (plasmaRef.current) {
        let plasmaOpacity = 0;
        // Glow heavily during the middle of the scroll (breaking atmosphere)
        if (scrollProgress.current > 0.2 && scrollProgress.current < 0.8) {
            const dist = Math.abs(scrollProgress.current - 0.5);
            plasmaOpacity = Math.max(0, 1.0 - (dist * 3.3));
            plasmaOpacity *= 0.5 + (Math.random() * 0.5); // Violent flickering
        }
        
        plasmaRef.current.children.forEach(child => {
            const mesh = child as any;
            if (mesh.material) {
                // Outer cone gets less opacity than the tight nose cones
                mesh.material.opacity = mesh.geometry.type === 'ConeGeometry' ? plasmaOpacity * 0.15 : plasmaOpacity * 0.8;
            }
        });
        const scale = 1.0 + (plasmaOpacity * 0.02) + (Math.random() * 0.02);
        plasmaRef.current.scale.setScalar(scale);
    }
    
    if (exhaustRef.current) {
       exhaustRef.current.children.forEach((child, i) => {
           child.position.y -= 0.15 + Math.abs(Math.sin(i)) * 0.2;
           child.scale.x += 0.08;
           child.scale.z += 0.08;
           child.scale.y += 0.08;
           
           if (child.position.y < -15) {
               child.position.y = (Math.sin(i * time) - 0.5) * 2.0;
               child.scale.set(1, 1, 1);
               child.position.x = (Math.sin(i * 1.3) - 0.5) * 5.0;
               child.position.z = (Math.cos(i * 1.7) - 0.5) * 5.0;
           }
           child.visible = scrollProgress.current > 0;
       });
    }

    if (fireRef.current) {
        fireRef.current.children.forEach((child, i) => {
           child.position.y -= 0.4 + Math.abs(Math.sin(i)) * 0.4;
           child.scale.x -= 0.05;
           child.scale.z -= 0.05;
           child.scale.y += 0.1;
           
           if (child.position.y < -6 || child.scale.x <= 0) {
               child.position.y = -2;
               child.scale.set(1, 1, 1);
               child.position.x = (Math.sin(i * 1.3) - 0.5) * 2.0;
               child.position.z = (Math.cos(i * 1.7) - 0.5) * 2.0;
           }
           child.visible = scrollProgress.current > 0;
       });
    }
  });

  // PHOTOREALISTIC PBR MATERIALS
  const orbiterMat = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#ffffff', roughness: 0.2, metalness: 0.1, clearcoat: 1.0, clearcoatRoughness: 0.1 }), []);
  const orbiterBlackMat = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#111111', roughness: 0.9, metalness: 0.0 }), []);
  const windowMat = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#000000', roughness: 0.0, metalness: 1.0, clearcoat: 1.0 }), []);
  const externalTankMat = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#c76e38', roughness: 0.9, metalness: 0.0, bumpScale: 0.02 }), []);
  const srbMat = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#e9ecef', roughness: 0.4, metalness: 0.5 }), []);
  const engineMat = useMemo(() => new THREE.MeshPhysicalMaterial({ color: '#555555', roughness: 0.4, metalness: 1.0, clearcoat: 0.5 }), []);
  const thrustGlowMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#88ccff', transparent: true, opacity: 0.8 }), []);

  return (
    <group ref={groupRef} position={[0, -4, 0]}>
      
      {/* ATMOSPHERIC PLASMA GLOW */}
      <group ref={plasmaRef}>
        {/* ET Plasma */}
        <mesh position={[0, 8.5, -1.2]} scale={[1.1, 1.6, 1.1]}>
          <sphereGeometry args={[1.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshBasicMaterial color="#ff3300" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        
        {/* Orbiter Plasma */}
        <mesh position={[0, 5.75, 0.6]} scale={[1.1, 2.7, 1.1]}>
          <sphereGeometry args={[0.8, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshBasicMaterial color="#ff6600" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>

        {/* Outer Bow Shock Envelope */}
        <mesh position={[0, 3.0, -0.3]} scale={[1, 1, 1]}>
          <coneGeometry args={[4.5, 14, 32]} />
          <meshBasicMaterial color="#ff1100" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} wireframe />
        </mesh>
      </group>

      {/* EXTERNAL TANK */}
      <group position={[0, 3, -1.2]}>
        <mesh position={[0, 0, 0]} material={externalTankMat}><cylinderGeometry args={[1.2, 1.2, 11, 64]} /></mesh>
        <mesh position={[0, 5.5, 0]} scale={[1, 1.5, 1]} material={externalTankMat}>
          <sphereGeometry args={[1.2, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        <mesh position={[0, -5.5, 0]} scale={[1, 0.5, 1]} material={externalTankMat}>
          <sphereGeometry args={[1.2, 64, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2]} />
        </mesh>
        {/* Lightning Rod / Probe on tip */}
        <mesh position={[0, 7.5, 0]} material={engineMat}><cylinderGeometry args={[0.05, 0.05, 1.0, 16]} /></mesh>
        {/* Tank structural ribs */}
        {[-3, -1, 1, 3].map((y, i) => (
            <mesh key={`rib-${i}`} position={[0, y, 0]} material={externalTankMat}>
                <torusGeometry args={[1.21, 0.02, 16, 64]} />
            </mesh>
        ))}
      </group>

      {/* SOLID ROCKET BOOSTERS */}
      {[-1.6, 1.6].map((x, i) => (
        <group key={`srb-${i}`} position={[x, 2.5, -1.2]}>
          <mesh position={[0, 0, 0]} material={srbMat}><cylinderGeometry args={[0.35, 0.35, 10, 32]} /></mesh>
          <mesh position={[0, 5.0, 0]} scale={[1, 4.0, 1]} material={srbMat}>
            <sphereGeometry args={[0.35, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          </mesh>
          {/* SRB Segments */}
          {[-4, -2, 0, 2, 4].map((y, segIdx) => (
              <mesh key={`srb-seg-${i}-${segIdx}`} position={[0, y, 0]} material={orbiterBlackMat}>
                  <torusGeometry args={[0.355, 0.02, 16, 32]} />
              </mesh>
          ))}
          {/* SRB Skirt */}
          <mesh position={[0, -5.1, 0]} material={srbMat}>
            <cylinderGeometry args={[0.35, 0.45, 0.5, 32]} />
          </mesh>
          <mesh position={[0, -5.5, 0]} rotation={[Math.PI, 0, 0]} material={engineMat}>
            <coneGeometry args={[0.5, 0.8, 32]} />
          </mesh>
          {/* SRB Thrust Glow */}
          <mesh position={[0, -5.9, 0]} rotation={[Math.PI, 0, 0]} material={thrustGlowMat}>
            <coneGeometry args={[0.4, 2.0, 16]} />
          </mesh>
        </group>
      ))}

      {/* ORBITER */}
      <group position={[0, 3.5, 0.6]}>
        {/* Fuselage top white */}
        <mesh position={[0, -1, 0]} material={orbiterMat}><cylinderGeometry args={[0.8, 0.8, 6.5, 32]} /></mesh>
        
        {/* Fuselage underbelly black thermal tiles */}
        <mesh position={[0, -1, 0.02]} material={orbiterBlackMat}>
          <cylinderGeometry args={[0.81, 0.81, 6.5, 32, 1, false, Math.PI * 1.1, Math.PI * 0.8]} />
        </mesh>
        
        {/* Payload Bay Door seams */}
        <mesh position={[0.4, -1, 0.7]} material={orbiterBlackMat}><boxGeometry args={[0.02, 6.5, 0.02]} /></mesh>
        <mesh position={[-0.4, -1, 0.7]} material={orbiterBlackMat}><boxGeometry args={[0.02, 6.5, 0.02]} /></mesh>
        <mesh position={[0, 2.25, 0.7]} material={orbiterBlackMat}><boxGeometry args={[0.8, 0.02, 0.02]} /></mesh>
        
        {/* Cockpit / Nose */}
        <mesh position={[0, 2.25, 0]} scale={[1, 2.5, 1]} material={orbiterMat}>
          <sphereGeometry args={[0.8, 64, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
        
        {/* Iconic Black Windshield */}
        <mesh position={[0, 3.2, 0.42]} rotation={[-0.4, 0, 0]} scale={[1, 0.4, 1]} material={windowMat}>
          <sphereGeometry args={[0.6, 32, 16, 0, Math.PI, 0, Math.PI / 3]} />
        </mesh>

        <mesh position={[0, 3.8, 0]} scale={[1, 1.5, 1]} material={orbiterBlackMat}>
          <sphereGeometry args={[0.33, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>

        {/* Delta Wings */}
        <mesh position={[0, -2.5, 0]} rotation={[0, Math.PI / 4, 0]} scale={[1, 1, 0.05]} material={orbiterMat}>
           <cylinderGeometry args={[0.1, 4.5, 4.5, 4]} />
        </mesh>
        <mesh position={[0, -2.5, 0.03]} rotation={[0, Math.PI / 4, 0]} scale={[0.95, 0.98, 0.06]} material={orbiterBlackMat}>
           <cylinderGeometry args={[0.1, 4.6, 4.5, 4]} />
        </mesh>

        {/* Tail Fin */}
        <mesh position={[0, -2.0, -0.6]} rotation={[0, 0, 0]} scale={[0.05, 1, 1]} material={orbiterMat}>
           <cylinderGeometry args={[0.1, 1.5, 2.5, 4]} />
        </mesh>
        {/* Tail Fin Black leading edge */}
        <mesh position={[0, -2.0, -0.6]} rotation={[0, 0, 0]} scale={[0.06, 1.05, 0.9]} material={orbiterBlackMat}>
           <cylinderGeometry args={[0.1, 1.5, 2.5, 4]} />
        </mesh>
        
        {/* Top Hatch/Window detail */}
        <mesh position={[0, 1.0, 0.7]} rotation={[Math.PI / 2, 0, 0]} material={orbiterBlackMat}>
           <cylinderGeometry args={[0.2, 0.2, 0.2, 16]} />
        </mesh>

        {/* Engines */}
        <group position={[0, -4.5, 0]} rotation={[0.2, 0, 0]}>
           {/* Center Engine */}
           <mesh position={[0, 0, 0.3]} rotation={[Math.PI, 0, 0]} material={engineMat}><coneGeometry args={[0.4, 0.8, 32]} /></mesh>
           <mesh position={[0, -0.4, 0.3]} rotation={[Math.PI, 0, 0]} material={thrustGlowMat}><coneGeometry args={[0.35, 1.5, 16]} /></mesh>
           
           {/* Left Engine */}
           <mesh position={[-0.4, 0, -0.3]} rotation={[Math.PI, 0, 0]} material={engineMat}><coneGeometry args={[0.4, 0.8, 32]} /></mesh>
           <mesh position={[-0.4, -0.4, -0.3]} rotation={[Math.PI, 0, 0]} material={thrustGlowMat}><coneGeometry args={[0.35, 1.5, 16]} /></mesh>
           
           {/* Right Engine */}
           <mesh position={[0.4, 0, -0.3]} rotation={[Math.PI, 0, 0]} material={engineMat}><coneGeometry args={[0.4, 0.8, 32]} /></mesh>
           <mesh position={[0.4, -0.4, -0.3]} rotation={[Math.PI, 0, 0]} material={thrustGlowMat}><coneGeometry args={[0.35, 1.5, 16]} /></mesh>
        </group>
      </group>

      {/* GLOWING FIRE */}
      <group ref={fireRef} position={[0, -2.5, 0]}>
         {Array.from({ length: 150 }).map((_, i) => (
            <mesh key={`fire-${i}`} position={[(Math.sin(i*1.3)-0.5)*3, -2, (Math.cos(i*3.7)-0.5)*3]}>
                <sphereGeometry args={[0.8 + Math.abs(Math.sin(i*4.2))*0.8, 16, 16]} />
                <meshStandardMaterial 
                   color={i % 2 === 0 ? "#ff5e00" : "#ffcc00"} 
                   transparent 
                   opacity={0.9} 
                   roughness={0.0} 
                   emissive={i % 2 === 0 ? "#ff2200" : "#ffaa00"} 
                   emissiveIntensity={8.0} 
                />
            </mesh>
         ))}
      </group>
      
      {/* SMOKE */}
      <group ref={exhaustRef} position={[0, -2.5, 0]}>
         {Array.from({ length: 60 }).map((_, i) => (
            <mesh key={`smoke-${i}`} position={[(Math.sin(i*1.3)-0.5)*4, -4, (Math.cos(i*3.7)-0.5)*4]}>
                <sphereGeometry args={[1.0 + Math.abs(Math.sin(i*4.2))*1.5, 12, 12]} />
                <meshStandardMaterial 
                   color="#dddddd" 
                   transparent 
                   opacity={0.15} 
                   roughness={1.0} 
                   emissive="#111111" 
                   emissiveIntensity={0.2} 
                />
            </mesh>
         ))}
      </group>
    </group>
  );
}

function RadarRings() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
      if(groupRef.current) {
          groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.02;
      }
  });

  const rings = useMemo(() => {
    const arr = [];
    for (let radius = 2; radius <= 40; radius += 0.8) { 
      const points = [];
      const segments = 128;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
      }
      arr.push({ points, radius });
    }
    return arr;
  }, []);

  return (
    <group position={[0, 8, -6]} rotation={[0, 0, 0]}>
        <Line points={[new THREE.Vector3(-50, 0, 0), new THREE.Vector3(50, 0, 0)]} color="#ffffff" lineWidth={1} transparent opacity={0.2} />
        <Line points={[new THREE.Vector3(0, -50, 0), new THREE.Vector3(0, 50, 0)]} color="#ffffff" lineWidth={1} transparent opacity={0.2} />
        
        <group ref={groupRef}>
            {rings.map((ring, i) => {
                const isMajor = ring.radius % 4 < 0.1;
                return (
                  <React.Fragment key={`ring-frag-${i}`}>
                      <Line points={ring.points} color="#ffffff" lineWidth={isMajor ? 2 : 1} transparent opacity={isMajor ? 0.5 : 0.1} />
                      {isMajor && (
                          <Text 
                              position={[ring.radius, 0.2, 0]} 
                              color="white" 
                              fontSize={0.5} 
                              anchorX="left" 
                              anchorY="bottom"
                              rotation={[0, 0, Math.PI/2]}
                              material-transparent={true}
                              material-opacity={0.6}
                          >
                              {ring.radius.toFixed(3)}
                          </Text>
                      )}
                  </React.Fragment>
                );
            })}
        </group>
    </group>
  );
}

function SceneCamera() {
  const { camera } = useThree();
  useFrame(() => {
     camera.position.y = 8;
     camera.position.z = 24;
     camera.lookAt(0, 8, 0);
  });
  return null;
}

export function Education3D({ t }: { t: Template }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const maxScroll = target.scrollHeight - target.clientHeight;
    if (maxScroll > 0) {
      scrollProgress.current = target.scrollTop / maxScroll;
    }
  };

  const waveData = useMemo(() => Array.from({length: 40}).map((_, i) => Math.round((Math.sin(i * 0.2) * 50 + 50 + Math.abs(Math.sin(i * 1.3)) * 20) * 10) / 10), []);
  const barData = useMemo(() => Array.from({length: 30}).map((_, i) => Math.round((Math.abs(Math.cos(i * 0.4) * Math.sin(i * 2.1)) * 100) * 10) / 10), []);

  return (
    <div className="@container w-full h-full relative overflow-hidden bg-black text-white font-mono">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas frameloop="demand" camera={{ position: [0, 8, 24], fov: 45 }}>
          {/* Post-Processing for realism */}
          <EffectComposer>
            <Bloom luminanceThreshold={1.0} luminanceSmoothing={0.5} intensity={2.0} />
          </EffectComposer>
          
          {/* Photorealistic Environment Reflections */}
          <Suspense fallback={null}>
            <Environment preset="night" />
          </Suspense>

          {/* Stark monochrome lighting */}
          <ambientLight intensity={0.5} color="#ffffff" />
          <directionalLight position={[0, 20, 10]} intensity={4.0} color="#ffffff" castShadow />
          <directionalLight position={[-10, 0, -10]} intensity={2.0} color="#aaaaaa" />
          
          <AnimatedGalaxy scrollProgress={scrollProgress} />
          <pointLight position={[20, 30, -20]} intensity={1.5} color="#8b5cf6" />
          <pointLight position={[-20, 10, -30]} intensity={1.5} color="#3b82f6" />
          <SceneCamera />

          
          <DetailedRocket scrollProgress={scrollProgress} />
        </Canvas>
      </div>
      
      <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="absolute inset-0 z-20 overflow-y-auto overflow-x-hidden pointer-events-auto flex justify-center"
      >
        <div className="fixed inset-y-0 left-0 w-[250px] hidden @4xl:flex flex-col p-4 border-r border-white/20 bg-black/40 backdrop-blur-sm z-30 overflow-hidden pointer-events-none gap-6">
            <div className="text-[7px] leading-tight text-white/70 uppercase">
               <p className="mb-2 font-bold text-white border-b border-white/30 pb-1">AEROSPACE DYNAMICS</p>
               <p>VEHICLE: ORBITAL SHUTTLE CLASS</p>
               <p>MISSION: ORBITAL INSERTION</p>
            </div>
            <div className="w-full">
                <p className="text-[6px] text-white/50 mb-1">ACOUSTIC VIBRATION SPECTRUM</p>
                <div className="h-24 w-full border border-white/20 relative flex items-end">
                    {waveData.map((h, i) => (
                        <div key={`wave-${i}`} className="flex-1 bg-white/60" style={{ height: `${h}%`, opacity: h/100 }} />
                    ))}
                </div>
            </div>
            <div className="w-full mt-auto">
                <p className="text-[6px] text-white/50 mb-1">ENGINE CHAMBER PRESSURE</p>
                <div className="h-20 w-full border border-white/20 flex items-end gap-[1px]">
                    {barData.map((h, i) => (
                        <div key={`bar-${i}`} className="flex-1 bg-white" style={{ height: `${h}%` }} />
                    ))}
                </div>
            </div>
        </div>

        <div className="fixed inset-y-0 right-0 w-[250px] hidden @4xl:flex flex-col p-4 border-l border-white/20 bg-black/40 backdrop-blur-sm z-30 overflow-hidden pointer-events-none gap-6">
            <div className="text-[7px] leading-tight text-white/70 uppercase text-right">
               <p className="mb-2 font-bold text-white border-b border-white/30 pb-1">TRAJECTORY ANALYSIS</p>
               <p>APOGEE TARGET: 400.00 KM</p>
            </div>
        </div>

        <div className="flex flex-col w-full max-w-3xl px-6 pointer-events-auto z-40">
          <section className="relative min-h-[100vh] shrink-0 w-full flex flex-col items-center justify-end pb-32 text-center pointer-events-none mb-[100vh]">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter uppercase mb-4 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              Orbital
            </h1>
            <p className="text-xs sm:text-sm text-white/80 uppercase tracking-[0.3em] border-y border-white/30 py-2">
              Scroll to initiate launch sequence
            </p>
          </section>

          <section className="relative min-h-[100vh] shrink-0 w-full flex items-end pb-12 pointer-events-auto mt-[50vh]">
            <div className="w-full flex flex-col md:flex-row justify-between items-end border-t-2 border-white pt-8 gap-6 p-6">
              <div className="max-w-md drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                <h2 className="text-3xl font-black uppercase mb-3 tracking-wide">Orbit Achieved</h2>
                <p className="text-xs text-white mb-6 leading-relaxed font-bold">
                  Welcome to Cosmos Learning. You have successfully navigated the orbital insertion phase.
                </p>
                <button className="text-xs px-8 py-4 bg-white text-black hover:bg-transparent hover:text-white border-2 border-white transition-all uppercase font-black tracking-widest pointer-events-auto">
                  Access Curriculums
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
