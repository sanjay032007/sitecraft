/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */

"use client";



// Polyfill WebGLRenderingContext.prototype.getContextAttributes globally to prevent a crash in postprocessing

// where getContextAttributes() can return null under context loss or headless rendering.

if (typeof window !== 'undefined') {

  try {

    const patchGetContextAttributes = (proto: any) => {

      if (proto && proto.getContextAttributes) {

        const original = proto.getContextAttributes;

        proto.getContextAttributes = function() {

          try {

            return original.call(this) || {

              alpha: true,

              depth: true,

              stencil: true,

              antialias: true,

              premultipliedAlpha: true,

              preserveDrawingBuffer: false,

              powerPreference: "default",

              failIfMajorPerformanceCaveat: false

            };

          } catch (e) {

            return {

              alpha: true,

              depth: true,

              stencil: true,

              antialias: true,

              premultipliedAlpha: true,

              preserveDrawingBuffer: false,

              powerPreference: "default",

              failIfMajorPerformanceCaveat: false

            };

          }

        };

      }

    };

    if (typeof WebGLRenderingContext !== 'undefined') {

      patchGetContextAttributes(WebGLRenderingContext.prototype);

    }

    if (typeof WebGL2RenderingContext !== 'undefined') {

      patchGetContextAttributes(WebGL2RenderingContext.prototype);

    }

  } catch (e) {

    console.error("Failed to patch getContextAttributes:", e);

  }

}



import React from 'react';

import { Template } from '@/lib/data';



import { Business3D } from './business-3d';

import { Portfolio3D } from './portfolio-3d';

import { SaaS3D } from './saas-3d';

import { Agency3D } from './agency-3d';

import { SpaceAgency3D } from './space-agency-3d';

import { Ecommerce3D } from './ecommerce-3d';

import Headphones3D from './headphones-3d';

import VRGlassmorphism from './vr-headset-3d';

import { Healthcare3D } from './healthcare-3d';

import { Education3D } from './education-3d';

import { Restaurant3D } from './restaurant-3d';

import { RealEstate3D } from './realestate-3d';

import { AIStartup3D } from './aistartup-3d';



class ErrorBoundary extends React.Component<any, any> {

  constructor(props: any) {

    super(props);

    this.state = { hasError: false, error: null };

  }



  static getDerivedStateFromError(error: any) {

    return { hasError: true, error };

  }



  componentDidCatch(error: any, errorInfo: any) {

    console.error("ErrorBoundary caught an error", error, errorInfo);

  }



  render() {

    if (this.state.hasError) {

      return <div style={{ color: 'red', padding: 20, background: 'black', width: '100%', height: '100%' }}><h1>Something went wrong.</h1><pre>{this.state.error.toString()}</pre></div>;

    }

    return this.props.children;

  }

}



export const Interactive3DPreview = ({ t }: { t: Template }) => {

  switch (t.category) {

    case "Business":

      return <Business3D t={t} />;

    case "Portfolio":

      return <Portfolio3D t={t} />;

    case "SaaS":

      return <SaaS3D t={t} />;

    case "Agency":

      if (t.id === "agency-space-3d") return <SpaceAgency3D t={t} />;

      return <Agency3D t={t} />;

    case "Ecommerce":

      if (t.id === "ecommerce-headphones-3d") return <Headphones3D />;

      if (t.id === "ecommerce-vr-headset-3d") return <VRGlassmorphism />;

      return <Ecommerce3D t={t} />;

    case "Healthcare":

      return <ErrorBoundary><Healthcare3D t={t} /></ErrorBoundary>;

    case "Education":

      return <Education3D t={t} />;

    case "Restaurant":

      return <Restaurant3D t={t} />;

    case "Real Estate":

      return <RealEstate3D t={t} />;

    case "AI Startup":

      return <AIStartup3D t={t} />;

    default:

      return <Business3D t={t} />;

  }

};

