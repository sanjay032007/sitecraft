/* eslint-disable @typescript-eslint/no-explicit-any */
import { Template } from '@/lib/data';
import { Business3D } from '@/components/previews/three/business-3d';
import { BusinessGlass } from '@/components/previews/glass/business-glass';

const dummyTemplate = {
  id: 'dummy',
  name: 'Dummy',
  description: 'Dummy template',
  tier: 'free',
  category: 'business',
  theme: 'modern',
  layout: 'standard',
  features: [],
  author: 'system',
  colorScheme: { primary: "#000", bg: "#fff", text: "#000", secondary: "#fff", accent: "#ff0" },
  colors: {
    primary: '#000000',
    secondary: '#ffffff',
    accent: '#ff0000',
    background: '#ffffff',
    text: '#000000'
  },
  typography: {
    heading: 'Geist',
    body: 'Geist'
  }
};

export default function TestE2EPage() {
  return (
    <div className="p-8">
      <h1>E2E Test Page</h1>
      
      <div id="test-wrapper-large" className="w-[1000px] h-[800px] border relative @container overflow-y-auto">
        <Business3D t={dummyTemplate as any} />
      </div>

      <div id="test-wrapper-small" className="w-[400px] h-[800px] border relative mt-8 @container overflow-y-auto">
        <Business3D t={dummyTemplate as unknown as Template} />
      </div>

      <div id="test-glass-wrapper" className="w-[800px] h-[600px] border relative mt-8 @container overflow-y-auto">
        <BusinessGlass t={dummyTemplate as unknown as Template} />
      </div>
    </div>
  );
}

