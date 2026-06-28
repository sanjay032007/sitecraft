"use client"



import Navbar from "@/components/navbar"

import { Button } from "@/components/ui/button"

import { ArrowLeft, Copy, Check } from "lucide-react"

import Link from "next/link"

import { useState, use, useEffect } from "react"

import { TEMPLATES } from "@/lib/data"
import { createClient } from "@/utils/supabase/client"
import type { User } from "@supabase/supabase-js"
import { Loader2, Lock } from "lucide-react"



export default function PromptGenerator({ params }: { params: Promise<{ id: string }> }) {

  const resolvedParams = use(params);

  const template = TEMPLATES.find(t => t.id === resolvedParams.id) || TEMPLATES[0]

  

  const [copied, setCopied] = useState(false)

  const [user, setUser] = useState<User | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoadingUser(false)
    })
  }, [])

  const isLocked = template.is3DReady && !user && !loadingUser;

  const [config, setConfig] = useState({

    tone: "Professional",

    colorScheme: template.style === "Modern" ? "Minimalist" : "Vibrant",

    typography: "Modern Sans-serif",

    layout: "Grid-based",

    animations: "Subtle",

    darkMode: "Enabled",

    targetAudience: "General"

  })



  const generatedPrompt = `Generate a comprehensive, production-ready ${template.category} website based on the "${template.title}" design pattern.



Core Concept & Detailed Blueprint:

${template.aiPrompt || template.description}



Design System & Aesthetics:

- Visual Style: ${template.style}

- Color Scheme: ${config.colorScheme}

- Typography: ${config.typography} (Ensure excellent readability and modern proportions)

- Dark Mode: ${config.darkMode}

- Overall Tone: ${config.tone}



Architecture & Layout:

- Structure: ${config.layout}

- Responsiveness: Mobile-first approach, fluid scaling to desktop.

- Sections Required:

${template.sections.map(s => `  * ${s}`).join('\n')}



Interactivity & UX:

- Animations: ${config.animations} transitions between states.

- Target Audience Focus: ${config.targetAudience}



Technical Requirements:

- Framework: Next.js (App Router)

- Styling: Tailwind CSS

- Additional Tech: ${template.techStack.join(', ')}



Please provide the complete, modular code for this layout, ensuring all components are reusable and the design is highly premium.`



  const copyToClipboard = () => {

    navigator.clipboard.writeText(generatedPrompt)

    setCopied(true)

    setTimeout(() => setCopied(false), 2000)

  }



  const renderControl = (label: string, key: keyof typeof config, options: string[]) => (

    <div className="space-y-2">

      <label className="text-sm font-medium text-foreground">{label}</label>

      <div className="flex flex-wrap gap-2">

        {options.map(opt => (

          <button

            key={opt}

            onClick={() => setConfig({ ...config, [key]: opt })}

            className={`px-3 py-1.5 text-xs rounded-md border transition-all ${

              config[key] === opt 

                ? 'border-primary bg-primary/10 text-primary font-medium' 

                : 'border-border/50 text-muted-foreground hover:border-border hover:bg-muted'

            }`}

          >

            {opt}

          </button>

        ))}

      </div>

    </div>

  )



  return (

    <main className="min-h-screen pt-24 pb-12 bg-background">

      <Navbar />

      

      <div className="container mx-auto px-4 max-w-6xl">

        <Link href={`/template/${resolvedParams.id}`} className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">

          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Template

        </Link>

        

        <h1 className="text-3xl font-bold mb-2 text-foreground">Prompt Engineering Studio</h1>

        <p className="text-muted-foreground mb-8">Fine-tune 7 parameters to generate a highly detailed prompt for your AI builder.</p>

        

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          <div className="lg:col-span-5 space-y-6 bg-card p-6 rounded-xl border border-border/50">

            {renderControl("1. Tone & Vibe", "tone", ["Professional", "Playful", "Corporate", "Creative", "Aggressive/Bold"])}

            {renderControl("2. Color Scheme", "colorScheme", ["Minimalist", "Vibrant", "Pastel", "Monochrome", "Neon Dark"])}

            {renderControl("3. Typography", "typography", ["Modern Sans-serif", "Elegant Serif", "Monospace", "Display/Geometrics"])}

            {renderControl("4. Layout Structure", "layout", ["Grid-based", "Asymmetric", "Single Column", "Bento Box", "Sidebar"])}

            {renderControl("5. Animations", "animations", ["None", "Subtle", "Highly Interactive", "Scroll-triggered", "Physics-based"])}

            {renderControl("6. Dark Mode", "darkMode", ["Enabled", "Disabled", "System Preference", "Toggleable"])}

            {renderControl("7. Target Audience", "targetAudience", ["General", "Enterprise", "Developers", "Consumers", "Creatives"])}
            {renderControl("8. Output Format", "outputFormat" as any, ["Single-file HTML (Instant Preview)", "Next.js App Router"])}

          </div>

          

          <div className="lg:col-span-7 bg-muted p-6 rounded-xl border border-border/50 relative flex flex-col">

            <div className="flex justify-between items-center mb-4">

              <h3 className="font-semibold text-foreground">Generated Prompt Output</h3>

              <Button size="sm" variant="outline" onClick={copyToClipboard} className="bg-background" disabled={isLocked || (loadingUser && template.is3DReady)}>

                {copied ? <><Check className="mr-2 h-4 w-4 text-green-500" /> Copied!</> : <><Copy className="mr-2 h-4 w-4" /> Copy Prompt</>}

              </Button>

            </div>

            {isLocked ? (
              <div className="flex-1 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm p-6 rounded-md border border-border">
                <Lock className="h-12 w-12 text-primary mb-4" />
                <h4 className="text-lg font-bold mb-2 text-foreground">Premium 3D Template</h4>
                <p className="text-sm text-muted-foreground text-center mb-6 max-w-sm">
                  You need to be logged in to access the prompt for our advanced 3D interactive templates.
                </p>
                <Link href="/login">
                  <Button>Sign In to Unlock</Button>
                </Link>
              </div>
            ) : loadingUser && template.is3DReady ? (
              <div className="flex-1 flex flex-col items-center justify-center bg-background p-6 rounded-md border border-border">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <pre className="flex-1 overflow-auto whitespace-pre-wrap text-sm text-foreground/80 bg-background p-6 rounded-md border border-border font-mono leading-relaxed shadow-inner">
                  {generatedPrompt}
                </pre>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1 h-12">Launch in Antigravity</Button>
                  <Button variant="secondary" className="flex-1 h-12 border-border/50">Send to Codex</Button>
                </div>
              </>
            )}\n          </div>

        </div>

      </div>

    </main>

  )

}

