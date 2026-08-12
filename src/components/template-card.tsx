"use client";

import { useRef, useState, useEffect, startTransition, memo, useCallback } from "react"
import { Template } from "@/lib/data"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import TemplatePreview from "./template-preview"
import { Layers, FileText, Cuboid, MonitorPlay } from "lucide-react"

/**
 * Global scroll state tracker.
 * While the user is actively scrolling, no cards will mount their live previews.
 * This completely eliminates scroll jank since zero heavy work happens during scroll.
 */
let isScrolling = false
let scrollTimer: ReturnType<typeof setTimeout> | null = null
const scrollListeners = new Set<() => void>()

if (typeof window !== "undefined") {
  window.addEventListener("scroll", () => {
    isScrolling = true
    if (scrollTimer) clearTimeout(scrollTimer)
    scrollTimer = setTimeout(() => {
      isScrolling = false
      // Notify all cards that scrolling has stopped
      scrollListeners.forEach((cb) => cb())
    }, 250) // Wait 250ms after last scroll event before allowing mounts
  }, { passive: true })
}

function TemplateCard({ template }: { template: Template }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shouldRender, setShouldRender] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const mountTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const unmountTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isInViewRef = useRef(false)
  const shouldRenderRef = useRef(false)

  // Keep ref in sync
  useEffect(() => {
    shouldRenderRef.current = shouldRender
  }, [shouldRender])

  // Try to mount the live preview (only if not scrolling and still in view)
  const tryMount = useCallback(() => {
    if (shouldRenderRef.current || !isInViewRef.current || isScrolling) return
    if (mountTimerRef.current) return // already scheduled

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const delay = isMobile ? 600 : 300
    const stagger = Math.random() * 300

    mountTimerRef.current = setTimeout(() => {
      mountTimerRef.current = null
      // Re-check conditions right before mounting
      if (!isInViewRef.current || isScrolling) return
      startTransition(() => {
        setShouldRender(true)
      })
    }, delay + stagger)
  }, [])

  useEffect(() => {
    // Listen for "scroll stopped" events to retry mounting
    scrollListeners.add(tryMount)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isInViewRef.current = true
            // Cancel any pending unmount
            if (unmountTimerRef.current) {
              clearTimeout(unmountTimerRef.current)
              unmountTimerRef.current = null
            }
            // Try to mount (will be blocked if scrolling)
            tryMount()
          } else {
            isInViewRef.current = false
            // Cancel any pending mount
            if (mountTimerRef.current) {
              clearTimeout(mountTimerRef.current)
              mountTimerRef.current = null
            }
            // Unmount after delay
            if (shouldRenderRef.current && !unmountTimerRef.current) {
              unmountTimerRef.current = setTimeout(() => {
                startTransition(() => {
                  setShouldRender(false)
                })
                unmountTimerRef.current = null
              }, 1000)
            }
          }
        })
      },
      { rootMargin: "50px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
      scrollListeners.delete(tryMount)
      if (mountTimerRef.current) clearTimeout(mountTimerRef.current)
      if (unmountTimerRef.current) clearTimeout(unmountTimerRef.current)
    }
  }, [tryMount])

  return (
    <Card 
      ref={ref} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="overflow-hidden group cursor-pointer relative bg-card border-border/40 hover:border-primary/50 transition-[border-color,box-shadow] duration-300 hover:shadow-2xl flex flex-col h-full transform-gpu"
      style={{ contentVisibility: "auto", containIntrinsicSize: "0 500px" } as React.CSSProperties}
    >
      {/* Animated Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
      
      <div className="h-56 overflow-hidden relative z-10 bg-black flex items-center justify-center" style={{ contain: "strict" }}>
        
        {/* Gradient placeholder while preview not yet loaded */}
        {!shouldRender && (
          <div className="absolute inset-0 transition-opacity duration-700"
               style={{ 
                 background: `radial-gradient(circle at top left, ${template.colorScheme.primary}40, transparent 70%), linear-gradient(to bottom right, ${template.colorScheme.bg}, ${template.colorScheme.bg})`,
               }} 
          />
        )}

        {/* The Live Preview - Only mounts when scroll has stopped and card is in viewport */}
        {shouldRender && (
          <div className={`absolute w-[1280px] h-[800px] pointer-events-none transform origin-top left-1/2 top-0 -translate-x-1/2 scale-[0.30] group-hover:scale-[0.32] transition-[transform,opacity] duration-500 ease-out ${isHovered ? "opacity-100" : "opacity-90"}`}>
            <TemplatePreview template={template} scale={1} isPreview={true} />
          </div>
        )}

        {/* Backdrop for cleaner text reading */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-20 pointer-events-none" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-30 flex flex-col gap-2 items-start">
          <Badge variant="secondary" className="bg-background/80 text-xs border-primary/20 shadow-sm font-semibold">
            {template.style}
          </Badge>
        </div>

        {/* View Interactive Overlay (appears on hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 bg-black/20">
           <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
             <MonitorPlay className="w-4 h-4" /> Live Preview
           </div>
        </div>

        {/* Bottom Stats Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent z-30 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-between text-white/80">
          <div className="flex items-center text-xs font-medium">
            <Layers className="w-3 h-3 mr-1" /> {template.sectionCount}+ Sections
          </div>
          <div className="flex items-center text-xs font-medium">
            <FileText className="w-3 h-3 mr-1" /> {template.pageCount} Pages
          </div>
          {template.is3DReady && (
           <div className="flex items-center text-xs font-medium text-emerald-400">
             <Cuboid className="w-3 h-3 mr-1" /> 3D Ready
           </div>
          )}
        </div>
      </div>

      <CardHeader className="flex-1 relative z-10 pt-5">
        <div className="flex justify-between items-start mb-1">
          <CardTitle className="text-xl font-bold tracking-tight">{template.title}</CardTitle>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-secondary text-secondary-foreground">
            {template.category}
          </span>
        </div>
        <CardDescription className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
          {template.description}
        </CardDescription>
      </CardHeader>
      
      <CardFooter className="relative z-10 pb-5 pt-2">
        <Link href={`/template/${template.id}`} className="w-full">
          <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-sm" variant="outline">
            Explore Template
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default memo(TemplateCard)