"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Monitor, Smartphone, Tablet } from "lucide-react"
import TemplatePreview from "@/components/template-preview"
import { Template } from "@/lib/data"

export default function TemplateInteractivePreview({ template }: { template: Template }) {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")

  const getWidth = () => {
    switch(device) {
      case "mobile": return "w-[375px]"
      case "tablet": return "w-[768px]"
      case "desktop": return "w-full max-w-4xl"
    }
  }

  return (
    <div className="flex-1 w-full max-w-full">
      <div className="bg-muted rounded-xl p-4 md:p-8 flex items-center justify-center border border-border/50 h-[400px] md:h-[600px] overflow-hidden">
        <div className={`relative ${getWidth()} h-full rounded-lg overflow-hidden shadow-2xl transition-all duration-300 border border-border`}>
          <TemplatePreview template={template} scale={1} />
        </div>
      </div>
      
      <div className="flex justify-center space-x-4 mt-6">
        <Button 
          variant={device === "desktop" ? "default" : "outline"} 
          size="icon" 
          onClick={() => setDevice("desktop")}
        >
          <Monitor className="h-4 w-4" />
        </Button>
        <Button 
          variant={device === "tablet" ? "default" : "outline"} 
          size="icon" 
          onClick={() => setDevice("tablet")}
        >
          <Tablet className="h-4 w-4" />
        </Button>
        <Button 
          variant={device === "mobile" ? "default" : "outline"} 
          size="icon" 
          onClick={() => setDevice("mobile")}
        >
          <Smartphone className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
