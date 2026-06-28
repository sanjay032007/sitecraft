"use client"

import { useEffect, useRef } from "react"

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const glow = glowRef.current
    if (!container || !glow) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      glow.style.transform = `translate(${x - 250}px, ${y - 250}px)`
      glow.style.opacity = "1"
    }

    const handleMouseLeave = () => {
      glow.style.opacity = "0"
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)
    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">

      {/* === LAYER 1: Animated Mesh Gradient Background === */}
      <div className="absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,_rgba(139,92,246,0.35)_0%,_transparent_70%)] blur-[40px] animate-[heroOrb1_12s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(236,72,153,0.3)_0%,_transparent_70%)] blur-[40px] animate-[heroOrb2_15s_ease-in-out_infinite]" />
        <div className="absolute top-[10%] right-[20%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,_rgba(59,130,246,0.25)_0%,_transparent_70%)] blur-[40px] animate-[heroOrb3_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-[10%] left-[15%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,_rgba(168,85,247,0.2)_0%,_transparent_70%)] blur-[30px] animate-[heroOrb1_18s_ease-in-out_3s_infinite_reverse]" />
      </div>

      {/* === LAYER 2: Animated grid === */}
      <div className="absolute inset-0 hero-grid opacity-[0.07]" />

      {/* === LAYER 3: Mouse-following glow === */}
      <div ref={glowRef} className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-0 transition-opacity duration-500 bg-[radial-gradient(circle,_rgba(139,92,246,0.25)_0%,_rgba(168,85,247,0.1)_30%,_transparent_70%)]" style={{ willChange: "transform" }} />

      {/* === LAYER 4: Aurora streaks === */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-[10%] w-[2px] h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-[auroraLine_8s_ease-in-out_infinite]" />
        <div className="absolute top-0 left-[30%] w-[1px] h-full bg-gradient-to-b from-transparent via-purple-400/15 to-transparent animate-[auroraLine_12s_ease-in-out_2s_infinite]" />
        <div className="absolute top-0 right-[25%] w-[1px] h-full bg-gradient-to-b from-transparent via-pink-400/15 to-transparent animate-[auroraLine_10s_ease-in-out_4s_infinite]" />
        <div className="absolute top-0 right-[10%] w-[2px] h-full bg-gradient-to-b from-transparent via-blue-400/20 to-transparent animate-[auroraLine_14s_ease-in-out_1s_infinite]" />
      </div>

      {/* === LAYER 5: Floating glassmorphism elements === */}
      {/* Main glass card - left */}
      <div className="absolute top-[12%] left-[5%] w-72 h-48 rounded-3xl hero-glass-card animate-[heroFloat_7s_ease-in-out_infinite] pointer-events-none">
        <div className="absolute inset-0 rounded-3xl hero-glass-shine" />
        <div className="p-6 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/50 to-fuchsia-500/50 flex items-center justify-center text-white/80 text-lg font-bold shadow-lg shadow-violet-500/20">S</div>
            <div>
              <div className="w-24 h-2.5 rounded-full bg-white/20 mb-1.5" />
              <div className="w-16 h-1.5 rounded-full bg-white/10" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="w-full h-2 rounded-full bg-white/12" />
            <div className="w-4/5 h-2 rounded-full bg-white/8" />
            <div className="w-3/5 h-2 rounded-full bg-white/6" />
          </div>
          <div className="flex gap-2 mt-4">
            <div className="w-16 h-6 rounded-full bg-violet-500/30 border border-violet-400/20" />
            <div className="w-16 h-6 rounded-full bg-white/5 border border-white/10" />
          </div>
        </div>
      </div>

      {/* Glass card - right */}
      <div className="absolute top-[18%] right-[4%] w-64 h-44 rounded-3xl hero-glass-card animate-[heroFloat_9s_ease-in-out_2s_infinite] pointer-events-none">
        <div className="absolute inset-0 rounded-3xl hero-glass-shine" style={{ animationDelay: "1.5s" }} />
        <div className="p-5 relative z-10">
          <div className="flex gap-1.5 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-400/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
            <div className="w-3 h-3 rounded-full bg-green-400/60" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2 h-16 rounded-lg bg-gradient-to-br from-blue-500/15 to-cyan-500/10 border border-white/5" />
            <div className="h-16 rounded-lg bg-gradient-to-br from-purple-500/15 to-pink-500/10 border border-white/5" />
            <div className="h-8 rounded-lg bg-gradient-to-br from-emerald-500/15 to-teal-500/10 border border-white/5" />
            <div className="col-span-2 h-8 rounded-lg bg-gradient-to-br from-orange-500/12 to-amber-500/8 border border-white/5" />
          </div>
        </div>
      </div>

      {/* Small glass element - bottom left */}
      <div className="absolute bottom-[22%] left-[12%] w-44 h-32 rounded-2xl hero-glass-card animate-[heroFloat_8s_ease-in-out_4s_infinite_reverse] pointer-events-none">
        <div className="absolute inset-0 rounded-2xl hero-glass-shine" style={{ animationDelay: "3s" }} />
        <div className="p-4 relative z-10">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500/40 to-rose-500/40 mb-3 shadow-lg shadow-pink-500/10" />
          <div className="w-full h-1.5 rounded-full bg-white/15 mb-1.5" />
          <div className="w-3/4 h-1.5 rounded-full bg-white/10 mb-3" />
          <div className="flex gap-1">
            <div className="flex-1 h-1 rounded-full bg-gradient-to-r from-pink-500/30 to-transparent" />
          </div>
        </div>
      </div>

      {/* Tiny accent glass - right side */}
      <div className="absolute bottom-[28%] right-[14%] w-36 h-28 rounded-2xl hero-glass-card animate-[heroFloat_6s_ease-in-out_1s_infinite] pointer-events-none">
        <div className="absolute inset-0 rounded-2xl hero-glass-shine" style={{ animationDelay: "2s" }} />
        <div className="p-4 relative z-10 flex flex-col items-center justify-center h-full gap-2">
          <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">3D</div>
          <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-violet-500/40 to-fuchsia-500/40" />
          <div className="w-8 h-1 rounded-full bg-white/10" />
        </div>
      </div>

      {/* === LAYER 6: Floating particles === */}
      <div className="absolute top-[25%] left-[35%] w-2 h-2 rounded-full bg-violet-400/50 shadow-lg shadow-violet-500/30 animate-[heroParticle_6s_ease-in-out_infinite]" />
      <div className="absolute top-[55%] right-[35%] w-1.5 h-1.5 rounded-full bg-pink-400/40 shadow-lg shadow-pink-500/20 animate-[heroParticle_8s_ease-in-out_1s_infinite_reverse]" />
      <div className="absolute top-[15%] right-[40%] w-1 h-1 rounded-full bg-blue-400/50 shadow-lg shadow-blue-500/20 animate-[heroParticle_5s_ease-in-out_2s_infinite]" />
      <div className="absolute bottom-[35%] left-[30%] w-2.5 h-2.5 rounded-full bg-fuchsia-400/30 shadow-lg shadow-fuchsia-500/15 animate-[heroParticle_10s_ease-in-out_infinite_reverse]" />
      <div className="absolute top-[40%] left-[55%] w-1.5 h-1.5 rounded-full bg-cyan-400/40 shadow-lg shadow-cyan-500/20 animate-[heroParticle_7s_ease-in-out_3s_infinite]" />
      <div className="absolute bottom-[15%] right-[40%] w-2 h-2 rounded-full bg-purple-400/35 shadow-lg shadow-purple-500/15 animate-[heroParticle_9s_ease-in-out_2s_infinite_reverse]" />

      {/* === LAYER 7: Geometric accent shapes === */}
      <div className="absolute top-[30%] left-[45%] w-16 h-16 border border-white/5 rounded-xl rotate-45 animate-[heroSpin_20s_linear_infinite]" />
      <div className="absolute bottom-[25%] right-[35%] w-12 h-12 border border-violet-400/10 rounded-lg rotate-12 animate-[heroSpin_15s_linear_infinite_reverse]" />
      <div className="absolute top-[60%] left-[25%] w-8 h-8 border border-pink-400/10 rounded-md rotate-[30deg] animate-[heroSpin_25s_linear_infinite]" />

    </div>
  )
}
