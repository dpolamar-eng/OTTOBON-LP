import React from 'react';
import { AnimatedSection } from '../tier1-components/AnimatedSection';

interface IBOTStep {
  title: string;
  description: string;
}

interface IBOTData {
  heading: string;
  description: string;
  steps: IBOTStep[];
}

export function IBOTLayout({ data }: { data: IBOTData }) {
  return (
    <section className="py-24 bg-gray-950">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

          {/* Image / Illustration Side */}
          <div className="w-full max-w-lg lg:max-w-none lg:w-5/12 rounded-2xl relative shadow-2xl mx-auto lg:mx-0">
            <AnimatedSection direction="right">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden group w-full relative">
                <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                <img
                  src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80"
                  alt="Team brainstorming on a whiteboard"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </AnimatedSection>
          </div>

          {/* Content Side */}
          <div className="w-full lg:w-7/12">
            <AnimatedSection direction="left" delay={0.2}>
              <span className="inline-block py-1 px-3 rounded-full bg-blue-900/40 text-blue-400 text-xs font-bold tracking-widest uppercase mb-6 border border-blue-700/50">
                THE IBOT MODEL
              </span>

              <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                {data.heading}
              </h3>

              <p className="text-gray-300 text-lg mb-10 leading-relaxed max-w-2xl">
                {data.description}
              </p>

              {/* 2x2 Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {data.steps.map((step, index) => (
                  <div key={index} className="bg-[#0B1121] p-6 md:p-8 rounded-[20px] border border-[#1E293B] hover:border-blue-500/30 transition-colors h-full flex flex-col shadow-lg">
                    <h4 className="text-white font-extrabold text-xl mb-4">
                      {index + 1}. {step.title}
                    </h4>
                    <p className="text-slate-400 text-base leading-relaxed flex-1">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>
    </section>
  );
}
