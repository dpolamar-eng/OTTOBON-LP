import React from 'react';
import { AnimatedSection } from '../tier1-components/AnimatedSection';

interface Truth {
  title: string;
  description: string;
}

interface SecretSauceData {
  heading: string;
  body: string;
  truths: Truth[];
}

export function SecretSauceLayout({ data }: { data: SecretSauceData }) {
  return (
    <section className="py-32 bg-gradient-to-b from-gray-950 to-gray-900 relative overflow-hidden">
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-0 opacity-20" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <AnimatedSection direction="up" className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            {data.heading}
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
            {data.body}
          </p>
        </AnimatedSection>

        <div className="mt-20 space-y-6">
          {data.truths.map((truth, index) => (
            <AnimatedSection 
              key={index} 
              direction="up" 
              delay={index * 0.2}
              className="group"
            >
              <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-colors p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-4 shadow-xl">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{truth.title}</h3>
                  <p className="text-gray-400 text-lg">
                    {truth.description.charAt(0).toUpperCase() + truth.description.slice(1)}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
