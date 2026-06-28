import Navbar from "@/components/navbar"
import { TEMPLATES } from "@/lib/data"
import TemplateCard from "@/components/template-card"

export default function GalleryPage() {
  return (
    <main className="min-h-screen pt-24 pb-12 bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Inspiration Gallery</h1>
          <p className="text-muted-foreground text-lg">
            Explore beautiful websites built with SiteCraft templates. Get inspired for your next project.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {TEMPLATES.map((template) => (
            <div key={template.id} className="break-inside-avoid mb-6">
              <TemplateCard template={template} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
