import React from 'react';
import { AnimatedSection } from '../tier1-components/AnimatedSection';
import { CheckCircle2, LineChart, Users, Settings, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface SubSection {
  title: string;
  description: string;
  bullets?: string[];
}

interface Service {
  id: string;
  label: string;
  headline: string;
  body: string;
  included?: string[];
  sub_sections?: SubSection[];
  quote?: string;
  image: string;
  ctas?: { text: string; link: string }[];
  imagePosition?: 'left' | 'right';
}

import { ParallaxImage } from '../tier1-components/ParallaxImage';
import { ArrowRight } from 'lucide-react';

export function DetailedServicesLayout({ services }: { services: Service[] }) {
  return (
    <section className="py-24 bg-gray-950" id="detailed-services">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="space-y-32">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            const isImageLeft = service.imagePosition ? service.imagePosition === 'left' : isEven;

            return (
              <div
                key={service.id}
                className={`flex flex-col ${isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                {/* Image / Illustration Side */}
                <div className="w-full lg:w-1/2 rounded-2xl relative shadow-2xl">
                  <AnimatedSection direction={isImageLeft ? 'right' : 'left'}>
                    <div className="aspect-[3/2] rounded-2xl overflow-hidden group w-full relative">
                      <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                      <ParallaxImage 
                        src={service.image} 
                        alt={service.headline} 
                        offset={30}
                        className="w-full h-full"
                      />
                    </div>
                  </AnimatedSection>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                  <AnimatedSection direction={isImageLeft ? 'left' : 'right'} delay={0.2}>
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-900/40 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6 border border-blue-700/50">
                      {service.label}
                    </span>

                    <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
                      {service.headline}
                    </h3>

                    <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                      {service.body}
                    </p>

                    {/* Features List */}
                    {service.included && (
                      <div className="space-y-4 mb-8">
                        {service.included.map((item, i) => (
                          <div key={i} className="flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2.5 mr-4" />
                            <span className="text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Sub Sections (for Executive Support) */}
                    {service.sub_sections && (
                      <div className="grid sm:grid-cols-2 gap-6 mb-8 mt-4">
                        {service.sub_sections.map((sub, i) => (
                          <div key={i} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-colors">
                            <h4 className="text-white font-bold mb-2">{sub.title}</h4>
                            <p className="text-gray-400 text-sm leading-relaxed mb-4">{sub.description}</p>

                            {/* Render Bullets instead of paragraph if available */}
                            {sub.bullets && sub.bullets.length > 0 && (
                              <ul className="space-y-3 mt-4">
                                {sub.bullets.map((bullet, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Quote (for Executive Support) */}
                    {service.quote && (
                      <blockquote className="border-l-4 border-blue-500 pl-6 py-2 mt-4 italic text-gray-300">
                        {service.quote}
                      </blockquote>
                    )}
                    
                    {/* Dynamic CTAs mapped from JSON */}
                    {service.ctas && service.ctas.length > 0 && (
                      <div className="mt-8 flex flex-wrap gap-4">
                        {service.ctas.map((cta, i) => (
                          <a 
                            key={i} 
                            href={cta.link}
                            onClick={(e) => {
                              if (cta.link.startsWith('http')) {
                                e.preventDefault();
                                window.location.href = cta.link;
                              }
                            }}
                            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-white border border-white/20 hover:bg-blue-600 hover:border-blue-500 font-medium rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0)] hover:shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 whitespace-nowrap backdrop-blur-sm"
                          >
                            <span>{cta.text}</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </a>
                        ))}
                      </div>
                    )}
                  </AnimatedSection>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
