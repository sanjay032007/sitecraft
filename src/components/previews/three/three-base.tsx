
"use client"
import { Template } from "@/lib/data"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Box } from "@react-three/drei"

export function ThreeBase({ t }: { t: Template }) {
  const { primary, bg, text } = t.colorScheme
  return (
    <div className="w-full h-full relative" style={{ background: bg }}>
      <Canvas frameloop="demand" camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Box args={[1.5, 1.5, 1.5]}>
            <meshStandardMaterial color={primary} wireframe />
          </Box>
        </Float>
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-2xl font-bold" style={{ color: text, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{t.title}</h1>
        <p className="text-[10px] mt-2 opacity-80" style={{ color: text }}>Interactive 3D Experience</p>
      </div>
    </div>
  )
}
