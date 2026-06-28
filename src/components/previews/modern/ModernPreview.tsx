"use client";

import React from 'react';
import { Template } from '@/lib/data';

import { BusinessModern } from './business-modern';
import { PortfolioModern } from './portfolio-modern';
import { SaaSModern } from './saas-modern';
import { AgencyModern } from './agency-modern';
import { EcommerceModern } from './ecommerce-modern';
import { HealthcareModern } from './healthcare-modern';
import { EducationModern } from './education-modern';
import { RestaurantModern } from './restaurant-modern';
import { RealEstateModern } from './realestate-modern';
import { AIStartupModern } from './aistartup-modern';

interface ModernPreviewProps {
  t: Template;
}

export const ModernPreview: React.FC<ModernPreviewProps> = ({ t }) => {
  switch (t.category) {
    case "Business":
      return <BusinessModern t={t} />;
    case "Portfolio":
      return <PortfolioModern t={t} />;
    case "SaaS":
      return <SaaSModern t={t} />;
    case "Agency":
      return <AgencyModern t={t} />;
    case "Ecommerce":
      return <EcommerceModern t={t} />;
    case "Healthcare":
      return <HealthcareModern t={t} />;
    case "Education":
      return <EducationModern t={t} />;
    case "Restaurant":
      return <RestaurantModern t={t} />;
    case "Real Estate":
      return <RealEstateModern t={t} />;
    case "AI Startup":
      return <AIStartupModern t={t} />;
    default:
      return <BusinessModern t={t} />;
  }
};
