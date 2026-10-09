import React from 'react';
import { Settings, Database, BrainCircuit, LucideIcon } from 'lucide-react';
import { AnimatedSection } from '../tier1-components/AnimatedSection';

const iconMap: Record<string, LucideIcon> = {
  Settings,
  Database,
  Brain: BrainCircuit
};

interface OfferingCard {
  title: string;
  description?: string;
  features?: string[];
  icon: string;
}

interface CoreOfferingsData {
  heading: string;
  cards: OfferingCard[];
}

export function CoreOfferingsLayout({ data }: { data: CoreOfferingsData }) {
  return (
    <section className="relative w-full z-20 -mt-24 pb-20">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <span className="text-sm font-bold text-blue-200 uppercase tracking-[0.3em] [text-shadow:0_0_15px_rgba(96,165,250,0.8)] drop-shadow-lg">{data.heading}</span>
        </div>
        
        <div className={`grid grid-cols-1 md:grid-cols-2 ${data.cards.length > 3 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6 max-w-7xl mx-auto`}>
          {data.cards.map((card, idx) => {
            const IconComponent = iconMap[card.icon] || Settings;
            return (
              <AnimatedSection key={idx} direction="up" delay={idx * 0.1} className="h-full">
                <div className="group relative rounded-2xl w-full min-h-[420px] bg-slate-800 shadow-2xl [transform-style:preserve-3d] [perspective:2000px] border border-white/10 flex items-center justify-center transition-all duration-300">
                  
                  {/* Inner Content (Revealed) */}
                  <div className="p-8 w-full h-full flex flex-col justify-start items-start text-left relative z-0">
                    <h3 className="text-2xl font-bold text-white mb-4 border-b border-white/10 pb-2 w-full">{card.title}</h3>
                    {card.features ? (
                      <ul className="space-y-4 mt-2 w-full">
                        {card.features.map((feature, i) => (
                          <li key={i} className="flex items-start text-base text-gray-300 leading-relaxed">
                            <span className="mr-2 text-blue-400 mt-1">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-300 leading-relaxed text-base">{card.description}</p>
                    )}
                  </div>

                  {/* Cover */}
                  <div className="absolute inset-0 bg-[#060B19] rounded-2xl cursor-pointer transition-transform duration-500 origin-left shadow-2xl border border-white/10 flex flex-col items-center justify-center p-8 group-hover:[transform:rotateY(-85deg)] group-hover:shadow-[20px_10px_30px_rgba(0,0,0,0.6)] z-10 overflow-hidden">
                    {/* Add a subtle gradient to the cover for depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent pointer-events-none" />
                    
                    <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)] relative z-20">
                      <IconComponent className="w-10 h-10 text-blue-400" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-bold text-white text-center leading-tight relative z-20">{card.title}</h3>
                    
                    <div className="mt-8 flex items-center gap-2 text-blue-400/70 text-xs font-semibold tracking-[0.2em] uppercase relative z-20 group-hover:opacity-0 transition-opacity duration-300">
                      <span>Hover to Open</span>
                      <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
