/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState, Suspense, useMemo, useEffect } from 'react';
import { Template } from '@/lib/data';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Terminal, Activity, Cpu, Code, ShieldCheck, ArrowRight, Sliders } from 'lucide-react';
import * as THREE from 'three';

// Deterministic pseudo-random helper to avoid hydration mismatches
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface BrainNode {
  id: number;
  position: [number, number, number];
  color: string;
  phase: number;
}

interface BrainEdge {
  start: [number, number, number];
  end: [number, number, number];
  length: number;
  color?: string;
}

function NodeHelper({ node, signalSpeed }: { node: BrainNode; signalSpeed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    // Pulse size and intensity based on signal speed
    const s = 1.0 + Math.sin(t * 2.5 * signalSpeed + node.phase) * 0.35;
    meshRef.current.scale.set(s, s, s);
  });

  return (
    <mesh ref={meshRef} position={node.position}>
      <sphereGeometry args={[0.016, 8, 8]} />
      <meshBasicMaterial color={node.color} toneMapped={false} />
    </mesh>
  );
}

function LineHelper({ edge, signalSpeed }: { edge: BrainEdge; signalSpeed: number }) {
  const lineRef = useRef<THREE.LineSegments>(null);

  useFrame((state) => {
    if (!lineRef.current) return;
    const t = state.clock.getElapsedTime();
    const mat = lineRef.current.material as THREE.LineBasicMaterial;
    // Pulse the pathway opacity to look like electrical signals
    mat.opacity = 0.12 + 0.38 * Math.sin(t * 3.5 * signalSpeed - edge.length * 6.0);
  });

  const points = useMemo(() => [
    new THREE.Vector3(...edge.start),
    new THREE.Vector3(...edge.end)
  ], [edge]);

  const geometryRef = useRef<THREE.BufferGeometry>(null);
  useEffect(() => {
    if (geometryRef.current) {
      geometryRef.current.setFromPoints(points);
    }
  }, [points]);

  return (
    <line ref={lineRef as any}>
      <bufferGeometry ref={geometryRef} />
      <lineBasicMaterial 
        color={edge.color || "#06b6d4"} 
        transparent 
        opacity={0.3} 
        blending={THREE.AdditiveBlending}
      />
    </line>
  );
}

interface AIModelProps {
  synapseCount: number;
  signalSpeed: number;
  lobeSeparation: number;
  activationFunction: string;
}

function AIModel({ synapseCount, signalSpeed, lobeSeparation, activationFunction }: AIModelProps) {
  const brainRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  const scale = isMobile ? 0.7 : 1.15;

  const colors = useMemo(() => {
    switch (activationFunction) {
      case 'Sigmoid':
        return { left: '#ec4899', right: '#10b981' }; // Pink / Emerald
      case 'GELU':
        return { left: '#f59e0b', right: '#6366f1' }; // Amber / Indigo
      case 'ReLU':
      default:
        return { left: '#06b6d4', right: '#a78bfa' }; // Cyan / Purple
    }
  }, [activationFunction]);

  // 1. Generate Lobe Nodes (Synapses) dynamically
  const [nodes, edges] = useMemo(() => {
    const tempNodes: BrainNode[] = [];
    const tempEdges: BrainEdge[] = [];
    const lobes = ['left', 'right'];
    const nodesPerLobe = synapseCount;

    let id = 0;
    lobes.forEach((lobe) => {
      const offsetX = lobe === 'left' ? -lobeSeparation : lobeSeparation;
      
      for (let i = 0; i < nodesPerLobe; i++) {
        const theta = seededRandom(id * 1.5) * Math.PI;
        const phi = seededRandom(id * 2.5) * Math.PI * 2;
        
        // Ellipsoidal distortion + brain wrinkles (gyri noise)
        const gyri = 1.0 + 0.14 * Math.sin(theta * 6) * Math.cos(phi * 6);
        const rx = 0.45 * gyri;
        const ry = 0.52 * gyri;
        const rz = 0.42 * gyri;

        const x = Math.sin(theta) * Math.cos(phi) * rx + offsetX;
        const y = Math.cos(theta) * ry;
        const z = Math.sin(theta) * Math.sin(phi) * rz;

        // Cerebellum clustering (back-lower brain)
        const isCerebellum = seededRandom(id * 3.5) < 0.22;
        const finalY = isCerebellum ? y - 0.2 : y;
        const finalZ = isCerebellum ? z - 0.12 : z;

        tempNodes.push({
          id,
          position: [x, finalY, finalZ],
          color: lobe === 'left' ? colors.left : colors.right,
          phase: seededRandom(id * 4.5) * Math.PI * 2
        });
        id++;
      }
    });

    // 2. Connect Close Nodes (Synapses/Pathways)
    for (let i = 0; i < tempNodes.length; i++) {
      for (let j = i + 1; j < tempNodes.length; j++) {
        const dx = tempNodes[i].position[0] - tempNodes[j].position[0];
        const dy = tempNodes[i].position[1] - tempNodes[j].position[1];
        const dz = tempNodes[i].position[2] - tempNodes[j].position[2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        // Connect if close, but avoid dense cross-lobe connections
        if (dist < 0.38) {
          const isCrossLobe = Math.sign(tempNodes[i].position[0]) !== Math.sign(tempNodes[j].position[0]);
          if (!isCrossLobe || seededRandom(i * j) < 0.06) {
            tempEdges.push({
              start: tempNodes[i].position,
              end: tempNodes[j].position,
              length: dist,
              color: tempNodes[i].color
            });
          }
        }
      }
    }
    return [tempNodes, tempEdges];
  }, [synapseCount, lobeSeparation, colors]);

  // 3. Animate Brain Rotation & Pulse
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (brainRef.current) {
      // Elegant organic floating & rotation
      brainRef.current.rotation.y = t * 0.15;
      brainRef.current.rotation.x = Math.sin(t * 0.2) * 0.12;
      brainRef.current.rotation.z = Math.cos(t * 0.15) * 0.08;
    }
  });

  return (
    <group ref={brainRef} scale={scale}>
      {/* Synapse Lines (Pathways) */}
      {edges.map((edge, idx) => (
        <LineHelper key={`edge-${idx}`} edge={edge} signalSpeed={signalSpeed} />
      ))}

      {/* Synapse Nodes (Glowing Vertices) */}
      {nodes.map((node) => (
        <NodeHelper key={node.id} node={node} signalSpeed={signalSpeed} />
      ))}
    </group>
  );
}

