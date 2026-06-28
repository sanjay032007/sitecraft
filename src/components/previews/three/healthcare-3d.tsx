/* eslint-disable react-hooks/purity, react-hooks/immutability, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */



"use client";







// Polyfill WebGLRenderingContext.prototype.getContextAttributes to prevent a crash in older versions of postprocessing



// where getContextAttributes() can return null under context loss or headless rendering.



if (typeof window !== 'undefined') {



  try {



    const patchGetContextAttributes = (proto: any) => {



      if (proto && proto.getContextAttributes) {



        const original = proto.getContextAttributes;



        proto.getContextAttributes = function() {



          try {



            return original.call(this) || {



              alpha: true,



              depth: true,



              stencil: true,



              antialias: true,



              premultipliedAlpha: true,



              preserveDrawingBuffer: false,



              powerPreference: "default",



              failIfMajorPerformanceCaveat: false



            };



          } catch (e) {



            return {



              alpha: true,



              depth: true,



              stencil: true,



              antialias: true,



              premultipliedAlpha: true,



              preserveDrawingBuffer: false,



              powerPreference: "default",



              failIfMajorPerformanceCaveat: false



            };



          }



        };



      }



    };



    if (typeof WebGLRenderingContext !== 'undefined') {



      patchGetContextAttributes(WebGLRenderingContext.prototype);



    }



    if (typeof WebGL2RenderingContext !== 'undefined') {



      patchGetContextAttributes(WebGL2RenderingContext.prototype);



    }



  } catch (e) {



    console.error("Failed to patch getContextAttributes:", e);



  }



}











import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';



import { Canvas, useFrame, useThree } from '@react-three/fiber';



import { OrbitControls, useGLTF, Environment } from '@react-three/drei';



import { DepthOfField, EffectComposer, Bloom, Noise } from '@react-three/postprocessing';



import * as THREE from 'three';



import { 



  Activity, 



  Cpu, 



  Play, 



  Pause, 



  Zap, 



  Eye, 



  RefreshCw, 



  Brain



} from 'lucide-react';







