"use client";

import dynamic from "next/dynamic";
import { Template } from "@/lib/data";

const ModernPreview = dynamic(
  () => import("./previews/modern/ModernPreview").then((m) => ({ default: m.ModernPreview })),
  { ssr: false }
);
const GlassmorphismPreview = dynamic(
  () => import("./previews/glass/GlassmorphismPreview").then((m) => ({ default: m.GlassmorphismPreview })),
  { ssr: false }
);
const Interactive3DPreview = dynamic(
  () => import("./previews/three/Interactive3DPreview").then((m) => ({ default: m.Interactive3DPreview })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-black/50">
        <div className="w-8 h-8 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
      </div>
    ),
  }
);

interface TemplatePreviewProps {
  template: Template;
  scale?: number;
}

export default function TemplatePreview({ template, scale = 1 }: TemplatePreviewProps) {
  const render = () => {
    switch (template.style) {
      case "Modern":
        return <ModernPreview t={template} />;
      case "Glassmorphism":
        return <GlassmorphismPreview t={template} />;
      case "3D Interactive":
        return <Interactive3DPreview t={template} />;
      default:
        return <ModernPreview t={template} />;
    }
  };

  return (
    <div
      style={{
        width: `${100 / scale}%`,
        height: `${100 / scale}%`,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        overflow: "hidden",
        pointerEvents: scale === 1 ? "auto" : "none",
      }}
      className="scrollbar-none [&_canvas]:!w-full [&_canvas]:!h-full"
    >
      {render()}
    </div>
  );
}