export function AIStartup3D({ t }: { t: Template }) {
  const { primary, bg, text, secondary } = t.colorScheme;
  const [promptInput, setPromptInput] = useState("Write a neural network layer in Rust");
  const [outputCode, setOutputCode] = useState("");
  const [loading, setLoading] = useState(false);

  // HUD Control Panel States
  const [synapseCount, setSynapseCount] = useState(55);
  const [signalSpeed, setSignalSpeed] = useState(1.0);
  const [lobeSeparation, setLobeSeparation] = useState(0.26);
  const [glowIntensity, setGlowIntensity] = useState(1.2);
  const [activationFunction, setActivationFunction] = useState('ReLU');

  const colors = useMemo(() => {
    switch (activationFunction) {
      case 'Sigmoid':
        return { left: '#ec4899', right: '#10b981' }; // Pink / Emerald
      case 'GELU':
        return { left: '#f59e0b', right: '#6366f1' }; // Amber / Indigo
      case 'ReLU':
      default:
        return { left: '#06b6d4', right: '#a78bfa' }; // Cyan / Purple
    }
  }, [activationFunction]);

  const handleGenerate = () => {
    setLoading(true);
    setOutputCode("");
    setTimeout(() => {
      setOutputCode(`// Synapse-AI Generated Layer\n#[derive(Debug)]\npub struct LinearLayer {\n    weights: Vec<Vec<f32>>,\n    biases: Vec<f32>,\n}\n\nimpl LinearLayer {\n    pub fn forward(&self, input: &[f32]) -> Vec<f32> {\n        // Forward propagation logic\n    }\n}`);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="@container w-full h-full relative overflow-hidden bg-neutral-950 text-white" style={{ color: text }}>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Canvas frameloop="demand" camera={{ position: [0, 0, 2.6], fov: 45 }} resize={{ offsetSize: true }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={2.0} color={colors.left} />
          <pointLight position={[-5, -5, -5]} intensity={0.5} color={colors.right} />
          <Stars radius={80} depth={40} count={1000} factor={2.5} saturation={0.6} fade speed={0.4} />
          <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.4}>
            <Suspense fallback={null}>
              <AIModel 
                synapseCount={synapseCount}
                signalSpeed={signalSpeed}
                lobeSeparation={lobeSeparation}
                activationFunction={activationFunction}
              />
            </Suspense>
          </Float>
          <OrbitControls enableZoom={false} />
          <EffectComposer>
            <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.9} intensity={glowIntensity} />
          </EffectComposer>
        </Canvas>
      </div>
      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden scrollbar-none pointer-events-auto">
        <div className="flex flex-col min-h-full">
          {/* Cyberpunk Grid Background Effect */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.02] pointer-events-none" />

          {/* Header */}
          <header className="px-6 py-4 border-b border-neutral-900 bg-neutral-950/60 backdrop-blur-xl sticky top-0 z-50 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-cyan-400 flex items-center justify-center text-black font-black text-xs" style={{ backgroundColor: colors.left }}>S</div>
              <span className="font-extrabold text-sm tracking-tight text-white/95">Genesis AI</span>
            </div>
            <nav className="hidden @md:flex gap-6 text-[10px] uppercase font-bold tracking-widest text-neutral-400">
              <span className="hover:text-white cursor-pointer">Models</span>
              <span className="hover:text-white cursor-pointer">Architecture</span>
              <span className="hover:text-white cursor-pointer">API Metrics</span>
            </nav>
            <button className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-all backdrop-blur-md" style={{ borderColor: `${colors.left}30`, color: colors.left, backgroundColor: `${colors.left}10` }}>
              Access Console
            </button>
          </header>

          {/* 3D Hero */}
          <section className="relative h-[450px] w-full border-b border-neutral-900 bg-transparent">
            {/* Control Panel Overlay */}
            <div className="absolute top-4 right-4 z-30 w-72 backdrop-blur-md bg-neutral-950/45 border border-neutral-800/80 rounded-xl p-4 shadow-2xl transition-all duration-300 hover:border-neutral-700/80 pointer-events-auto">
              <div className="flex items-center gap-1.5 border-b border-neutral-800 pb-2 mb-3">
                <Sliders className="w-4 h-4 text-cyan-400 animate-pulse" style={{ color: colors.left }} />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">Neural Engine HUD</span>
              </div>
              <div className="space-y-3">
                {/* Activation Function Select */}
                <div className="flex flex-col gap-1">
                  <label className="text-[8px] font-bold uppercase tracking-wider text-neutral-400 flex justify-between">
                    <span>Activation Function</span>
                    <span className="text-cyan-400 font-mono" style={{ color: colors.left }}>{activationFunction}</span>
                  </label>
                  <select
                    value={activationFunction}
                    onChange={(e) => setActivationFunction(e.target.value)}
                    className="bg-neutral-950 border border-neutral-800 rounded p-1.5 text-[10px] font-mono text-white outline-none focus:border-cyan-500/50"
                    style={{ borderColor: `${colors.left}33` }}
                  >
                    <option value="ReLU">ReLU (Cyan / Purple)</option>
                    <option value="Sigmoid">Sigmoid (Pink / Emerald)</option>
                    <option value="GELU">GELU (Amber / Indigo)</option>
                  </select>
                </div>

                {/* Synapse Count */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[8px] font-bold uppercase tracking-wider text-neutral-400">
                    <span>Synapses (Nodes)</span>
                    <span className="text-cyan-400 font-mono" style={{ color: colors.left }}>{synapseCount * 2}</span>
                  </div>
                  <input 
                    type="range"
                    min="30"
                    max="120"
                    step="5"
                    value={synapseCount}
                    onChange={(e) => setSynapseCount(parseInt(e.target.value))}
                    className="w-full h-1 rounded-lg cursor-pointer appearance-none bg-neutral-800"
                    style={{ accentColor: colors.left }}
                  />
                </div>

                {/* Signal Speed */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[8px] font-bold uppercase tracking-wider text-neutral-400">
                    <span>Signal Pulse Speed</span>
                    <span className="text-cyan-400 font-mono" style={{ color: colors.left }}>{signalSpeed.toFixed(1)}x</span>
                  </div>
                  <input 
                    type="range"
                    min="0.5"
                    max="4.0"
                    step="0.1"
                    value={signalSpeed}
                    onChange={(e) => setSignalSpeed(parseFloat(e.target.value))}
                    className="w-full h-1 rounded-lg cursor-pointer appearance-none bg-neutral-800"
                    style={{ accentColor: colors.left }}
                  />
                </div>

                {/* Lobe Separation */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[8px] font-bold uppercase tracking-wider text-neutral-400">
                    <span>Lobe Separation</span>
                    <span className="text-cyan-400 font-mono" style={{ color: colors.left }}>{lobeSeparation.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range"
                    min="0.1"
                    max="0.6"
                    step="0.02"
                    value={lobeSeparation}
                    onChange={(e) => setLobeSeparation(parseFloat(e.target.value))}
                    className="w-full h-1 rounded-lg cursor-pointer appearance-none bg-neutral-800"
                    style={{ accentColor: colors.left }}
                  />
                </div>

                {/* Glow Intensity */}
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[8px] font-bold uppercase tracking-wider text-neutral-400">
                    <span>Glow (Bloom)</span>
                    <span className="text-cyan-400 font-mono" style={{ color: colors.left }}>{glowIntensity.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.1"
                    value={glowIntensity}
                    onChange={(e) => setGlowIntensity(parseFloat(e.target.value))}
                    className="w-full h-1 rounded-lg cursor-pointer appearance-none bg-neutral-800"
                    style={{ accentColor: colors.left }}
                  />
                </div>
              </div>
            </div>

            {/* Text Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 bg-gradient-to-t from-neutral-950 via-transparent to-transparent pointer-events-none">
              <div className="max-w-md pointer-events-auto">
                <span className="inline-flex items-center gap-1 text-[8px] font-bold tracking-widest uppercase border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 px-3 py-1 rounded-full mb-3 backdrop-blur-md" style={{ borderColor: `${colors.left}30`, color: colors.left, backgroundColor: `${colors.left}10` }}>
                  <Cpu className="w-3.5 h-3.5" /> Synapse LLM-4 Platform
                </span>
                <h1 className="text-2xl @md:text-3xl font-black tracking-tight leading-tight mb-2 text-white">
                  Cognitive 3D neural globes.
                </h1>
                <p className="text-xs text-neutral-400 mb-4 leading-relaxed font-light font-sans">
                  Explore dynamic topologies. Spin the neural sphere above to check electrical pathways. Access playground console:
                </p>
                <a href="#playground" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-5 py-2.5 rounded text-black hover:opacity-90 transition-opacity" style={{ backgroundColor: colors.left }}>
                  Access Console Playground <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </section>

          {/* AI Playground Interactive Showcase */}
          <section id="playground" className="px-6 py-10 max-w-4xl mx-auto w-full relative z-10 bg-neutral-950">
            <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6 text-center">Interactive Inference Arena</h2>
            
            <div className="border border-neutral-800 bg-neutral-900/60 p-4 shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-4 text-[10px] text-neutral-400">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" style={{ color: colors.left }} />
                  <span className="font-mono">synapse-arena // model-v4</span>
                </div>
                <span className="bg-cyan-950 border border-cyan-800 text-cyan-400 px-2 py-0.5 rounded text-[8px] font-bold uppercase" style={{ borderColor: `${colors.left}80`, color: colors.left, backgroundColor: `${colors.left}10` }}>
                  Latency: 12ms avg
                </span>
              </div>

              <div className="space-y-4 font-mono text-[10px]">
                {/* Input Row */}
                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur text-xs font-mono p-4 rounded border border-slate-700/50 text-emerald-400">
                  {`> NEURAL_CORE_ONLINE`}
                </div>
                <div className="flex gap-2 bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                  <span className="text-cyan-400 font-bold select-none" style={{ color: colors.left }}>&gt;</span>
                  <input 
                    type="text" 
                    value={promptInput} 
                    onChange={(e) => setPromptInput(e.target.value)} 
                    className="bg-transparent text-white outline-none w-full"
                    placeholder="Ask Synapse anything..." 
                  />
                  <button 
                    onClick={handleGenerate} 
                    className="bg-cyan-500 text-black px-3 py-1 rounded font-bold uppercase tracking-wider text-[8px] hover:bg-cyan-400"
                    style={{ backgroundColor: colors.left }}
                  >
                    {loading ? "Thinking..." : "Run"}
                  </button>
                </div>

                {/* Output code block */}
                <div className="h-44 bg-neutral-950 p-3 rounded-lg border border-neutral-800 overflow-y-auto whitespace-pre text-neutral-300">
                  {loading ? (
                    <div className="flex items-center gap-2 text-neutral-500 animate-pulse">
                      <Activity className="w-3.5 h-3.5 animate-spin" style={{ color: colors.left }} /> compiling model parameters...
                    </div>
                  ) : outputCode ? (
                    <code>{outputCode}</code>
                  ) : (
                    <span className="text-neutral-600">{"// Click Run to execute neural code synthesis."}</span>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-auto border-t border-neutral-900 py-6 px-6 text-[10px] text-neutral-500 uppercase tracking-widest text-center relative z-10 bg-neutral-950">
            &copy; {new Date().getFullYear()} Genesis AI Platform. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  );
}
