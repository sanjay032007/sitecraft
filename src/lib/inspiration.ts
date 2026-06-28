// src/lib/inspiration.ts

export type Category =
  | "Business"
  | "Portfolio"
  | "SaaS"
  | "Agency"
  | "Ecommerce"
  | "Healthcare"
  | "Education"
  | "Restaurant"
  | "Real Estate"
  | "AI Startup";

export type Style = "Modern" | "Glassmorphism" | "3D Interactive";

export interface InspirationCard {
  id: string;
  category: Category;
  style: Style;
  title: string; // optional, for accessibility
  imageUrl: string; // static screenshot image
  previewComponent: string; // import path for the preview component
  size: "small" | "medium" | "large"; // for Masonry layout
  mockContent: Record<string, unknown>; // realistic mock data used by the preview component
}

// Helper to generate a unique ID
const uid = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

export const inspirationData: InspirationCard[] = [
  // Business – Modern
  {
    id: uid("biz-mod"),
    category: "Business",
    style: "Modern",
    title: "Business Modern",
    imageUrl: "/images/preview/business-modern.png",
    previewComponent: "@/components/previews/modern/business-modern",
    size: "large",
    mockContent: {
      clients: ["Acme Corp", "Globex", "Initech"],
      revenue: "$5.2M",
      caseStudies: ["Case Study 1", "Case Study 2"],
      team: [{ name: "Alice", role: "CEO" }, { name: "Bob", role: "CTO" }],
    },
  },
  // Business – Glassmorphism
  {
    id: uid("biz-glass"),
    category: "Business",
    style: "Glassmorphism",
    title: "Business Glass",
    imageUrl: "/images/preview/business-glass.png",
    previewComponent: "@/components/previews/glass/business-glass",
    size: "medium",
    mockContent: {
      clients: ["Acme Corp", "Globex", "Initech"],
      revenue: "$5.2M",
      caseStudies: ["Case Study 1", "Case Study 2"],
      team: [{ name: "Alice", role: "CEO" }, { name: "Bob", role: "CTO" }],
    },
  },
  // Business – 3D Interactive
  {
    id: uid("biz-3d"),
    category: "Business",
    style: "3D Interactive",
    title: "Business 3D",
    imageUrl: "/images/preview/business-3d.png",
    previewComponent: "@/components/previews/three/business-3d",
    size: "large",
    mockContent: {
      dataFlows: ["API", "Streaming", "Batch"],
    },
  },
  // Additional categories and styles should be added similarly.
];
