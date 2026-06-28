"use client";

import React, { useState } from 'react';
import { Template } from '@/lib/data';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Activity, Cpu, Code, ShieldCheck, ArrowRight } from 'lucide-react';

export function AIStartupGlass({ t }: { t: Template }) {
  const { primary, bg, text, secondary } = t.colorScheme;
  const [promptInput, setPromptInput] = useState("Write a neural network layer in Rust");
  const [outputCode, setOutputCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setOutputCode("");
    setTimeout(() => {
      setOutputCode(`// Synapse-AI Generated Layer\n#[derive(Debug)]\npub struct LinearLayer {\n    weights: Vec<Vec<f32>>,\n    biases: Vec<f32>,\n}\n\nimpl LinearLayer {\n    pub fn forward(&self, input: &[f32]) -> Vec<f32> {\n        // Forward propagation logic\n    }\n}`);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="@container w-full h-full min-h-full flex flex-col bg-neutral-950 text-white relative overflow-hidden" style={{ color: text }}>
      {/* Cyberpunk Grid Background Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ea5e9_1px,transparent_1px),linear-gradient(to_bottom,#0ea5e9_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-[-10%] left-[20%] w-[50%] h-[50%] rounded-full mix-blend-screen filter blur-[85px] opacity-25" style={{ background: '#06b6d4' }}></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] rounded-full mix-blend-screen filter blur-[80px] opacity-20" style={{ background: '#7c3aed' }}></div>

      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden scrollbar-none pointer-events-auto">
      {/* Header */}
      <header className="px-6 py-4 border-b border-white/5 bg-neutral-950/60 backdrop-blur-xl sticky top-0 z-50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-cyan-400 flex items-center justify-center text-black font-black text-xs">S</div>
          <span className="font-extrabold text-sm tracking-tight text-white/95">Neural Glass</span>
        </div>
        <nav className="hidden @md:flex gap-6 text-[10px] uppercase font-bold tracking-widest text-neutral-400">
          <span className="hover:text-white cursor-pointer">Models</span>
          <span className="hover:text-white cursor-pointer">Architecture</span>
          <span className="hover:text-white cursor-pointer">API Metrics</span>
        </nav>
        <button className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 hover:bg-cyan-500/20 transition-all backdrop-blur-md">
          Access Console
        </button>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 text-center max-w-4xl mx-auto flex flex-col items-center relative z-10">
        <span className="inline-flex items-center gap-1 text-[8px] font-bold tracking-widest uppercase border border-cyan-500/30 bg-cyan-950/30 text-cyan-300 px-3 py-1 rounded-full mb-4 backdrop-blur-md">
          <Cpu className="w-3.5 h-3.5" /> Synapse LLM-4 Platform
        </span>
        <h1 className="text-4xl @md:text-6xl font-black tracking-tight leading-none mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
          Deploy AI model <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
            pipelines in milliseconds.
          </span>
        </h1>
        <p className="text-xs text-white/60 max-w-md mb-8 leading-relaxed font-light">
          {t.description || "Neural Glass provides low-latency inference endpoints, visual model orchestration pipelines, and robust data token tracking dashboards."}
        </p>
        <div className="flex gap-3">
          <button className="text-[10px] font-bold uppercase tracking-widest px-5 py-3 rounded border border-cyan-500 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-all flex items-center gap-2">
            Create Free Account <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button className="text-[10px] font-bold uppercase tracking-widest px-5 py-3 rounded border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
            Read Docs
          </button>
        </div>
      </section>

      {/* AI Playground Interactive Showcase */}
      <section className="px-6 py-10 max-w-4xl mx-auto w-full relative z-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-6 text-center">Interactive Inference Arena</h2>
        
        <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl p-4 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-[10px] text-white/50">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="font-mono">synapse-arena // model-v4</span>
            </div>
            <span className="border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 px-2 py-0.5 rounded text-[8px] font-bold uppercase">
              Latency: 12ms avg
            </span>
          </div>

          <div className="space-y-4 font-mono text-[10px]">
            {/* Input Row */}
            <div className="flex gap-2 border border-white/10 bg-black/45 p-2.5 rounded-lg">
              <span className="text-cyan-400 font-bold select-none">&gt;</span>
              <input 
                type="text" 
                value={promptInput} 
                onChange={(e) => setPromptInput(e.target.value)} 
                className="bg-transparent text-white outline-none w-full"
                placeholder="Ask Synapse anything..." 
              />
              <button 
                onClick={handleGenerate} 
                className="border border-cyan-500/40 bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded font-bold uppercase tracking-wider text-[8px] hover:bg-cyan-500/30"
              >
                {loading ? "Thinking..." : "Run"}
              </button>
            </div>

            {/* Output code block */}
            <div className="h-44 border border-white/10 bg-black/45 p-3 rounded-lg overflow-y-auto whitespace-pre text-neutral-300">
              {loading ? (
                <div className="flex items-center gap-2 text-neutral-500 animate-pulse">
                  <Activity className="w-3.5 h-3.5 animate-spin" /> compiling model parameters...
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

      {/* Model Architecture Visuals Section */}
      <section className="px-6 py-14 bg-white/2 border-y border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto w-full text-center">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Model Pipelines</h2>
          <h3 className="text-lg font-bold mb-8">Modular pipeline architecture</h3>
          
          {/* Diagrams */}
          <div className="flex flex-col @md:flex-row justify-between items-center gap-6">
            <div className="flex-1 w-full border border-white/10 bg-white/5 p-4 rounded-xl text-left">
              <div className="flex justify-between items-center mb-3">
                <Code className="w-4 h-4 text-cyan-400" />
                <span className="text-[8px] uppercase tracking-wider text-white/40">Pipeline Stage 1</span>
              </div>
              <h4 className="text-xs font-bold text-white">Vector Embedding Parse</h4>
              <p className="text-[10px] text-white/60 mt-1 leading-relaxed">Converts incoming text/audio tokens into 1536-dimensional matrix vectors.</p>
            </div>
            
            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 select-none">&rarr;</div>

            <div className="flex-1 w-full border border-white/10 bg-white/5 p-4 rounded-xl text-left">
              <div className="flex justify-between items-center mb-3">
                <Cpu className="w-4 h-4 text-blue-400" />
                <span className="text-[8px] uppercase tracking-wider text-white/40">Pipeline Stage 2</span>
              </div>
              <h4 className="text-xs font-bold text-white">Transformer Attention</h4>
              <p className="text-[10px] text-white/60 mt-1 leading-relaxed">Runs 48-head self attention to compute logical context correlation weights.</p>
            </div>

            <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 select-none">&rarr;</div>

            <div className="flex-1 w-full border border-white/10 bg-white/5 p-4 rounded-xl text-left">
              <div className="flex justify-between items-center mb-3">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span className="text-[8px] uppercase tracking-wider text-white/40">Pipeline Stage 3</span>
              </div>
              <h4 className="text-xs font-bold text-white">Compliance/Guardrail filter</h4>
              <p className="text-[10px] text-white/60 mt-1 leading-relaxed">Scans synthesis outputs for licensing conflicts and security leaks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Analytics Telemetry Preview */}
      <section className="px-6 py-14 max-w-5xl mx-auto w-full relative z-10">
        <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-8 text-center">API Console Telemetry</h2>
        
        <div className="grid grid-cols-1 @md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-xl p-4">
            <span className="text-[8px] uppercase text-white/40 tracking-wider font-semibold block">Total Tokens Synthesized</span>
            <h4 className="text-xl font-bold mt-1 mb-3">45.2M / day</h4>
            <div className="flex items-end gap-1 h-12 pt-2">
              {[20, 30, 45, 60, 50, 40, 55, 75, 90, 85, 70, 80].map((v, i) => (
                <div key={i} className="flex-1 rounded-t bg-cyan-500/20" style={{ height: `${v}%` }} />
              ))}
            </div>
          </div>

          {/* Card 2 */}
          <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-xl p-4">
            <span className="text-[8px] uppercase text-white/40 tracking-wider font-semibold block">Model Inference Cost</span>
            <h4 className="text-xl font-bold mt-1 mb-3">$0.0015 / 1k tokens</h4>
            <div className="flex items-end gap-1 h-12 pt-2">
              {[80, 80, 80, 80, 80, 80, 50, 50, 50, 50, 30, 30].map((v, i) => (
                <div key={i} className="flex-1 rounded-t bg-blue-500/20" style={{ height: `${v}%` }} />
              ))}
            </div>
          </div>

          {/* Card 3 */}
          <div className="border border-white/10 bg-white/5 backdrop-blur-xl rounded-xl p-4">
            <span className="text-[8px] uppercase text-white/40 tracking-wider font-semibold block">Uptime SLA (Active gateways)</span>
            <h4 className="text-xl font-bold mt-1 mb-3">99.992%</h4>
            <div className="flex items-end gap-1 h-12 pt-2">
              {[95, 96, 94, 98, 99, 99, 99, 99, 99, 99, 99, 100].map((v, i) => (
                <div key={i} className="flex-1 rounded-t bg-indigo-500/20" style={{ height: `${v}%` }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 py-6 px-6 text-[10px] text-white/40 uppercase tracking-widest text-center relative z-10">
        &copy; {new Date().getFullYear()} Synapse AI Platform. All rights reserved.
      </footer>
      </div>
    </div>
  );
}
