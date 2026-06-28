"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { Template } from "@/lib/data";

// By defining next/dynamic inside a "use client" component, 
// we bypass the Next.js Server Component restriction and successfully
// disable SSR for the heavy WebGL component.
const TemplateInteractivePreview = dynamic(
  () => import("@/components/template-interactive-preview"),
  { 
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -z-10">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          <Loader2 className="w-12 h-12 animate-spin text-primary relative z-10" />
        </div>
        <p className="mt-6 text-sm text-muted-foreground font-bold tracking-widest uppercase animate-pulse">Initializing Engine...</p>
      </div>
    )
  }
);

export default function TemplateClientWrapper({ template }: { template: Template }) {
  return <TemplateInteractivePreview template={template} />;
}
