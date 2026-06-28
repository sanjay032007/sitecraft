"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { TEMPLATES, CATEGORIES } from "@/lib/data"
import TemplateCard from "@/components/template-card"

export default function ExplorePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedStyles, setSelectedStyles] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev => 
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    )
  }

  const filteredTemplates = TEMPLATES.filter(template => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(template.category)
    const matchesStyle = selectedStyles.length === 0 || selectedStyles.includes(template.style)
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesStyle && matchesSearch
  })

  return (
    <main className="min-h-screen pt-24 pb-12 bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-8 flex-shrink-0">
          <div>
            <input 
              type="text" 
              placeholder="Search templates..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 border border-border rounded-md bg-background text-foreground mb-6"
            />
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Categories</h3>
            <div className="flex flex-col space-y-3">
              {CATEGORIES.map(cat => (
                <label key={cat} className="flex items-center space-x-3 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                  <input 
                    type="checkbox" 
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                    className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-primary" 
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Style</h3>
            <div className="flex flex-col space-y-3">
              {['Modern', 'Glassmorphism', '3D Interactive'].map(style => (
                <label key={style} className="flex items-center space-x-3 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                  <input 
                    type="checkbox" 
                    checked={selectedStyles.includes(style)}
                    onChange={() => toggleStyle(style)}
                    className="w-4 h-4 rounded border-border bg-background text-primary focus:ring-primary" 
                  />
                  <span>{style}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">Explore Templates</h1>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-muted-foreground hidden sm:inline">Sort by:</span>
              <select className="bg-background border border-border rounded-md px-3 py-1.5 text-foreground cursor-pointer">
                <option>Most Popular</option>
                <option>Recently Added</option>
              </select>
            </div>
          </div>

          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-dashed border-border rounded-xl bg-card/50">
              <h3 className="text-xl font-semibold mb-2">No templates found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
              <button 
                onClick={() => { setSelectedCategories([]); setSelectedStyles([]); setSearchQuery(""); }}
                className="mt-4 px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
