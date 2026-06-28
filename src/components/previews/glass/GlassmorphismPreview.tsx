"use client";

import React from 'react';
import { Template } from '@/lib/data';

import { BusinessGlass } from './business-glass';
import { PortfolioGlass } from './portfolio-glass';
import { SaaSGlass } from './saas-glass';
import { AgencyGlass } from './agency-glass';
import { EcommerceGlass } from './ecommerce-glass';
import { HealthcareGlass } from './healthcare-glass';
import { EducationGlass } from './education-glass';
import { RestaurantGlass } from './restaurant-glass';
import { RealEstateGlass } from './realestate-glass';
import { AIStartupGlass } from './aistartup-glass';

interface GlassmorphismPreviewProps {
  t: Template;
}

export const GlassmorphismPreview: React.FC<GlassmorphismPreviewProps> = ({ t }) => {
  switch (t.category) {
    case "Business":
      return <BusinessGlass t={t} />;
    case "Portfolio":
      return <PortfolioGlass t={t} />;
    case "SaaS":
      return <SaaSGlass t={t} />;
    case "Agency":
      return <AgencyGlass t={t} />;
    case "Ecommerce":
      return <EcommerceGlass t={t} />;
    case "Healthcare":
      return <HealthcareGlass t={t} />;
    case "Education":
      return <EducationGlass t={t} />;
    case "Restaurant":
      return <RestaurantGlass t={t} />;
    case "Real Estate":
      return <RealEstateGlass t={t} />;
    case "AI Startup":
      return <AIStartupGlass t={t} />;
    default:
      return <BusinessGlass t={t} />;
  }
};
