import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { TEMPLATES } from "@/lib/data"
import TemplateCard from "@/components/template-card"
import Link from "next/link"
import { ArrowRight, Sparkles, Layout, Zap } from "lucide-react"
import Hero3D from "@/components/hero-3d-wrapper"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-purple-500/30 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        {/* 3D Background */}
        <Hero3D />

        <div className="container mx-auto px-4 relative z-10 pointer-events-none">
          <div className="max-w-4xl mx-auto text-center space-y-8 pointer-events-auto">
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary backdrop-blur-sm mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              <span>Next-Gen Web Templates</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
              Build websites that <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-pink-500">
                defy gravity.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover premium, production-ready templates. From sleek Modern layouts to immersive 3D experiences and Glassmorphism UIs.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link href="/explore">
                <Button size="lg" className="h-14 px-8 text-lg font-medium shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)] hover:shadow-[0_0_60px_-15px_rgba(var(--primary),0.7)] transition-shadow">
                  Explore Templates <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/gallery">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-medium bg-background/50 backdrop-blur-sm border-border/50 hover:bg-secondary/50">
                  View Gallery
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30 relative border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Layout className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">3 Distinct Styles</h3>
              <p className="text-muted-foreground leading-relaxed">
                Choose from highly polished Modern designs, futuristic Glassmorphism, or fully interactive 3D WebGL experiences.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI-Ready Prompts</h3>
              <p className="text-muted-foreground leading-relaxed">
                Export optimized generation prompts to build these designs instantly in AI builders like Antigravity.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Production Grade</h3>
              <p className="text-muted-foreground leading-relaxed">
                Responsive layouts, accessible components, and beautiful animations baked right into every template.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Templates */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Templates</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Hand-picked designs that showcase the power of modern web development.
              </p>
            </div>
            <Link href="/explore" className="hidden md:flex items-center text-primary hover:text-primary/80 transition-colors font-medium">
              View all templates <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEMPLATES.slice(0, 6).map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
          
          <div className="text-center mt-12 md:hidden">
            <Link href="/explore">
              <Button variant="outline" size="lg" className="w-full">
                View all templates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to start building?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of developers and designers creating stunning websites faster than ever before.
          </p>
          <Link href="/signup">
            <Button size="lg" className="h-14 px-10 text-lg font-medium">
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
