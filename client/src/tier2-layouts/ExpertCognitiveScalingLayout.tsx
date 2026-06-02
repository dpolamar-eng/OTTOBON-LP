import React from 'react';
import { AnimatedSection } from '../tier1-components/AnimatedSection';
import { ParallaxImage } from '../tier1-components/ParallaxImage';
import { ArrowRight } from 'lucide-react';

const highlights = [
  'Replicates expert reasoning patterns & escalation instincts',
  'Enables scalable oversight and decision handling across cohorts',
  'Full auditability and traceability with guaranteed escalation procedures',
  'Domains scaling across diverse fields: Ed, Clinical, Engineering, Legal, Compliance, etc.',
];

export function ExpertCognitiveScalingLayout() {
  return (
    <section className="py-24 bg-gray-950">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Image / Illustration Side */}
          <div className="w-full lg:w-1/2 rounded-2xl relative shadow-2xl">
            <AnimatedSection direction="right">
              <div className="aspect-[3/2] rounded-2xl overflow-hidden group w-full relative">
                <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                <ParallaxImage 
                  src="/images/digital_twin.jpeg" 
                  alt="Professional standing in front of an AI mirror reflection" 
                  offset={30}
                  className="w-full h-full"
                />
              </div>
            </AnimatedSection>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-1/2">
            <AnimatedSection direction="left" delay={0.2}>
              <span className="inline-block py-1 px-3 rounded-full bg-blue-900/40 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6 border border-blue-700/50">
                Expert Cognitive Scaling
              </span>

              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
                Your professional presence,<br className="hidden lg:block" /> amplified at infinite scale.
              </h3>

              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Scale your intuition and professional boundaries. From routine reviews and targeted interventions to ambiguous case surfacing and auditing, our platform replicates your expert judgment, extending it across hundreds of simultaneous interactions while preserving your final word.
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {highlights.map((item, i) => (
                  <div key={i} className="flex items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2.5 mr-4" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-8 flex flex-wrap gap-4">
                <a 
                  href="#"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-white border border-white/20 hover:bg-blue-600 hover:border-blue-500 font-medium rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0)] hover:shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 whitespace-nowrap backdrop-blur-sm"
                >
                  <span>Coming Soon</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>
    </section>
  );
}