export function Healthcare3D({ t }: { t?: any }) {



  const [rotateActive, setRotateActive] = useState(true);



  const [synapseSpeed, setSynapseSpeed] = useState(1.0);



  const [viewMode, setViewMode] = useState<'all' | 'cortex' | 'stem'>('all');



  const [activeTab, setActiveTab] = useState<'controls' | 'telemetry'>('controls');



  



  // Real-time fluctuating telemetry values



  const [telemetry, setTelemetry] = useState({



    cortexActivity: 89.4,



    signalFidelity: 99.98,



    activePathways: 18540



  });







  useEffect(() => {



    const interval = setInterval(() => {



      setTelemetry(prev => ({



        cortexActivity: parseFloat((85 + Math.random() * 8).toFixed(1)),



        signalFidelity: parseFloat((99.9 + Math.random() * 0.09).toFixed(2)),



        activePathways: Math.floor(18400 + Math.random() * 280)



      }));



    }, 1500);



    return () => clearInterval(interval);



  }, []);







  return (



    <div className="relative w-full h-full min-h-[620px] lg:min-h-0 lg:h-[750px] bg-[#0b0813] rounded-3xl overflow-y-auto lg:overflow-hidden shadow-2xl font-sans border border-purple-500/10 flex flex-col justify-between scrollbar-none">



      {/* Dynamic scan line effect across the whole card */}



      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(168,85,247,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-10" />







      {/* Mobile Top Header (only visible on mobile/tablet) */}



      <div className="block lg:hidden p-4 pb-1 z-20 pointer-events-auto w-full">



        <div className="flex justify-between items-center w-full">



          {/* Logo */}



          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-purple-500/20">



            <Brain className="w-4 h-4 text-pink-500 animate-pulse" />



            <span className="text-white font-bold text-[10px] sm:text-xs tracking-wider uppercase">Helix Neural v3.0</span>



            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />



          </div>



          



          {/* Top Right Action */}



          <button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-4 py-1.5 text-[10px] sm:text-xs rounded-full font-medium transition-all shadow-[0_0_15px_rgba(219,39,119,0.3)] border border-pink-400/20 whitespace-nowrap">



            Book Tech Demo



          </button>



        </div>



      </div>







      {/* 3D Canvas Container */}



      <div className="relative lg:absolute lg:inset-0 w-full flex-1 min-h-[280px] sm:min-h-[350px] lg:h-full z-0">



        <style>{`



          .relative.w-full.flex-1 canvas {



            width: 100% !important;



            height: 100% !important;



          }



        `}</style>



        <Canvas frameloop="demand" camera={{ position: [0, 0, 18], fov: 45 }} gl={{ localClippingEnabled: true }}>



          <color attach="background" args={["#0b0813"]} />



          <ambientLight intensity={0.6} />



          <pointLight position={[10, 10, 10]} intensity={1.5} color="#db2777" />



          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#22d3ee" />



          



          <Suspense fallback={null}>



            <Environment preset="city" />



            <ParticleBrain 



              synapseSpeed={synapseSpeed} 



              viewMode={viewMode} 



            />



          </Suspense>



          



          <OrbitControls enableZoom={false} enablePan={false} autoRotate={rotateActive} autoRotateSpeed={0.8} />



          <EffectComposer>



            <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={3} height={480} />



            <Bloom opacity={2.0} />



            <Noise opacity={0.03} />



          </EffectComposer>



        </Canvas>



      </div>







      {/* UI Panels Overlay */}



      <div className="relative lg:absolute lg:inset-0 z-10 pointer-events-none p-4 sm:p-6 md:p-8 flex flex-col justify-end lg:justify-between lg:h-full w-full">



        {/* Desktop Top Header (hidden on mobile) */}



        <div className="hidden lg:flex justify-between items-center w-full pointer-events-auto">



          {/* Logo */}



          <div className="flex items-center gap-2.5 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-purple-500/20">



            <Brain className="w-5 h-5 text-pink-500 animate-pulse" />



            <span className="text-white font-bold text-xs md:text-sm tracking-wider uppercase">Helix Neural v3.0</span>



            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />



          </div>



          



          {/* Top Right Action */}



          <button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white px-5 py-2 text-xs md:text-sm rounded-full font-medium transition-all shadow-[0_0_20px_rgba(219,39,119,0.3)] border border-pink-400/20 whitespace-nowrap">



            Book Tech Demo



          </button>



        </div>







        {/* Mobile Tab Switcher */}



        <div className="flex lg:hidden bg-black/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/5 w-full mb-3 pointer-events-auto">



          <button 



            onClick={() => setActiveTab('controls')}



            className={`flex-1 py-2 text-[10px] sm:text-xs font-bold rounded-xl transition-all ${



              activeTab === 'controls' 



                ? 'bg-purple-600/35 border border-purple-500/30 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.25)]' 



                : 'text-white/60 hover:text-white hover:bg-white/5'



            }`}



          >



            Neural Controls



          </button>



          <button 



            onClick={() => setActiveTab('telemetry')}



            className={`flex-1 py-2 text-[10px] sm:text-xs font-bold rounded-xl transition-all ${



              activeTab === 'telemetry' 



                ? 'bg-purple-600/35 border border-purple-500/30 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.25)]' 



                : 'text-white/60 hover:text-white hover:bg-white/5'



            }`}



          >



            Live Telemetry



          </button>



        </div>







        {/* Content & Control Panels */}



        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-end w-full gap-4 mt-0 lg:mt-auto">



          



          {/* Left Side: Medical Copy & Controls */}



          <div className={`w-full lg:max-w-md pointer-events-auto space-y-4 lg:block ${activeTab === 'controls' ? 'block' : 'hidden'}`}>



            <div className="bg-black/35 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/5 shadow-xl">



              <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest block mb-0.5">Neurological Modeling</span>



              <h1 className="text-lg sm:text-xl lg:text-3xl font-extrabold text-white leading-tight mb-2">



                Unlock Clinical Wisdom.



              </h1>



              <p className="text-white/60 text-[11px] sm:text-xs lg:text-sm leading-relaxed mb-3">



                Empower your medical teams with real-time 3D synaptic mapping. Translate raw neural signals into clear, actionable diagnosis telemetry.



              </p>



              



              {/* Interactive Control Dashboard Panel */}



              <div className="pt-3 border-t border-white/10 space-y-2">



                <span className="text-[9px] text-white/40 uppercase font-bold tracking-widest block">Dashboard Controls</span>



                <div className="grid grid-cols-3 gap-2">



                  {/* Auto Rotate Toggle */}



                  <button 



                    onClick={() => setRotateActive(!rotateActive)}



                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[10px] sm:text-xs transition-all ${



                      rotateActive 



                        ? 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.2)]' 



                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'



                    }`}



                  >



                    {rotateActive ? <Pause className="w-3.5 h-3.5 mb-1" /> : <Play className="w-3.5 h-3.5 mb-1" />}



                    <span>{rotateActive ? 'Rotate: On' : 'Rotate: Off'}</span>



                  </button>







                  {/* Synapse Turbo Toggle */}



                  <button 



                    onClick={() => setSynapseSpeed(synapseSpeed === 1.0 ? 2.5 : 1.0)}



                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-[10px] sm:text-xs transition-all ${



                      synapseSpeed > 1.0 



                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.2)]' 



                        : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'



                    }`}



                  >



                    <Zap className="w-3.5 h-3.5 mb-1" />



                    <span>{synapseSpeed > 1.0 ? 'Synapse: Turbo' : 'Synapse: Normal'}</span>



                  </button>







                  {/* View Mode Cycles */}



                  <button 



                    onClick={() => {



                      setViewMode(prev => {



                        if (prev === 'all') return 'cortex';



                        if (prev === 'cortex') return 'stem';



                        return 'all';



                      });



                    }}



                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 text-[10px] sm:text-xs transition-all"



                  >



                    <Eye className="w-3.5 h-3.5 mb-1" />



                    <span className="capitalize">View: {viewMode === 'all' ? 'All' : viewMode === 'cortex' ? 'Cortex' : 'Stem'}</span>



                  </button>



                </div>



              </div>



            </div>



          </div>







          {/* Right Side: Glassmorphism Live Telemetry Dashboard */}



          <div className={`w-full lg:max-w-xs pointer-events-auto bg-black/45 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/5 shadow-xl space-y-3.5 lg:block ${activeTab === 'telemetry' ? 'block' : 'hidden'}`}>



            <div className="flex items-center justify-between border-b border-white/10 pb-2">



              <span className="text-[9px] sm:text-[10px] text-white/40 uppercase font-bold tracking-widest flex items-center gap-1.5">



                <Activity className="w-3 h-3 text-pink-500 animate-pulse" /> Live Simulation Telemetry



              </span>



              <RefreshCw className="w-3 h-3 text-white/40 animate-spin" />



            </div>







            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">



              {/* Stat 1 */}



              <div className="bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/5">



                <span className="text-[9px] sm:text-[10px] text-white/40 block mb-0.5">Cortex Activity</span>



                <div className="flex items-baseline gap-1">



                  <span className="text-base sm:text-lg font-bold text-white tracking-tight">{telemetry.cortexActivity}%</span>



                </div>



                <div className="w-full bg-white/10 h-1 rounded-full mt-1.5 overflow-hidden">



                  <div 



                    className="bg-pink-500 h-full transition-all duration-1000" 



                    style={{ width: `${telemetry.cortexActivity}%` }} 



                  />



                </div>



              </div>







              {/* Stat 2 */}



              <div className="bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/5">



                <span className="text-[9px] sm:text-[10px] text-white/40 block mb-0.5">Synapse Speed</span>



                <div className="flex items-baseline gap-1">



                  <span className="text-base sm:text-lg font-bold text-cyan-400 tracking-tight">



                    {synapseSpeed.toFixed(1)}x



                  </span>



                </div>



                <div className="w-full bg-white/10 h-1 rounded-full mt-1.5 overflow-hidden">



                  <div 



                    className="bg-cyan-400 h-full transition-all duration-300" 



                    style={{ width: synapseSpeed > 1.0 ? '100%' : '40%' }} 



                  />



                </div>



              </div>







              {/* Stat 3 */}



              <div className="bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/5">



                <span className="text-[9px] sm:text-[10px] text-white/40 block mb-0.5">Signal Fidelity</span>



                <div className="flex items-baseline gap-1">



                  <span className="text-base sm:text-lg font-bold text-emerald-400 tracking-tight">{telemetry.signalFidelity}%</span>



                </div>



                <span className="text-[8px] sm:text-[9px] text-emerald-500/80 block mt-1">✓ SECURE LINK</span>



              </div>







              {/* Stat 4 */}



              <div className="bg-white/5 p-2.5 sm:p-3 rounded-xl border border-white/5">



                <span className="text-[9px] sm:text-[10px] text-white/40 block mb-0.5">Active Pathways</span>



                <div className="flex items-baseline gap-1">



                  <span className="text-base sm:text-lg font-bold text-purple-400 tracking-tight">{telemetry.activePathways}</span>



                </div>



                <span className="text-[8px] sm:text-[9px] text-purple-400/80 block mt-1">● DENSE GRAPH</span>



              </div>



            </div>







            {/* Bottom Status bar */}



            <div className="bg-purple-950/20 border border-purple-500/10 p-2.5 rounded-xl flex items-center justify-between text-[9px] sm:text-[10px] text-purple-300">



              <span className="flex items-center gap-1.5">



                <Cpu className="w-3 h-3 text-purple-400" />



                <span>Simulation Engine</span>



              </span>



              <span className="font-bold uppercase text-[8px] sm:text-[9px] bg-purple-500/20 px-2 py-0.5 rounded text-purple-200 animate-pulse">



                {rotateActive ? 'Running' : 'Paused'}



              </span>



            </div>



          </div>



        </div>



      </div>



    </div>



  );



}







