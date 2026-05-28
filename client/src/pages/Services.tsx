import React, { useEffect } from 'react';
import servicesContent from '../tier3-content/services-content.json';

// Import Tier 2 Layout Components
import { ServicesHeroLayout } from '../tier2-layouts/ServicesHeroLayout';
import { CoreOfferingsLayout } from '../tier2-layouts/CoreOfferingsLayout';
import { ServicesPositioningLayout } from '../tier2-layouts/ServicesPositioningLayout';
import { DetailedServicesLayout } from '../tier2-layouts/DetailedServicesLayout';
import { ExecutionSupportLayout } from '../tier2-layouts/ExecutionSupportLayout';
import { SecretSauceLayout } from '../tier2-layouts/SecretSauceLayout';
import { ServicesAboutUsLayout } from '../tier2-layouts/ServicesAboutUsLayout';
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

        {/* Core Offerings Section */}
        <CoreOfferingsLayout data={servicesContent.core_offerings} />
        
        {/* Positioning Quote */}
        <ServicesPositioningLayout quote={servicesContent.positioning.quote} />

        {/* Execution Support — Premium Redesigned Section */}
        <ExecutionSupportLayout data={servicesContent.execution_support as any} />

        {/* Detailed Services Block */}
        {/* The 'compliance-resilience' (Legal & Finance) section is filtered out here so it remains in the codebase but doesn't show on the page */}
        <DetailedServicesLayout services={servicesContent.detailed_services.filter(s => s.id !== 'compliance-resilience')} />

        {/* Who We Serve & Final CTA */}
        <AudienceAndCTALayout data={{ audience: servicesContent.audience, cta: servicesContent.cta }} />

        {/* Secret Sauce / How we Work */}
        <SecretSauceLayout data={servicesContent.secret_sauce} />

        {/* About Us Section */}
        <ServicesAboutUsLayout data={servicesContent.about_us as any} />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}