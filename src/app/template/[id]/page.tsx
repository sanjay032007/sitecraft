import Navbar from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { TEMPLATES } from "@/lib/data"
import TemplateClientWrapper from "@/components/template-client-wrapper"
import { ArrowLeft, Download, Heart, CheckCircle2, Layers, FileText, Code2, Zap, Layout, MonitorSmartphone, Cuboid, Sparkles } from "lucide-react"

export default async function TemplateDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const template = TEMPLATES.find(t => t.id === resolvedParams.id) || TEMPLATES[0]

  return (
    <main className="min-h-screen pt-24 pb-12 bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4">
        <Link href="/explore" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Explore
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Preview Area */}
          <div className="flex-1 min-w-0 relative min-h-[600px] bg-card rounded-xl border border-border/50 overflow-hidden shadow-2xl">
             {/* The actual preview engine (loaded dynamically client-side with ssr: false) */}
             <TemplateClientWrapper template={template} />
          </div>
          
          {/* Details Sidebar */}
          <div className="w-full lg:w-[400px] space-y-8 flex-shrink-0">
            <div>
              <div className="flex items-start justify-between">
                <h1 className="text-3xl font-bold mb-3 text-foreground tracking-tight">{template.title}</h1>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500 transition-colors">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">{template.description}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-border/50">
               <div className="space-y-1">
                 <p className="text-sm text-muted-foreground flex items-center"><Layout className="w-4 h-4 mr-2"/> Category</p>
                 <p className="font-medium">{template.category}</p>
               </div>
               <div className="space-y-1">
                 <p className="text-sm text-muted-foreground flex items-center"><Layers className="w-4 h-4 mr-2"/> Style</p>
                 <p className="font-medium">{template.style}</p>
               </div>
               <div className="space-y-1">
                 <p className="text-sm text-muted-foreground flex items-center"><FileText className="w-4 h-4 mr-2"/> Pages</p>
                 <p className="font-medium">{template.pageCount}</p>
               </div>
               <div className="space-y-1">
                 <p className="text-sm text-muted-foreground flex items-center"><Code2 className="w-4 h-4 mr-2"/> Complexity</p>
                 <p className="font-medium capitalize">{template.complexity}</p>
               </div>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground text-lg flex items-center">
                 <Sparkles className="w-5 h-5 mr-2 text-primary" /> Key Features
              </h3>
              <ul className="space-y-3">
                {template.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-muted-foreground">
                    <CheckCircle2 className="w-5 h-5 mr-3 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Included Pages */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground text-lg flex items-center">
                 <FileText className="w-5 h-5 mr-2 text-primary" /> Included Pages
              </h3>
              <div className="flex flex-wrap gap-2">
                {template.pages.map((page, i) => (
                  <Badge key={i} variant="outline" className="bg-background/50">{page}</Badge>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-4 border-t border-border/50">
               {template.responsive && <div className="flex items-center"><MonitorSmartphone className="w-4 h-4 mr-1.5"/> Responsive</div>}
               {template.is3DReady && <div className="flex items-center text-emerald-500"><Cuboid className="w-4 h-4 mr-1.5"/> 3D Ready</div>}
            </div>
            
            <div className="space-y-4 pt-4 border-t border-border/50">
              <h3 className="font-semibold text-foreground">Customize & Generate</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Configure colors, typography, and layout to generate a prompt for your website builder.
              </p>
              
              <Link href={"/template/" + template.id + "/prompt"}>
                <Button className="w-full h-12 shadow-[0_0_20px_-5px_rgba(var(--primary),0.4)] hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.6)] transition-shadow" size="lg">
                  Configure Prompt
                </Button>
              </Link>
              
              <Button variant="outline" className="w-full h-12">
                <Download className="mr-2 h-4 w-4" /> Save to Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