interface ParticleBrainProps {



  synapseSpeed: number;



  viewMode: 'all' | 'cortex' | 'stem';



}







function ScanningGrid() {



  const ref = useRef<THREE.Group>(null);



  



  useFrame(({ clock }) => {



    if (ref.current) {



      // Oscillate Y position between -3.4 and 3.4



      ref.current.position.y = Math.sin(clock.getElapsedTime() * 0.8) * 3.4;



    }



  });







  return (



    <group ref={ref}>



      {/* Horizontal glowing scan line ring */}



      <mesh rotation={[-Math.PI / 2, 0, 0]}>



        <ringGeometry args={[3.2, 3.35, 64]} />



        <meshBasicMaterial color="#22d3ee" transparent opacity={0.7} toneMapped={false} />



      </mesh>



      



      {/* Neon scanning plane grid */}



      <mesh rotation={[-Math.PI / 2, 0, 0]}>



        <planeGeometry args={[6.6, 6.6]} />



        <meshBasicMaterial 



          color="#a855f7" 



          transparent 



          opacity={0.06} 



          wireframe 



          side={THREE.DoubleSide}



        />



      </mesh>



    </group>



  );



}







function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function ParticleBrain({ synapseSpeed, viewMode }: ParticleBrainProps) {



  const { scene } = useGLTF('/models/brain.glb');







  const meshRef = useRef<THREE.InstancedMesh>(null);



  const groupRef = useRef<THREE.Group>(null);



  const dummy = useMemo(() => new THREE.Object3D(), []);







  // Viewport detection to adjust layout dynamically between desktop and mobile/tablet



  const { viewport } = useThree();



  const isMobile = viewport.width < 7.5;







  const brainPosition = useMemo(() => {



    return isMobile ? [0, 0, 0] as [number, number, number] : [4.5, 0, 0] as [number, number, number];



  }, [isMobile]);







  const brainScale = useMemo(() => {



    return isMobile ? 0.78 : 0.88;



  }, [isMobile]);







  // Clone scenes for separate physical and wireframe rendering overlays



  const clonedScene = useMemo(() => scene.clone(), [scene]);



  const wireframeScene = useMemo(() => scene.clone(), [scene]);







  // Compute offset and scale factor based on the scene geometry bounding box



  const { positionOffset, scaleFactor } = useMemo(() => {



    const box = new THREE.Box3().setFromObject(scene);



    const center = new THREE.Vector3();



    box.getCenter(center);



    



    const size = new THREE.Vector3();



    box.getSize(size);



    const maxDim = Math.max(size.x, size.y, size.z);



    



    const targetSize = 6.8;



    const factor = targetSize / maxDim;







    // Shift geometry center to origin [-center.x, -center.y, -center.z]



    const offset = center.multiplyScalar(-1).toArray() as [number, number, number];



    



    return { positionOffset: offset, scaleFactor: factor };



  }, [scene]);







  // Set up local clipping planes based on the viewMode



  const clippingPlanes = useMemo(() => {



    const planes: THREE.Plane[] = [];



    if (viewMode === 'cortex') {



      // Cut off the stem/cerebellum (everything below y = -0.5)



      planes.push(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.5));



    } else if (viewMode === 'stem') {



      // Cut off the cortex (everything above y = -0.5)



      planes.push(new THREE.Plane(new THREE.Vector3(0, -1, 0), -0.5));



    }



    return planes;



  }, [viewMode]);







  // Extract node points from the actual loaded brain.glb mesh geometry!



  const brainNodes = useMemo(() => {



    let brainMesh: any = null;



    scene.traverse((child) => {



      if (child instanceof THREE.Mesh) {



        brainMesh = child;



      }



    });







    const nodesList: Array<[number, number, number]> = [];



    if (brainMesh && brainMesh.geometry) {



      const geom = brainMesh.geometry;



      const posAttr = geom.attributes.position;



      if (posAttr) {



        const count = posAttr.count;



        // Select 350 random points from the actual brain vertices!



        for (let i = 0; i < 350; i++) {



          const index = Math.floor(seededRandom(i) * count);



          const x = posAttr.getX(index);



          const y = posAttr.getY(index);



          const z = posAttr.getZ(index);



          



          // Apply position offset and scale factor to place them in local world coordinates



          const vx = (x + positionOffset[0]) * scaleFactor;



          const vy = (y + positionOffset[1]) * scaleFactor;



          const vz = (z + positionOffset[2]) * scaleFactor;



          nodesList.push([vx, vy, vz]);



        }



      }



    }







    // Fallback if no mesh found



    if (nodesList.length === 0) {



      for (let i = 0; i < 350; i++) {



        const theta = seededRandom(i) * Math.PI * 2;



        const phi = Math.acos((seededRandom(i + 1) * 2) - 1);



        const r = 2.0 + seededRandom(i + 2) * 0.5;



        const x = r * Math.sin(phi) * Math.cos(theta);



        const y = r * Math.sin(phi) * Math.sin(theta) + 0.5;



        const z = r * Math.cos(phi);



        nodesList.push([x, y, z]);



      }



    }







    return nodesList;



  }, [scene, positionOffset, scaleFactor]);







  // Calculate neighbors for each node to form paths



  const neighbors = useMemo(() => {



    const list: Array<Array<number>> = [];



    const count = brainNodes.length;







    for (let i = 0; i < count; i++) {



      const p1 = brainNodes[i];



      // Find distances to all other nodes



      const distances = brainNodes.map((p2, idx) => {



        if (idx === i) return { idx, dist: Infinity };



        const dx = p1[0] - p2[0];



        const dy = p1[1] - p2[1];



        const dz = p1[2] - p2[2];



        return { idx, dist: dx*dx + dy*dy + dz*dz };



      });



      // Sort by distance and pick the 3 nearest neighbors



      distances.sort((a, b) => a.dist - b.dist);



      list.push([distances[0].idx, distances[1].idx, distances[2].idx]);



    }



    return list;



  }, [brainNodes]);







  // Apply materials to the solid physical brain model inside useEffect to avoid render-phase side-effects



  // Upgraded to premium biological/glass-like transmission shaders for amazing visual richness



  useEffect(() => {



    clonedScene.traverse((child) => {



      if (child instanceof THREE.Mesh) {



        child.material = new THREE.MeshPhysicalMaterial({



          color: new THREE.Color('#db2777'), // Soft pink base



          roughness: 0.12,



          metalness: 0.05,



          transmission: 0.85, // Premium translucent glass transmission!



          thickness: 1.8, // Refraction thickness



          ior: 1.45, // Index of refraction (glass-like)



          clearcoat: 1.0,



          clearcoatRoughness: 0.05,



          transparent: true,



          opacity: 0.55, // Translucent shell



          emissive: new THREE.Color('#1c000b'), // Deep burgundy shadows



          emissiveIntensity: 0.35,



          clippingPlanes: clippingPlanes,



          clipShadows: true,



          depthWrite: false, 



        });



        child.castShadow = true;



        child.receiveShadow = true;



      }



    });



  }, [clonedScene, clippingPlanes]);







  // Create a digital holographic wireframe overlay inside useEffect to avoid render-phase side-effects



  useEffect(() => {



    wireframeScene.traverse((child) => {



      if (child instanceof THREE.Mesh) {



        child.material = new THREE.MeshBasicMaterial({



          color: new THREE.Color('#a855f7'), // Neon purple wireframe



          wireframe: true,



          transparent: true,



          opacity: 0.12, // Subtle tech overlay



          clippingPlanes: clippingPlanes,



        });



      }



    });



  }, [wireframeScene, clippingPlanes]);







  // Generate particles data list (only synapses and ambient dust)



  const particles = useMemo(() => {



    const temp: Array<{



      currentNodeIndex: number;



      nextNodeIndex: number;



      progress: number;



      speed: number;



      scale: number;



      color: THREE.Color;



      type: 'synapse' | 'ambient';



      ambientPos?: [number, number, number];



      ambientDir?: [number, number, number];



    }> = [];







    // 2.1 Dynamic synapses following actual neural pathways - 800 particles



    for (let i = 0; i < 800; i++) {



      const startNode = Math.floor(seededRandom(i * 3) * brainNodes.length);



      const startNeighbors = neighbors[startNode] || [0];



      const nextNode = startNeighbors[Math.floor(seededRandom(i * 3 + 1) * startNeighbors.length)];



      const progress = seededRandom(i * 3 + 2);



      const speed = 0.0035 + seededRandom(i * 4) * 0.0045;



      const color = seededRandom(i * 5) > 0.45 ? '#22d3ee' : '#fda4af';







      temp.push({



        currentNodeIndex: startNode,



        nextNodeIndex: nextNode,



        progress: progress,



        speed: speed,



        scale: 0.13 + seededRandom(i * 6) * 0.11,



        color: new THREE.Color(color),



        type: 'synapse'



      });



    }







    // 2.2 Ambient particles - 150 particles



    for (let j = 0; j < 150; j++) {



      const x = (seededRandom(j * 3) - 0.5) * 35;



      const y = (seededRandom(j * 3 + 1) - 0.5) * 15;



      const z = (seededRandom(j * 3 + 2) - 0.5) * 15;



      



      const dx = (seededRandom(j * 4) - 0.5) * 0.02;



      const dy = (seededRandom(j * 4 + 1) - 0.5) * 0.02;



      const dz = (seededRandom(j * 4 + 2) - 0.5) * 0.02;







      temp.push({



        currentNodeIndex: 0,



        nextNodeIndex: 0,



        progress: 0,



        speed: 0,



        scale: 0.07 + seededRandom(j * 5) * 0.13,



        color: new THREE.Color('#fda4af'),



        type: 'ambient',



        ambientPos: [x, y, z],



        ambientDir: [dx, dy, dz]



      });



    }







    return temp;



  }, [brainNodes, neighbors]);







  // Assign colors to instances



  useEffect(() => {



    const mesh = meshRef.current;



    if (mesh) {



      particles.forEach((particle, i) => {



        mesh.setColorAt(i, particle.color);



      });



      if (mesh.instanceColor) {



        mesh.instanceColor.needsUpdate = true;



      }



    }



  }, [particles]);







  useFrame(({ clock, pointer }) => {



    const mesh = meshRef.current;



    if (groupRef.current && mesh) {



      const time = clock.elapsedTime;







      // Group rotation/floating



      groupRef.current.position.y = (isMobile ? 0 : 1.2) + Math.sin(time * 0.15) * 0.15;



      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (pointer.x * Math.PI) / 4, 0.02);



      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, (-pointer.y * Math.PI) / 4, 0.02);







      particles.forEach((particle, i) => {



        let posX = 0;



        let posY = 0;



        let posZ = 0;



        let currentScale = particle.scale;







        if (particle.type === 'synapse') {



          // Increment progress



          particle.progress += particle.speed * synapseSpeed;



          



          if (particle.progress >= 1.0) {



            particle.progress = particle.progress % 1.0;



            particle.currentNodeIndex = particle.nextNodeIndex;



            const nodeNeighbors = neighbors[particle.currentNodeIndex] || [0];



            const nextIdx = Math.floor(Math.random() * nodeNeighbors.length);



            particle.nextNodeIndex = nodeNeighbors[nextIdx];



          }







          const p1 = brainNodes[particle.currentNodeIndex];



          const p2 = brainNodes[particle.nextNodeIndex];







          if (p1 && p2) {



            posX = p1[0] + (p2[0] - p1[0]) * particle.progress;



            posY = p1[1] + (p2[1] - p1[1]) * particle.progress;



            posZ = p1[2] + (p2[2] - p1[2]) * particle.progress;



          }







          // Pulse synapses



          currentScale = particle.scale * (1.3 + Math.sin(time * 12 + i) * 0.35);







          // Handle view mode filters for synapses



          let isVisible = true;



          const yCenter = posY; // Y coordinate in space



          if (viewMode === 'cortex' && yCenter < 0.5) {



            isVisible = false;



          } else if (viewMode === 'stem' && yCenter >= 0.5) {



            isVisible = false;



          }







          if (!isVisible) {



            dummy.scale.set(0, 0, 0);



          } else {



            dummy.position.set(posX, posY, posZ);



            dummy.scale.set(currentScale, currentScale, currentScale);



          }







        } else if (particle.type === 'ambient' && particle.ambientPos && particle.ambientDir) {



          // Float ambient particles



          particle.ambientPos[0] += particle.ambientDir[0];



          particle.ambientPos[1] += particle.ambientDir[1];



          particle.ambientPos[2] += particle.ambientDir[2];







          // Wrap around space



          if (Math.abs(particle.ambientPos[0]) > 20) particle.ambientPos[0] *= -0.95;



          if (Math.abs(particle.ambientPos[1]) > 10) particle.ambientPos[1] *= -0.95;



          if (Math.abs(particle.ambientPos[2]) > 10) particle.ambientPos[2] *= -0.95;







          posX = particle.ambientPos[0];



          posY = particle.ambientPos[1];



          posZ = particle.ambientPos[2];







          dummy.position.set(posX, posY, posZ);



          dummy.scale.set(currentScale, currentScale, currentScale);



        }







        dummy.updateMatrix();



        mesh.setMatrixAt(i, dummy.matrix);



      });



      mesh.instanceMatrix.needsUpdate = true;



    }



  });







  return (



    <group ref={groupRef} position={brainPosition} scale={brainScale}>



      {/* 3D Brain Model Loader Declarative Wrapper */}



      <group rotation={[0.1, -Math.PI / 2.2, 0]}>



        {/* Solid translucent realistic brain mesh */}



        <group position={positionOffset} scale={scaleFactor}>



          <primitive object={clonedScene} />



        </group>







        {/* Futuristic digital holographic wireframe overlay */}



        <group position={positionOffset} scale={scaleFactor}>



          <primitive object={wireframeScene} />



        </group>



      </group>







      {/* Holographic scanning laser grid sweeping up and down */}



      <ScanningGrid />







      {/* Floating Synapses and Ambient Dust */}



      <instancedMesh ref={meshRef} args={[null as any, null as any, particles.length]}>



        <sphereGeometry args={[0.06, 8, 8]} />



        <meshBasicMaterial toneMapped={false} />



      </instancedMesh>



    </group>



  );



}







useGLTF.preload('/models/brain.glb');



