import React from 'react';
import { AnimatedSection } from '../tier1-components/AnimatedSection';
import { Briefcase, Zap, Landmark } from 'lucide-react';
import { ContactModal } from '@/components/ContactModal';

interface Audience {
  title: string;
  description: string;
}

interface CTA {
  heading: string;
  sub: string;
  button_text: string;
}

interface AudienceAndCTAData {
  audience: Audience[];
  cta: CTA;
}

export function AudienceAndCTALayout({ data }: { data: AudienceAndCTAData }) {
  // Premium mapping icons 
  const getIcon = (index: number) => {
    const Icon = index === 0 ? Briefcase : index === 1 ? Zap : Landmark;
    return (
      <div className="relative mb-8 w-20 h-20 mx-auto flex items-center justify-center">
        {/* Glowing backdrop */}
        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
        
        {/* Glass container */}
        <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 rounded-2xl flex items-center justify-center shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] overflow-hidden">
          {/* Edge highlight reflection */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <Icon className="w-8 h-8 text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" strokeWidth={1.5} />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-950">
      {/* Audience Section */}
      <section className="py-24" id="audience">
        <div className="container mx-auto px-4 max-w-7xl">
          <AnimatedSection direction="up" className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Who We Serve</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full" />
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            {data.audience.map((item, index) => (
              <AnimatedSection 
                key={index}
                direction="up"
                delay={index * 0.2}
                className="bg-gray-900 border border-gray-800 p-8 hover:border-blue-500/50 transition-all rounded-2xl text-center group"
              >
                <div className="flex justify-center transform group-hover:-translate-y-2 transition-transform duration-300">
                  {getIcon(index)}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden" id="contact">
        <div className="absolute inset-0 bg-blue-900/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/30 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <AnimatedSection direction="up">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              {data.cta.heading}
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12">
              {data.cta.sub}
            </p>
            <ContactModal>
              <button className="inline-block px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-full transition-all hover:scale-105 shadow-[0_0_30px_rgba(37,99,235,0.5)] cursor-pointer">
                {data.cta.button_text}
              </button>
            </ContactModal>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
