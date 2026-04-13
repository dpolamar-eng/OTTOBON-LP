import React, { useEffect } from 'react';
import servicesContent from '../tier3-content/services-content.json';

// Import Tier 2 Layout Components
import { ServicesHeroLayout } from '../tier2-layouts/ServicesHeroLayout';
import { ServicesPositioningLayout } from '../tier2-layouts/ServicesPositioningLayout';
import { ServicesPillarsLayout } from '../tier2-layouts/ServicesPillarsLayout';
import { DetailedServicesLayout } from '../tier2-layouts/DetailedServicesLayout';
import { SecretSauceLayout } from '../tier2-layouts/SecretSauceLayout';
import { AudienceAndCTALayout } from '../tier2-layouts/AudienceAndCTALayout';

import ScrollToTop from '@/components/ScrollToTop';
import { ServicesHeaderLayout } from '../tier2-layouts/ServicesHeaderLayout';
import Footer from '@/components/Footer';

export default function Services() {
  // Add smooth scroll behavior to HTML element
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="bg-gray-950 min-h-screen text-white font-sans selection:bg-blue-500/30">
      <ServicesHeaderLayout />
      
      {/* Tier 3 Content Ingestion */}
      <main>
        {/* Hero Section */}
        <ServicesHeroLayout data={servicesContent.hero} />
        
        {/* Positioning Quote */}
        <ServicesPositioningLayout quote={servicesContent.positioning.quote} />

        {/* Two Pillars Section */}
        <ServicesPillarsLayout data={servicesContent.pillars} />

        {/* Detailed Services Block */}
        <DetailedServicesLayout services={servicesContent.detailed_services} />

        {/* Secret Sauce / How we Work */}
        <SecretSauceLayout data={servicesContent.secret_sauce} />

        {/* Who We Serve & Final CTA */}
        <AudienceAndCTALayout data={{ audience: servicesContent.audience, cta: servicesContent.cta }} />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}