"use client"

import Navbar from '@/components/navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Ecommerce3D } from '@/components/previews/three/ecommerce-3d'
import { Healthcare3D } from '@/components/previews/three/healthcare-3d'
import { RealEstate3D } from '@/components/previews/three/realestate-3d'
import { Template } from '@/lib/data'

const dummyTemplate = {
  id: 'test',
  name: 'test',
  description: 'test',
  category: 'test',
  colorScheme: { primary: '#000', secondary: '#000', bg: '#000', text: '#fff' },
  sections: [],
  components: {}
} as unknown as Template;

export default function Test3DPage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-background relative overflow-hidden">
      <Navbar />
      {/* Background gradient orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[120px]" />

      <section id="ecommerce" className="w-full max-w-4xl my-8 mt-24">
        <Card className="bg-background/80 backdrop-blur-xl border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">E-Commerce 3D Preview</CardTitle>
          </CardHeader>
          <CardContent className="h-[800px]">
            <Ecommerce3D t={dummyTemplate} />
          </CardContent>
        </Card>
      </section>

      <section id="healthcare" className="w-full max-w-4xl my-8">
        <Card className="bg-background/80 backdrop-blur-xl border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Healthcare 3D Preview</CardTitle>
          </CardHeader>
          <CardContent className="h-[800px]">
            <Healthcare3D t={dummyTemplate} />
          </CardContent>
        </Card>
      </section>

      <section id="realestate" className="w-full max-w-4xl my-8">
        <Card className="bg-background/80 backdrop-blur-xl border-border/50">
          <CardHeader>
            <CardTitle className="text-2xl">Real-Estate 3D Preview</CardTitle>
          </CardHeader>
          <CardContent className="h-[800px]">
            <RealEstate3D t={dummyTemplate} />
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
