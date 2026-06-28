export type StyleVariant = "Modern" | "Glassmorphism" | "3D Interactive"







export interface Template {



  id: string




  aiPrompt?: string

  slug: string



  title: string



  category: string



  style: StyleVariant



  description: string



  colorScheme: {



    primary: string



    secondary: string



    accent: string



    bg: string



    text: string



  }



  sections: string[]



  techStack: string[]



  tags: string[]



  features: string[]



  pages: string[]



  complexity: "Low" | "Medium" | "High" | "Advanced"



  responsive: boolean



  seoOptimized: boolean



  animationLevel: "None" | "Subtle" | "Complex" | "Advanced"



  badges: ("Premium" | "Trending" | "New" | "VR")[]



  sectionCount: number



  pageCount: number



  is3DReady: boolean



  previewImage?: string



}







export const CATEGORIES = [



  "Business", "Portfolio", "SaaS", "Agency", "Ecommerce",



  "Healthcare", "Education", "Restaurant", "Real Estate", "AI Startup"



]







export const STYLES: StyleVariant[] = ["Modern", "Glassmorphism", "3D Interactive"]







export const TEMPLATES: Template[] = [



  // BUSINESS



  {



    id: "business-modern",



    aiPrompt: "Generate a production-ready 'Nexus Corporate' enterprise business website using Next.js (App Router) with TypeScript, Tailwind CSS, and Framer Motion animations. CORE TECHNOLOGY: Next.js App Router + TypeScript, Tailwind CSS only, Framer Motion for animations. HERO SECTION: Full-viewport hero with a bold navy blue (#1e40af) background, animated financial stats ticker scrolling live market indices, large editorial headline 'Built for Enterprise. Designed for Growth.', and dual CTA buttons. COLOR PALETTE: Primary #1e40af (navy), Accent #3b82f6 (bright blue), Background #f8fafc (off-white), Text Primary #0f172a, Text Secondary #475569. ANIMATION SPECS: Scroll-triggered section reveals (0.6s ease-out), counter animations for stats, hover card lift (0.3s cubic-bezier(0.4, 0.0, 0.2, 1)), sticky navbar glassmorphic blur. SECTIONS REQUIRED: (1) Sticky glassmorphic Navbar with logo + nav links + CTA button. (2) Hero with animated ticker and full-screen layout. (3) Global Operations client map with interactive SVG markers. (4) Financial Stats dashboard with animated growth graphs (Chart.js via CDN). (5) Services 3-column grid with icon cards. (6) Testimonial slider with autoplay. (7) Team 4-column grid with hover reveal bios. (8) Contact form with validation. (9) Footer 4-column with links. RESPONSIVE: Mobile 360px (single column), Tablet 768px (2 columns), Desktop 1024px+ (full grid). ACCESSIBILITY: WCAG 2.1 AA, keyboard navigation, aria-labels, 4.5:1 color contrast, prefers-reduced-motion support. PROVIDE: Complete production-ready self-contained HTML file using Tailwind CDN, all sections implemented, no placeholders.",



    slug: "business-modern",



    title: "Nexus Corporate",



    category: "Business",



    style: "Modern",



    description: "Clean, professional corporate website with bold typography and structured layouts for established businesses.",



    colorScheme: { primary: "#1e40af", secondary: "#dbeafe", accent: "#3b82f6", bg: "#f8fafc", text: "#0f172a" },



    sections: ["Navbar","Hero","About","Services","Team","Testimonials","Partners","Contact","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","shadcn/ui","Framer Motion"],



    tags: ["corporate","professional","B2B","enterprise"],



    features: ["Data Visualization Hero", "Global Client Map", "Financial Stats Ticker"],



    pages: ["Home", "About Us", "Services", "Careers", "Contact"],



    complexity: "High", responsive: true, seoOptimized: true, animationLevel: "Complex",



    badges: ["Premium", "Trending"], sectionCount: 15, pageCount: 8, is3DReady: false



  },



  {



    id: "business-glass",



    aiPrompt: "Generate a production-ready 'Apex Glassmorphism' corporate landing page using Next.js (App Router) with TypeScript, Tailwind CSS, and Framer Motion. CORE TECHNOLOGY: Next.js App Router + TypeScript, Tailwind CSS only, Framer Motion for glass reveal animations. HERO SECTION: Full-viewport dark hero (#0f0a1e) with animated deep purple/indigo mesh gradient background, bold white headline, glassmorphic hero card overlaid on background, and 'Book a Demo' primary CTA. COLOR PALETTE: Primary #6d28d9 (violet), Accent #a78bfa (light purple), Background #0f0a1e (near black), Glass surface rgba(255,255,255,0.08) with 1px border rgba(255,255,255,0.15), Text Primary #f8fafc. GLASS DESIGN SYSTEM: All cards use backdrop-filter blur(16px), bg-white/8, border border-white/15, shadow-xl, rounded-2xl. Hover state: border-white/30, bg-white/12. ANIMATION SPECS: Glass card entrance (0.6s ease-out staggered), glow pulse on hover (0.3s), background gradient animation (8s infinite), CTA button shimmer sweep. SECTIONS REQUIRED: (1) Glassmorphic sticky Navbar. (2) Dark hero with mesh gradient + glass card. (3) Services - 3 frosted glass cards with glow icon. (4) Interactive Solutions Selector dropdown that swaps content panels. (5) Case Studies - 2-column glass grid. (6) Pricing - 3 glass tiers with glowing active border. (7) Testimonials carousel. (8) Contact with glass form. (9) Footer. RESPONSIVE: Mobile single column, Tablet 2-col, Desktop full grid. ACCESSIBILITY: WCAG 2.1 AA, keyboard nav, reduced motion fallbacks. PROVIDE: Complete self-contained HTML with Tailwind CDN, all glass effects implemented using inline styles or style tags, fully functional.",



    slug: "business-glass",



    title: "Apex Glassmorphism",



    category: "Business",



    style: "Glassmorphism",



    description: "Sophisticated glassmorphism business template with frosted-glass cards and premium visual hierarchy.",



    colorScheme: { primary: "#7c3aed", secondary: "#ede9fe", accent: "#8b5cf6", bg: "#0f0a1e", text: "#f5f3ff" },



    sections: ["Navbar","Hero","Stats","Services","Case Studies","Testimonials","CTA","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","shadcn/ui","Framer Motion"],



    tags: ["glassmorphism","premium","dark","corporate"],



    features: ["Apple VisionOS Inspired", "Ambient Background Glows", "Frosted Layering"],



    pages: ["Home", "Solutions", "Pricing"],



    complexity: "Advanced", responsive: true, seoOptimized: true, animationLevel: "Advanced",



    badges: ["Premium", "New"], sectionCount: 12, pageCount: 5, is3DReady: false



  },



  {



    id: "business-3d",



    aiPrompt: "Generate a production-ready 'Orbit Enterprise' immersive 3D corporate website using Next.js (App Router) with TypeScript, Tailwind CSS, Three.js via CDN, and Framer Motion. CORE TECHNOLOGY: Next.js App Router + TypeScript, Tailwind CSS, Three.js r128 via CDN, React Three Fiber concept implemented in vanilla Three.js canvas. 3D HERO SECTION: Full-screen Three.js canvas. Central rotating Earth globe built from SphereGeometry with MeshPhongMaterial and city light emission texture (simulated with noise). Orbit of 8 glowing data node spheres (0.05 radius) circling the globe. Scroll-triggered camera zoom (multiplier 0.02x). Background star field (2000 procedural points). HUD glassmorphic overlay showing Lat/Lon coordinates updating in real time. COLOR PALETTE: Primary Cyan #00D9FF, Accent Purple #7C3AED, Background #0A0E27, Text Primary #F8F9FA, Text Secondary #94A3B8. ANIMATION SPECS: Globe rotation (0.002 rad/frame), scroll camera transition (0.8s ease-in-out), data node pulse (1.2s sine wave), element fade (0.6s ease-out), hover (0.3s cubic-bezier). SECTIONS REQUIRED: (1) Glassmorphic sticky Navbar. (2) 3D Hero with globe + HUD overlay + scroll CTA. (3) Enterprise Stats counter row (animated on scroll). (4) Services 4-card bento grid. (5) Case Studies horizontal scroll timeline. (6) Team 3-column grid. (7) Testimonials autoplay carousel. (8) Contact form + coordinates display. (9) Footer 4-column. RESPONSIVE: Mobile hides 3D canvas, shows static gradient hero. Tablet/Desktop full 3D. ACCESSIBILITY: WCAG 2.1 AA, prefers-reduced-motion disables 3D animation, keyboard nav. PROVIDE: Complete self-contained HTML file. Include Three.js CDN. Build globe procedurally. No external GLB or image assets. Full page functional.",



    slug: "business-3d",



    title: "Orbit Enterprise",



    category: "Business",



    style: "3D Interactive",



    description: "Immersive 3D corporate experience with interactive elements and depth-driven visual storytelling.",



    colorScheme: { primary: "#0891b2", secondary: "#cffafe", accent: "#06b6d4", bg: "#020617", text: "#e0f2fe" },



    sections: ["Navbar","3D Hero","Features","Timeline","Team","Testimonials","Contact","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","Three.js","React Three Fiber","Framer Motion"],



    tags: ["3D","interactive","immersive","enterprise"],



    features: ["Floating 3D Bar Charts", "Interactive Camera Control", "Spatial Data Vis"],



    pages: ["Single Page Experience"],



    complexity: "Advanced", responsive: true, seoOptimized: true, animationLevel: "Advanced",



    badges: ["Premium", "Trending", "New"], sectionCount: 10, pageCount: 1, is3DReady: true



  },



  // PORTFOLIO



  {



    id: "portfolio-modern",



    aiPrompt: "Generate a production-ready 'Canvas Portfolio' editorial creative portfolio using Next.js (App Router) with TypeScript, Tailwind CSS, and Framer Motion. CORE TECHNOLOGY: Next.js App Router + TypeScript, Tailwind CSS only, Framer Motion page transitions and scroll animations. HERO SECTION: Full-viewport white background (#ffffff), large asymmetric typographic headline in pure black 96px font-black 'Creative. Bold. Yours.', custom animated SVG cursor that expands on hover, subtle grain texture overlay (CSS noise), scroll-down arrow bounce. COLOR PALETTE: Background #ffffff, Text Primary #000000, Accent #f59e0b (amber), Secondary #6b7280, Cards #f9fafb. ANIMATION SPECS: Custom cursor (follows mouse, 0.1s lag), page transition (clip-path wipe 0.8s), masonry grid item entrance (stagger 0.1s), image hover scale (1.05, 0.4s). SECTIONS REQUIRED: (1) Minimal nav with name logo + 3 links. (2) Full-viewport typographic hero. (3) Asymmetric masonry project grid (6 projects, mix portrait/landscape cards). (4) Process section - 4 numbered steps with large icons. (5) About - split layout photo + bio. (6) Skills - horizontal scrolling tags. (7) Testimonials - 2 featured quotes. (8) Contact - large form centered. RESPONSIVE: Mobile: single-column stacked. Tablet: 2-col grid. Desktop: masonry 3-col. ACCESSIBILITY: WCAG 2.1 AA, focus rings on all interactive elements, alt text, reduced motion. PROVIDE: Complete self-contained HTML with Tailwind CDN, custom cursor implemented in JS, all sections built, no broken links.",



    slug: "portfolio-modern",



    title: "Canvas Portfolio",



    category: "Portfolio",



    style: "Modern",



    description: "Minimalist creative portfolio with editorial typography and a bold grid-based project showcase.",



    colorScheme: { primary: "#18181b", secondary: "#f4f4f5", accent: "#71717a", bg: "#ffffff", text: "#09090b" },



    sections: ["Navbar","Hero","Work","About","Process","Skills","Contact","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","Framer Motion"],



    tags: ["portfolio","creative","minimal","designer"],



    features: ["Masonry Grid", "Custom Cursor", "Page Transitions"],



    pages: ["Home", "Work Detail", "About"],



    complexity: "Medium", responsive: true, seoOptimized: true, animationLevel: "Complex",



    badges: ["Trending"], sectionCount: 8, pageCount: 3, is3DReady: false



  },



  {



    id: "portfolio-glass",



    aiPrompt: "Generate a production-ready 'Prism Creative' glassmorphism creative portfolio using Next.js (App Router) with TypeScript, Tailwind CSS, and Framer Motion. CORE TECHNOLOGY: Next.js App Router + TypeScript, Tailwind CSS, Framer Motion for glass reveals. HERO SECTION: Full-viewport with animated neon-pink (#ec4899) and violet (#7c3aed) CSS mesh gradient background (animated 6s loop). Center: large glassmorphic hero card (backdrop-blur-xl, bg-white/10, border-white/20) containing name, title typewriter animation, social links with neon hover glows. COLOR PALETTE: Background gradient from #1a0533 to #0a0a2e, Glass rgba(255,255,255,0.10), Neon Pink #ec4899, Neon Purple #7c3aed, Text #f8fafc. GLASS DESIGN: All project cards are frosted glass sheets with border-white/20 and hover: border-pink-400/50, box-shadow 0 0 20px rgba(236,72,153,0.3). ANIMATION SPECS: Background gradient (6s infinite), card entrance stagger (0.15s), neon drop-shadow pulse on hover, typewriter text (3s), social icon glow (0.3s). SECTIONS REQUIRED: (1) Glass navbar. (2) Hero with gradient bg + glass card + typewriter. (3) Projects - 6 glass cards in responsive grid. (4) Skills - glowing pill tags. (5) Experience timeline - vertical glass cards. (6) Testimonials - glass carousel. (7) Contact - glass form with gradient submit button. (8) Footer with social links. RESPONSIVE: Mobile single column, Tablet 2-col, Desktop 3-col. PROVIDE: Complete self-contained HTML with Tailwind CDN. All glass effects working.",



    slug: "portfolio-glass",



    title: "Prism Creative",



    category: "Portfolio",



    style: "Glassmorphism",



    description: "Vivid glassmorphism portfolio with gradient mesh backgrounds and translucent project cards.",



    colorScheme: { primary: "#ec4899", secondary: "#fce7f3", accent: "#f472b6", bg: "#0d0218", text: "#fdf4ff" },



    sections: ["Navbar","Hero","Projects","Skills","About","Awards","Contact","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","Framer Motion"],



    tags: ["portfolio","glassmorphism","vibrant","creative"],



    features: ["Mesh Gradients", "Glass Cards", "Dark Mode Default"],



    pages: ["Home", "Linktree"],



    complexity: "High", responsive: true, seoOptimized: true, animationLevel: "Complex",



    badges: ["Premium"], sectionCount: 10, pageCount: 2, is3DReady: false



  },



  {



    id: "portfolio-3d",



    aiPrompt: "Generate a production-ready 'Dimension Portfolio' 3D interactive creative portfolio using Next.js (App Router) with TypeScript, Tailwind CSS, Three.js via CDN, and Framer Motion. CORE TECHNOLOGY: Next.js + TypeScript, Tailwind CSS, Three.js r128 via CDN for the interactive 3D Torus Knot hero. 3D HERO SECTION: Full-screen Three.js canvas. Central object: TorusKnotGeometry(1.5, 0.4, 200, 32) with glowing MeshPhongMaterial (#a855f7, wireframe: false) + a second wireframe layer (MeshBasicMaterial #6d28d9, wireframe: true, opacity 0.3). Mouse-move event rotates the torus knot with spring-physics momentum (lerp 0.05). Background: 3000 star points in random sphere distribution. Scroll zooms camera from z=6 to z=3. Floating glass project label cards appear in 3D space using HTML overlay positioned via Three.js project() method. COLOR PALETTE: Background #0a0a1a, Primary Purple #a855f7, Accent Cyan #22d3ee, Text #f8fafc, Glass rgba(168,85,247,0.1). ANIMATION SPECS: Torus rotation (0.005 rad/frame base + mouse delta), scroll camera lerp (0.8s), star twinkle (random opacity 0.5s), hover project card glow (0.3s). SECTIONS REQUIRED: (1) Minimal dark navbar with logo. (2) 3D hero - full canvas + floating project previews. (3) Work - 4 large project cards with hover 3D tilt effect (CSS perspective). (4) About - split text + animated skill bars. (5) Services - 3 icon cards. (6) Process - numbered horizontal timeline. (7) Contact - minimal dark form. RESPONSIVE: Mobile shows static gradient bg. Tablet/Desktop full 3D. PROVIDE: Complete self-contained HTML with Three.js CDN. Torus built procedurally. No GLB files.",



    slug: "portfolio-3d",



    title: "Dimension Portfolio",



    category: "Portfolio",



    style: "3D Interactive",



    description: "3D interactive portfolio with rotating project showcases and depth-layered scroll animations.",



    colorScheme: { primary: "#f97316", secondary: "#fff7ed", accent: "#fb923c", bg: "#09090b", text: "#fef3c7" },



    sections: ["Navbar","3D Hero","Projects","About","Skills","Contact","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","Three.js","React Three Fiber","GSAP"],



    tags: ["portfolio","3D","interactive","creative"],



    features: ["Rotating 3D Torus Knot", "Scroll Controls", "Particle Effects"],



    pages: ["Single Page Experience"],



    complexity: "Advanced", responsive: true, seoOptimized: true, animationLevel: "Advanced",



    badges: ["Premium", "Trending"], sectionCount: 12, pageCount: 1, is3DReady: true



  },



  // SAAS



  {



    id: "saas-modern",



    aiPrompt: "Generate a production-ready 'Launch SaaS' high-converting SaaS product landing page using Next.js (App Router) with TypeScript, Tailwind CSS, and Framer Motion. CORE TECHNOLOGY: Next.js App Router + TypeScript, Tailwind CSS only, Framer Motion for scroll-triggered reveals. HERO SECTION: Full-viewport blue gradient (#1d4ed8 to #7c3aed diagonal), centered white headline 'The Platform That Scales With You', subtitle text, email capture form + 'Start Free Trial' button with gradient, floating mock dashboard screenshot (CSS transform perspective tilt), background animated floating orbs (CSS radial-gradient). COLOR PALETTE: Primary Blue #1d4ed8, Accent Purple #7c3aed, CTA Gradient #2563eb to #7c3aed, Background #f0f4ff, Cards #ffffff, Text #0f172a, Secondary #475569. ANIMATION SPECS: Hero screenshot parallax (0.3x scroll rate), feature card entrance stagger (0.2s), pricing toggle (0.4s), testimonial carousel (4s autoplay), counter animation on scroll (2s). SECTIONS REQUIRED: (1) Navbar with logo + nav links + Login + Sign Up CTA. (2) Hero with dashboard mockup. (3) Logo bar - 8 company logos (SVG placeholders). (4) Features 3-column icon cards. (5) Product Demo - tabbed interface showing 3 dashboard views. (6) Pricing - Monthly/Annual toggle with 3 tiers (highlighted). (7) Testimonials carousel (5 cards). (8) FAQ accordion (8 questions). (9) Footer CTA banner. (10) Footer 4-col. RESPONSIVE: Mobile single col, Tablet 2-col, Desktop full grid. ACCESSIBILITY: WCAG 2.1 AA, focus management for modals/tabs, aria-expanded on accordions. PROVIDE: Complete self-contained HTML with Tailwind CDN, all sections functional, pricing toggle working in JS.",



    slug: "saas-modern",



    title: "Launch SaaS",



    category: "SaaS",



    style: "Modern",



    description: "High-converting SaaS landing page with feature breakdowns, social proof, and optimized pricing tables.",



    colorScheme: { primary: "#4f46e5", secondary: "#eef2ff", accent: "#6366f1", bg: "#fafafa", text: "#111827" },



    sections: ["Navbar","Hero","Logos","Features","How It Works","Pricing","Testimonials","FAQ","CTA","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","shadcn/ui","Framer Motion"],



    tags: ["saas","startup","conversion","pricing"],



    features: ["Interactive Dashboard Preview", "Toggle Pricing", "Testimonial Carousel"],



    pages: ["Home", "Features", "Pricing", "Login", "Register"],



    complexity: "High", responsive: true, seoOptimized: true, animationLevel: "Complex",



    badges: ["Premium", "Trending"], sectionCount: 20, pageCount: 10, is3DReady: false



  },



  {



    id: "saas-glass",



    aiPrompt: "Generate a production-ready 'Nebula SaaS' dark glassmorphism SaaS landing page using Next.js (App Router) with TypeScript, Tailwind CSS, and Framer Motion. CORE TECHNOLOGY: Next.js App Router + TypeScript, Tailwind CSS, Framer Motion for glass reveals. HERO SECTION: Full-viewport dark navy/purple gradient (#020817 to #0f0a2e). Floating blurred neon orbs (CSS blur 80px, purple/blue). Center: glassmorphic hero panel (backdrop-blur-2xl, bg-white/5, border border-white/10, rounded-3xl) with headline, subtitle, email input (glass styled), CTA button (gradient purple-to-blue with glow). Background: subtle dot grid CSS pattern. COLOR PALETTE: Background #020817, Orb1 #7c3aed, Orb2 #1d4ed8, Glass bg-white/5, Border border-white/10, Text #f8fafc, Accent #a78bfa, CTA gradient #7c3aed to #2563eb. GLASS SYSTEM: Every section uses frosted glass cards. Hover: border-purple-400/30, shadow 0 0 30px rgba(124,58,237,0.2). Active/selected state: border glow + inner bg-purple-500/10. SECTIONS REQUIRED: (1) Glass navbar. (2) Hero with floating orbs + glass panel. (3) Features - 6 glass feature cards with neon icon. (4) Dashboard preview - glass container with mock chart (SVG). (5) Pricing - 3 glass tiers, middle has purple glow border. (6) Testimonials - glass quotes. (7) FAQ glass accordion. (8) CTA glass banner. (9) Footer. PROVIDE: Complete self-contained HTML with Tailwind CDN, CSS custom properties for glass values, all sections with glass effects.",



    slug: "saas-glass",



    title: "Nebula SaaS",



    category: "SaaS",



    style: "Glassmorphism",



    description: "Dark glassmorphism SaaS template with animated gradients, glass cards and a stunning pricing section.",



    colorScheme: { primary: "#8b5cf6", secondary: "#4c1d95", accent: "#a78bfa", bg: "#030712", text: "#f5f3ff" },



    sections: ["Navbar","Hero","Features","Dashboard Preview","Pricing","Testimonials","FAQ","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","shadcn/ui","Framer Motion"],



    tags: ["saas","glassmorphism","dark","premium"],



    features: ["Neon Borders", "Glassmorphism Nav", "Advanced Hover States"],



    pages: ["Landing", "Auth"],



    complexity: "Advanced", responsive: true, seoOptimized: true, animationLevel: "Complex",



    badges: ["Premium", "New"], sectionCount: 15, pageCount: 4, is3DReady: false



  },



  {



    id: "saas-3d",



    aiPrompt: "Generate a production-ready 'Sphere SaaS' 3D-powered SaaS landing page using Next.js (App Router) with TypeScript, Tailwind CSS, Three.js via CDN, and Framer Motion. CORE TECHNOLOGY: Next.js + TypeScript, Tailwind CSS, Three.js r128 via CDN for isometric 3D dashboard model. 3D HERO SECTION: Full-screen Three.js canvas. Build an isometric 3D dashboard UI using Three.js primitives: floating rectangular panels (BoxGeometry, MeshPhongMaterial #1e40af), rounded progress sphere (SphereGeometry, emissive cyan), cylinder pipes connecting panels, floating data orbs. Use OrthographicCamera for isometric projection. Users can drag (OrbitControls concept) to spin/tilt the dashboard. Soft blue/cyan ambient lighting, point lights for depth. HUD overlay: glassmorphic feature list panel on left. COLOR PALETTE: Background #0a1628, Primary Blue #1e40af, Accent Cyan #06b6d4, Panels #162032, Text #f8fafc, Glass rgba(14,165,233,0.1). ANIMATION SPECS: Dashboard auto-rotate (0.003 rad/frame), data orb float (1.5s sine), scroll zoom (0.8s), feature card entrance (0.5s stagger). SECTIONS REQUIRED: (1) Dark navbar. (2) 3D hero with isometric dashboard + feature HUD. (3) Features 4-card grid. (4) How It Works - 3 steps with icons. (5) Pricing 3-tier. (6) Testimonials. (7) CTA. (8) Footer. PROVIDE: Complete self-contained HTML. Three.js CDN. All primitives built procedurally. No GLB files required.",



    slug: "saas-3d",



    title: "Sphere SaaS",



    category: "SaaS",



    style: "3D Interactive",



    description: "3D-powered SaaS page with interactive product demos, floating UI elements and scroll-triggered animations.",



    colorScheme: { primary: "#10b981", secondary: "#d1fae5", accent: "#34d399", bg: "#020617", text: "#ecfdf5" },



    sections: ["Navbar","3D Hero","Features","Interactive Demo","Pricing","Testimonials","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","Three.js","React Three Fiber","Framer Motion"],



    tags: ["saas","3D","interactive","modern"],



    features: ["Isometric Dashboard", "Environment Maps", "Depth Shadows"],



    pages: ["Home"],



    complexity: "Advanced", responsive: true, seoOptimized: true, animationLevel: "Advanced",



    badges: ["Premium", "Trending", "New"], sectionCount: 12, pageCount: 1, is3DReady: true



  },



  // AGENCY



  {



    id: "agency-modern",



    aiPrompt: "Generate a production-ready 'Studio Modern' bold digital agency landing page using Next.js (App Router) with TypeScript, Tailwind CSS, and Framer Motion. CORE TECHNOLOGY: Next.js App Router + TypeScript, Tailwind CSS, Framer Motion for scroll-driven animations. HERO SECTION: Full-viewport black background (#0a0a0a). Full-bleed video background (CSS background loop with gradient fallback). Bold stark editorial typography: huge 112px font-black headline 'We Build. We Launch. We Scale.' in white, red accent (#ef4444) underline on key word. Magnetic CTA button with hover distortion effect. Agency reel stats row: 200+ Projects, 50M+ Reach, 8 Years. COLOR PALETTE: Background #0a0a0a, Text White #ffffff, Accent Red #ef4444, Secondary #1f2937, Cards #111111. ANIMATION SPECS: Headline word-by-word reveal (0.8s stagger), case study card hover 3D tilt (CSS perspective 1000px), service grid slide-in (0.6s), team card image scale (1.08), scroll-scrubbed marquee. SECTIONS REQUIRED: (1) Minimal black navbar + red CTA. (2) Full-screen video-style hero with stats. (3) Case Studies - editorial 2-column spotlight grid (4 projects). (4) Services - asymmetric block grid (6 services). (5) Marquee ticker of brand names. (6) Team - 4 dark hover cards. (7) Process - numbered dark steps. (8) Project inquiry form. (9) Footer. PROVIDE: Complete self-contained HTML with Tailwind CDN. Marquee implemented in JS. Hover 3D tilt on project cards.",



    slug: "agency-modern",



    title: "Studio Modern",



    category: "Agency",



    style: "Modern",



    description: "Bold digital agency template with editorial layouts, case study spotlights, and a dynamic services grid.",



    colorScheme: { primary: "#dc2626", secondary: "#fee2e2", accent: "#ef4444", bg: "#ffffff", text: "#111827" },



    sections: ["Navbar","Hero","Services","Work","Process","Team","Testimonials","Contact","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","Framer Motion"],



    tags: ["agency","creative","bold","editorial"],



    features: ["Video Hero", "Case Study Grid", "Team Carousel"],



    pages: ["Home", "Case Study", "Services"],



    complexity: "Medium", responsive: true, seoOptimized: true, animationLevel: "Complex",



    badges: ["Trending"], sectionCount: 10, pageCount: 5, is3DReady: false



  },



  {



    id: "agency-glass",



    aiPrompt: "Generate a production-ready 'Fluid Agency' glassmorphism creative agency landing page using Next.js (App Router) with TypeScript, Tailwind CSS, and Framer Motion. CORE TECHNOLOGY: Next.js App Router + TypeScript, Tailwind CSS, Framer Motion for blob animations. HERO SECTION: Full-viewport with 3 large animated organic blob shapes (CSS border-radius animation, colors: #7c3aed, #2563eb, #ec4899, blur 80px, opacity 0.5, 6s infinite alternate). Glass navbar blurs blobs as they pass underneath (backdrop-blur-xl). Center: transparent content with headline, subtitle, glass CTA buttons. COLOR PALETTE: Background #0d0d1a, Blob Purple #7c3aed, Blob Blue #2563eb, Blob Pink #ec4899, Glass bg-white/8, Border border-white/15, Text #f8fafc. BLOB ANIMATION: CSS @keyframes morph using border-radius and transform, 3 blobs at different speeds (6s, 8s, 10s). Each blob uses position: absolute, z-index: -1. SECTIONS REQUIRED: (1) Glass navbar (backdrop-blur-xl, border-b border-white/10). (2) Hero with animated blobs + glass content. (3) Services - 6 semi-transparent glass project cards with white border + image bg. (4) Work - 3 full-width case study banners. (5) Process - 4 glass steps with numbered badges. (6) Team - 4 glass cards with blob hover effect. (7) Testimonials glass carousel. (8) Contact glass form. (9) Footer. PROVIDE: Complete self-contained HTML. Blob CSS animations included in style tag. All glass effects working.",



    slug: "agency-glass",



    title: "Fluid Agency",



    category: "Agency",



    style: "Glassmorphism",



    description: "Flowing glassmorphism agency site with frosted project cards and an immersive full-screen hero.",



    colorScheme: { primary: "#0ea5e9", secondary: "#e0f2fe", accent: "#38bdf8", bg: "#0c1445", text: "#e0f2fe" },



    sections: ["Navbar","Hero","Services","Portfolio","Process","Team","Contact","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","Framer Motion"],



    tags: ["agency","glassmorphism","fluid","creative"],



    features: ["Blob Animations", "Glass Navbar", "Fluid Layouts"],



    pages: ["Home", "Contact"],



    complexity: "High", responsive: true, seoOptimized: true, animationLevel: "Complex",



    badges: ["Premium"], sectionCount: 8, pageCount: 2, is3DReady: false



  },



  {



    id: "agency-3d",



    aiPrompt: "Generate a production-ready 'Parallax Agency' 3D parallax agency website using Next.js (App Router) with TypeScript, Tailwind CSS, Three.js via CDN, and Framer Motion. CORE TECHNOLOGY: Next.js + TypeScript, Tailwind CSS, Three.js r128 via CDN for 3D text layers. 3D HERO SECTION: Three.js canvas with depth layers. Background layer: slow-moving particle field (z=-10). Midground: 3D extruded text 'AGENCY' built from BoxGeometry blocks forming letters (or use CSS 3D transforms for the text if TextGeometry unavailable). Foreground: floating 3D geometric shapes (octahedrons, torus). All layers move at different parallax speeds (0.5x, 1x, 1.5x) based on mouse position. Mouse-move drives tilt of entire scene. COLOR PALETTE: Background #050510, Text #ffffff, Accent Cyan #00ffff, Purple #7c3aed, Cards with CSS 3D hover (perspective 800px rotateY 10deg). ANIMATION SPECS: Parallax depth (mousemove, 0.05x multiplier per layer), 3D card hover (rotateX/Y 0.3s), scroll-triggered section reveals (0.7s), particle drift (random velocity). SECTIONS REQUIRED: (1) Dark navbar. (2) 3D parallax hero. (3) Case studies - 4 cards with CSS 3D flip on hover (shows glowing wireframe back). (4) Services 3-col. (5) Stats row. (6) Team. (7) Contact. (8) Footer. PROVIDE: Complete self-contained HTML. Three.js CDN. Parallax effect on mouse events. 3D card flip CSS included.",



    slug: "agency-3d",



    title: "Parallax Agency",



    category: "Agency",



    style: "3D Interactive",



    description: "Stunning 3D parallax agency site with depth scrolling, 3D text effects, and interactive case studies.",



    colorScheme: { primary: "#f59e0b", secondary: "#fef3c7", accent: "#fbbf24", bg: "#09090b", text: "#fffbeb" },



    sections: ["Navbar","3D Hero","Services","Work","Awards","Team","Contact","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","Three.js","GSAP","Framer Motion"],



    tags: ["agency","3D","parallax","award-winning"],



    features: ["Scroll Parallax", "3D Text", "Mouse Follower"],



    pages: ["Single Page"],



    complexity: "Advanced", responsive: true, seoOptimized: true, animationLevel: "Advanced",



    badges: ["Premium"], sectionCount: 15, pageCount: 1, is3DReady: true



  },



  {



    id: "agency-space-3d",



    aiPrompt: "Generate a production-ready 'AstroVoyage 3D' space tourism agency website using Next.js (App Router) with TypeScript, Tailwind CSS, Three.js via CDN, and Framer Motion. CORE TECHNOLOGY: Next.js + TypeScript, Tailwind CSS, Three.js r128 via CDN for the space scene. 3D HERO SECTION: Dark space canvas (#03000a). Build a 3D spacecraft procedurally: CylinderGeometry fuselage, ConeGeometry nose, BoxGeometry wings (left and right), small cone tail fin, PointLight emissive thruster flame (orange/cyan glow). The spacecraft orbits a SphereGeometry exoplanet. Planet selector UI: 3 buttons change planet material - Kepler-186f (MeshPhongMaterial #22c55e, green glow), Chronos-9 (amber #f59e0b with ring TorusGeometry), Frost-X (icy blue #93c5fd). Star background: 3000 procedural points. COLOR PALETTE: Background #03000a, Spacecraft #334155, Thruster Cyan #00ffff, Text #f8fafc, Panel Glass rgba(255,255,255,0.08). HUD CONTROLS: Left panel - Planet selector buttons. Center - Warp Factor slider (0.5x-3x), Orbit Angle slider, Warp Drive toggle, Sensor Sweep toggle. Right panel - Real-time telemetry: Ship Velocity, Deflector Shield %, Warp Core Temp, Slipstream Flow. ANIMATION SPECS: Spacecraft orbit (elliptical, 0.01 rad/frame), warp drive (5x speed + particle trails), sensor laser ring sweep (rotating plane), thruster glow pulse. SECTIONS REQUIRED: (1) Dark minimal navbar. (2) Full-screen 3D space hero + HUD panels. (3) Destinations - 3 planet cards. (4) Packages - 3 pricing tiers. (5) Timeline - launch preparation steps. (6) FAQ. (7) Booking form. (8) Footer. PROVIDE: Complete self-contained HTML. Three.js CDN. Spacecraft built procedurally. Planet switching works. HUD interactive.",



    slug: "agency-space-3d",



    title: "AstroVoyage 3D",



    category: "Agency",



    style: "3D Interactive",



    description: "Futuristic 3D space exploration and tourism platform with real-time warp speed controllers, deflector shield stats, and interactive orbital destination selector.",



    colorScheme: { primary: "#3b82f6", secondary: "#facc15", accent: "#10b981", bg: "#03000a", text: "#ffffff" },



    sections: ["Navbar", "System Selector", "Spacecraft HUD Controller", "System Telemetry", "Footer"],



    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Three.js", "React Three Fiber", "Framer Motion"],



    tags: ["space", "3D", "interactive", "agency", "futuristic"],



    features: ["Interactive 3D Spacecraft", "Orbital Navigation HUD", "Planetary Tour Configurator"],



    pages: ["Home", "Galactic Map"],



    complexity: "Advanced", responsive: true, seoOptimized: true, animationLevel: "Advanced",



    badges: ["Premium", "New"], sectionCount: 5, pageCount: 2, is3DReady: true



  },



  // ECOMMERCE



  {



    id: "ecommerce-modern",



    aiPrompt: "Generate a production-ready 'Shopify Minimal' modern ecommerce storefront using Next.js (App Router) with TypeScript, Tailwind CSS, and Framer Motion. CORE TECHNOLOGY: Next.js App Router + TypeScript, Tailwind CSS, Framer Motion for cart/filter animations. HERO SECTION: Full-viewport clean white (#ffffff) hero split layout. Left: Large serif headline 'New Collection. Timeless Style.', subtitle, Shop Now button (black, hover white). Right: Large product hero image (or colored placeholder rectangle with product silhouette CSS). Background: subtle texture or light cream (#fafaf9). COLOR PALETTE: Background #ffffff, Accent Black #0a0a0a, Secondary Warm #f5f5f0, Price Green #16a34a, Sale Red #dc2626, Text #111827, Secondary #6b7280. ANIMATION SPECS: Cart drawer slide-in from right (0.4s ease-out), product card hover scale 1.03 + shadow (0.3s), filter tag active state (0.2s), badge bounce on add-to-cart, image gallery fade (0.5s). SECTIONS REQUIRED: (1) Navbar with logo + search + wishlist + cart icon (badge count). (2) Hero split. (3) Category links row (6 icons). (4) Product grid with filter bar (Category dropdown, Size, Price). (5) Featured product spotlight. (6) Product quick-view modal. (7) Cart sidebar drawer (items list, subtotal, checkout CTA). (8) Testimonials. (9) Newsletter signup. (10) Footer. RESPONSIVE: Mobile: stacked, hamburger nav, touch-swipe product images. Tablet: 2-col grid. Desktop: 4-col grid. PROVIDE: Complete self-contained HTML. Cart state managed in localStorage JS. Filter works. Drawer slide-in animated.",



    slug: "ecommerce-modern",



    title: "Shopify Minimal",



    category: "Ecommerce",



    style: "Modern",



    description: "Clean, conversion-optimized ecommerce storefront with product grids, filters, and a streamlined checkout.",



    colorScheme: { primary: "#059669", secondary: "#d1fae5", accent: "#10b981", bg: "#f9fafb", text: "#111827" },



    sections: ["Navbar","Hero Banner","Categories","Featured Products","Promotions","Testimonials","Newsletter","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","shadcn/ui","Framer Motion"],



    tags: ["ecommerce","shop","minimal","conversion"],



    features: ["Cart Drawer", "Product Filtering", "Image Gallery"],



    pages: ["Home", "Category", "Product Detail", "Cart", "Checkout"],



    complexity: "Advanced", responsive: true, seoOptimized: true, animationLevel: "Subtle",



    badges: ["Premium", "Trending"], sectionCount: 22, pageCount: 15, is3DReady: false



  },



  {



    id: "ecommerce-glass",



    aiPrompt: "Generate a production-ready 'Luxe Store' dark glassmorphism luxury ecommerce store using Next.js (App Router) with TypeScript, Tailwind CSS, and Framer Motion. CORE TECHNOLOGY: Next.js App Router + TypeScript, Tailwind CSS, Framer Motion for premium glass reveals. HERO SECTION: Full-viewport pure dark slate (#0a0a0a) background with subtle animated gold particle ambient effect. Hero glass card (backdrop-blur-2xl, bg-white/5, border-white/10) positioned left with headline 'Luxury Redefined', subtext, 'Explore Collection' CTA with gold border. Right: Large product image on dark background with gold drop shadow. COLOR PALETTE: Background #0a0a0a, Glass bg-white/5, Border border-white/10, Gold Accent #d4af37, Text #f8fafc, Secondary #94a3b8. LUXURY GLASS: Product cards are dark glass (bg-zinc-900/80, border border-zinc-700/50). Hover: gold border glow (box-shadow 0 0 20px rgba(212,175,55,0.4)), scale 1.02. Cart drawer uses heavy blur backdrop. SECTIONS REQUIRED: (1) Dark glass navbar with gold logo. (2) Hero + product image. (3) Collections - 4 dark glass category cards. (4) Featured Products - grid with gold hover glow. (5) Product detail panel - glass modal with image gallery, size select, add-to-cart. (6) Cart drawer - blurs background when open. (7) Brand story - split layout. (8) Testimonials - glass cards. (9) Footer dark. PROVIDE: Complete self-contained HTML. All glass and gold effects implemented. Cart drawer with blur overlay.",



    slug: "ecommerce-glass",



    title: "Luxe Store",



    category: "Ecommerce",



    style: "Glassmorphism",



    description: "Luxury glassmorphism ecommerce with premium product showcases and an ultra-modern cart experience.",



    colorScheme: { primary: "#d97706", secondary: "#fef3c7", accent: "#f59e0b", bg: "#0c0c0c", text: "#fef9ee" },



    sections: ["Navbar","Hero","New Arrivals","Collections","Product Spotlight","Reviews","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","Framer Motion"],



    tags: ["ecommerce","luxury","glassmorphism","premium"],



    features: ["Blur Behind Cart", "Premium Hover Effects", "Dark Mode UI"],



    pages: ["Home", "Product Detail"],



    complexity: "High", responsive: true, seoOptimized: true, animationLevel: "Complex",



    badges: ["Premium", "New"], sectionCount: 12, pageCount: 3, is3DReady: false



  },



  {



    id: "ecommerce-3d",



    aiPrompt: "Generate a production-ready 'Spatial Commerce' 3D product viewer ecommerce landing page using Next.js (App Router) with TypeScript, Tailwind CSS, Three.js via CDN, and Framer Motion. CORE TECHNOLOGY: Next.js + TypeScript, Tailwind CSS, Three.js r128 via CDN for the 3D product viewer. 3D PRODUCT VIEWER: Full-screen Three.js canvas. Build a product (sneaker/watch) using Three.js primitives: main body as ellipsoid (SphereGeometry scaled), sole as flat BoxGeometry, details as small cylinders. Material: MeshStandardMaterial with environment map simulation (ambient + directional lights). Mouse drag: rotate product (Quaternion rotation). Scroll zoom. Color configurator: 5 color swatches update material.color in real time. AR View button (placeholder with icon). COLOR PALETTE: Background #111827, Text #f9fafb, Accent #f59e0b, Product base #1e293b, Highlight Cyan #06b6d4. ANIMATION SPECS: Product auto-rotate (0.005 rad/frame, pauses on hover), color swap (0.3s material lerp), zoom scroll (0.8s), section reveal (0.6s). SECTIONS REQUIRED: (1) Dark navbar with cart. (2) 3D product hero + configurator sidebar (color, size, quantity, Add to Cart). (3) Features - 4 product feature cards. (4) Related products - 4 cards. (5) Reviews. (6) Newsletter. (7) Footer. PROVIDE: Complete self-contained HTML. Three.js CDN. Product built from primitives. Color configurator works in JS. No GLB files.",



    slug: "ecommerce-3d",



    title: "Spatial Commerce",



    category: "Ecommerce",



    style: "3D Interactive",



    description: "3D product viewer ecommerce with interactive model rotation, spatial UI, and immersive shopping.",



    colorScheme: { primary: "#7c3aed", secondary: "#ede9fe", accent: "#8b5cf6", bg: "#030712", text: "#f5f3ff" },



    sections: ["Navbar","3D Hero","3D Product Viewer","Collections","Features","Reviews","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","Three.js","React Three Fiber","Framer Motion"],



    tags: ["ecommerce","3D","interactive","innovative"],



    features: ["3D Product Model", "Configurator", "AR Ready"],



    pages: ["Home", "3D Product Viewer"],



    complexity: "Advanced", responsive: true, seoOptimized: true, animationLevel: "Advanced",



    badges: ["Premium", "Trending", "New"], sectionCount: 10, pageCount: 2, is3DReady: true



  },



  {



    id: "ecommerce-vr-headset-3d",



    aiPrompt: "Generate a production-ready 'VR Headset Commerce 3D' futuristic ecommerce product page using Next.js (App Router) with TypeScript, Tailwind CSS, Three.js via CDN, and Framer Motion. CORE TECHNOLOGY: Next.js + TypeScript, Tailwind CSS, Three.js r128 via CDN. 3D HERO SPLIT SCREEN: Left half: glassmorphic product detail card (bg-black/60, backdrop-blur-xl, border border-cyan-500/30, rounded-3xl). Contains: Product title 'NEXVR Pro', Rating stars, Price $799, Color selector buttons (Obsidian/Arctic/Crimson), Pre-Order CTA button (gradient cyan-to-purple with glow). Right half: Three.js canvas rendering VR headset built from primitives: main visor body (BoxGeometry with rounded edges simulated by multiple boxes), forehead band (thin BoxGeometry), side arms (thin boxes), glowing status LED (small SphereGeometry with emissive cyan), and 2 VR controllers (cylinder handle + sphere trigger). MeshStandardMaterial on visor with metalness 0.8, roughness 0.2 for premium reflection. Environment: neon rim light (cyan PointLight) + fill light (purple). User drags to rotate. COLOR PALETTE: Background #03080f, Visor #1a1a2e, Cyan #00e5ff, Purple #7c3aed, Text #f8fafc, Glass bg-white/5. ANIMATION SPECS: Headset auto-rotate (0.008 rad/frame), LED glow pulse (1s sine), color swap material (0.3s), card entrance (0.6s slide-in), button shimmer. SECTIONS REQUIRED: (1) Minimal dark nav. (2) 3D split hero. (3) Features - 4 cards. (4) Tech Specs table. (5) Comparison table vs competitor. (6) Reviews. (7) Footer. PROVIDE: Complete self-contained HTML. Three.js CDN. VR headset built from primitives. Color change works. Interactive rotation.",



    slug: "ecommerce-vr-headset-3d",



    title: "VR Headset Commerce 3D",



    description: "Premium 3D VR Headset ecommerce page with a sleek Glassmorphism product checkout UI.",



    category: "Ecommerce",



    previewImage: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80",



    style: "3D Interactive",



    colorScheme: { primary: "#facc15", secondary: "#dc2626", accent: "#ffffff", bg: "#2a2626", text: "#ffffff" },



    sections: ["Navbar", "Glassmorphism UI", "3D VR Headset Viewer"],



    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Three.js", "React Three Fiber", "Framer Motion"],



    tags: ["ecommerce", "3D", "vr", "glassmorphism", "premium"],



    features: ["Interactive 3D VR Controllers", "Frosted Glass Checkout Card", "Dynamic Lighting Effects"],



    pages: ["Home"],



    complexity: "Advanced", responsive: true, seoOptimized: true, animationLevel: "Advanced",



    badges: ["Premium", "Trending", "VR"], sectionCount: 1, pageCount: 1, is3DReady: true



  },



  // HEALTHCARE



  {



    id: "healthcare-modern",



    aiPrompt: "Generate a production-ready 'MediCare Pro' professional healthcare website using Next.js (App Router) with TypeScript, Tailwind CSS, and Framer Motion. CORE TECHNOLOGY: Next.js App Router + TypeScript, Tailwind CSS only, Framer Motion for accessible reveal animations. HERO SECTION: Full-viewport clean accessible layout. Pale blue (#eff6ff) background. Hero split: Left text column with headline 'Compassionate Care, Advanced Medicine', subtitle, two CTA buttons (Book Appointment primary teal, Learn More outline). Right: illustration-style hero image placeholder (CSS shapes forming abstract medical cross in teal/blue). Floating achievement badge (15000+ Patients). COLOR PALETTE: Background #f0f9ff, Primary Teal #0d9488, Accent Blue #2563eb, Text #0f172a, Secondary #475569, Cards #ffffff, Success Green #16a34a. ANIMATION SPECS: Stats counter (2s on scroll), card hover lift (4px, 0.3s), appointment modal open (scale 0.95→1, 0.4s), FAQ accordion (0.3s height), doctor card hover (subtle scale 1.02). SECTIONS REQUIRED: (1) Accessible navbar (skip-to-content, ARIA roles). (2) Hero split. (3) Services - 6 icon cards (Cardiology, Neurology, Oncology, Pediatrics, Surgery, Emergency). (4) Doctor Directory - filterable grid (6 specialists). (5) Appointment Booking Modal with date/time/department form. (6) Stats - 4 animated counters. (7) Patient Testimonials. (8) FAQ accordion (8 questions). (9) Emergency CTA banner. (10) Footer. ACCESSIBILITY: WCAG 2.1 AA, skip navigation link, all forms with labels and error states, keyboard focus trap on modal, color contrast 4.5:1 minimum, prefers-reduced-motion. PROVIDE: Complete self-contained HTML. Booking modal functional. Doctor filter works. Counter animation on scroll.",



    slug: "healthcare-modern",



    title: "MediCare Pro",



    category: "Healthcare",



    style: "Modern",



    description: "Trustworthy, accessible healthcare site with appointment booking, specialist profiles, and services.",



    colorScheme: { primary: "#0284c7", secondary: "#e0f2fe", accent: "#0ea5e9", bg: "#f0f9ff", text: "#0c4a6e" },



    sections: ["Navbar","Hero","Services","Doctors","Appointment","Stats","Testimonials","FAQ","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","shadcn/ui","Framer Motion"],



    tags: ["healthcare","medical","accessible","professional"],



    features: ["Booking Modal", "Doctor Directory", "Accessibility Standard"],



    pages: ["Home", "Services", "Doctors", "Booking"],



    complexity: "High", responsive: true, seoOptimized: true, animationLevel: "Subtle",



    badges: [], sectionCount: 18, pageCount: 6, is3DReady: false



  },



  {



    id: "healthcare-glass",



    aiPrompt: "Generate a production-ready 'Vitalix Health' modern digital health dashboard using Next.js (App Router) with TypeScript, Tailwind CSS, and Framer Motion. CORE TECHNOLOGY: Next.js App Router + TypeScript, Tailwind CSS, Framer Motion for glass widget reveals. HERO SECTION: Full-viewport dark health dashboard aesthetic. Background: dark cyan-to-navy gradient (#0c1a2e to #021424), with subtle animated pulsing rings (CSS keyframes). Center: glassmorphic welcome panel with health score badge, user greeting, 3 quick-stat widgets (Heart Rate, Steps, Sleep hours) each as frosted glass cards with animated number readouts. COLOR PALETTE: Background #0c1a2e, Glass bg-white/8, Border border-cyan-500/20, Primary Teal #0d9488, Accent Cyan #06b6d4, Heart Rate Red #ef4444, Steps Green #22c55e, Text #f8fafc. GLASS HEALTH WIDGETS: Each health metric card: backdrop-blur-xl, bg-white/8, rounded-2xl, border border-white/10. Live animated value readout (setInterval, simulated fluctuation). Sparkline SVG chart inside each card. SECTIONS REQUIRED: (1) Glass navbar with health logo. (2) Dashboard hero + 3 live metric widgets. (3) Health Charts section - blood pressure line chart (SVG), activity bar chart (CSS). (4) Doctor Panel - 4 glass doctor cards. (5) Appointment booking glass card. (6) Medication reminder list. (7) Health Articles - 3 glass cards. (8) Footer. PROVIDE: Complete self-contained HTML. Live metric animations in JS (setInterval). All glass effects. SVG charts drawn.",



    slug: "healthcare-glass",



    title: "Vitalix Health",



    category: "Healthcare",



    style: "Glassmorphism",



    description: "Modern glassmorphism health platform with sleek dashboards, stats panels, and glassmorphism appointment cards.",



    colorScheme: { primary: "#06b6d4", secondary: "#cffafe", accent: "#22d3ee", bg: "#03111c", text: "#ecfeff" },



    sections: ["Navbar","Hero","Dashboard Preview","Services","Doctors","Testimonials","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","shadcn/ui","Framer Motion"],



    tags: ["healthcare","glassmorphism","digital health","modern"],



    features: ["Stats Dashboard", "Glass Widgets", "Secure Login"],



    pages: ["Landing", "Dashboard"],



    complexity: "High", responsive: true, seoOptimized: true, animationLevel: "Complex",



    badges: ["Premium"], sectionCount: 14, pageCount: 3, is3DReady: false



  },



  {



    id: "healthcare-3d",



    aiPrompt: "Generate a production-ready 'Helix Neural v3.0' 3D healthcare platform using Next.js (App Router) with TypeScript, Tailwind CSS, Three.js via CDN, and Framer Motion. CORE TECHNOLOGY: Next.js + TypeScript, Tailwind CSS, Three.js r128 via CDN for the interactive 3D brain model. 3D BRAIN HERO: Dark theme (#0b0813). Three.js canvas occupying 60% of screen (right side). Build brain procedurally: Two offset SphereGeometry hemispheres (radius 2.2, scaled to egg shape) as cerebrum, smaller sphere for cerebellum. Apply curl-noise vertex displacement simulation (using sine/cosine math on vertex positions). Material: MeshPhongMaterial with semi-transparency (opacity 0.7, transparent: true) + color #db2777. Second pass wireframe layer (MeshBasicMaterial, opacity 0.12, #a855f7). Generate 800 synapse particle points distributed on sphere surface, travel along edges using lerp. Sweeping horizontal grid plane laser (rotating Plane, opacity 0.4, emissive cyan). CONTROLS PANEL (left, glass): Orbit toggle, Synapse Speed slider (1.0x-2.5x), View Mode (All/Cortex/Stem). TELEMETRY PANEL (right, glass): Cortex Activity % bar, Synapse Speed display, Signal Fidelity %, Active Pathways count - all fluctuate via setInterval. COLOR PALETTE: Background #0b0813, Brain #db2777, Wireframe #a855f7, Synapses #22d3ee/#fda4af, Text #f8fafc, Glass rgba(255,255,255,0.06). SECTIONS REQUIRED: (1) Minimal dark navbar. (2) 3D brain hero + control panels. (3) Services 3-col glass cards. (4) Research Stats animated counters. (5) Team. (6) Contact. (7) Footer. PROVIDE: Complete self-contained HTML. Three.js CDN. Brain geometry built mathematically. Synapses simulated. All controls work.",



    slug: "healthcare-3d",



    title: "Helix Medical",



    category: "Healthcare",



    style: "3D Interactive",



    description: "3D interactive healthcare site with anatomical 3D models, animated stats, and immersive health visualizations.",



    colorScheme: { primary: "#10b981", secondary: "#d1fae5", accent: "#34d399", bg: "#020617", text: "#ecfdf5" },



    sections: ["Navbar","3D Hero","3D Models","Services","Team","Stats","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","Three.js","React Three Fiber","Framer Motion"],



    tags: ["healthcare","3D","interactive","innovative"],



    features: ["3D DNA Helix", "Particle System", "Interactive Organ Models"],



    pages: ["Home"],



    complexity: "Advanced", responsive: true, seoOptimized: true, animationLevel: "Advanced",



    badges: ["Premium", "New"], sectionCount: 10, pageCount: 1, is3DReady: true



  },



  // EDUCATION



  {



    id: "education-modern",



    aiPrompt: "Generate a production-ready 'EduPath LMS' learning management system landing page using Next.js (App Router) with TypeScript, Tailwind CSS, and Framer Motion. CORE TECHNOLOGY: Next.js App Router + TypeScript, Tailwind CSS, Framer Motion for scroll reveals. HERO SECTION: Full-viewport purple gradient (#7c3aed to #4f46e5) hero. Left: headline 'Learn Anything, Anywhere. At Your Pace.', subtitle, email signup form, student count badge '50,000+ Learners'. Right: Mock LMS dashboard screenshot (CSS-built interface showing course progress bars, lesson list, quiz widget). COLOR PALETTE: Primary Purple #7c3aed, Secondary Indigo #4f46e5, Accent Yellow #f59e0b, Background #f5f3ff, Cards #ffffff, Text #0f172a, Green Progress #22c55e. ANIMATION SPECS: Progress bar fill animation (1.5s on scroll), course card hover lift (0.3s), video preview play button pulse (1s), testimonial carousel (5s autoplay), accordion open (0.35s). SECTIONS REQUIRED: (1) Navbar with categories dropdown. (2) Hero with mock dashboard. (3) Course Catalog - tag filters (Design, Dev, Business) + 6 course cards with rating, instructor, duration, price. (4) How It Works - 3 numbered steps. (5) Instructor Profiles - 3 cards. (6) Stats - Students, Courses, Instructors, Countries. (7) Student Progress Dashboard preview. (8) Pricing 3-tier. (9) Testimonials. (10) FAQ. (11) Footer. PROVIDE: Complete self-contained HTML. Tag filter works in JS. Progress bars animate. Course card hover states.",



    slug: "education-modern",



    title: "EduPath LMS",



    category: "Education",



    style: "Modern",



    description: "Feature-rich LMS landing page with course catalog, instructor profiles, and student success stories.",



    colorScheme: { primary: "#7c3aed", secondary: "#ede9fe", accent: "#8b5cf6", bg: "#fafafa", text: "#111827" },



    sections: ["Navbar","Hero","Stats","Featured Courses","How It Works","Instructors","Testimonials","Pricing","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","shadcn/ui","Framer Motion"],



    tags: ["education","LMS","courses","e-learning"],



    features: ["Course Filtering", "Video Previews", "Progress Tracking UI"],



    pages: ["Home", "Courses", "Course Detail", "Instructor Profile"],



    complexity: "Advanced", responsive: true, seoOptimized: true, animationLevel: "Complex",



    badges: ["Premium", "Trending"], sectionCount: 25, pageCount: 12, is3DReady: false



  },



  {



    id: "education-glass",



    aiPrompt: "Generate a production-ready 'Luminary Academy' premium glassmorphism academy landing page using Next.js (App Router) with TypeScript, Tailwind CSS, and Framer Motion. CORE TECHNOLOGY: Next.js App Router + TypeScript, Tailwind CSS, Framer Motion for glass reveals. HERO SECTION: Full-viewport dark blue-gold gradient (#0f0a1e to #1a1200 with gold streaks). Animated gold star particles drifting upward (CSS animation). Center: Large glassmorphic hero panel (backdrop-blur-xl, border border-yellow-500/20) with headline 'Where Brilliance Meets Excellence', subtitle, glass enrolment form. COLOR PALETTE: Background #0f0a1e, Gold #d4af37, Gold Light #fbbf24, Glass bg-white/6, Border border-yellow-500/15, Text #f8fafc, Accent #fcd34d. GLASS DESIGN: Course cards use dark glass (bg-black/40, backdrop-blur-md, border border-yellow-500/20). Hover: gold glow (box-shadow 0 0 25px rgba(212,175,55,0.3)). Instructor cards: large avatar + glass bio panel. SECTIONS REQUIRED: (1) Dark glass navbar with gold logo. (2) Hero with particle stars + glass panel. (3) Featured Courses - 4 dark glass cards with progress + rating + gold price. (4) Why Choose Us - 4 glass feature cards. (5) Instructor Showcase - 3 glass profiles. (6) Certificate Preview - glass mockup. (7) Testimonials glass carousel. (8) Enrolment glass form. (9) Footer. PROVIDE: Complete self-contained HTML. Particle animation in CSS. Gold glow hover effects. All glass working.",



    slug: "education-glass",



    title: "Luminary Academy",



    category: "Education",



    style: "Glassmorphism",



    description: "Premium glassmorphism education platform with frosted course cards, progress indicators, and rich visuals.",



    colorScheme: { primary: "#f59e0b", secondary: "#fef3c7", accent: "#fbbf24", bg: "#0c0c1a", text: "#fefce8" },



    sections: ["Navbar","Hero","Courses","Categories","Instructors","Testimonials","Pricing","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","Framer Motion"],



    tags: ["education","glassmorphism","premium","courses"],



    features: ["Frosted Course Cards", "Glow Effects", "Dark Premium Feel"],



    pages: ["Home", "Catalog"],



    complexity: "High", responsive: true, seoOptimized: true, animationLevel: "Complex",



    badges: ["Premium"], sectionCount: 15, pageCount: 2, is3DReady: false



  },



  {



    id: "education-3d",



    aiPrompt: "Generate a production-ready 'Cosmos Learning' gamified 3D educational platform using Next.js (App Router) with TypeScript, Tailwind CSS, Three.js via CDN, and Framer Motion. CORE TECHNOLOGY: Next.js + TypeScript, Tailwind CSS, Three.js r128 via CDN for the 3D solar system. 3D HERO SECTION: Three.js canvas showing interactive 3D solar system. Central Sun: SphereGeometry (radius 1.5) with emissive yellow (#fbbf24) MeshPhongMaterial and PointLight. Orbiting Planets: 6 spheres at different radii/speeds, each representing a subject: Math (red), Science (blue), History (amber), Literature (green), Art (pink), Music (purple). Elliptical orbit using Math.cos/sin with different speeds. Click a planet: camera lerp zooms to it, sidebar updates with course list. OrbitControls for manual exploration. Star background 2000 points. COLOR PALETTE: Background #00001a, Sun #fbbf24, Text #f8fafc, Sidebar Glass rgba(255,255,255,0.08), Border rgba(255,255,255,0.12). ANIMATION SPECS: Planet orbit (continuous, each different speed), camera zoom to clicked planet (1.5s lerp), star twinkle (random opacity), sidebar slide-in (0.4s). SECTIONS REQUIRED: (1) Dark navbar. (2) 3D solar system hero + subject sidebar. (3) Courses grid. (4) Instructors. (5) Learning Path timeline. (6) Pricing. (7) Footer. PROVIDE: Complete self-contained HTML. Three.js CDN. Solar system built procedurally. Planet click works. No GLB files.",



    slug: "education-3d",



    title: "Cosmos Learning",



    category: "Education",



    previewImage: "/shuttle-thumbnail.png",



    style: "3D Interactive",



    description: "Gamified 3D learning platform with interactive knowledge visualizations and immersive course previews.",



    colorScheme: { primary: "#8b5cf6", secondary: "#ede9fe", accent: "#a78bfa", bg: "#03001a", text: "#f5f3ff" },



    sections: ["Navbar","3D Hero","Course Explorer","Gamification","Instructors","Testimonials","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","Three.js","React Three Fiber","Framer Motion"],



    tags: ["education","3D","gamified","interactive"],



    features: ["3D Solar System", "Interactive Map", "Gamified UI"],



    pages: ["Home"],



    complexity: "Advanced", responsive: true, seoOptimized: true, animationLevel: "Advanced",



    badges: ["Premium", "Trending", "New"], sectionCount: 12, pageCount: 1, is3DReady: true



  },



  // RESTAURANT



  {



    id: "restaurant-modern",



    aiPrompt: "Generate a production-ready 'Savor Bistro' elegant restaurant website using Next.js (App Router) with TypeScript, Tailwind CSS, and Framer Motion. CORE TECHNOLOGY: Next.js App Router + TypeScript, Tailwind CSS only, Framer Motion for premium food reveals. HERO SECTION: Full-viewport dark restaurant ambiance. Background: Deep warm dark brown (#1c0f07) with CSS radial glow. Hero: full-bleed food photograph placeholder (gradient rectangle #2d1810 with a gold fork/knife SVG icon). Large serif italic headline 'Taste the Story' in warm gold (#d4af37). Tagline. Reserve a Table primary CTA (gold border). COLOR PALETTE: Background #1c0f07, Text #f8f0e3 (warm cream), Gold #d4af37, Secondary #8b4513 (saddle brown), Cards #2d1a10, Accent #e07b39. ANIMATION SPECS: Menu item reveal (stagger 0.15s), food image parallax (0.3x), reservation form modal (0.4s scale), tab switch (0.3s fade), chef photo parallax scroll. SECTIONS REQUIRED: (1) Dark elegant navbar with gold logo. (2) Full-bleed hero with reserve CTA. (3) Digital Menu - tab selector (Starters/Mains/Desserts/Drinks), 3-col grid of menu items with price, dietary icons. (4) Featured dish spotlight. (5) Chef Story - full-width split layout. (6) Reservation form modal (date/time/party/special requests). (7) Gallery grid - food photography CSS placeholders. (8) Reviews. (9) Location + hours. (10) Footer. PROVIDE: Complete self-contained HTML. Menu tabs working in JS. Reservation modal functional. Food card hover effects.",



    slug: "restaurant-modern",



    title: "Savor Bistro",



    category: "Restaurant",



    style: "Modern",



    description: "Elegant restaurant website with appetizing menu display, reservation system, and rich food photography layouts.",



    colorScheme: { primary: "#b45309", secondary: "#fef3c7", accent: "#d97706", bg: "#fffbeb", text: "#1c1917" },



    sections: ["Navbar","Hero","About","Menu","Specials","Reservations","Gallery","Testimonials","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","Framer Motion"],



    tags: ["restaurant","food","elegant","reservations"],



    features: ["Interactive Menu", "OpenTable Integration UI", "Image Gallery"],



    pages: ["Home", "Menu", "Reservations", "Gallery"],



    complexity: "Medium", responsive: true, seoOptimized: true, animationLevel: "Subtle",



    badges: [], sectionCount: 14, pageCount: 4, is3DReady: false



  },



  {



    id: "restaurant-glass",



    aiPrompt: "Generate a production-ready 'Noir Kitchen' upscale glassmorphism restaurant site using Next.js (App Router) with TypeScript, Tailwind CSS, and Framer Motion. CORE TECHNOLOGY: Next.js App Router + TypeScript, Tailwind CSS, Framer Motion for parallax glass reveals. HERO SECTION: Full-viewport moody dark (#0d0008) with deep red ambient glow (#7f1d1d, blur 120px). Hero: glassmorphic panel (backdrop-blur-2xl, bg-red-950/20, border border-red-800/30) centered with restaurant name in large serif, tagline, Book Table CTA. Background: high-contrast food photograph CSS placeholder with heavy dark overlay. COLOR PALETTE: Background #0d0008, Red Accent #ef4444, Dark Red #7f1d1d, Glass bg-white/5, Border border-red-800/30, Text #fafaf9 (warm white), Gold #d4af37. GLASS MENU: Menu cards are dark glass sheets (bg-black/50, backdrop-blur-lg, border border-red-800/20). Parallax scroll: food images slide upward at 0.7x rate behind glass panels. Hover: red border glow. SECTIONS REQUIRED: (1) Glass dark navbar with red logo. (2) Hero with dark ambiance + glass panel. (3) Signature Menu - glass tab cards with parallax food bg. (4) Chef Experience - glass split layout. (5) Wine Selection - dark glass cards. (6) Private Dining glass CTA. (7) Reservation glass form. (8) Reviews glass carousel. (9) Footer. PROVIDE: Complete self-contained HTML. Parallax scroll on food images. All glass effects. Dark moody atmosphere.",



    slug: "restaurant-glass",



    title: "Noir Kitchen",



    category: "Restaurant",



    style: "Glassmorphism",



    description: "Upscale dark glassmorphism restaurant site with moody ambience, glass menu cards, and premium presentation.",



    colorScheme: { primary: "#dc2626", secondary: "#fee2e2", accent: "#ef4444", bg: "#0a0a0a", text: "#fef2f2" },



    sections: ["Navbar","Hero","Story","Menu","Chef's Specials","Reservations","Gallery","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","Framer Motion"],



    tags: ["restaurant","glassmorphism","luxury","dark"],



    features: ["Moody Dark Mode", "Glass Menu Cards", "Parallax Scroll"],



    pages: ["Home", "Menu"],



    complexity: "High", responsive: true, seoOptimized: true, animationLevel: "Complex",



    badges: ["Premium"], sectionCount: 12, pageCount: 2, is3DReady: false



  },



  {



    id: "restaurant-3d",



    aiPrompt: "Generate a production-ready 'Platter 3D' immersive 3D restaurant landing page using Next.js (App Router) with TypeScript, Tailwind CSS, Three.js via CDN, and Framer Motion. CORE TECHNOLOGY: Next.js + TypeScript, Tailwind CSS, Three.js r128 via CDN for 3D table setting. 3D HERO SECTION: Three.js canvas showing an elegant 3D restaurant table setting. Build procedurally: Table surface (BoxGeometry flat, MeshStandardMaterial wood brown #8B4513), round plate (CylinderGeometry flat, white), wine glass (assembled from cone stem + sphere bowl using TorusGeometry), candle (thin cylinder + PointLight orange glow above). When user selects menu item from sidebar, camera lerp zooms to that dish area on the table and dish glows with PointLight highlight. Steam particle system above plate (upward-drifting small spheres). COLOR PALETTE: Background #0d0906, Table #5c3317, Plate #f5f5f5, Accent Gold #d4af37, Text #fafaf9, Glass rgba(255,255,255,0.08). ANIMATION SPECS: Table scene auto-rotate (0.002 rad/frame), dish selection camera lerp (1.2s), steam particles (upward sine, 2s), candle flicker (PointLight intensity 0.8-1.2 random). SECTIONS REQUIRED: (1) Dark elegant navbar. (2) 3D table hero + dish menu sidebar. (3) Chef Specials - 4 glass cards. (4) Full Menu tabs. (5) Ambiance gallery. (6) Reservations. (7) Footer. PROVIDE: Complete self-contained HTML. Three.js CDN. All 3D primitives built. Dish selection works. No GLB files.",



    slug: "restaurant-3d",



    title: "Platter 3D",



    category: "Restaurant",



    previewImage: "/restaurant-thumbnail.png",



    style: "3D Interactive",



    description: "Immersive 3D restaurant experience with floating dish presentations, animated menus, and table booking.",



    colorScheme: { primary: "#f97316", secondary: "#fff7ed", accent: "#fb923c", bg: "#080808", text: "#fff7ed" },



    sections: ["Navbar","3D Hero","3D Menu","Specials","Reservations","Gallery","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","Three.js","React Three Fiber","Framer Motion"],



    tags: ["restaurant","3D","interactive","immersive"],



    features: ["Floating 3D Food Models", "Spatial Navigation", "Dynamic Lighting"],



    pages: ["Home"],



    complexity: "Advanced", responsive: true, seoOptimized: true, animationLevel: "Advanced",



    badges: ["Premium", "New"], sectionCount: 10, pageCount: 1, is3DReady: true



  },



  // REAL ESTATE



  {



    id: "realestate-modern",



    aiPrompt: "Generate a production-ready 'Prestige Realty' professional real estate portal using Next.js (App Router) with TypeScript, Tailwind CSS, and Framer Motion. CORE TECHNOLOGY: Next.js App Router + TypeScript, Tailwind CSS, Framer Motion for card animations. HERO SECTION: Full-viewport high-impact property hero. Background: large property photograph placeholder (gradient #1e3a5f with CSS home silhouette shape). Overlay: search widget panel (white card, shadow-2xl) with location input, property type dropdown, bedrooms slider, price range dual-handle slider. Headline 'Find Your Perfect Home' in white serif. Property stats badges: 50,000+ Listings, Top Agents. COLOR PALETTE: Background #f8fafc, Primary Blue #1e40af, Accent Gold #d4af37, Text #0f172a, Secondary #475569, Cards #ffffff, Map teal #0d9488. ANIMATION SPECS: Property card hover lift + shadow (0.3s), image carousel auto-advance (4s), map pin bounce, filter slide-down (0.4s), modal open (0.3s scale), counter animation. SECTIONS REQUIRED: (1) Sticky navbar with logo + agent login + list property CTA. (2) Hero with search widget. (3) Featured Listings - 3-col grid (6 properties, each with image carousel, price, beds/baths, sq ft, save button). (4) Property Type filter bar. (5) Interactive map embed placeholder (div with pin SVG markers). (6) Agent profiles - 3 featured agents. (7) Neighborhood Guides - 4 area cards. (8) Mortgage Calculator widget. (9) Testimonials. (10) Footer. PROVIDE: Complete self-contained HTML. Search filter works. Image carousel JS. Mortgage calculator functional. Save property toggle.",



    slug: "realestate-modern",



    title: "Prestige Realty",



    category: "Real Estate",



    style: "Modern",



    description: "Professional real estate platform with property search, listing cards, agent profiles, and neighborhood guides.",



    colorScheme: { primary: "#1d4ed8", secondary: "#dbeafe", accent: "#3b82f6", bg: "#f8fafc", text: "#0f172a" },



    sections: ["Navbar","Hero Search","Featured Listings","Property Types","Agents","Testimonials","Neighborhoods","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","shadcn/ui","Framer Motion"],



    tags: ["real estate","property","listings","professional"],



    features: ["Advanced Search Bar", "Listing Carousels", "Map View UI"],



    pages: ["Home", "Search Results", "Property Detail", "Agent Profile"],



    complexity: "High", responsive: true, seoOptimized: true, animationLevel: "Complex",



    badges: ["Trending"], sectionCount: 20, pageCount: 8, is3DReady: false



  },



  {



    id: "realestate-glass",



    aiPrompt: "Generate a production-ready 'Vista Luxury' glassmorphism luxury real estate landing page using Next.js (App Router) with TypeScript, Tailwind CSS, and Framer Motion. CORE TECHNOLOGY: Next.js App Router + TypeScript, Tailwind CSS, Framer Motion for glass reveals. HERO SECTION: Full-viewport dramatic dark city skyline (CSS gradient simulating night skyline: dark navy #0a1628 with horizontal light streaks/blurs representing building windows). Heavy backdrop-blur overlay. Glassmorphic search bar (backdrop-blur-2xl, bg-white/10, border-white/20, rounded-2xl) floating center with property search inputs. Headline 'Where Luxury Lives' in white gold. COLOR PALETTE: Background #0a1628, Glass bg-white/8, Border border-white/15, Gold #d4af37, Text #f8fafc, Cyan #06b6d4, Skyline #0f1f3d. GLASS PROPERTY CARDS: Each listing: dark glass card (bg-zinc-900/60, backdrop-blur-lg, border border-white/10). Property image overlay (dark gradient). Price in gold. Beds/baths/sqft chips. Hover: gold border glow, scale 1.02. Booking modal: heavy glass overlay with blur of background. SECTIONS REQUIRED: (1) Glass navbar with gold logo. (2) Skyline hero + glass search. (3) Premium Listings - 6 glass property cards. (4) Filters sidebar - glass panel. (5) Featured Property modal. (6) Agents - 3 glass profiles. (7) Testimonials glass carousel. (8) Inquiry glass form. (9) Footer dark. PROVIDE: Complete self-contained HTML. Glass search bar. Property cards with gold hover. Modal with blur overlay.",



    slug: "realestate-glass",



    title: "Vista Luxury",



    category: "Real Estate",



    style: "Glassmorphism",



    description: "Luxury real estate glassmorphism site with translucent property cards and a dramatic skyline hero.",



    colorScheme: { primary: "#f59e0b", secondary: "#fef3c7", accent: "#fbbf24", bg: "#04080f", text: "#fefce8" },



    sections: ["Navbar","Hero","Featured Properties","Collections","Agents","Testimonials","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","Framer Motion"],



    tags: ["real estate","luxury","glassmorphism","premium"],



    features: ["Translucent Listing Cards", "Skyline Blur Backgrounds", "Premium Modals"],



    pages: ["Home", "Property Detail"],



    complexity: "High", responsive: true, seoOptimized: true, animationLevel: "Complex",



    badges: ["Premium"], sectionCount: 14, pageCount: 2, is3DReady: false



  },



  {



    id: "realestate-3d",



    aiPrompt: "Generate a production-ready 'Spatial Properties' 3D real estate showcase using Next.js (App Router) with TypeScript, Tailwind CSS, Three.js via CDN, and Framer Motion. CORE TECHNOLOGY: Next.js + TypeScript, Tailwind CSS, Three.js r128 via CDN for 3D house model. 3D HOUSE VIEWER: Three.js canvas. Build house from primitives: BoxGeometry foundation/walls, prism-shaped roof (BoxGeometry skewed or ConeGeometry), box windows (thin BoxGeometry glass-teal MeshPhongMaterial, emissive), chimney (thin cylinder), door (dark flat box). Three view modes toggled by UI buttons: (1) Exterior View - standard camera orbit. (2) Dollhouse - camera moves up and above, roof becomes transparent (opacity 0.2). (3) Virtual Tour - camera enters house interior (z-position inside building bounds, WASD movement hint). Room light toggle buttons control PointLight inside rooms. OrbitControls for exploration. COLOR PALETTE: Background #0d1117, House Walls #e2d5c3, Roof #8b4513, Windows #22d3ee, Text #f8fafc, Controls Glass rgba(255,255,255,0.08). ANIMATION SPECS: View transition camera lerp (1.5s), roof transparency fade (0.8s), window light flicker (random), room light toggle (0.3s). SECTIONS REQUIRED: (1) Dark navbar. (2) 3D house hero + view mode controls + room toggles. (3) Property Listings grid. (4) Neighborhood map. (5) Agents. (6) Inquiry form. (7) Footer. PROVIDE: Complete self-contained HTML. Three.js CDN. House primitives. View modes work. Room lights toggle.",



    slug: "realestate-3d",



    title: "Spatial Properties",



    category: "Real Estate",



    previewImage: "/realestate-thumbnail.png",



    style: "3D Interactive",



    description: "3D real estate showcase with virtual walkthroughs, interactive floor plans, and spatial property visualization.",



    colorScheme: { primary: "#10b981", secondary: "#d1fae5", accent: "#34d399", bg: "#010b08", text: "#ecfdf5" },



    sections: ["Navbar","3D Hero","3D Tours","Listings","Neighborhood Map","Agents","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","Three.js","React Three Fiber","Framer Motion"],



    tags: ["real estate","3D","virtual tour","interactive"],



    features: ["3D House Models", "Dollhouse View UI", "Virtual Tour Frame"],



    pages: ["Home", "3D Viewer"],



    complexity: "Advanced", responsive: true, seoOptimized: true, animationLevel: "Advanced",



    badges: ["Premium", "Trending", "New"], sectionCount: 12, pageCount: 2, is3DReady: true



  },



  // AI STARTUP



  {



    id: "ai-startup-modern",



    aiPrompt: "Generate a production-ready 'Synapse AI' high-impact AI startup landing page using Next.js (App Router) with TypeScript, Tailwind CSS, and Framer Motion. CORE TECHNOLOGY: Next.js App Router + TypeScript, Tailwind CSS, Framer Motion for scroll animations. HERO SECTION: Full-viewport dark (#030712) with blue/purple gradient orb glow. Bento-box grid layout as hero: Large cell (2 cols): Headline 'The AI That Thinks Ahead' with animated typewriter, subtitle, CTA. Medium cell: Live code block showing model API call with syntax highlight (CSS spans). Small cells: Stats badges (99.9% Uptime, <50ms Latency, 10B Params). COLOR PALETTE: Background #030712, Blue #2563eb, Purple #7c3aed, Cyan #06b6d4, Text #f8fafc, Code bg #0f172a, Code text #22d3ee, Green #22c55e. ANIMATION SPECS: Typewriter effect (3s), code block line-by-line reveal (0.1s stagger), bento card entrance (0.4s stagger), latency counter animate, glow pulse on hover (0.3s). SECTIONS REQUIRED: (1) Dark navbar with logo + pricing + docs + Sign In. (2) Bento hero with code demo. (3) Features - 6 bento grid cards with icon + title + micro demo. (4) API demo interactive: user types prompt, response animates character-by-character. (5) Pricing 3-tier. (6) Tech stack logos. (7) Testimonials. (8) Docs CTA. (9) Footer. PROVIDE: Complete self-contained HTML. Typewriter in JS. Code block syntax colors via CSS. API demo simulation in JS.",



    slug: "ai-startup-modern",



    title: "Synapse AI",



    category: "AI Startup",



    style: "Modern",



    description: "High-impact AI startup landing page with live demo section, product screenshots, and a compelling vision narrative.",



    colorScheme: { primary: "#4f46e5", secondary: "#eef2ff", accent: "#6366f1", bg: "#fafafa", text: "#111827" },



    sections: ["Navbar","Hero","Demo","Features","Use Cases","Pricing","Testimonials","FAQ","CTA","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","shadcn/ui","Framer Motion"],



    tags: ["AI","startup","SaaS","modern","demo"],



    features: ["Terminal UI Component", "Code Snippet Blocks", "Bento Grid Layout"],



    pages: ["Home", "Docs", "Pricing"],



    complexity: "High", responsive: true, seoOptimized: true, animationLevel: "Complex",



    badges: ["Trending"], sectionCount: 18, pageCount: 5, is3DReady: false



  },



  {



    id: "ai-startup-glass",



    aiPrompt: "Generate a production-ready 'Neural Glass' futuristic glassmorphism AI landing page using Next.js (App Router) with TypeScript, Tailwind CSS, and Framer Motion. CORE TECHNOLOGY: Next.js App Router + TypeScript, Tailwind CSS, Framer Motion for cyberpunk glass reveals. HERO SECTION: Full-viewport cyberpunk (#000814) background with animated neon mesh gradient (cyan #00ffff lines + magenta #ff00ff, CSS SVG grid pattern overlaid). Animated scanline effect. Center: tall glassmorphic hero panel (backdrop-blur-2xl, bg-cyan-950/20, border border-cyan-400/30) with: AI logo glitch animation, typewriter headline, glass CTA buttons with neon border glow. Background: floating glowing circuit traces (CSS paths). COLOR PALETTE: Background #000814, Neon Cyan #00ffff, Neon Magenta #ff00ff, Glass bg-cyan-950/20, Border border-cyan-400/30, Text #f0fdff, Code #00ff9f. CYBERPUNK GLASS: All containers use glass with cyan glow borders. Code blocks: dark glass (bg-black/60, border border-cyan-400/40, text-green-400 font-mono). Hover: neon border intensifies + box-shadow 0 0 20px rgba(0,255,255,0.4). SECTIONS REQUIRED: (1) Cyberpunk glass navbar. (2) Hero with scanlines + glass panel + typewriter. (3) Features - 6 glass cards with glowing code snippet previews. (4) Model Comparison - glass table. (5) API Playground - glass terminal input/output. (6) Pricing glass cards. (7) Testimonials. (8) Footer neon. PROVIDE: Complete self-contained HTML. Scanline CSS overlay. Typewriter in JS. Terminal simulation in JS. All neon glass effects.",



    slug: "ai-startup-glass",



    title: "Neural Glass",



    category: "AI Startup",



    style: "Glassmorphism",



    description: "Futuristic AI glassmorphism site with neural network animations, glass dashboards, and a cyberpunk aesthetic.",



    colorScheme: { primary: "#8b5cf6", secondary: "#4c1d95", accent: "#a78bfa", bg: "#030712", text: "#f5f3ff" },



    sections: ["Navbar","Hero","AI Demo","Features","Use Cases","Pricing","Testimonials","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","shadcn/ui","Framer Motion"],



    tags: ["AI","glassmorphism","futuristic","dark","neural"],



    features: ["Cyberpunk Mesh Gradients", "Neon Glass borders", "Typewriter Effects"],



    pages: ["Home", "App Dashboard"],



    complexity: "Advanced", responsive: true, seoOptimized: true, animationLevel: "Advanced",



    badges: ["Premium", "New"], sectionCount: 16, pageCount: 2, is3DReady: false



  },



  {



    id: "ai-startup-3d",



    aiPrompt: "Generate a production-ready 'Genesis AI' mind-blowing 3D AI startup website using Next.js (App Router) with TypeScript, Tailwind CSS, Three.js via CDN, and Framer Motion. CORE TECHNOLOGY: Next.js + TypeScript, Tailwind CSS, Three.js r128 via CDN for 3D neural network sphere. 3D HERO SECTION: Three.js canvas. Central element: Neural network sphere. Build using: SphereGeometry as base point distribution (sample 300 points on sphere surface using fibonacci sphere algorithm). Connect each point to 3 nearest neighbors using THREE.Line segments. Particles at each node: small SphereGeometry (radius 0.04) with MeshBasicMaterial, color determined by activation function selection. Signal pulses travel along edges (particle lerping between nodes). HUD controls: Activation Function selector (ReLU: cyan/purple, Sigmoid: pink/emerald, GELU: amber/indigo), Node Count slider (100-500), Signal Pulse Speed slider, Lobe Separation slider (shifts hemisphere apart), Glow Bloom intensity slider. COLOR PALETTE: Background #00010a, Node colors based on activation (ReLU: #22d3ee + #a855f7, Sigmoid: #ec4899 + #10b981, GELU: #f59e0b + #6366f1), Text #f8fafc, Glass rgba(255,255,255,0.06). TERMINAL UI: Bottom section: dark terminal panel (bg-black, font-mono, text-green-400) showing model training logs animating line by line with latency indicators. ANIMATION SPECS: Node pulse (1.2s), signal travel (0.5s per edge), sphere rotation (0.003 rad/frame), camera zoom scroll (0.8s), terminal scroll (continuous). SECTIONS REQUIRED: (1) Minimal dark navbar. (2) 3D neural sphere hero + HUD controls. (3) Features 4-col bento grid. (4) Capabilities section. (5) Pricing. (6) Terminal demo section. (7) Footer. PROVIDE: Complete self-contained HTML. Three.js CDN. Neural network built from points. Signal animations. HUD controls interactive. Terminal animates.",



    slug: "ai-startup-3d",



    title: "Genesis AI",



    category: "AI Startup",



    style: "3D Interactive",



    description: "Mind-blowing 3D AI startup site with interactive neural network globe, animated data flows, and spatial UI.",



    colorScheme: { primary: "#06b6d4", secondary: "#cffafe", accent: "#22d3ee", bg: "#020617", text: "#ecfeff" },



    sections: ["Navbar","3D Hero","3D Neural Network","Features","Demo","Pricing","Testimonials","Footer"],



    techStack: ["Next.js","TypeScript","Tailwind CSS","Three.js","React Three Fiber","Framer Motion"],



    tags: ["AI","3D","interactive","futuristic","neural"],



    features: ["Distorting Neural Sphere", "Particle Clouds", "Post-Processing Glow"],



    pages: ["Home"],



    complexity: "Advanced", responsive: true, seoOptimized: true, animationLevel: "Advanced",



    badges: ["Premium", "Trending", "New"], sectionCount: 12, pageCount: 1, is3DReady: true



  }



]



