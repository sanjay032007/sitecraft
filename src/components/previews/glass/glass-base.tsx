
import { Template } from "@/lib/data"

export function GlassBase({ t }: { t: Template }) {
  const { primary, bg, text, secondary, accent } = t.colorScheme
  return (
    <div className="@container w-full h-full overflow-hidden relative" style={{ background: bg, color: text }}>
      {/* Dynamic Mesh Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full mix-blend-screen filter blur-[40px] opacity-60 animate-pulse" style={{ background: primary }}></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full mix-blend-screen filter blur-[40px] opacity-50" style={{ background: accent }}></div>
      <div className="absolute top-[30%] right-[20%] w-[40%] h-[40%] rounded-full mix-blend-screen filter blur-[30px] opacity-40" style={{ background: secondary }}></div>

      <div className="absolute inset-0 z-10 overflow-y-auto overflow-x-hidden scrollbar-none pointer-events-auto">
      {/* Main Glass Container */}
      <div className="absolute inset-2 @md:inset-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Navbar */}
        <div className="px-4 py-2 border-b border-white/10 flex justify-between items-center">
          <div className="font-bold text-[10px] tracking-widest uppercase">{t.title}</div>
          <div className="flex gap-2 text-[7px] text-white/70">
            <span>Home</span><span>Features</span><span>Pricing</span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <div className="text-[6px] font-medium tracking-widest uppercase border border-white/20 bg-white/5 px-2 py-1 rounded-full mb-3 backdrop-blur-md">
            ✦ Glassmorphism UI
          </div>
          <h1 className="text-xl font-bold leading-tight mb-2 text-balance bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50">{t.category} Template</h1>
          <p className="text-[8px] text-white/70 max-w-[200px] mb-4">{t.description}</p>
          
          <div className="flex gap-2">
            <div className="text-[8px] font-medium px-3 py-1.5 rounded-lg border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors cursor-pointer">
              Explore Demo
            </div>
          </div>
        </div>

        {/* Glass Cards Layout */}
        <div className="p-3 grid grid-cols-2 gap-2 mt-auto">
          {[1,2].map(i => (
            <div key={i} className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-md p-2">
              <div className="w-6 h-6 rounded-md bg-white/10 flex items-center justify-center mb-2">
                <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-white/80 to-white/20"></div>
              </div>
              <div className="h-2 w-3/4 bg-white/20 rounded mb-1"></div>
              <div className="h-1.5 w-1/2 bg-white/10 rounded"></div>
            </div>
          ))}
        </div>
        
      </div>
      </div>
    </div>
  )
}
