import React from 'react';
import { AnimatedSection } from '../tier1-components/AnimatedSection';

interface Pillar {
  title: string;
  tagline: string;
  description: string;
}

interface PillarsData {
  heading: string;
  items: Pillar[];
}

export function ServicesPillarsLayout({ data }: { data: PillarsData }) {
  return (
    <section className="py-24 bg-gray-950" id="how-we-work">
      <div className="container mx-auto px-4 max-w-7xl">
        <AnimatedSection direction="up" className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">{data.heading}</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full" />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {data.items.map((pillar, index) => (
            <AnimatedSection 
              key={index} 
              direction={index === 0 ? 'left' : 'right'} 
              delay={index * 0.2}
              className="bg-gray-900 border border-gray-800 p-8 md:p-12 rounded-2xl relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-4">{pillar.title}</h3>
                <p className="text-xl text-gray-300 font-medium italic mb-6">
                  "{pillar.tagline}"
                </p>
                <p className="text-gray-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
